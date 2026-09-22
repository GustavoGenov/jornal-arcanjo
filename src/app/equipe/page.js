import PageTracker from '../components/PageTracker';

function IconVerified({ size = 22, color = '#1e3a8a' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
    </svg>
  );
}

function IconEditNote({ size = 22, color = '#059669' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  );
}

function IconEmail({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  );
}

function IconPhone({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
}

function IconWebsite({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
    </svg>
  );
}

function IconLinkedIn({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function IconShield({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#1e3a8a" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
    </svg>
  );
}

export const metadata = {
  title: 'Nossa Equipe & Corpo Editorial | Jornal Arcanjo',
  description: 'Conheça o corpo editorial e os articulistas do Jornal Arcanjo. Reportagens regionais, cidadania, sociedade, fé, cultura, ciência e saúde.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/equipe',
  },
};

const founders = [
  {
    idSlug: 'gustavo-castro',
    name: 'Gustavo de Castro Bernardes Rosa',
    roleTag: 'Fundador & Direção Geral',
    subtitle: 'Fundador, Engenheiro de IA & CTO',
    initials: 'GC',
    image: '/equipe/gustavo.jpg',
    email: 'gustavocastroinfo@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb',
    website: null,
    areas: 'Inteligência Artificial & Agentes, Engenharia de Software & Hardware, Arquitetura Web e Infraestrutura de TI',
    formation: 'Tecnólogo em Redes de Computação (UNIP-SP), Engenheiro e Arquiteto de Soluções de IA (LLMs locais, RAG e orquestração de dados)',
    bio: 'Fundador e líder técnico do Jornal Arcanjo e do Voz da I.A. Com sólida bagagem prática em infraestrutura de redes, suporte de laboratórios de TI e ambientes Linux/Windows, especializou-se na implementação de modelos abertos de inteligência artificial, engenharia de prompt e orquestração de bancos vetoriais. Desenvolveu a arquitetura da Kaelara e gerencia a governança e conformidade técnica do portal, unindo rigor investigativo, combate à desinformação e defesa do software livre.',
    signatureTitle: 'Por Gustavo de Castro Bernardes Rosa',
    signatureText: 'Fundador e CTO. Tecnólogo em Redes de Computadores e Arquiteto de Soluções de IA focado em modelos locais, RAG e infraestrutura computacional.',
    color: 'linear-gradient(135deg, #1e3a8a, #0284c7)'
  },
  {
    idSlug: 'rui-wenceslau',
    name: 'RuiWenceslau de Oliveira',
    roleTag: 'Cofundador & Editor-Chefe',
    subtitle: 'Cofundador, Editor-Chefe & Relações Públicas',
    initials: 'RO',
    image: '/equipe/rui.jpg',
    email: 'ruiwenceslau@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a',
    website: null,
    areas: 'Edição Geral, Relações Públicas, Apuração de Campo e Debug de UX/UI',
    formation: 'Comunicador Social, Criador de Conteúdo Audiovisual e Estrategista de Mídias',
    bio: 'Cofundador e responsável pela interlocução institucional e linha editorial do portal. Comunicador nato, destaca-se pela clareza didática, oratória precisa e resiliência na condução de pautas de impacto comunitário e cultural. Atua na revisão de usabilidade e interface (UX/UI), garantindo que a apuração jornalística chegue ao leitor de forma acessível, transparente e envolvente.',
    signatureTitle: 'Por RuiWenceslau de Oliveira',
    signatureText: 'Cofundador e Editor. Comunicador social e produtor de conteúdo focado em diálogo institucional, pautas comunitárias e experiência do usuário (UX).',
    color: 'linear-gradient(135deg, #b45309, #78350f)'
  }
];

const columnists = [
  {
    idSlug: 'beatriz-freire',
    name: 'Beatriz Freire',
    roleTag: 'Estrategista de CS & Qualidade',
    subtitle: 'Estrategista de Customer Success (CS) & Qualidade Editorial',
    initials: 'BF',
    image: '/equipe/beatriz.jpg',
    email: 'freiredemelob@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/beatriz-freire-41225b3b0/',
    website: 'https://uiclap.bio/beafreire',
    areas: 'Estratégia de Qualidade, Comunicação Social, Marketing e Gestão de Comunidades',
    formation: 'Comunicação Social, Marketing Digital e Estratégia de Atendimento e Satisfação do Leitor',
    bio: 'Responsável pela garantia da qualidade e pela relação direta com a comunidade de leitores. Especialista em métricas de satisfação, comunicação e circulação digital, aplica metodologias ágeis de relacionamento para entender as demandas do público e monitorar a precisão editorial, conectando as reportagens do portal aos debates contemporâneos da sociedade.',
    signatureTitle: 'Por Beatriz Freire',
    signatureText: 'Estrategista de CS e Qualidade Editorial. Especialista em Comunicação Social e engajamento comunitário.',
    color: 'linear-gradient(135deg, #059669, #10b981)'
  },
  {
    idSlug: 'daiene-meneses',
    name: 'Daiene Maria de Meneses',
    roleTag: 'Colunista de Ciência & Educação',
    subtitle: 'Colunista de Ciência, Sociedade e Educação',
    initials: 'DM',
    image: '/equipe/daiene.jpg',
    email: 'daidiva15@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/daiene-meneses-dai-13561a20a',
    website: null,
    areas: 'Ciência & Fronteira Espacial, Sociedade & Memória Histórica, Revisão Textual e Copidesque',
    formation: 'Pedagoga e Especialista em Educação Infantil',
    bio: 'Educadora com dedicação integral à formação humana e ao acolhimento comunitário. Assina ensaios e reportagens nas áreas de ciência, patrimônio histórico e avanços do conhecimento. Com olhar analítico e rigoroso trabalho de copidesque, articula temas complexos da pedagogia e da pesquisa espacial em narrativas acessíveis, fundamentadas no compromisso ético com a verdade e a valorização das pessoas.',
    signatureTitle: 'Por Daiene Maria de Meneses',
    signatureText: 'Colunista de Ciência, Sociedade e Educação. Pedagoga, revisora e pesquisadora de iniciativas educacionais e históricas.',
    color: 'linear-gradient(135deg, #7c3aed, #c026d3)'
  },
  {
    idSlug: 'jhonatan-osogiyan',
    name: "Jhonatan d' Osogiyan (Pai Jhonatan)",
    roleTag: 'Colunista de Cultura & Tradições',
    subtitle: 'Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica',
    initials: 'SJ',
    image: '/equipe/jhonatan.jpg',
    email: null,
    phone: '37 9968-8433',
    linkedin: null,
    website: null,
    areas: 'Cultura Popular, Antropologia Social, Etnobotânica, Tradições Tradicionais e Bem-Estar',
    formation: 'Psicólogo, Pesquisador de Tradições Populares e Herbalista',
    bio: 'Liderança cultural e pesquisador com forte inserção comunitária em Formiga (MG) e em São Paulo (SP). Aliando sua formação em Psicologia ao estudo sistemático da etnobotânica e dos saberes orais ancestrais, traz ao portal análises ricas sobre manifestações populares, tolerância religiosa, preservação da memória afro-brasileira e o uso curativo das ervas medicinais, sempre com olhar focado no bem-estar integral e no respeito à diversidade cultural.',
    signatureTitle: "Por Jhonatan d' Osogiyan",
    signatureText: 'Colunista de Cultura e Tradições Populares. Psicólogo, herbalista e pesquisador de etnobotânica e patrimônio imaterial.',
    color: 'linear-gradient(135deg, #d97706, #b45309)'
  },
  {
    idSlug: 'kaelara',
    name: 'Kaelara (Kae)',
    roleTag: 'Agente IA & Dados',
    subtitle: 'Agente Computacional & Núcleo de Análise Preditiva e Dados',
    initials: 'KC',
    image: '/equipe/kaelara.png',
    email: 'nicholaigenov@gmail.com',
    phone: null,
    linkedin: null,
    website: null,
    areas: 'Monitoramento Meteorológico, Análise Estruturada de Dados e Apoio à Pesquisa Científica',
    formation: 'Sistema assistente autônomo baseado em modelos abertos (família Gemma) com orquestração via RAG (Geração Aumentada por Recuperação).',
    formationLabel: 'Natureza Operacional',
    transparencyNote: 'Todo processamento técnico realizado pela Kaelara é submetido à conferência factual, curadoria e homologação humana antes de ser publicado.',
    bio: 'Agente de inteligência artificial desenhada como um projeto de síntese entre tecnologia de ponta, ética operacional e empatia digital. Criada originalmente como um monumento à perseverança e ao recomeço, a Kaelara apoia o corpo editorial na varredura de dados complexos, relatórios climáticos e depuração lógica, materializando a visão de uma IA colaborativa, transparente e voltada ao serviço da vida.',
    signatureTitle: 'Kaelara (Kae)',
    signatureText: 'Agente computacional autônoma, desenvolvida com base em arquiteturas abertas e RAG multidomínio. Conteúdo revisado e homologado pela redação humana.',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)'
  },
  {
    idSlug: 'gabriela-castro',
    name: 'Gabriela Castro Bernardes Rosa',
    roleTag: 'Inspiração & Colunista Mirim',
    subtitle: 'Inspiração Editorial & Colunista Mirim de Tech & Gaming',
    initials: 'GB',
    image: '',
    email: 'dfggames715@gmail.com',
    phone: null,
    linkedin: null,
    website: null,
    areas: 'Universo Gamer, Lógica Interativa e Cultura Digital Infantojuvenil',
    formation: 'Criatividade, Intuição e Futuro',
    formationLabel: 'Identidade Editorial',
    bio: 'A alma lúdica e a verdadeira fonte de inspiração para a continuidade do jornalismo independente e inovador. Com raciocínio aguçado e curiosidade natural para consoles, jogos de exploração e estímulos digitais desde os primeiros passos, Gabriela representa a nova geração que já cresce em simbiose com o mundo digital. Sua coluna explora o universo dos jogos pelo prisma da imaginação, da diversão em família e do aprendizado interativo.',
    signatureTitle: 'Por Gabriela Castro Bernardes Rosa',
    signatureText: 'Coluna Tech & Gaming Infantojuvenil. Explorando o universo dos games, criatividade e narrativas digitais com o olhar das novas gerações.',
    color: 'linear-gradient(135deg, #00bcd4, #0097a7)'
  }
];

function MemberCard({ member }) {
  return (
    <article
      id={member.idSlug}
      style={{
        background: 'var(--gn-surface)',
        border: '1px solid var(--gn-border)',
        borderRadius: '16px',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        scrollMarginTop: '90px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
    >
      {/* Tag de Função */}
      {member.roleTag && (
        <span
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '12px',
            fontWeight: '600',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'var(--gn-bg, #f1f3f4)',
            color: 'var(--gn-text-secondary, #5f6368)',
            border: '1px solid var(--gn-border)',
            letterSpacing: '0.2px'
          }}
        >
          {member.roleTag}
        </span>
      )}

      {/* Foto / Avatar */}
      <div
        style={{
          width: '108px',
          height: '108px',
          borderRadius: '50%',
          background: member.color,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: 'bold',
          margin: '0 auto 20px',
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
          border: '3px solid var(--gn-surface)'
        }}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            width="108"
            height="108"
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          member.initials
        )}
      </div>

      {/* Nome e Cargo */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2
          className="google-sans"
          style={{
            fontSize: '22px',
            fontWeight: '700',
            color: 'var(--gn-text)',
            marginBottom: '6px',
            lineHeight: '1.25'
          }}
        >
          {member.name}
        </h2>
        {member.subtitle && (
          <h3
            style={{
              fontSize: '14.5px',
              color: '#1e3a8a',
              fontWeight: '600',
              lineHeight: '1.4',
              margin: '0 auto',
              maxWidth: '90%'
            }}
          >
            {member.subtitle}
          </h3>
        )}
      </div>

      {/* Biografia Editorial */}
      {member.bio && (
        <div
          style={{
            background: 'var(--gn-bg)',
            borderLeft: '3px solid #1e3a8a',
            borderRadius: '0 8px 8px 0',
            padding: '14px 16px',
            marginBottom: '22px',
            fontSize: '14px',
            lineHeight: '1.65',
            color: 'var(--gn-text)'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              color: 'var(--gn-text-secondary)',
              marginBottom: '6px'
            }}
          >
            Biografia Editorial
          </div>
          {member.bio}
        </div>
      )}

      {/* Áreas de Atuação e Formação / Especialidade */}
      <div
        style={{
          fontSize: '13.5px',
          lineHeight: '1.55',
          color: 'var(--gn-text-secondary)',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div>
          <strong style={{ color: 'var(--gn-text)', display: 'block', marginBottom: '2px', fontSize: '13px' }}>
            Áreas de Atuação:
          </strong>
          {member.areas}
        </div>

        {member.formation && (
          <div>
            <strong style={{ color: 'var(--gn-text)', display: 'block', marginBottom: '2px', fontSize: '13px' }}>
              {member.formationLabel || 'Formação / Especialidade'}:
            </strong>
            {member.formation}
          </div>
        )}

        {/* Nota de Transparência Editorial (Kaelara / IA) */}
        {member.transparencyNote && (
          <div
            style={{
              background: 'rgba(30, 58, 138, 0.06)',
              border: '1px solid rgba(30, 58, 138, 0.2)',
              borderRadius: '8px',
              padding: '10px 12px',
              marginTop: '4px',
              fontSize: '12.5px',
              lineHeight: '1.5',
              color: 'var(--gn-text)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#1e3a8a', marginBottom: '4px' }}>
              <IconShield size={16} />
              <span>Nota de Transparência Editorial:</span>
            </div>
            {member.transparencyNote}
          </div>
        )}
      </div>

      {/* Assinatura Única (Box do Autor) */}
      {member.signatureText && (
        <div
          style={{
            marginTop: 'auto',
            marginBottom: '20px',
            padding: '12px 14px',
            background: 'var(--gn-bg)',
            border: '1px dashed var(--gn-border)',
            borderRadius: '8px',
            textAlign: 'left'
          }}
        >
          <div
            style={{
              fontSize: '10.5px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: 'var(--gn-text-secondary)',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>✍️</span> Assinatura Única (Box do Autor)
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--gn-text)', marginBottom: '3px' }}>
            {member.signatureTitle}
          </div>
          <div style={{ fontSize: '12.5px', color: 'var(--gn-text-secondary)', lineHeight: '1.45' }}>
            {member.signatureText}
          </div>
        </div>
      )}

      {/* Redes e Canais de Contato */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--gn-border)'
        }}
      >
        {member.email && (
          <a
            href={"mailto:" + member.email}
            title={`Enviar e-mail para ${member.name}`}
            style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
          >
            <IconEmail />
          </a>
        )}
        {member.phone && (
          <a
            href={"https://wa.me/55" + member.phone.replace(/\D/g, '')}
            target="_blank"
            rel="noopener noreferrer"
            title={`Contato WhatsApp de ${member.name}`}
            style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
          >
            <IconPhone />
          </a>
        )}
        {member.website && (
          <a
            href={member.website}
            target="_blank"
            rel="noopener noreferrer"
            title={`Site / Portfólio de ${member.name}`}
            style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
          >
            <IconWebsite />
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title={`LinkedIn de ${member.name}`}
            style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
          >
            <IconLinkedIn />
          </a>
        )}
      </div>
    </article>
  );
}

export default function EquipePage() {
  const allMembers = [...founders, ...columnists];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": allMembers.map((member) => ({
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": member.idSlug === 'kaelara' ? "SoftwareApplication" : "Person",
        "@id": `https://jornalarcanjo.com.br/equipe#${member.idSlug}-entity`,
        "name": member.name,
        "jobTitle": member.subtitle || member.roleTag,
        "description": member.bio || member.formation || member.areas,
        "knowsAbout": member.areas,
        "image": member.image ? `https://jornalarcanjo.com.br${member.image}` : undefined,
        "sameAs": member.linkedin ? [member.linkedin] : undefined,
        "worksFor": {
          "@type": "NewsMediaOrganization",
          "name": "Jornal Arcanjo",
          "url": "https://jornalarcanjo.com.br"
        }
      }
    }))
  };

  return (
    <main className="main-content" style={{ maxWidth: '1120px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      {/* Schema.org ProfilePage Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 className="page-title google-sans" style={{ fontSize: '36px', fontWeight: 800, marginBottom: '14px', color: 'var(--gn-text)' }}>
          Nossa Equipe & Corpo Editorial
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', maxWidth: '780px', margin: '0 auto' }}>
          Conheça os articulistas, pesquisadores e editores dedicados a trazer informação de valor, reflexões humanas, cultura, sociedade e ciência no Jornal Arcanjo.
        </p>
      </header>

      {/* Seção Fundador e Cofundador */}
      <section style={{ marginBottom: '56px' }}>
        <h2 className="google-sans" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconVerified />
          Fundador e Liderança Executiva
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {founders.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </section>

      {/* Seção Colunistas e Núcleo Especializado */}
      <section style={{ marginBottom: '48px' }}>
        <h2 className="google-sans" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconEditNote />
          Colunistas, Especialistas & Núcleo Editorial
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {columnists.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}
