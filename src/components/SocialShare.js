'use client';
import { useState } from 'react';

export default function SocialShare({ url, title }) {
  const [copied, setCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodedUrl}`,
    threads: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
    bluesky: `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
  };

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    }
  };

  return (
    <div style={{ margin: '36px 0', padding: '24px 0', borderTop: '1px solid var(--gn-border)', borderBottom: '1px solid var(--gn-border)' }}>
      <h3 className="google-sans" style={{ fontSize: '16px', color: 'var(--gn-text)', marginBottom: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="material-icons-extended" style={{ fontSize: '20px', color: 'var(--gn-blue)' }}>share</span>
        Gostou da checagem? Compartilhe esta reportagem com seus amigos:
      </h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        {/* WhatsApp */}
        <a 
          href={shareLinks.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ ...buttonStyle, background: '#25D366' }}
          aria-label="Compartilhar no WhatsApp"
        >
          WhatsApp
        </a>

        {/* Threads */}
        <a 
          href={shareLinks.threads} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ ...buttonStyle, background: '#000000' }}
          aria-label="Compartilhar no Threads"
        >
          Threads
        </a>

        {/* Bluesky */}
        <a 
          href={shareLinks.bluesky} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ ...buttonStyle, background: '#1185fe' }}
          aria-label="Compartilhar no Bluesky"
        >
          Bluesky
        </a>

        {/* LinkedIn */}
        <a 
          href={shareLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ ...buttonStyle, background: '#0077B5' }}
          aria-label="Compartilhar no LinkedIn"
        >
          LinkedIn
        </a>

        {/* Facebook */}
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ ...buttonStyle, background: '#1877F2' }}
          aria-label="Compartilhar no Facebook"
        >
          Facebook
        </a>

        {/* Instagram / Copiar Link */}
        <button 
          onClick={handleCopyLink} 
          style={{ 
            ...buttonStyle, 
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', 
            border: 'none', 
            cursor: 'pointer' 
          }}
          aria-label="Copiar link para o Instagram"
        >
          {copied ? '✓ Link Copiado!' : 'Instagram (Copiar)'}
        </button>

        {/* Botão Genérico de Copiar Link */}
        <button 
          onClick={handleCopyLink} 
          style={{ 
            ...buttonStyle, 
            background: 'var(--gn-surface)', 
            color: 'var(--gn-text)', 
            border: '1px solid var(--gn-border)', 
            cursor: 'pointer' 
          }}
          aria-label="Copiar link da matéria"
        >
          <span className="material-icons-extended" style={{ fontSize: '16px', marginRight: '6px' }}>link</span>
          {copied ? 'Copiado!' : 'Copiar Link'}
        </button>
      </div>

      {copied && (
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#16a34a', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="material-icons-extended" style={{ fontSize: '16px' }}>check_circle</span>
          Link copiado para a área de transferência! Cole no seu WhatsApp, Stories do Instagram ou rede social favorita.
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  borderRadius: '20px',
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: '600',
  textDecoration: 'none',
  transition: 'transform 0.15s ease, opacity 0.15s ease',
};
