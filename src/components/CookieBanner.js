'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

const emptySubscribe = (callback) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

export default function CookieBanner() {
  const [closed, setClosed] = useState(false);
  const consent = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return localStorage.getItem('vozdaia_cookie_consent');
      } catch (e) {
        return 'accepted';
      }
    },
    () => 'accepted'
  );

  const showBanner = !closed && !consent;

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('vozdaia_cookie_consent', 'accepted');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted'
        });
      }
    } catch (e) {}
    setClosed(true);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('vozdaia_cookie_consent', 'essential');
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied'
        });
      }
    } catch (e) {}
    setClosed(true);
  };

  if (!showBanner) return null;

  return (
    <aside
      aria-label="Consentimento de Cookies e Privacidade"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '720px',
        zIndex: 9999,
        background: 'var(--gn-surface, #ffffff)',
        color: 'var(--gn-text, #202124)',
        border: '1px solid var(--gn-border, #dadce0)',
        borderRadius: '16px',
        padding: '20px 24px',
        boxShadow: '0 12px 36px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        animation: 'fadeInUp 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <span
          className="material-icons-extended"
          style={{
            fontSize: '28px',
            color: 'var(--gn-blue, #1a73e8)',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          cookie
        </span>
        <div style={{ flex: 1, fontSize: '13.5px', lineHeight: '1.55', color: 'var(--gn-text-secondary, #5f6368)' }}>
          <strong style={{ color: 'var(--gn-text, #202124)', fontSize: '14.5px', display: 'block', marginBottom: '4px' }}>
            Privacidade e Cookies (LGPD)
          </strong>
          Utilizamos cookies e tecnologias semelhantes para personalizar conteúdo, veicular anúncios relevantes do Google AdSense e analisar o tráfego do portal, em total respeito à sua privacidade. Saiba mais em nossa{' '}
          <Link
            href="/politica-de-privacidade"
            style={{
              color: 'var(--gn-blue, #1a73e8)',
              fontWeight: '600',
              textDecoration: 'underline'
            }}
          >
            Política de Privacidade
          </Link>
          .
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <button
          onClick={handleAcceptEssential}
          type="button"
          style={{
            padding: '9px 16px',
            borderRadius: '999px',
            border: '1px solid var(--gn-border, #dadce0)',
            background: 'transparent',
            color: 'var(--gn-text, #202124)',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s ease'
          }}
        >
          Apenas Essenciais
        </button>

        <button
          onClick={handleAcceptAll}
          type="button"
          style={{
            padding: '9px 20px',
            borderRadius: '999px',
            border: 'none',
            background: 'var(--gn-blue, #1a73e8)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(26, 115, 232, 0.35)',
            transition: 'opacity 0.2s ease'
          }}
        >
          Aceitar Todos
        </button>
      </div>
    </aside>
  );
}
