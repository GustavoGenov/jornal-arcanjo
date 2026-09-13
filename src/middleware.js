import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. Redirecionamento Canônico: Forçar domínio oficial https://vozdaia.com para evitar canibalização/duplicidade SEO
  if (host.includes('vercel.app') || host.startsWith('www.')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://vozdaia.com');
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // 1.1 Redirecionamento amigável para variações de sitemaps comuns (evita 404 no Google Search Console)
  if (url.pathname === '/sitemaps.xml' || url.pathname === '/sitemap_index.xml') {
    return NextResponse.redirect(new URL('/sitemap.xml', request.url), 301);
  }
  if (url.pathname === '/news_sitemap.xml') {
    return NextResponse.redirect(new URL('/news-sitemap.xml', request.url), 301);
  }

  // 2. Proteção de Agentes (existente)
  const isAgent = request.headers.get('x-agent-role') === 'gemini_spark_agent';
  const method = request.method;

  if (isAgent && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return NextResponse.json(
      { error: 'Acesso Negado: Agente possui permissão estrita de Somente-Leitura (Read-Only).' },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

// Configuração para interceptar rotas de API e escritas de agentes
export const config = {
  matcher: ['/api/:path*'],
};