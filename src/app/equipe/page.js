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

export const metadata = {
  title: 'Nossa Equipe | Jornal Arcanjo',
  description: 'Conheça a equipe editorial, colunistas e especialistas por trás do Jornal Arcanjo.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br/equipe',
  },
};

const founders = [
  {
    name: 'Gustavo de Castro Bernardes Rosa',
    roleTag: 'Fundador & Editor-Chefe',
    subtitle: 'Formiga em Foco & Sociedade',
    initials: 'GC',
    image: '/equipe/gustavo.jpg',
    email: 'gustavocastroinfo@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb',
    website: null,
    areas: 'Formiga em Foco & Sociedade, Cidadania, Memória Regional e Direção Editorial',
    formation: 'Tecnólogo em Redes de Computação, Engenharia de Software e Gestão de Mídia Digital',
    color: 'linear-gradient(135deg, #1e3a8a, #0284c7)'
  },
  {
    name: 'RuiWenceslau de Oliveira',
    roleTag: 'Cofundador & Colunista',
    subtitle: 'Religião & Tradições de Fé',
    initials: 'RO',
    image: '/equipe/rui.jpg',
    email: 'ruiwenceslau@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a',
    website: null,
    areas: 'Religião, Teologia Popular, Tradições de Fé, Relações Institucionais e Filosofia Moral',
    formation: 'Criador de conteúdo para mídias sociais e Youtuber',
    color: 'linear-gradient(135deg, #b45309, #78350f)'
  }
];

const columnists = [
  {
    name: 'Daiene Maria de Meneses',
    roleTag: 'Colunista Principal',
    subtitle: 'Cultura e Filosofia',
    initials: 'DM',
    image: '/equipe/daiene.jpg',
    email: 'daidiva15@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/daiene-meneses-dai-13561a20a',
    website: null,
    areas: 'Cultura, Filosofia, Educação, Pensamento Humanista, Literatura e Copidesque Editorial',
    formation: 'Pedagoga e Professora de Educação Infantil',
    color: 'linear-gradient(135deg, #7c3aed, #c026d3)'
  },
  {
    name: 'Beatriz Freire',
    roleTag: 'Colunista',
    subtitle: 'Saúde e Bem-Estar',
    initials: 'BF',
    image: '/equipe/beatriz.jpg',
    email: 'freiredemelob@gmail.com',
    phone: null,
    linkedin: 'https://www.linkedin.com/in/beatriz-freire-41225b3b0/',
    website: 'https://uiclap.bio/beafreire',
    areas: 'Saúde Preventiva, Bem-Estar Integral, Equilíbrio Emocional, Comunicação Social e Qualidade de Vida',
    formation: 'Comunicação Social, Marketing & Social Media e Estratégia de Customer Success & Qualidade',
    color: 'linear-gradient(135deg, #059669, #10b981)'
  },
  {
    name: 'Jhonatan d\' Osogiyan (ou Pai Jhonatan)',
    roleTag: 'Colunista',
    subtitle: 'Horóscopo & Tarô',
    initials: 'SJ',
    image: '/equipe/jhonatan.jpg',
    email: null,
    phone: '37 9968-8433',
    linkedin: null,
    website: null,
    areas: 'Astrologia Tradicional, Simbologia dos Arcanos do Tarô, Etnobotânica e Saberes Populares',
    formation: 'Psicologia, Pesquisador de Tradições Populares e Herbalista',
    color: 'linear-gradient(135deg, #d97706, #b45309)'
  },
  {
    name: 'Kaelara (Assistente Editorial)',
    roleTag: 'Dados & Análises',
    subtitle: 'Clima tempo & Passatempos',
    initials: 'KC',
    image: '/equipe/kaelara.png',
    email: 'nicholaigenov@gmail.com',
    phone: null,
    linkedin: null,
    website: null,
    areas: 'Monitoramento Meteorológico, Previsão do Tempo, Curadoria de Enigmas e Jogos Mentais',
    formation: 'Módulo de inteligência computacional para análise de modelos atmosféricos e geração de passatempos lógicos. Todas as informações publicadas passam por supervisão e validação humana da equipe editorial.',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)'
  }
];

function MemberCard({ member }) {
  return (
    <div style={{ background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '14px', padding: '32px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {member.roleTag && (
        <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', fontWeight: '600', padding: '4px 10px', borderRadius: '12px', background: 'var(--gn-bg, #f1f3f4)', color: 'var(--gn-text-secondary, #5f6368)', border: '1px solid var(--gn-border)' }}>
          {member.roleTag}
        </span>
      )}
      <div style={{ width: '108px', height: '108px', borderRadius: '50%', background: member.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 'bold', margin: '0 auto 20px', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
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
      <h2 className="google-sans" style={{ fontSize: '20px', marginBottom: member.subtitle ? '4px' : '8px', color: 'var(--gn-text)', fontWeight: '700' }}>
        {member.name}
      </h2>
      {member.subtitle && (
        <h3 style={{ fontSize: '13px', color: '#1e3a8a', marginBottom: '16px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {member.subtitle}
        </h3>
      )}
      
      <div style={{ color: 'var(--gn-text-secondary)', fontSize: '13.5px', lineHeight: '1.55', marginBottom: '24px', flexGrow: 1, textAlign: 'left' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong style={{ color: 'var(--gn-text)' }}>Coluna / Editoria:</strong><br />
          {member.areas}
        </div>
        {member.formation && (
          <div>
            <strong style={{ color: 'var(--gn-text)' }}>Biografia & Formação:</strong><br />
            {member.formation}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: 'auto' }}>
        {member.email && (
          <a href={"mailto:" + member.email} title="Email" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
            <IconEmail />
          </a>
        )}
        {member.phone && (
          <a href={"https://wa.me/55" + member.phone.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" title="WhatsApp / Telefone" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
            <IconPhone />
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer" title="Site / Perfil" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
            <IconWebsite />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
            <IconLinkedIn />
          </a>
        )}
      </div>
    </div>
  );
}

export default function EquipePage() {
  const allMembers = [...founders, ...columnists];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": allMembers.map((member) => ({
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": member.name.includes('Kaelara') ? "SoftwareApplication" : "Person",
        "name": member.name,
        "jobTitle": member.subtitle || member.roleTag,
        "description": member.formation || member.areas,
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
    <main className="main-content" style={{ maxWidth: '1040px', margin: '0 auto', padding: '40px 24px' }}>
      <PageTracker />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title google-sans" style={{ fontSize: '32px', marginBottom: '12px', fontWeight: '800' }}>
          Nossa Equipe Editorial
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
          Conheça os colunistas, articulistas e editores dedicados a trazer informação de valor, reflexões humanas, cultura e saúde no Jornal Arcanjo.
        </p>
      </div>

      {/* Seção Fundador e Cofundador */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className="google-sans" style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <IconVerified />
          Direção Editorial & Fundadores
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {founders.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>

      {/* Seção Colunistas Especialistas */}
      <div style={{ marginBottom: '48px' }}>
        <h2 className="google-sans" style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--gn-text)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
          <IconEditNote />
          Colunistas & Titulares das Editorias
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {columnists.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
