/**
 * ============================================================================
 * JORNAL ARCANJO — EDGE IMAGE PROXY & CDN CACHE PROXY
 * ============================================================================
 * Rota executada no Vercel Edge Runtime para servir mídias com máxima performance.
 * 
 * Funcionalidades:
 * 1. Transformação Dinâmica: Converte requisições para Supabase Image Transformation
 *    quando os parâmetros de largura (`w`) e qualidade (`q`) são fornecidos.
 * 2. Cache Global Imutável: Instruções HTTP rigorosas (`s-maxage=31536000, immutable`)
 *    que cacheiam a imagem na CDN global do Vercel, reduzindo requisições ao banco.
 * 3. Fallback Resiliente: Redireciona com Status 302 para `/simbolo.png` caso o upstream falhe,
 *    evitando imagens quebradas ou erros 500 para o leitor.
 * 4. Validação de Segurança: Permite somente origens autorizadas (Supabase e domínios do Jornal Arcanjo).
 * 
 * @module src/app/api/img/route
 */

export const runtime = 'edge';

/**
 * Handler HTTP GET para otimização e proxy de imagens
 * @param {Request} request - Requisição recebida pelo Edge runtime
 * @returns {Promise<Response>}
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const width = searchParams.get('w');
  const quality = searchParams.get('q') || '75';

  if (!imageUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Lista de hosts permitidos para prevenir vulnerabilidades de SSRF / Open Proxy
  const allowedHosts = [
    'jornalarcanjo.com.br',
    'www.jornalarcanjo.com.br',
    'jornal-arcanjo.vercel.app',
    'nisbarqzsjqylsvnyxrm.supabase.co',
    'localhost'
  ];

  try {
    let fetchUrl = imageUrl;
    if (imageUrl.startsWith('/')) {
      const host = request.headers.get('host') || 'jornalarcanjo.com.br';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      fetchUrl = `${protocol}://${host}${imageUrl}`;
    } else {
      const parsedUrl = new URL(imageUrl);
      if (!allowedHosts.includes(parsedUrl.hostname) && !parsedUrl.hostname.endsWith('.supabase.co')) {
        return new Response('Host not allowed', { status: 403 });
      }
    }

    // Se for imagem do Supabase Storage e largura for solicitada, usa o endpoint de transformação
    if (width && fetchUrl.includes('/storage/v1/object/public/')) {
      fetchUrl = fetchUrl.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') + 
        `?width=${encodeURIComponent(width)}&quality=${encodeURIComponent(quality)}`;
    }

    const imageRes = await fetch(fetchUrl, {
      headers: {
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    if (!imageRes.ok) {
      // Em caso de falha no upstream, redireciona graciosamente para o símbolo oficial
      return Response.redirect(new URL('/simbolo.png', request.url), 302);
    }

    const contentType = imageRes.headers.get('content-type') || 'image/webp';
    const imageBuffer = await imageRes.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache na CDN Edge da Vercel por 1 ano, cache do navegador por 1 ano, imutável
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable',
        'CDN-Cache-Control': 'public, s-maxage=31536000, immutable',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Image proxy edge error:', error);
    return Response.redirect(new URL('/simbolo.png', request.url), 302);
  }
}
