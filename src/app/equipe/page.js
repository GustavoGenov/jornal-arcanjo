import PageTracker from '../components/PageTracker';

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
          <a href={"mailto:" + member.email} title="Email" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">email</span>
          </a>
        )}
        {member.phone && (
          <a href={"https://wa.me/55" + member.phone.replace(/\D/g, '')} target="_blank" rel="noopener noreferrer" title="WhatsApp / Telefone" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">phone</span>
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer" title="Site / Perfil" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">language</span>
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--gn-text-secondary)', transition: 'color 0.2s' }}>
            <span className="material-icons-extended">link</span>
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
          <span className="material-icons-extended" style={{ color: '#1e3a8a' }}>verified</span>
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
          <span className="material-icons-extended" style={{ color: '#059669' }}>edit_note</span>
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
