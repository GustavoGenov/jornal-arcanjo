/**
 * Helper to ensure images are served with maximal performance and zero egress leakage.
 * 
 * - Static local images (/articles/..., /equipe/..., /simbolo.png) are served directly.
 * - Supabase Storage URLs are routed through Edge Proxy /api/img for global Vercel CDN caching.
 */
export function getOptimizedImageUrl(url, width) {
  if (!url) return null;

  // Local static paths (served directly with 1-year immutable cache from Vercel Edge)
  if (url.startsWith('/')) {
    return url;
  }

  // Supabase Storage URLs -> Route through Edge Cache Proxy
  if (url.includes('supabase.co/storage')) {
    const widthParam = width ? `&w=${width}` : '';
    return `/api/img?url=${encodeURIComponent(url)}${widthParam}`;
  }

  return url;
}

/**
 * Generates a responsive srcset for high-priority hero and card images.
 */
export function getImageSrcSet(url) {
  if (!url) return undefined;

  if (url.includes('supabase.co/storage')) {
    return `${getOptimizedImageUrl(url, 480)} 480w, ${getOptimizedImageUrl(url, 800)} 800w`;
  }

  return undefined;
}
