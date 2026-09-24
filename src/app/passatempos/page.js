/**
 * ============================================================================
 * JORNAL ARCANJO — PÁGINA DE PASSATEMPOS & JOGOS MENTAIS
 * ============================================================================
 * Caderno editorial de entretenimento saudável e estímulo à neuroplasticidade.
 * Inspirado na clássica tradição dos quebra-cabeças dos grandes periódicos mundiais.
 * 
 * @module src/app/passatempos/page
 */

import PageTracker from '../components/PageTracker';
import GamesBlock from '../components/GamesBlock';

export const metadata = {
  title: 'Passatempos & Jogos da Mente | Jornal Arcanjo',
  description: 'Desafie seu raciocínio com Sudoku, Termo e Palavras Cruzadas diárias no Jornal Arcanjo sob a curadoria de Kaelara.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/passatempos',
  },
};

export default function PassatemposPage() {
  return (
    <main className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
      <PageTracker />
      
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', color: '#ea580c', letterSpacing: '1px', background: 'rgba(234, 88, 12, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
          Editoria de Lazer & Entretenimento Saudável
        </span>
        <h1 className="google-sans" style={{ fontSize: '32px', fontWeight: '800', margin: '16px 0 8px', color: 'var(--gn-text)' }}>
          Passatempos & Jogos Mentais
        </h1>
        <p style={{ color: 'var(--gn-text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Exercite seu raciocínio, amplie seu vocabulário e descontraia com os jogos interativos selecionados por nossa equipe editorial.
        </p>
      </div>

      <GamesBlock />

      <div style={{ marginTop: '36px', padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--gn-text)', marginBottom: '8px' }}>
          Por que exercitar o cérebro todos os dias?
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--gn-text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          Estudos na área de neurociência e saúde cognitiva apontam que passatempos como palavras cruzadas, termos e quebra-cabeças numéricos estimulam a neuroplasticidade, retardam o declínio cognitivo e auxiliam na redução dos níveis de estresse diário.
        </p>
      </div>
    </main>
  );
}
