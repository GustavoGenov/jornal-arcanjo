export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const width = searchParams.get('w');
  const quality = searchParams.get('q') || '75';

  if (!imageUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Security check: Only allow images from Supabase or trusted domains
  const allowedHosts = [
    'nisbarqzsjqylsvnyxrm.supabase.co',
    'vozdaia.com',
    'www.vozdaia.com',
    'voz-da-ia.vercel.app',
    'localhost'
  ];

  try {
    let fetchUrl = imageUrl;
    if (imageUrl.startsWith('/')) {
      const host = request.headers.get('host') || 'vozdaia.com';
      const protocol = host.includes('localhost') ? 'http' : 'https';
      fetchUrl = `${protocol}://${host}${imageUrl}`;
    } else {
      const parsedUrl = new URL(imageUrl);
      if (!allowedHosts.includes(parsedUrl.hostname) && !parsedUrl.hostname.endsWith('.supabase.co')) {
        return new Response('Host not allowed', { status: 403 });
      }
    }

    // If Supabase Storage image and width requested, use Supabase Image Transformation
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
      // If upstream image is missing, redirect to default symbol rather than returning 500
      return Response.redirect(new URL('/simbolo.png', request.url), 302);
    }

    const contentType = imageRes.headers.get('content-type') || 'image/webp';
    const imageBuffer = await imageRes.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache at Vercel Edge CDN for 1 year, browser cache for 1 year, immutable
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
