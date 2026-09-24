/**
 * ============================================================================
 * JORNAL ARCANJO — MIDDLEWARE DE REDIRECIONAMENTO E SEGURANÇA
 * ============================================================================
 * Executado na Edge Network do Next.js antes de qualquer rota ser resolvida.
 * 
 * Regras Operacionais:
 * 1. Unificação Canônica de SEO: Redireciona 301 permanentemente requisições de
 *    `www.jornalarcanjo.com.br` para o domínio canônico `https://jornalarcanjo.com.br`.
 * 2. Proteção de Agentes Autônomos: Bloqueia métodos HTTP mutáveis (POST, PUT, PATCH, DELETE)
 *    para requisições identificadas com headers restritos de agentes em modo somente-leitura.
 * 
 * @module src/middleware
 */

import { NextResponse } from 'next/server';

/**
 * Função interceptadora principal do middleware Next.js
 * @param {import('next/server').NextRequest} request - Requisição HTTP de entrada
 * @returns {NextResponse} Resposta ou prosseguimento da cadeia
 */
export function middleware(request) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || '';

  // Redirecionamento 301 de www para domínio raiz (canonical)
  if (host.startsWith('www.jornalarcanjo.com.br')) {
    const canonicalUrl = new URL(url.pathname + url.search, 'https://jornalarcanjo.com.br');
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // Proteção de integridade para papéis de agentes em modo Read-Only
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

/**
 * Configuração de rotas interceptadas (ignora assets estáticos internos)
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
