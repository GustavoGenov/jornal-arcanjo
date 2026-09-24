/**
 * ============================================================================
 * JORNAL ARCANJO — ROOT LAYOUT (LAYOUT PRINCIPAL)
 * ============================================================================
 * Camada raiz de renderização da aplicação Next.js (App Router).
 * 
 * Responsabilidades:
 * 1. Prover o design system tipográfico clássico broadsheet (The New York Times).
 * 2. Injetar metadados globais, tags canônicas e pacotes de favicon responsivos.
 * 3. Estabelecer conexões otimizadas via preconnect (Google Fonts e Supabase CDN).
 * 4. Carregar categorias oficiais ordenadas dinamicamente para o Shell de Navegação.
 * 5. Gerenciar o wrapper de temas (Providers) e o banner de privacidade (LGPD).
 * 
 * @module src/app/layout
 */

import './globals.css';
import { Playfair_Display, Merriweather, Plus_Jakarta_Sans } from 'next/font/google';
import { supabase } from '@/lib/supabase';
import { Providers } from './providers';
import LayoutShell from './components/LayoutShell';
import CookieBanner from '@/components/CookieBanner';

/**
 * Tipografia Principal: Playfair Display
 * Utilizada nos títulos de manchetes, masthead broadsheet e numerais clássicos.
 */
const playfair = Playfair_Display({
  weight: ['400', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

/**
 * Tipografia Secundária: Merriweather
 * Utilizada para o corpo de texto editorial (long-form reading) com alta legibilidade.
 */
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

/**
 * Tipografia de Apoio: Plus Jakarta Sans
 * Utilizada em elementos de interface, menus de navegação, datas e utilitários.
 */
const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

/**
 * Configuração de visualização e escalabilidade para dispositivos móveis
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

/**
 * Metadados estáticos globais e mapeamento completo de favicons / atalhos
 */
export const metadata = {
  metadataBase: new URL('https://jornal-arcanjo.vercel.app'),
  title: 'Jornal Arcanjo - Todas as Notícias com Rigor e Independência',
  description: 'Jornal independente de Formiga (MG) e do Brasil. Cobertura de sociedade, cultura, filosofia, espiritualidade, saúde e fatos checados no padrão The New York Times.',
  alternates: {
    canonical: 'https://jornal-arcanjo.vercel.app',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=3', sizes: 'any' },
      { url: '/favicon.svg?v=3', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=3', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png?v=3', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: '',
  },
};

/**
 * Tempo de revalidação estática incremental (ISR): 60 segundos
 */
export const revalidate = 60;

/**
 * Componente Raiz de Layout do Next.js
 * 
 * Busca no Supabase as categorias ativas e aplica uma ordenação canônica
 * para compor o cabeçalho e menu gaveta (drawer) do Jornal Arcanjo.
 * 
 * @param {Object} props - Propriedades do layout
 * @param {React.ReactNode} props.children - Conteúdo das rotas filhas
 * @returns {JSX.Element} Estrutura HTML completa com fontes e provedores
 */
export default async function RootLayout({ children }) {
  // Busca lista de editorias no Supabase
  const { data: categoriesData } = await supabase.from('categories').select('*');
  
  // Mapeamento de prioridade canônica das editorias no cabeçalho
  const sortOrder = {
    'formiga-sociedade': 1,
    'cultura-filosofia': 2,
    'saude-bem-estar': 3,
    'religiao': 4,
    'clima-tempo': 5,
    'horoscopo-taro': 6,
    'passatempos': 7
  };

  // Ordena as categorias por relevância editorial e depois alfabeticamente
  const categories = (categoriesData || []).sort((a, b) => {
    const rankA = sortOrder[a.slug] || 99;
    const rankB = sortOrder[b.slug] || 99;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <html lang="pt-BR" className={`${playfair.variable} ${merriweather.variable} ${plusJakartaSans.variable}`}>
      <head>
        {/* Favicons com cache-busting v=3 para navegadores e dispositivos móveis */}
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
        
        {/* Otimização de latência de rede (Preconnects) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hiaoasipxkxsjcoshscu.supabase.co" />
        
        {/* Fontes de Ícones e Glifos do Google */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" 
        />
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {/* Casca estrutural com Masthead NYT, Drawer e Navegação */}
          <LayoutShell categories={categories}>
            {children}
          </LayoutShell>
          
          {/* Banner de consentimento e conformidade LGPD */}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
