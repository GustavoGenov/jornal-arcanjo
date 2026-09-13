import './globals.css';
import { Roboto, Plus_Jakarta_Sans } from 'next/font/google';
import { supabase } from '@/lib/supabase';
import { Providers } from './providers';
import LayoutShell from './components/LayoutShell';
import DeferredScripts from './components/DeferredScripts';
import CookieBanner from '@/components/CookieBanner';
import Script from 'next/script';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://jornalarcanjo.com.br'),
  title: 'Jornal Arcanjo - Tradição, Sociedade, Cultura & Sabedoria',
  description: 'Jornal Arcanjo: jornalismo humanizado, cultura, filosofia, espiritualidade, saúde integral, meteorologia e notícias verificadas.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br',
  },
  verification: {
    google: '',
  },
  other: {
    'google-adsense-account': 'ca-pub-5759690232636098'
  }
};

export const revalidate = 60;

export default async function RootLayout({ children }) {
  const { data: categoriesData } = await supabase.from('categories').select('*');
  
  const sortOrder = {
    'formiga-sociedade': 1,
    'cultura-filosofia': 2,
    'saude-bem-estar': 3,
    'religiao': 4,
    'clima-tempo': 5,
    'horoscopo-taro': 6,
    'passatempos': 7
  };

  const categories = (categoriesData || []).sort((a, b) => {
    const rankA = sortOrder[a.slug] || 99;
    const rankB = sortOrder[b.slug] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <html lang="pt-BR" className={`${roboto.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Preconnect prioritário (máx 4 para Lighthouse) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hiaoasipxkxsjcoshscu.supabase.co" />
        
        {/* Material Icons carregado de forma assíncrona não-bloqueante */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" 
          media="print" 
          onLoad="this.media='all'" 
        />

        {/* Script AdSense / Monetização */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5759690232636098"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <LayoutShell categories={categories}>
            {children}
          </LayoutShell>
          <CookieBanner />
          <DeferredScripts />
        </Providers>
      </body>
    </html>
  );
}
