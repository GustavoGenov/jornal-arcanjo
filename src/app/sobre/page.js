import PageTracker from '../components/PageTracker';

export const metadata = {
  title: 'Quem Somos | Voz da I.A',
  description: 'Conheça a história e o propósito do Voz da I.A',
  alternates: {
    canonical: 'https://vozdaia.com/sobre',
  },
};

export default function Sobre() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "NewsMediaOrganization",
      "name": "Voz da I.A",
      "url": "https://vozdaia.com",
      "logo": "https://vozdaia.com/logo-header.png",
      "sameAs": [
        "https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb"
      ],
      "description": "Portal jornalístico focado em combater fake news com informação precisa e apuração de alta tecnologia.",
      "foundingDate": "2026-06",
      "founder": [
        {
          "@type": "Person",
          "name": "Gustavo de Castro Bernardes Rosa",
          "jobTitle": "Fundador & CTO"
        },
        {
          "@type": "Person",
          "name": "RuiWenceslau de Oliveira",
          "jobTitle": "Cofundador & Editor"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Rua Maria Evaristo dos Santos, 330, Vila José Branco",
        "addressLocality": "Formiga",
        "addressRegion": "MG",
        "postalCode": "35572-272",
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
    <main className="main-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      {/* Schema.org AboutPage Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <h1 className="page-title google-sans" style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center', color: 'var(--gn-text)' }}>
        Quem Somos: A Voz da I.A
      </h1>
      
      <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: '18px', lineHeight: '1.8', color: 'var(--gn-text-secondary)' }}>
        
        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px', marginTop: '0' }}>
          Da Paixão pela Tecnologia ao Nascimento de um Propósito
        </h2>
        <p style={{ marginBottom: '24px' }}>
          Toda grande jornada nasce de quedas, aprendizados e, acima de tudo, da vontade inabalável de fazer a diferença. Rui Wenceslau e Gustavo de Castro compartilham uma trajetória de anos dedicada à criação de conteúdo na internet: desbravaram canais no YouTube, administraram páginas e construíram projetos em diversas redes sociais. Cada desafio enfrentado serviu como laboratório para moldar a maturidade, a resiliência e a visão técnica que hoje definem o nosso trabalho.
        </p>
        <p style={{ marginBottom: '40px' }}>
          Em junho de 2026, quando os caminhos de Rui e Gustavo se cruzaram, a sintonia foi imediata. Diante de dezenas de ideias e ambições compartilhadas, surgiu a decisão de construir uma iniciativa que integrasse tecnologia de ponta, verdade factual e impacto humano real. Dessa faísca nasceu o <strong>Voz da I.A</strong> — mais do que um jornal digital, um manifesto pelo jornalismo de alta precisão e pela democratização responsável da tecnologia.
        </p>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          A Nossa Missão: Resgatar a Verdade e Valorizar o Conhecimento
        </h2>
        <p style={{ marginBottom: '16px' }}>
          O Voz da I.A nasceu para responder a duas dores profundas da era digital:
        </p>
        <ul style={{ marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <strong>O Combate Rigoroso à Desinformação:</strong> Gustavo de Castro transformou sua indignação com o mar de fake news, boatos sensacionalistas e especulações infundadas sobre Inteligência Artificial em compromisso editorial. Enquanto a IA é frequentemente mal compreendida e instrumentalizada para gerar conteúdos superficiais, nós assumimos a vanguarda técnica para explicar a ciência, a arquitetura e os impactos reais dessa revolução sem mitos.
          </li>
          <li>
            <strong>A Proteção à Autoria e à Excelência:</strong> Rui Wenceslau vivenciou as consequências da apropriação indevida de produções intelectuais na internet, sem os devidos créditos e respeito aos criadores. Unindo forças, desenvolvemos uma plataforma própria, robusta e independente, focada em entregar análises profundas, checadas e com credibilidade inegociável.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          A Força da Nossa Equipe
        </h2>
        <p style={{ marginBottom: '16px' }}>
          A seriedade do projeto ecoou rapidamente. Atraídos pelo profissionalismo e pela transparência da nossa linha editorial, novos talentos integraram o ecossistema do Voz da I.A:
        </p>
        <p style={{ marginBottom: '40px' }}>
          Beatriz, Daiene, Jhonatan, Gabriela e Kaelara, ao lado de novos colaboradores que somam forças continuamente, enriquecem a publicação com suas especialidades em estratégias de qualidade e comunicação, design, redação, engenharia e análise crítica. Cada integrante assina blocos editoriais dedicados, garantindo pluralidade técnica e profundidade humana em cada pauta.
        </p>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          Dinâmica e Engenharia Operacional
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Para garantir alto desempenho e excelência técnica diária, a liderança executiva do jornal opera de forma integrada:
        </p>
        <ul style={{ marginBottom: '40px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <strong>Rui Wenceslau:</strong> Lidera a estratégia de divulgação global, produção de conteúdo especializado, processos de debug e melhoria contínua da experiência do usuário, além da condução de parcerias e representações externas.
          </li>
          <li>
            <strong>Gustavo de Castro:</strong> Comanda a arquitetura de código e engenharia da plataforma, a integração avançada de ferramentas computacionais, a geração de pautas estruturantes e a articulação institucional.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          Diretrizes Editoriais, Checagem de Fatos e Compromisso com a Verdade
        </h2>
        <p style={{ marginBottom: '16px' }}>
          Em estrita conformidade com os princípios do jornalismo ético e as diretrizes de combate à desinformação, o <strong>Voz da I.A</strong> adota políticas transparentes em todos os seus processos de produção:
        </p>
        <ul style={{ marginBottom: '32px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <li>
            <strong>Supervisão e Curadoria 100% Humana:</strong> Todas as reportagens, análises e artigos publicados no portal passam pela leitura crítica, apuração e validação de nossa equipe editorial e colunistas. Modelos computacionais e inteligência artificial atuam unicamente como ferramentas auxiliares de produtividade, organização de dados e apoio à pesquisa, nunca substituindo o discernimento e a responsabilidade de autores humanos.
          </li>
          <li>
            <strong>Checagem Rigorosa de Fontes:</strong> Priorizamos documentos primários, publicações acadêmicas com revisão por pares, comunicados oficiais de órgãos governamentais e instituições de referência tecnológica. Afirmações sem comprovação factual não são veiculadas.
          </li>
          <li>
            <strong>Política de Correções e Erratas:</strong> Mantemos o compromisso inegociável com a retificação imediata e transparente. Caso qualquer imprecisão factual seja identificada em nossos textos, ela é imediatamente corrigida com a devida nota explicativa transparente ao leitor.
          </li>
        </ul>

        <h2 className="google-sans" style={{ fontSize: '24px', color: 'var(--gn-blue)', marginBottom: '16px' }}>
          Horário de Funcionamento e Cobertura Editorial
        </h2>
        <div style={{ padding: '24px', background: 'var(--gn-bg)', border: '1px solid var(--gn-border)', borderRadius: '12px', marginBottom: '40px' }}>
          <p style={{ marginBottom: '16px', fontSize: '17px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--gn-text)' }}>
            <span className="material-icons-extended" style={{ color: 'var(--gn-blue)', marginTop: '4px' }}>schedule</span>
            <span>
              <strong>Expediente de Atendimento:</strong> Nosso expediente de atendimento ao público ocorre de acordo com a escala de trabalho dos editores, com atendimento preferencial nos dias de semana e suporte das 19:00 às 21:00.
            </span>
          </p>
          <p style={{ marginBottom: '16px', fontSize: '17px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--gn-text)' }}>
            <span className="material-icons-extended" style={{ color: '#34A853', marginTop: '4px' }}>verified</span>
            <span>
              <strong>Cobertura Contínua com Rigor:</strong> Nossa equipe monitora os avanços da ciência, IA, tecnologia e os acontecimentos da comunidade regional de Formiga (MG), assegurando que cada pauta atenda aos mais altos critérios de precisão antes de ir ao ar.
            </span>
          </p>
          <p style={{ marginBottom: '16px', fontSize: '17px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--gn-text)' }}>
            <span className="material-icons-extended" style={{ color: '#FBBC05', marginTop: '4px' }}>groups</span>
            <span>
              <strong>Corpo Editorial Independente:</strong> O jornal conta com um corpo dedicado de autores e articulistas que assinam seus artigos nominalmente, trazendo bagagem técnica, acadêmica e visão comunitária.
            </span>
          </p>
          <p style={{ marginBottom: '16px', fontSize: '17px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--gn-text)' }}>
            <span className="material-icons-extended" style={{ color: '#EA4335', marginTop: '4px' }}>mail</span>
            <span>
              <strong>Redação e Contato Editorial:</strong> Para sugestões de pauta, solicitação de correções, dúvidas ou parcerias institucionais, envie mensagem diretamente para a redação: <strong><a href="mailto:gustavocastroinfo@gmail.com" style={{ color: 'var(--gn-blue)', textDecoration: 'none' }}>gustavocastroinfo@gmail.com</a></strong>.
            </span>
          </p>
          <p style={{ margin: 0, fontSize: '17px', display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--gn-text)' }}>
            <span className="material-icons-extended" style={{ color: '#1a73e8', marginTop: '4px' }}>location_on</span>
            <span>
              <strong>Sede e Correspondência Editorial:</strong> Rua Maria Evaristo dos Santos, 330, Vila José Branco — Formiga (MG) — CEP 35572-272, Brasil.
            </span>
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px', padding: '32px', background: 'var(--gn-search-bg)', borderRadius: '8px' }}>
          <p style={{ fontStyle: 'italic', fontSize: '20px', color: 'var(--gn-text)', fontWeight: '500', margin: 0 }}>
            &ldquo;Não construímos apenas páginas; desenvolvemos pontes de conhecimento entre a inteligência humana e as fronteiras da inovação tecnológica.&rdquo;
          </p>
        </div>

      </div>
    </main>
  );
}
