'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function LayoutShell({ categories, children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  // Se a rota for administrativa (/admin, /admin/login, /admin/editar/...), renderiza o conteúdo do painel diretamente sem duplicar o header e footer do jornal público
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {/* HEADER PRINCIPAL REESTRUTURADO EM 2 LINHAS COM PADRÃO DOS GRANDES JORNAIS */}
      <header className="header header-2tier">
        
        {/* LINHA 1: MARCA, BUSCA E AÇÕES */}
        <div className="header-top-row">
          <div className="header-inner header-top-inner">
            
            {/* Bloco 1: Identidade da Marca e Menu */}
            <div className="header-brand-block">
              <button 
                className="menu-btn header-menu-toggle" 
                onClick={toggleDrawer} 
                aria-label="Abrir menu de navegação"
                title="Menu Principal"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>

              <Link href="/" className="logo header-brand-link" onClick={closeDrawer}>
                <img 
                  src="/simbolo.png" 
                  alt="Símbolo Jornal Arcanjo" 
                  width="40"
                  height="40"
                  className="header-logo-symbol"
                  decoding="async"
                />
                <div className="header-brand-text-wrap">
                  <span className="header-brand-title">Jornal Arcanjo</span>
                  <span className="header-brand-subtitle">Sociedade, Cultura & Sabedoria</span>
                </div>
              </Link>
            </div>

            {/* Bloco Central: Busca Inteligente */}
            <div className="header-search-container">
              <form action="/busca" method="GET" className="header-search-form">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff', marginRight: '8px', flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  name="q" 
                  placeholder="Pesquisar notícias, cultura, sociedade, saúde..." 
                  required 
                  className="header-search-input" 
                />
              </form>
            </div>

            {/* Bloco 3: Utilitários & Ações (Tradutor, Tema, Newsletter) */}
            <div className="header-actions-block header-actions">
              <div id="google_translate_element" className="google-translate-wrapper" title="Traduzir página"></div>
              
              <div className="theme-toggle-wrap">
                <ThemeToggle />
              </div>
              
              <Link href="#newsletter" className="btn btn-header-action" title="Receba notícias diárias">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span className="btn-label">Newsletter</span>
              </Link>
            </div>

          </div>

          {/* Busca Dedicada em Dispositivos Móveis */}
          <div className="header-mobile-search-row">
            <form action="/busca" method="GET" className="header-search-form mobile-search-form">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ffffff', marginRight: '8px', flexShrink: 0 }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                name="q" 
                placeholder="Pesquisar no Jornal Arcanjo..." 
                required 
                className="header-search-input" 
              />
            </form>
          </div>
        </div>

        {/* LINHA 2: AS 7 EDITORIAS OFICIAIS EM BLOCOS ROLÁVEIS */}
        <div className="header-bottom-row">
          <div className="header-inner">
            <nav className="header-categories-nav" aria-label="Editorias do jornal">
              <Link href="/categoria/formiga-sociedade" className="nav-pill-item pill-highlight-green">
                <span>🏛️</span> <span>Formiga em Foco & Sociedade</span>
              </Link>
              <Link href="/categoria/cultura-filosofia" className="nav-pill-item">
                <span>📚</span> <span>Cultura e Filosofia</span>
              </Link>
              <Link href="/categoria/saude-bem-estar" className="nav-pill-item">
                <span>🌿</span> <span>Saúde e Bem-Estar</span>
              </Link>
              <Link href="/categoria/religiao" className="nav-pill-item">
                <span>🕊️</span> <span>Religião</span>
              </Link>
              <Link href="/clima" className="nav-pill-item">
                <span>⛅</span> <span>Clima tempo</span>
              </Link>
              <Link href="/horoscopo" className="nav-pill-item">
                <span>✨</span> <span>Horóscopo & Tarô</span>
              </Link>
              <Link href="/passatempos" className="nav-pill-item">
                <span>🧩</span> <span>Passatempos</span>
              </Link>
              <Link href="/equipe" className="nav-pill-item">
                <span>👥</span> <span>Nossa Equipe</span>
              </Link>
              <Link href="/sobre" className="nav-pill-item">
                <span>ℹ️</span> <span>Quem Somos</span>
              </Link>
            </nav>
          </div>
        </div>

      </header>

      {/* OVERLAY E MOBILE DRAWER */}
      <div 
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} 
        onClick={closeDrawer}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 999,
          display: drawerOpen ? 'block' : 'none'
        }}
      ></div>

      <aside 
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: drawerOpen ? 0 : '-320px',
          width: '300px',
          height: '100%',
          background: 'var(--card)',
          zIndex: 1000,
          transition: 'left 0.3s ease',
          boxShadow: '2px 0 12px rgba(0,0,0,0.2)',
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" className="logo" onClick={closeDrawer} style={{ color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/simbolo.png" 
              alt="Símbolo Jornal Arcanjo" 
              width="34" 
              height="34" 
              loading="lazy"
              decoding="async"
              style={{ width: '34px', height: '34px', borderRadius: '8px', objectFit: 'cover' }} 
            />
            <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>Jornal Arcanjo</span>
          </Link>
          <button onClick={closeDrawer} aria-label="Fechar menu" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
            Editorias Oficiais
          </span>
          <Link href="/" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            📰 Início / Capa
          </Link>
          <Link href="/categoria/formiga-sociedade" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🏛️ Formiga em Foco & Sociedade
          </Link>
          <Link href="/categoria/cultura-filosofia" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            📚 Cultura e Filosofia
          </Link>
          <Link href="/categoria/saude-bem-estar" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🌿 Saúde e Bem-Estar
          </Link>
          <Link href="/categoria/religiao" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🕊️ Religião
          </Link>
          <Link href="/clima" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            ⛅ Clima tempo
          </Link>
          <Link href="/horoscopo" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            ✨ Horóscopo & Tarô
          </Link>
          <Link href="/passatempos" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '8px 0', fontWeight: 500 }}>
            🧩 Passatempos
          </Link>
        </div>

        <hr style={{ borderColor: 'var(--border)', margin: '8px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.5px' }}>
            Institucional
          </span>
          <Link href="/sobre" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Quem Somos
          </Link>
          <Link href="/equipe" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Nossa Equipe Editorial
          </Link>
          <Link href="/politica-de-privacidade" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Política de Privacidade
          </Link>
          <Link href="/termos" onClick={closeDrawer} style={{ color: 'var(--text)', padding: '6px 0', fontSize: '14px' }}>
            Termos de Uso
          </Link>
        </div>
      </aside>

      {/* APP WRAPPER */}
      <div className="app-wrapper">
        <div className="main-area-wrapper">
          {children}

          {/* FOOTER MULTI-COLUNAS (COMPLIANCE GOOGLE ADSENSE) */}
          <footer className="footer">
            <div className="footer-inner">
              {/* Coluna 1: Sobre o Jornal */}
              <div>
                <div className="logo" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src="/simbolo.png" 
                    alt="Símbolo Jornal Arcanjo" 
                    width="38" 
                    height="38" 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }} 
                  />
                  <span>Jornal Arcanjo</span>
                </div>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8' }}>
                  Jornal digital independente sediado em Formiga (MG) e com alcance nacional. 
                  Dedicado a celebrar a cultura, a reflexão filosófica, a saúde integral, a espiritualidade, a história comunitária e os fatos comprovados.
                </p>
              </div>

              {/* Coluna 2: Categorias */}
              <div>
                <h4>Editorias</h4>
                <ul>
                  <li><Link href="/categoria/formiga-sociedade">Formiga em Foco & Sociedade</Link></li>
                  <li><Link href="/categoria/cultura-filosofia">Cultura e Filosofia</Link></li>
                  <li><Link href="/categoria/saude-bem-estar">Saúde e Bem-Estar</Link></li>
                  <li><Link href="/categoria/religiao">Religião</Link></li>
                  <li><Link href="/clima">Clima tempo</Link></li>
                  <li><Link href="/horoscopo">Horóscopo & Tarô</Link></li>
                  <li><Link href="/passatempos">Passatempos</Link></li>
                </ul>
              </div>

              {/* Coluna 3: Destaques & Serviços */}
              <div>
                <h4>Serviços & Lazer</h4>
                <ul>
                  <li><Link href="/clima">Previsão do Tempo</Link></li>
                  <li><Link href="/horoscopo">Horóscopo & Tarô do Dia</Link></li>
                  <li><Link href="/passatempos">Passatempos & Jogos</Link></li>
                  <li><Link href="/categoria/formiga-sociedade">Memória Regional</Link></li>
                </ul>
              </div>

              {/* Coluna 4: Institucional */}
              <div>
                <h4>Institucional</h4>
                <ul>
                  <li><Link href="/sobre">Quem Somos</Link></li>
                  <li><Link href="/equipe">Nossa Equipe Editorial</Link></li>
                  <li><Link href="/#newsletter">Assinar Newsletter</Link></li>
                  <li><Link href="/politica-de-privacidade">Política de Privacidade</Link></li>
                  <li><Link href="/termos">Termos de Uso</Link></li>
                  <li style={{ marginTop: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                    ✉️ <a href="mailto:gustavocastroinfo@gmail.com" style={{ color: 'var(--accent)' }}>gustavocastroinfo@gmail.com</a>
                  </li>
                  <li style={{ marginTop: '4px', fontSize: '0.8rem', color: '#94a3b8' }}>
                    📍 Rua Maria Evaristo dos Santos, 330 — Formiga (MG)
                  </li>
                </ul>
              </div>
            </div>

            <div className="copyright">
              © {new Date().getFullYear()} Jornal Arcanjo — Formiga, Minas Gerais. Todos os direitos reservados.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
