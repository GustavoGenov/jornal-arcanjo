import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function cleanXmlText(str) {
  if (!str) return '';
  return str
    .replace(/&nbsp;|\u00a0/g, ' ')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '')
    .trim();
}

/**
 * Formata a data estritamente no padrão W3C / ISO 8601 com fuso horário
 * Exemplo: 2026-09-07T14:30:00-03:00 (Fuso de Brasília / Horário de SP)
 */
function formatIsoW3C(dateString) {
  if (!dateString) return new Date().toISOString();
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return new Date().toISOString();
    return d.toISOString(); // Formato padrão W3C UTC "YYYY-MM-DDTHH:mm:ss.sssZ"
  } catch {
    return new Date().toISOString();
  }
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jornal-arcanjo.vercel.app';
  
  // Janela estrita de 48 horas (Regra Obrigatória do Google Notícias)
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  
  // 1. Busca matérias publicadas nas últimas 48 horas
  let { data: posts, error } = await supabase
    .from('articles')
    .select('title, slug, created_at, updated_at, image_url, image_alt')
    .eq('published', true)
    .gte('updated_at', twoDaysAgo)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar artigos para news-sitemap:', error);
  }

  // 2. Fallback de segurança: se não houver posts nas últimas 48h,
  // busca os 10 mais recentes para NUNCA entregar um sitemap vazio ao Google
  if (!posts || posts.length === 0) {
    const { data: fallbackPosts } = await supabase
      .from('articles')
      .select('title, slug, created_at, updated_at, image_url, image_alt')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(10);

    posts = fallbackPosts || [];
  }

  const activePosts = posts || [];

  const xmlItems = activePosts.map((post) => {
    const postUrl = `${baseUrl}/artigo/${post.slug}`;
    const pubDate = formatIsoW3C(post.created_at);
    const title = cleanXmlText(post.title);
    
    // Imagem do artigo (URL limpa direta para conformidade com o Google Imagens)
    let imageXml = '';
    if (post.image_url) {
      let img = post.image_url;
      if (img.startsWith('/')) {
        img = `${baseUrl}${img}`;
      }
      imageXml = `
    <image:image>
      <image:loc>${cleanXmlText(img)}</image:loc>
      <image:title>${title}</image:title>
    </image:image>`;
    }

    return `  <url>
    <loc>${postUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>Jornal Arcanjo</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>${imageXml}
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlItems}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=0, stale-while-revalidate=30',
    },
  });
}
