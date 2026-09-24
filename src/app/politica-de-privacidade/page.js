import PageTracker from '../components/PageTracker';

export const metadata = {
  title: 'Política de Privacidade | Jornal Arcanjo',
  description: 'Política de Privacidade do portal Jornal Arcanjo em conformidade com a LGPD',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/politica-de-privacidade',
  },
};

export default function PoliticaPrivacidade() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": "Política de Privacidade | Jornal Arcanjo",
    "description": "Política de Privacidade do portal Jornal Arcanjo em conformidade com a LGPD",
    "url": "https://jornalarcanjo.com.br/politica-de-privacidade",
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
        Política de Privacidade
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--gn-text-secondary)', marginBottom: '32px' }}>
        <strong>Última atualização:</strong> 21 de agosto de 2026
      </p>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '16px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <p style={{ marginBottom: '32px', fontSize: '18px' }}>
          O <strong>Jornal Arcanjo</strong> tem o compromisso de proteger a sua privacidade e garantir a total transparência sobre o tratamento dos seus dados. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos as informações dos usuários ao navegar pelo nosso portal, em total conformidade com a legislação vigente, em especial a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          1. Coleta de Informações e Uso de Cookies
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para assegurar o funcionamento da plataforma e aprimorar a experiência do leitor, utilizamos cookies e tecnologias de rastreamento analítico.
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>Dados Técnicos e de Navegação:</strong> Coletamos automaticamente registros de acesso, como endereço IP anonimizado, tipo de navegador, sistema operacional, páginas acessadas, tempo de permanência e links clicados. Essas métricas têm finalidade puramente estatística e de otimização da performance do site.
          </li>
          <li>
            <strong>Gerenciamento de Cookies:</strong> Você tem total liberdade para configurar ou desativar os cookies diretamente nas preferências do seu navegador web. Contudo, algumas funcionalidades da plataforma podem ter seu desempenho afetado caso os cookies técnicos sejam bloqueados.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          2. Ausência de Publicidade Invasiva e Respeito aos Dados
        </h2>
        <p style={{ marginBottom: '16px' }}>
          O Jornal Arcanjo prioriza a experiência de leitura e a soberania dos dados de seus leitores. Não comercializamos dados pessoais com terceiros nem operamos redes invasivas de rastreamento comportamental. Toda a navegação é protegida por conexões criptografadas (HTTPS/TLS).
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          3. Links Externos e Conteúdos de Terceiros
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Nossos artigos contêm links diretos para fontes primárias, estudos acadêmicos, vídeos e documentos oficiais.
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>O Jornal Arcanjo não se responsabiliza pelas práticas de privacidade, termos de uso ou políticas de tratamento de dados praticadas por sites e plataformas externas.</li>
          <li>Recomendamos a leitura atenta das políticas de privacidade de qualquer endereço externo que você visitar a partir dos nossos links.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          4. Segurança da Informação e Armazenamento
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Implementamos padrões rígidos e protocolos modernos de segurança computacional para resguardar a integridade das conexões e dos dados:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Toda a comunicação entre o seu navegador e o nosso portal é criptografada de ponta a ponta via protocolo HTTPS (SSL/TLS).</li>
          <li>Não coletamos nem armazenamos dados pessoais sensíveis (como senhas bancárias, documentos governamentais ou registros confidenciais) sem a sua expressa e voluntária solicitação e autorização.</li>
          <li>Seus dados de navegação nunca serão vendidos, alugados ou comercializados com terceiros.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          5. Direitos do Titular de Dados (LGPD)
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Em consonância com a legislação brasileira de proteção de dados, você possui o direito de:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>Confirmar a existência de tratamento dos seus dados de navegação.</li>
          <li>Solicitar a correção de eventuais dados incompletos, inexatos ou desatualizados fornecidos em formulários de contato.</li>
          <li>Requerer a exclusão de dados pessoais fornecidos voluntariamente à nossa equipe editorial.</li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          6. Alterações desta Política
        </h2>
        <p style={{ marginBottom: '24px' }}>
          O Jornal Arcanjo reserva-se o direito de atualizar esta Política de Privacidade periodicamente para refletir melhorias técnicas, novas ferramentas editoriais ou adequações legislativas. Recomendamos a consulta regular desta página para ciência das eventuais revisões.
        </p>

        <h2 className="google-sans" style={{ fontSize: '20px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '32px' }}>
          7. Contato, Sede e Encarregado de Proteção de Dados
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para exercer seus direitos de privacidade garantidos pela LGPD, esclarecer dúvidas ou solicitar a atualização/remoção de dados, entre em contato diretamente com a administração e redação do portal:
        </p>
        <ul style={{ marginBottom: '24px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Portal:</strong> Jornal Arcanjo (https://jornalarcanjo.com.br)</li>
          <li><strong>Sede / Atendimento Editorial:</strong> Redação Digital — Formiga (MG), Brasil</li>
          <li><strong>E-mail de Contato & Privacidade:</strong> <a href="mailto:gustavocastroinfo@gmail.com" style={{ color: 'var(--gn-blue)', textDecoration: 'underline' }}>gustavocastroinfo@gmail.com</a></li>
          <li><strong>Responsável Administrativo:</strong> Daiene Maria de Meneses / Gustavo de Castro Bernardes Rosa</li>
        </ul>

      </div>
    </main>
  );
}
