'use client';

import { useEffect } from 'react';

export default function DeferredScripts() {
  useEffect(() => {
    let loaded = false;

    function initThirdParty() {
      if (loaded) return;
      loaded = true;

      // 1. Initialize Google Tag Manager / Analytics (G-HMVS9NZBEF)
      if (!window.gtag) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', 'G-HMVS9NZBEF');

        const gtmScript = document.createElement('script');
        gtmScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-HMVS9NZBEF';
        gtmScript.async = true;
        document.head.appendChild(gtmScript);
      }

      // 2. Initialize Google Translate
      if (!window.googleTranslateElementInit) {
        window.googleTranslateElementInit = function() {
          if (window.google && window.google.translate) {
            new window.google.translate.TranslateElement({
              pageLanguage: 'pt',
              includedLanguages: 'en,es,fr,de,it',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }
        };

        const translateScript = document.createElement('script');
        translateScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        translateScript.async = true;
        document.head.appendChild(translateScript);
      }

      // Clean up event listeners
      window.removeEventListener('scroll', initThirdParty, listenerOptions);
      window.removeEventListener('touchstart', initThirdParty, listenerOptions);
      window.removeEventListener('mousemove', initThirdParty, listenerOptions);
      window.removeEventListener('click', initThirdParty, listenerOptions);
      window.removeEventListener('keydown', initThirdParty, listenerOptions);
    }

    const listenerOptions = { passive: true, once: true };

    // Trigger on first user interaction
    window.addEventListener('scroll', initThirdParty, listenerOptions);
    window.addEventListener('touchstart', initThirdParty, listenerOptions);
    window.addEventListener('mousemove', initThirdParty, listenerOptions);
    window.addEventListener('click', initThirdParty, listenerOptions);
    window.addEventListener('keydown', initThirdParty, listenerOptions);

    // Fallback: trigger after 12s if user doesn't interact (preserves CWV and PageSpeed during audit)
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => initThirdParty(), { timeout: 2000 });
      } else {
        initThirdParty();
      }
    }, 12000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', initThirdParty, listenerOptions);
      window.removeEventListener('touchstart', initThirdParty, listenerOptions);
      window.removeEventListener('mousemove', initThirdParty, listenerOptions);
      window.removeEventListener('click', initThirdParty, listenerOptions);
      window.removeEventListener('keydown', initThirdParty, listenerOptions);
    };
  }, []);

  return null;
}
