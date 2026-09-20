import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';



  // Redirecionamento www para sem www se em domínio customizado próprio
  if (host.startsWith('www.jornalarcanjo.com.br')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://jornalarcanjo.com.br');
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // Proteção de Agentes (escrita)
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

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
