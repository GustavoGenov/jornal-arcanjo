import PageTracker from '../components/PageTracker';

export const metadata = {
  title: 'Termos e Condições de Uso | Jornal Arcanjo',
  description: 'Termos e Condições de Uso do portal Jornal Arcanjo',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/termos',
  },
};

export default function TermosUso() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": "Termos e Condições de Uso | Jornal Arcanjo",
    "description": "Termos e Condições de Uso do portal Jornal Arcanjo",
    "url": "https://jornalarcanjo.com.br/termos",
    "dateModified": "2026-08-21T00:00:00-03:00",
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Jornal Arcanjo",
      "url": "https://jornalarcanjo.com.br"
    }
  };

  return (
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      {/* Schema.org DigitalDocument Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="page-title google-sans" style={{ fontSize: '36px', marginBottom: '16px', textAlign: 'center', color: 'var(--gn-text)' }}>
        Termos e Condições de Uso
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--gn-text-secondary)', marginBottom: '32px' }}>
        <strong>Última atualização:</strong> 21 de agosto de 2026
      </p>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '16px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <p style={{ marginBottom: '32px', fontSize: '18px' }}>
          Seja bem-vindo ao portal <strong>Jornal Arcanjo</strong>. Ao acessar, navegar ou interagir com os serviços e publicações disponibilizados em nossa plataforma, você declara ter lido, compreendido e concordado integralmente com os presentes Termos e Condições de Uso. Caso não concorde com qualquer disposição aqui descrita, solicitamos que não continue a navegação.
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          1. Propriedade Intelectual e Direitos Autorais
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Todo o acervo publicado no Jornal Arcanjo — incluindo reportagens, artigos de opinião, análises técnicas, textos, infográficos, imagens conceituais, códigos-fonte e logotipos — é protegido pelas leis de propriedade intelectual e direitos autorais (Lei nº 9.610/1998):
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>Autoria e Titularidade:</strong> Os conteúdos são de titularidade exclusiva de seus respectivos autores e criadores da equipe editorial (como Gustavo de Castro, Kaelara, Rui Wenceslau e demais colaboradores identificados).
          </li>
          <li>
            <strong>Uso Permitido:</strong> É permitida a citação de pequenos trechos para fins de estudo, debate ou divulgação jornalística, desde que com expressa atribuição de autoria e link direto (hiperlink dofollow) para a matéria original em nosso portal.
          </li>
          <li>
            <strong>Proibições Expressas:</strong> Fica expressamente vedada a reprodução total ou parcial, cópia não autorizada, raspagem de dados (web scraping) sem autorização, comercialização ou distribuição sem o devido consentimento por escrito dos autores.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          2. Interação e Ausência de Seção de Comentários
        </h2>
        <p style={{ marginBottom: '16px' }}>
          O Jornal Arcanjo prioriza a entrega de informações jornalísticas checadas, científicas e tecnológicas com o mais alto nível de precisão. Visando garantir a segurança jurídica da plataforma e a integridade do ambiente digital, <strong>o portal não disponibiliza espaço para comentários, fóruns públicos ou publicação de conteúdos diretamente por leitores e terceiros</strong> nas páginas das reportagens.
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Qualquer canal oficial de contato com a equipe editorial deve ser utilizado exclusivamente para sugestões de pauta, correções factuais, dúvidas legítimas ou propostas de parcerias institucionais.</li>
          <li>Tentativas de abuso, envio de spam ou mensagens ofensivas através dos nossos formulários ou e-mails de contato serão descartadas imediatamente, sem resposta.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          3. Links Externos, Publicidade e Ecossistema Integrado
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para enriquecer o conteúdo jornalístico e apoiar a sustentabilidade da plataforma, o portal integra diferentes tipos de conexões externas:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>Links para Fontes e Referências:</strong> Disponibilizamos links diretos para documentos oficiais, artigos acadêmicos e repositórios externos. Não nos responsabilizamos pela estabilidade, disponibilidade técnica ou políticas de privacidade de páginas de terceiros.
          </li>
          <li>
            <strong>Projetos do Nosso Ecossistema:</strong> O portal promove e mantém conexões com soluções do nosso ecossistema parceiro (como Kaelara Online, 7 Profissional, entre outros). Cada uma dessas plataformas possui termos de uso e políticas operacionais próprias, que devem ser observadas pelo usuário ao acessá-las.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          4. Isenção de Responsabilidade Técnica
        </h2>
        <p style={{ marginBottom: '16px' }}>
          A equipe do Jornal Arcanjo trabalha continuamente para manter a plataforma segura, rápida e estável:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Não garantimos que a operação do portal será ininterrupta ou 100% livre de falhas temporárias resultantes de indisponibilidade em provedores de nuvem, ataques cibernéticos externos ou falhas de infraestrutura de rede global.</li>
          <li>Os artigos de caráter tecnológico, educacional e científico têm o objetivo de informar e contextualizar a sociedade, não substituindo consultas técnicas ou jurídicas formais especializadas.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          5. Modificações dos Termos
        </h2>
        <p style={{ marginBottom: '24px' }}>
          O Jornal Arcanjo poderá, a qualquer momento e a seu exclusivo critério, revisar, alterar ou atualizar estes Termos de Uso para refletir mudanças tecnológicas, regulatórias ou na linha editorial. As alterações passam a vigorar imediatamente após a sua publicação nesta página, identificadas pela data da última atualização no topo do documento.
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          6. Legislação Aplicável e Foro
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Estes Termos e Condições de Uso são regidos e interpretados de acordo com a legislação da República Federativa do Brasil. Para a resolução de eventuais litígios decorrentes do uso desta plataforma, fica eleito o Foro da Comarca de Formiga, Estado de Minas Gerais, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
        </p>

      </div>
    </main>
  );
}
