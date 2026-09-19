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
      // 5. Mediapartners-Google (Rastreador contextual do Google AdSense)
      {
        userAgent: 'Mediapartners-Google',
        allow: ['/'],
        disallow: ['/admin/'],
      },
      // 6. Bots de Anúncios do Google (Mobile e Display)
      {
        userAgent: ['AdsBot-Google', 'AdsBot-Google-Mobile'],
        allow: ['/'],
        disallow: ['/admin/'],
      },
    ],
    // Lista unificada dos sitemaps oficiais
    sitemap: [
      'https://jornalarcanjo.com.br/sitemap.xml',
      'https://jornalarcanjo.com.br/news-sitemap.xml',
    ],
  };
}

