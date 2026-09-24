/**
 * ============================================================================
 * JORNAL ARCANJO — FEED RSS 2.0 (GOOGLE PUBLISHER CENTER & AGREGADORES)
 * ============================================================================
 * Endpoint dinâmico que gera o feed de notícias no formato RSS 2.0 com extensões
 * multimídia (`media:content`) e corpo completo (`content:encoded`).
 * 
 * Especificações:
 * 1. Protocolo Google Publisher Center: Atende rigorosamente aos critérios de indexação de notícias.
 * 2. Suporte a PubSubHubbub: Hub de distribuição instantânea em tempo real.
 * 3. MIME Types de Imagem: Detecção precisa de WebP, PNG, JPEG e GIF para miniaturas nos feeds.
 * 
 * @module src/app/feed.xml/route
 */

import { supabase } from '@/lib/supabase';

// Força rota dinâmica para que novos artigos apareçam instantaneamente no RSS / Feed
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Handler HTTP GET para o feed RSS
 * @returns {Promise<Response>} Resposta XML com cabeçalho application/rss+xml
 */
export async function GET() {
  const baseUrl = 'https://jornalarcanjo.com.br';

  try {
    // Google Publisher Center & Leitores RSS: busca os 30 artigos mais recentes publicados
    const { data: articles, error } = await supabase
      .from('articles')
      .select('title, slug, summary, created_at, updated_at, author, author_name, content, image_url')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    const lastBuildDate = new Date().toUTCString();

    const itemsXml = (articles || [])
      .map((article) => {
        const url = `${baseUrl}/artigo/${article.slug}`;
        const pubDate = new Date(article.created_at).toUTCString();
        
        // Escape rigoroso de caracteres XML especiais
        const escapeXml = (str) =>
          str
            ? str
                .replace(/&nbsp;|\u00a0/g, ' ')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')
            : '';

        // Media content tag para imagens no Google News com MIME type correspondente
        let mediaUrl = article.image_url;
        let mimeType = 'image/jpeg';
        if (mediaUrl) {
          if (mediaUrl.startsWith('/')) {
            mediaUrl = `${baseUrl}${mediaUrl}`;
          }

          if (mediaUrl.toLowerCase().includes('.webp')) {
            mimeType = 'image/webp';
          } else if (mediaUrl.toLowerCase().includes('.png')) {
            mimeType = 'image/png';
          } else if (mediaUrl.toLowerCase().includes('.gif')) {
            mimeType = 'image/gif';
          }
        }

        const mediaContent = mediaUrl
          ? `<media:content url="${escapeXml(mediaUrl)}" medium="image" type="${mimeType}" />`
          : '';

        const contentEncoded = article.content
          ? `<content:encoded><![CDATA[${article.content}]]></content:encoded>`
          : '';

        return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(article.author_name || article.author || 'Jornal Arcanjo')}</dc:creator>
      <description>${escapeXml(article.summary)}</description>
      ${mediaContent}
      ${contentEncoded}
    </item>`;
      })
      .join('');

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Jornal Arcanjo</title>
    <link>${baseUrl}</link>
    <description>O jornal focado em combater fake news com informação de alta tecnologia.</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <atom:link href="https://pubsubhubbub.appspot.com/" rel="hub" />
    ${itemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('Erro ao gerar feed RSS:', err);
    return new Response('<error>Erro ao gerar feed</error>', {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
}
