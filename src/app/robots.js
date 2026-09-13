export default function robots() {
  return {
    rules: [
      // 1. Regra Geral para todos os buscadores (Bing, Yahoo, DuckDuckGo)
      {
        userAgent: '*',
        allow: ['/', '/api/img', '/api/horoscopo'],
        disallow: ['/admin/', '/api/'],
      },
      // 2. Googlebot (Rastreador web geral do Google)
      {
        userAgent: 'Googlebot',
        allow: ['/', '/api/img'],
        disallow: ['/admin/', '/api/'],
      },
      // 3. Googlebot-News (Rastreador em tempo real do Google Notícias)
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/api/img'],
        disallow: ['/admin/', '/api/'],
      },
      // 4. Googlebot-Image (Rastreador de imagens do Google)
      {
        userAgent: 'Googlebot-Image',
        allow: ['/', '/api/img'],
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
      'https://vozdaia.com/sitemap.xml',
      'https://vozdaia.com/news-sitemap.xml',
    ],
  };
}
