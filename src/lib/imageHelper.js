/**
 * ============================================================================
 * JORNAL ARCANJO — IMAGE HELPER (OTIMIZADOR DE IMAGENS E EDGE CACHING)
 * ============================================================================
 * Utilitário de alta performance para entrega de ativos visuais com zero
 * desperdício de banda (egress) e máximo aproveitamento do cache da CDN Vercel Edge.
 * 
 * Regras de Roteamento:
 * 1. Arquivos Estáticos Locais (/articles/..., /equipe/..., /simbolo.png):
 *    Servidos diretamente da pasta `public` com cabeçalho immutable (1 ano de cache).
 * 2. Mídias no Supabase Storage:
 *    Roteadas através da rota Edge `/api/img`, garantindo compressão, redimensionamento
 *    on-the-fly e cache distribuído globalmente para máxima pontuação no LCP (Largest Contentful Paint).
 * 
 * @module src/lib/imageHelper
 */

/**
 * Retorna a URL otimizada para renderização na camada de apresentação
 * @param {string} url - Caminho relativo local ou URL absoluta externa
 * @param {number} [width] - Largura desejada em pixels para o redimensionamento
 * @returns {string|null} URL pronta para a tag <img>
 */
export function getOptimizedImageUrl(url, width) {
  if (!url) return null;

  // Imagens estáticas locais (servidas diretamente pela raiz)
  if (url.startsWith('/')) {
    return url;
  }

  // URLs do Supabase Storage -> Redirecionadas pelo Edge Cache Proxy
  if (url.includes('supabase.co/storage')) {
    const widthParam = width ? `&w=${width}` : '';
    return `/api/img?url=${encodeURIComponent(url)}${widthParam}`;
  }

  return url;
}

/**
 * Gera o atributo `srcset` responsivo para otimização de largura de banda e densidade de pixels
 * @param {string} url - URL original da imagem
 * @returns {string|undefined} String do srcset compatível com HTML5 ou undefined se local
 */
export function getImageSrcSet(url) {
  if (!url) return undefined;

  if (url.includes('supabase.co/storage')) {
    return `${getOptimizedImageUrl(url, 480)} 480w, ${getOptimizedImageUrl(url, 800)} 800w`;
  }

  return undefined;
}
