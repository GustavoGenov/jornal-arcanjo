'use client';

/**
 * ============================================================================
 * JORNAL ARCANJO — THEME TOGGLE (ALTERNADOR DE TEMA CLARO / ESCURO)
 * ============================================================================
 * Botão acessível que permite ao leitor alternar entre a leitura diurna e noturna.
 * 
 * Engenharia de Hidratação:
 * - Utiliza `useSyncExternalStore` para prevenir "hydration mismatch" entre o servidor e o cliente,
 *   garantindo que o ícone correto seja renderizado imediatamente após a montagem sem layout shift.
 * 
 * @component
 */

import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

const emptySubscribe = () => () => {};

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Placeholder estável durante SSR para evitar Content Layout Shift (CLS)
  if (!mounted) return <div style={{ width: 40, height: 40 }} />;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="menu-btn"
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      aria-label="Alternar modo de cor"
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'var(--gn-search-bg, rgba(0,0,0,0.05))',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--gn-text, #333)',
        transition: 'all 0.2s'
      }}
    >
      {isDark ? (
        /* Ícone de Sol (Modo Claro Disponível) */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fbbf24' }}>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        /* Ícone de Lua (Modo Escuro Disponível) */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#475569' }}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}
