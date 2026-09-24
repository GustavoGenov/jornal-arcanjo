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
  return {
    rules: [
      // 1. Regra Geral para todos os buscadores (Bing, Yahoo, DuckDuckGo)
      {
        userAgent: '*',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img', '/api/horoscopo'],
        disallow: ['/admin/', '/api/'],
      },
      // 2. Googlebot (Rastreador web geral do Google)
      {
        userAgent: 'Googlebot',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/api/'],
      },
      // 3. Googlebot-News (Rastreador em tempo real do Google Notícias)
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/artigo/', '/categoria/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/api/'],
      },
      // 4. Googlebot-Image (Rastreador de imagens do Google)
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/articles/', '/api/img'],
        disallow: ['/admin/', '/api/'],
      },
    ],
    // Lista unificada dos sitemaps oficiais
    sitemap: [
      'https://jornalarcanjo.com.br/sitemap.xml',
      'https://jornalarcanjo.com.br/news-sitemap.xml',
    ],
  };
}
