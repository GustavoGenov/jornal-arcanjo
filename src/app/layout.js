import './globals.css';
import { Playfair_Display, Merriweather, Plus_Jakarta_Sans } from 'next/font/google';
import { supabase } from '@/lib/supabase';
import { Providers } from './providers';
import LayoutShell from './components/LayoutShell';
import DeferredScripts from './components/DeferredScripts';
import CookieBanner from '@/components/CookieBanner';
import Script from 'next/script';

const playfair = Playfair_Display({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
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
  metadataBase: new URL('https://jornal-arcanjo.vercel.app'),
  title: 'Jornal Arcanjo - Todas as Notícias com Rigor e Independência',
  description: 'Jornal independente de Formiga (MG) e do Brasil. Cobertura de sociedade, cultura, filosofia, espiritualidade, saúde e fatos checados no padrão The New York Times.',
  alternates: {
    canonical: 'https://jornal-arcanjo.vercel.app',
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
    <html lang="pt-BR" className={`${playfair.variable} ${merriweather.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hiaoasipxkxsjcoshscu.supabase.co" />
        
        {/* Material Icons e Symbols */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />

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
