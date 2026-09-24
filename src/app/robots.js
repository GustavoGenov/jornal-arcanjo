/**
 * ============================================================================
 * JORNAL ARCANJO — ROBOTS.TXT DINÂMICO
 * ============================================================================
 * Diretivas de rastreamento para web crawlers e robôs de indexação.
 * 
 * Regras Configuradas:
 * 1. Allow: Capa, reportagens (/artigo/), editorias (/categoria/), imagens e rotas públicas.
 * 2. Disallow: Painel administrativo (/admin/) e rotas de mutação interna de API (/api/).
 * 3. Crawlers Específicos: Googlebot, Googlebot-News (Google Notícias) e Googlebot-Image.
 * 4. Sitemap Declaration: Aponta para sitemap.xml e news-sitemap.xml (protocolo de notícias 48h).
 * 
 * @module src/app/robots
 * @returns {import('next').MetadataRoute.Robots}
 */

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function robots() {
  const primaryDomain = process.env.NEXT_PUBLIC_SITE_URL || 'https://jornal-arcanjo.vercel.app';
  
  return {
    rules: [
      // 1. Regra Geral para todos os buscadores (Google, Bing, Yahoo, DuckDuckGo)
      {
        userAgent: '*',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img', '/api/horoscopo'],
        disallow: ['/admin/', '/admin25/', '/admin25', '/api/'],
      },
      // 2. Googlebot (Rastreador web geral do Google Search Console)
      {
        userAgent: 'Googlebot',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/admin25/', '/admin25', '/api/'],
      },
      // 3. Googlebot-News (Rastreador em tempo real do Google Notícias)
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/admin25/', '/admin25', '/api/'],
      },
      // 4. Googlebot-Image (Rastreador de imagens do Google)
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/admin25/', '/admin25', '/api/'],
      },
    ],
    // Lista unificada dos sitemaps oficiais para o Google Search Console e Google News
    sitemap: [
      `${primaryDomain}/sitemap.xml`,
      `${primaryDomain}/news-sitemap.xml`,
      'https://jornal-arcanjo.vercel.app/sitemap.xml',
      'https://jornal-arcanjo.vercel.app/news-sitemap.xml',
      'https://jornalarcanjo.com.br/sitemap.xml',
      'https://jornalarcanjo.com.br/news-sitemap.xml',
    ],
  };
}
