import PageTracker from '../components/PageTracker';

export const metadata = {
  title: 'Quem Somos | Jornal Arcanjo',
  description: 'Conheça a história, a missão editorial e os valores que guiam o Jornal Arcanjo.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/sobre',
  },
};

export default function Sobre() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "NewsMediaOrganization",
      "name": "Jornal Arcanjo",
      "url": "https://jornalarcanjo.com.br",
      "logo": "https://jornalarcanjo.com.br/simbolo.png",
      "sameAs": [
        "https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb"
      ],
      "description": "Jornal independente dedicado a temas de sociedade, cultura, filosofia, espiritualidade, saúde, meteorologia e entretenimento com apuração rigorosa.",
      "foundingDate": "2026-09",
      "founder": [
        {
          "@type": "Person",
          "name": "Gustavo de Castro Bernardes Rosa",
          "jobTitle": "Fundador & Diretor Editorial"
        },
        {
          "@type": "Person",
          "name": "RuiWenceslau de Oliveira",
          "jobTitle": "Cofundador & Relações Institucionais"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Formiga",
        "addressRegion": "MG",
        "addressCountry": "BR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "gustavocastroinfo@gmail.com",
        "contactType": "editorial"
      }
    }
  };

  return (
    <main className="main-content" style={{ maxWidth: '840px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="page-title google-sans" style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center', color: 'var(--gn-text)', fontWeight: '800' }}>
        Quem Somos: Jornal Arcanjo
      </h1>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '14px', padding: '40px', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', fontSize: '17px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <h2 className="google-sans" style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '16px', marginTop: '0', fontWeight: '700' }}>
          Tradição, Sabedoria e o Resgate da Informação com Propósito
        </h2>
        <p style={{ marginBottom: '24px' }}>
          O <strong>Jornal Arcanjo</strong> nasce do compromisso de devolver ao leitor uma experiência jornalística acolhedora, rica em significado e profundamente conectada com o que é essencial à vida humana: a vida em comunidade, o cultivo do pensamento crítico, o cuidado com o corpo e a mente, o respeito às tradições de fé e o fascínio pelos mistérios da existência.
        </p>
        <p style={{ marginBottom: '40px' }}>
          Fundado por <strong>Gustavo de Castro Bernardes Rosa</strong> e <strong>RuiWenceslau de Oliveira</strong>, o Jornal Arcanjo surge para preencher uma lacuna urgente na internet brasileira: um espaço editorial limpo, elegante e confiável, onde os leitores encontram conteúdo formativo, reflexões culturais profundas e informações locais relevantes de Formiga (MG) e região.
        </p>

        <h2 className="google-sans" style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '16px', fontWeight: '700' }}>
          Nossos 7 Pilares Editoriais
        </h2>
        <p style={{ marginBottom: '20px' }}>
          O Jornal Arcanjo estrutura sua cobertura editorial em sete blocos permanentes, cada um conduzido por articulistas dedicados:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#0284c7' }}>1. Formiga em Foco & Sociedade</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>História regional, acontecimentos comunitários, cidadania e o cotidiano da nossa terra, sob a curadoria de Gustavo de Castro.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#7c3aed' }}>2. Cultura e Filosofia</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Reflexões existenciais, literatura, pedagogia e o cultivo da sensibilidade humana, conduzido por Daiene Meneses.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#059669' }}>3. Saúde e Bem-Estar</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Equilíbrio físico e mental, hábitos saudáveis e qualidade de vida integral com Beatriz Freire.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#b45309' }}>4. Religião & Tradições</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Espiritualidade, mensagens de fé, história das tradições sagradas e valores morais sob a assinatura de RuiWenceslau.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#0ea5e9' }}>5. Clima tempo</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Previsões meteorológicas, dinâmica das estações e alertas climáticos analisados por Kaelara.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#d97706' }}>6. Horóscopo & Tarô</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Leituras dos astros, simbologia dos arcanos do tarô e etnobotânica com Jhonatan d' Osogiyan.</p>
          </div>
          <div style={{ padding: '16px', borderRadius: '10px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)' }}>
            <strong style={{ color: '#ea580c' }}>7. Passatempos & Lazer</strong>
            <p style={{ margin: '6px 0 0', fontSize: '14px' }}>Enigmas, cruzadinhas e exercícios para manter a mente ativa e relaxada no dia a dia com Kaelara.</p>
          </div>
        </div>

        <h2 className="google-sans" style={{ fontSize: '24px', color: '#1e3a8a', marginBottom: '16px', fontWeight: '700' }}>
          Compromisso Ético e Verificação Rigorosa
        </h2>
        <ul style={{ marginBottom: '32px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <li>
            <strong>Apuração Factual:</strong> Cada informação compartilhada é checada junto a fontes seguras, documentos oficiais ou literatura de referência.
          </li>
          <li>
            <strong>Autoria e Transparência:</strong> Nossos artigos trazem identificação clara de seus autores, suas fontes e metodologias, respeitando a inteligência do leitor.
          </li>
          <li>
            <strong>Canal Aberto para Correções:</strong> Prezamos pela honestidade intelectual absoluta. Qualquer esclarecimento ou retificação é realizado com total visibilidade ao público.
          </li>
        </ul>

        <div style={{ padding: '24px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)', borderRadius: '12px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--gn-text)', marginBottom: '12px' }}>
            Expediente e Contato
          </h3>
          <p style={{ margin: '0 0 8px', fontSize: '15px' }}>
            <strong>Editor-Chefe:</strong> Gustavo de Castro Bernardes Rosa
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '15px' }}>
            <strong>Cofundador e Relações Institucionais:</strong> RuiWenceslau de Oliveira
          </p>
          <p style={{ margin: '0 0 8px', fontSize: '15px' }}>
            <strong>Redação Editorial:</strong> <a href="mailto:gustavocastroinfo@gmail.com" style={{ color: '#1e3a8a' }}>gustavocastroinfo@gmail.com</a>
          </p>
          <p style={{ margin: '0', fontSize: '15px' }}>
            <strong>Sede:</strong> Redação Digital — Formiga (MG), Brasil.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px', padding: '28px', background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(217, 119, 6, 0.05))', borderRadius: '12px', border: '1px solid rgba(30, 58, 138, 0.1)' }}>
          <p style={{ fontStyle: 'italic', fontSize: '19px', color: '#1e3a8a', fontWeight: '600', margin: 0 }}>
            &ldquo;A verdade, a sabedoria e a conexão humana são as luzes que iluminam as decisões do nosso presente.&rdquo;
          </p>
        </div>

      </div>
    </main>
  );
}
