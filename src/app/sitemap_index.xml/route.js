import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  return NextResponse.redirect(new URL('/sitemap.xml', request.url), 301);
}
