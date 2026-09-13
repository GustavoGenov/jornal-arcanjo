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
  metadataBase: new URL('https://vozdaia.com'),
  title: 'Voz da I.A - Combate às Fake News com Tecnologia',
  description: 'O Voz da I.A é o primeiro jornal inteligente 100% focado em combater fake news através de alta tecnologia, checagem de fatos e notícias verificadas em tempo real.',
  alternates: {
    canonical: 'https://vozdaia.com',
  },
  verification: {
    google: 'demFjjgkORq1aeNSlcUdOt7ZwTQxtocBJrJVej5_KVM',
  },
  other: {
    'google-adsense-account': 'ca-pub-5759690232636098'
  }
};

export const revalidate = 60;

export default async function RootLayout({ children }) {
  const { data: categoriesData } = await supabase.from('categories').select('*');
  
  const sortOrder = {
    'IA Sem Mitos': 1,
    'Kaelara Insights': 2
  };

  let processedCategories = (categoriesData || []).map(cat => {
    if (cat.slug === 'religiao') {
      return { ...cat, color_code: '#8e24aa' };
    }
    return cat;
  });


  
  const categories = processedCategories.sort((a, b) => {
    const rankA = sortOrder[a.name] || 99;
    const rankB = sortOrder[b.name] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <html lang="pt-BR" className={`${roboto.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Preconnect prioritário (máx 4 para Lighthouse) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://nisbarqzsjqylsvnyxrm.supabase.co" />
        
        {/* Material Icons carregado de forma 100% assíncrona não-bloqueante */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" 
          media="print" 
          onLoad="this.media='all'" 
        />

        {/* Google AdSense Oficial via next/script após a renderização interativa (preserva FCP e LCP) */}
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
