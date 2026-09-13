export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response('google.com, pub-5759690232636098, DIRECT, f08c47fec0942fa0\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
