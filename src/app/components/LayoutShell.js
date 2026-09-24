'use client';

/**
 * ============================================================================
 * JORNAL ARCANJO — LAYOUT SHELL (MASTHEAD & CASCA EDITORIAL)
 * ============================================================================
 * Casca visual unificada que implementa o padrão broadsheet (The New York Times).
 * 
 * Componentes Estruturais:
 * 1. Top Utility Bar: Data por extenso, indicador de clima de Formiga (MG), alternador de tema e acesso à redação.
 * 2. Masthead Central: Tipografia gótica/serifada clássica do Jornal Arcanjo com o lema editorial.
 * 3. Double-rule Navigation: Grade horizontal de editorias com separadores clássicos do jornalismo impresso.
 * 4. Drawer Lateral: Menu de seções completo acessível em qualquer resolução.
 * 5. Footer Institucional: Quatro colunas estruturadas, links de transparência, equipe e copyright.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {Array<{id: string, name: string, slug: string, color_code?: string}>} props.categories - Categorias ativas
 * @param {React.ReactNode} props.children - Conteúdo da página atual
 */

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function LayoutShell({ categories, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  // Se a rota for administrativa, não duplica a casca pública do jornal
  const isAdminRoute = pathname?.startsWith('/admin25') || pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Formatação da data por extenso no estilo The New York Times
  const todayFormatted = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedDateCapitalized = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <>
      {/* ====================================================================
          THE NEW YORK TIMES (NYT) MASTHEAD PARA O JORNAL ARCANJO
          ==================================================================== */}
      <header className="nyt-header">
        <div className="nyt-container">
          
          {/* 1. Barra Utilitária Superior do NYT (Data, Edição, Clima, Ações) */}
          <div className="nyt-top-utility">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button 
                onClick={toggleDrawer}
                aria-label="Abrir seções"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px', font: 'inherit', fontWeight: '700' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span>SEÇÕES</span>
              </button>
              <span>•</span>
              <span>{formattedDateCapitalized}</span>
              <span>•</span>
              <span style={{ display: 'none', md: 'inline' }}>EDIÇÃO DO DIA</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link href="/clima" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                <span>⛅</span>
                <span>FORMIGA, MG 26°C</span>
              </Link>
              <span>•</span>
              <ThemeToggle />
              <span>•</span>
              <Link href="/admin25/login" style={{ fontWeight: '700' }}>
                REDAÇÃO / ENTRAR
              </Link>
            </div>
          </div>

          {/* 2. Logotipo Central Majestoso do Jornal Arcanjo (Serif Broadsheet) */}
          <div className="nyt-masthead-center">
            <Link href="/" className="nyt-masthead-logo" onClick={closeDrawer}>
              Jornal Arcanjo
            </Link>
            <div className="nyt-masthead-slogan">
              “Tradição, Verdade & Cultura — Todas as Notícias com Rigor Editorial e Fatos Checados”
            </div>
          </div>

          {/* 3. Navegação Horizontal com Double Rules Estilo NYT */}
          <div className="nyt-nav-row">
            <nav className="nyt-nav-list" aria-label="Editorias principais">
              <Link href="/" className="nyt-nav-link">Capa</Link>
              <Link href="/categoria/formiga-sociedade" className="nyt-nav-link" style={{ color: '#0284c7' }}>Formiga em Foco & Sociedade</Link>
              <Link href="/categoria/cultura-filosofia" className="nyt-nav-link">Cultura e Filosofia</Link>
              <Link href="/categoria/saude-bem-estar" className="nyt-nav-link">Saúde e Bem-Estar</Link>
              <Link href="/categoria/religiao" className="nyt-nav-link">Religião</Link>
              <Link href="/clima" className="nyt-nav-link">Clima tempo</Link>
              <Link href="/horoscopo" className="nyt-nav-link">Horóscopo & Tarô</Link>
              <Link href="/passatempos" className="nyt-nav-link" style={{ color: '#ea580c' }}>Passatempos</Link>
              <Link href="/equipe" className="nyt-nav-link">Opinião & Equipe</Link>
              <Link href="/sobre" className="nyt-nav-link">Quem Somos</Link>
            </nav>
          </div>

        </div>
      </header>

      {/* OVERLAY E MENU LATERAL (SEÇÕES NYT) */}
      <div 
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 9999,
          display: drawerOpen ? 'block' : 'none'
        }}
      ></div>

      <aside 
        style={{
          position: 'fixed',
          top: 0,
          left: drawerOpen ? 0 : '-320px',
          width: '300px',
          height: '100%',
          background: 'var(--nyt-surface)',
          color: 'var(--nyt-ink)',
          zIndex: 10000,
          transition: 'left 0.25s ease',
          boxShadow: '4px 0 20px rgba(0,0,0,0.25)',
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--nyt-border-dark)', paddingBottom: '12px' }}>
          <span style={{ fontFamily: 'var(--nyt-serif-title)', fontSize: '20px', fontWeight: '900', textTransform: 'uppercase' }}>
            Jornal Arcanjo
          </span>
          <button onClick={closeDrawer} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '4px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--nyt-ink-muted)', fontWeight: 800, letterSpacing: '1px' }}>
            Editorias Oficiais
          </span>
          <Link href="/" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            📰 Capa Principal
          </Link>
          <Link href="/categoria/formiga-sociedade" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            🏛️ Formiga em Foco & Sociedade
          </Link>
          <Link href="/categoria/cultura-filosofia" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            📚 Cultura e Filosofia
          </Link>
          <Link href="/categoria/saude-bem-estar" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            🌿 Saúde e Bem-Estar
          </Link>
          <Link href="/categoria/religiao" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            🕊️ Religião & Tradições
          </Link>
          <Link href="/clima" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            ⛅ Clima tempo
          </Link>
          <Link href="/horoscopo" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            ✨ Horóscopo & Tarô
          </Link>
          <Link href="/passatempos" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '6px 0', fontSize: '14px', fontWeight: 600 }}>
            🧩 Passatempos & Jogos Mentais
          </Link>
        </div>

        <hr style={{ borderColor: 'var(--nyt-border)', margin: '8px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--nyt-ink-muted)', fontWeight: 800, letterSpacing: '1px' }}>
            Institucional
          </span>
          <Link href="/sobre" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '4px 0', fontSize: '13px' }}>
            Quem Somos
          </Link>
          <Link href="/equipe" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '4px 0', fontSize: '13px' }}>
            Nossa Equipe Editorial
          </Link>
          <Link href="/politica-de-privacidade" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '4px 0', fontSize: '13px' }}>
            Política de Privacidade
          </Link>
          <Link href="/termos" onClick={closeDrawer} style={{ color: 'var(--nyt-ink)', padding: '4px 0', fontSize: '13px' }}>
            Termos de Uso
          </Link>
        </div>
      </aside>

      {/* CONTEÚDO PRINCIPAL DO BROADSHEET */}
      <div style={{ minHeight: '80vh' }}>
        {children}
      </div>

      {/* FOOTER NO PADRÃO THE NEW YORK TIMES */}
      <footer className="nyt-footer">
        <div className="nyt-container">
          
          <div className="nyt-footer-top">
            <Link href="/" className="nyt-footer-logo">
              Jornal Arcanjo
            </Link>
            <div style={{ fontSize: '12px', color: 'var(--nyt-ink-muted)' }}>
              Jornalismo Independente • Formiga (MG) • Brasil
            </div>
          </div>

          <div className="nyt-footer-cols">
            <div className="nyt-footer-col">
              <h5>NOTÍCIAS & SOCIEDADE</h5>
              <ul>
                <li><Link href="/categoria/formiga-sociedade">Formiga em Foco</Link></li>
                <li><Link href="/categoria/formiga-sociedade">Cidadania & Memória</Link></li>
                <li><Link href="/clima">Previsão do Tempo</Link></li>
                <li><Link href="/busca">Arquivo de Notícias</Link></li>
              </ul>
            </div>

            <div className="nyt-footer-col">
              <h5>CULTURA & SABERES</h5>
              <ul>
                <li><Link href="/categoria/cultura-filosofia">Cultura & Filosofia</Link></li>
                <li><Link href="/categoria/cultura-filosofia">Ensaios & Literatura</Link></li>
                <li><Link href="/categoria/religiao">Religião & Tradições</Link></li>
                <li><Link href="/horoscopo">Horóscopo & Tarô</Link></li>
              </ul>
            </div>

            <div className="nyt-footer-col">
              <h5>VIDA & SAÚDE</h5>
              <ul>
                <li><Link href="/categoria/saude-bem-estar">Saúde & Bem-Estar</Link></li>
                <li><Link href="/categoria/saude-bem-estar">Qualidade de Vida</Link></li>
                <li><Link href="/passatempos">NYT Passatempos</Link></li>
                <li><Link href="/passatempos">Sudoku & Palavras Cruzadas</Link></li>
              </ul>
            </div>

            <div className="nyt-footer-col">
              <h5>INSTITUCIONAL</h5>
              <ul>
                <li><Link href="/sobre">Quem Somos</Link></li>
                <li><Link href="/equipe">Nossa Equipe Editorial</Link></li>
                <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
                <li><Link href="/termos">Termos de Uso</Link></li>
                <li><a href="mailto:gustavocastroinfo@gmail.com">gustavocastroinfo@gmail.com</a></li>
              </ul>
            </div>
          </div>

          {/*
            SEÇÃO DE ATALHOS DO ECOSSISTEMA DIGITAL & PROJETOS PARCEIROS
            Apresenta links diretos de alta relevância com ícones vetoriais otimizados em SVG:
            1. Cursos Livres Tech & IA: https://cursos-livres-tech-ia.vercel.app/
            2. Kaelara Online: https://kaelara-online.vercel.app/
            3. Jornal Voz da IA: https://vozdaia.com/
          */}
          <div className="nyt-footer-ecosystem">
            <div className="nyt-footer-ecosystem-header">
              <span className="nyt-footer-ecosystem-tag">Rede Digital & Projetos Parceiros</span>
              <p className="nyt-footer-ecosystem-lead">Conheça as iniciativas integradas do nosso ecossistema de jornalismo, inteligência artificial e educação:</p>
            </div>

            <div className="nyt-footer-ecosystem-grid">
              {/* ATALHO 1: JORNAL VOZ DA IA */}
              <a 
                href="https://vozdaia.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nyt-footer-ecosystem-card"
                title="Acessar o portal Voz da IA"
              >
                <div className="nyt-footer-ecosystem-icon-wrapper">
                  <img 
                    src="/ecosystem/vozdaia.svg" 
                    alt="Símbolo Voz da IA" 
                    width="32" 
                    height="32" 
                    className="nyt-footer-ecosystem-icon" 
                  />
                </div>
                <div className="nyt-footer-ecosystem-info">
                  <div className="nyt-footer-ecosystem-title-row">
                    <strong className="nyt-footer-ecosystem-name">Voz da IA</strong>
                    <span className="nyt-footer-ecosystem-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="nyt-footer-ecosystem-desc">
                    Jornalismo de Inteligência Artificial, Ciência &amp; Futuro Digital.
                  </p>
                </div>
              </a>

              {/* ATALHO 2: KAELARA ONLINE */}
              <a 
                href="https://kaelara-online.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nyt-footer-ecosystem-card"
                title="Acessar o portal Kaelara Online"
              >
                <div className="nyt-footer-ecosystem-icon-wrapper">
                  <img 
                    src="/ecosystem/kaelara.svg" 
                    alt="Símbolo Kaelara Online" 
                    width="32" 
                    height="32" 
                    className="nyt-footer-ecosystem-icon" 
                  />
                </div>
                <div className="nyt-footer-ecosystem-info">
                  <div className="nyt-footer-ecosystem-title-row">
                    <strong className="nyt-footer-ecosystem-name">Kaelara Online</strong>
                    <span className="nyt-footer-ecosystem-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="nyt-footer-ecosystem-desc">
                    Assistência Cognitiva Avançada &amp; Inteligência Artificial Conversacional.
                  </p>
                </div>
              </a>

              {/* ATALHO 3: CURSOS LIVRES TECH & IA */}
              <a 
                href="https://cursos-livres-tech-ia.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nyt-footer-ecosystem-card"
                title="Acessar a plataforma Cursos Livres Tech & IA"
              >
                <div className="nyt-footer-ecosystem-icon-wrapper">
                  <img 
                    src="/ecosystem/cursos.svg" 
                    alt="Símbolo Cursos Livres Tech & IA" 
                    width="32" 
                    height="32" 
                    className="nyt-footer-ecosystem-icon" 
                  />
                </div>
                <div className="nyt-footer-ecosystem-info">
                  <div className="nyt-footer-ecosystem-title-row">
                    <strong className="nyt-footer-ecosystem-name">Cursos Livres Tech &amp; IA</strong>
                    <span className="nyt-footer-ecosystem-arrow" aria-hidden="true">↗</span>
                  </div>
                  <p className="nyt-footer-ecosystem-desc">
                    Formação Tecnológica Prática, Gratuita e Acessível em IA e Programação.
                  </p>
                </div>
              </a>
            </div>
          </div>

          <div className="nyt-footer-bottom">
            <p style={{ margin: '0 0 6px' }}>
              © {new Date().getFullYear()} The Jornal Arcanjo Publishing Group. Todos os direitos reservados.
            </p>
            <p style={{ margin: 0, fontSize: '10.5px' }}>
              Redação Digital • Formiga, MG — Brasil.
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}
