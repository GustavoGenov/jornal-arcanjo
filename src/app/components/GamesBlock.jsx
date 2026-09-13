'use client';

import { useState } from 'react';

export default function GamesBlock() {
  const [activeTab, setActiveTab] = useState('sudoku');
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsPlaying(false);
  };

  const renderCover = (title, icon, description, bgGradient) => (
    <div style={{ width: '100%', minHeight: '480px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: bgGradient, color: 'white', padding: '32px 20px', textAlign: 'center' }}>
      <span className="material-icons-extended" style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</span>
      <h4 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '10px' }}>{title}</h4>
      <p style={{ fontSize: '15px', marginBottom: '24px', maxWidth: '380px', opacity: 0.95, lineHeight: 1.5 }}>{description}</p>
      <button 
        onClick={() => setIsPlaying(true)} 
        style={{ padding: '12px 36px', fontSize: '16px', fontWeight: 'bold', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '24px', cursor: 'pointer', boxShadow: '0 6px 16px rgba(0,0,0,0.2)', transition: 'transform 0.2s' }}
        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      >
        Jogar Agora
      </button>
    </div>
  );

  return (
    <div id="passatempos" style={{ marginTop: '30px', border: '1px solid var(--gn-border)', borderRadius: '16px', background: 'var(--gn-surface)', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--gn-border)', display: 'flex', gap: '16px', background: 'var(--gn-search-bg)', flexWrap: 'wrap', alignItems: 'center' }}>
        <h3 className="google-sans" style={{ fontSize: '18px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px', marginRight: 'auto', fontWeight: '700' }}>
          <span className="material-icons-extended" style={{ color: '#ea580c' }}>extension</span>
          Passatempos & Jogos da Mente
        </h3>
        <button onClick={() => handleTabChange('sudoku')} style={{ background: 'none', border: 'none', color: activeTab === 'sudoku' ? '#1e3a8a' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'sudoku' ? '700' : '500', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'sudoku' ? '2px solid #1e3a8a' : '2px solid transparent', paddingBottom: '4px' }}>Sudoku</button>
        <button onClick={() => handleTabChange('termo')} style={{ background: 'none', border: 'none', color: activeTab === 'termo' ? '#1e3a8a' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'termo' ? '700' : '500', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'termo' ? '2px solid #1e3a8a' : '2px solid transparent', paddingBottom: '4px' }}>Termo</button>
        <button onClick={() => handleTabChange('cruzadas')} style={{ background: 'none', border: 'none', color: activeTab === 'cruzadas' ? '#1e3a8a' : 'var(--gn-text-secondary)', fontWeight: activeTab === 'cruzadas' ? '700' : '500', cursor: 'pointer', fontSize: '14px', borderBottom: activeTab === 'cruzadas' ? '2px solid #1e3a8a' : '2px solid transparent', paddingBottom: '4px' }}>Palavras Cruzadas</button>
      </div>

      <div style={{ padding: '0', background: '#fff', minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* SUDOKU */}
        {activeTab === 'sudoku' && (
          !isPlaying ? renderCover('Sudoku Clássico', 'grid_4x4', 'Exercite seu raciocínio lógico e concentração completando a grade com números de 1 a 9.', 'linear-gradient(135deg, #1e3a8a, #0284c7)') :
          <iframe src="https://widget.websudoku.com/?level=1" style={{ width: '100%', height: '520px', border: 'none' }} title="Sudoku Widget" />
        )}
        
        {/* TERMO */}
        {activeTab === 'termo' && (
          !isPlaying ? renderCover('Termo Diário', 'spellcheck', 'Descubra a palavra secreta de 5 letras em até 6 tentativas. Teste seu vocabulário diariamente!', 'linear-gradient(135deg, #059669, #10b981)') :
          <iframe src="https://term.ooo/" style={{ width: '100%', height: '600px', border: 'none' }} title="Termo" />
        )}

        {/* CRUZADAS */}
        {activeTab === 'cruzadas' && (
          !isPlaying ? renderCover('Palavras Cruzadas', 'grid_on', 'Desafie seus conhecimentos gerais, história e vocabulário com as cruzadas.', 'linear-gradient(135deg, #d97706, #b45309)') :
          <iframe src="https://crosswordlabs.com/embed/brasil" style={{ width: '100%', height: '600px', border: 'none' }} title="Palavras Cruzadas" />
        )}

      </div>
    </div>
  );
}
