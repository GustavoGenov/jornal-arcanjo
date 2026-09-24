/**
 * ============================================================================
 * JORNAL ARCANJO — PÁGINA DE ARTIGO INDIVIDUAL (LONG-FORM ARTICLE)
 * ============================================================================
 * Renderização dinâmica e estática (SSG/ISR) de reportagens e ensaios.
 * 
 * Funcionalidades Críticas:
 * 1. Conformidade E-E-A-T: Mapeamento de perfis completos de autores verificados.
 * 2. Metadados SEO Avançados: OpenGraph 1200x630, Twitter Cards e Canonical URLs.
 * 3. Schema.org JSON-LD: Marcação NewsArticle para Google Notícias e motores de busca.
 * 4. Tipografia de Leitura Contínua: Serif Merriweather com espaçamento calculado.
 * 5. Seção de Fontes Verificadas e Disclaimers de Transparência Jornalística.
 * 
 * @module src/app/artigo/[slug]/page
 */

import { supabase } from '@/lib/supabase';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import SocialShare from '@/components/SocialShare';
import PageTracker from '../../components/PageTracker';
import { getOptimizedImageUrl, getImageSrcSet } from '@/lib/imageHelper';

export const revalidate = 60;

/**
 * Catálogo de Autores e Articulistas Oficiais (E-E-A-T)
 * Mapeia nomes às credenciais, foto oficial e perfis de autoridade.
 */
const AUTHORS_META = {
  "Gustavo de Castro Bernardes Rosa": {
    initials: "GC",
    role: "Fundador, Engenheiro de IA & CTO",
    img: "/equipe/gustavo.jpg",
    bio: "Fundador e CTO. Tecnólogo em Redes de Computadores e Arquiteto de Soluções de IA focado em modelos locais, RAG e infraestrutura computacional.",
    slug: "gustavo-castro",
    linkedin: "https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb"
  },
  "Gustavo de Castro": {
    initials: "GC",
    role: "Fundador, Engenheiro de IA & CTO",
    img: "/equipe/gustavo.jpg",
    bio: "Fundador e CTO. Tecnólogo em Redes de Computadores e Arquiteto de Soluções de IA focado em modelos locais, RAG e infraestrutura computacional.",
    slug: "gustavo-castro",
    linkedin: "https://www.linkedin.com/in/gustavo-castro-bernardes-rosa-24a827bb"
  },
  "RuiWenceslau de Oliveira": {
    initials: "RO",
    role: "Cofundador, Editor-Chefe & Relações Públicas",
    img: "/equipe/rui.jpg",
    bio: "Cofundador e Editor. Comunicador social e produtor de conteúdo focado em diálogo institucional, pautas comunitárias e experiência do usuário (UX).",
    slug: "rui-wenceslau",
    linkedin: "https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a"
  },
  "Rui Wenceslau": {
    initials: "RO",
    role: "Cofundador, Editor-Chefe & Relações Públicas",
    img: "/equipe/rui.jpg",
    bio: "Cofundador e Editor. Comunicador social e produtor de conteúdo focado em diálogo institucional, pautas comunitárias e experiência do usuário (UX).",
    slug: "rui-wenceslau",
    linkedin: "https://www.linkedin.com/in/ruiwenceslau-de-oliveira-ab08bb42a"
  },
  "Beatriz Freire": {
    initials: "BF",
    role: "Estrategista de Customer Success (CS) & Qualidade Editorial",
    img: "/equipe/beatriz.jpg",
    bio: "Estrategista de CS e Qualidade Editorial. Especialista em Comunicação Social e engajamento comunitário.",
    slug: "beatriz-freire",
    linkedin: "https://www.linkedin.com/in/beatriz-freire-41225b3b0/"
  },
  "Daiene Maria de Meneses": {
    initials: "DM",
    role: "Colunista de Ciência, Sociedade e Educação",
    img: "/equipe/daiene.jpg",
    bio: "Colunista de Ciência, Sociedade e Educação. Pedagoga, revisora e pesquisadora de iniciativas educacionais e históricas.",
    slug: "daiene-meneses",
    linkedin: "https://www.linkedin.com/in/daiene-meneses-dai-13561a20a"
  },
  "Daiene Meneses": {
    initials: "DM",
    role: "Colunista de Ciência, Sociedade e Educação",
    img: "/equipe/daiene.jpg",
    bio: "Colunista de Ciência, Sociedade e Educação. Pedagoga, revisora e pesquisadora de iniciativas educacionais e históricas.",
    slug: "daiene-meneses",
    linkedin: "https://www.linkedin.com/in/daiene-meneses-dai-13561a20a"
  },
  "Jhonatan d' Osogiyan (Pai Jhonatan)": {
    initials: "SJ",
    role: "Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica",
    img: "/equipe/jhonatan.jpg",
    bio: "Colunista de Cultura e Tradições Populares. Psicólogo, herbalista e pesquisador de etnobotânica e patrimônio imaterial.",
    slug: "jhonatan-osogiyan"
  },
  "Jhonatan d' Osogiyan (ou Pai Jhonatan)": {
    initials: "SJ",
    role: "Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica",
    img: "/equipe/jhonatan.jpg",
    bio: "Colunista de Cultura e Tradições Populares. Psicólogo, herbalista e pesquisador de etnobotânica e patrimônio imaterial.",
    slug: "jhonatan-osogiyan"
  },
  "Jhonatan d' Osogiyan": {
    initials: "SJ",
    role: "Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica",
    img: "/equipe/jhonatan.jpg",
    bio: "Colunista de Cultura e Tradições Populares. Psicólogo, herbalista e pesquisador de etnobotânica e patrimônio imaterial.",
    slug: "jhonatan-osogiyan"
  },
  "Pai Jhonatan": {
    initials: "SJ",
    role: "Colunista de Cultura, Tradições Afro-Brasileiras e Etnobotânica",
    img: "/equipe/jhonatan.jpg",
    bio: "Colunista de Cultura e Tradições Populares. Psicólogo, herbalista e pesquisador de etnobotânica e patrimônio imaterial.",
    slug: "jhonatan-osogiyan"
  },
  "Kaelara (Kae)": {
    initials: "KC",
    role: "Agente Computacional & Núcleo de Análise Preditiva e Dados",
    img: "/equipe/kaelara.png",
    bio: "Agente computacional autônoma, desenvolvida com base em arquiteturas abertas e RAG multidomínio. Conteúdo revisado e homologado pela redação humana.",
    slug: "kaelara"
  },
  "Kaelara (Agente de IA Autônomo)": {
    initials: "KC",
    role: "Agente Computacional & Núcleo de Análise Preditiva e Dados",
    img: "/equipe/kaelara.png",
    bio: "Agente computacional autônoma, desenvolvida com base em arquiteturas abertas e RAG multidomínio. Conteúdo revisado e homologado pela redação humana.",
    slug: "kaelara"
  },
  "Kaelara": {
    initials: "KC",
    role: "Agente Computacional & Núcleo de Análise Preditiva e Dados",
    img: "/equipe/kaelara.png",
    bio: "Agente computacional autônoma, desenvolvida com base em arquiteturas abertas e RAG multidomínio. Conteúdo revisado e homologado pela redação humana.",
    slug: "kaelara"
  },
  "Gabriela Castro Bernardes Rosa": {
    initials: "GB",
    role: "Inspiração Editorial & Colunista Mirim de Tech & Gaming",
    img: null,
    bio: "Coluna Tech & Gaming Infantojuvenil. Explorando o universo dos games, criatividade e narrativas digitais com o olhar das novas gerações.",
    slug: "gabriela-castro"
  },
  "Gabriela Castro": {
    initials: "GB",
    role: "Inspiração Editorial & Colunista Mirim de Tech & Gaming",
    img: null,
    bio: "Coluna Tech & Gaming Infantojuvenil. Explorando o universo dos games, criatividade e narrativas digitais com o olhar das novas gerações.",
    slug: "gabriela-castro"
  }
};

export async function generateStaticParams() {
  const { data: articles } = await supabase
    .from('articles')
    .select('slug')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(30);

  return (articles || []).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('title, summary, image_url, meta_title, meta_description, author_name, image_alt, created_at, updated_at, categories(name)')
    .eq('slug', slug)
    .single();

  if (!article) return { title: 'Jornal Arcanjo - Notícia não encontrada' };

  const rawTitle = (article.meta_title || article.title || '').replace(/&nbsp;|\u00a0/g, ' ').trim();
  const metaDesc = (article.meta_description || article.summary || '').replace(/&nbsp;|\u00a0/g, ' ').trim();
  const articleUrl = `https://jornalarcanjo.com.br/artigo/${slug}`;

  let ogImageUrl = article.image_url;
  if (ogImageUrl && ogImageUrl.startsWith('/')) {
    ogImageUrl = `https://jornalarcanjo.com.br${ogImageUrl}`;
  }

  return {
    title: `${rawTitle} | Jornal Arcanjo`,
    description: metaDesc,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: `${rawTitle} | Jornal Arcanjo`,
      description: metaDesc,
      url: articleUrl,
      siteName: 'Jornal Arcanjo',
      locale: 'pt_BR',
      images: ogImageUrl ? [{ url: ogImageUrl, alt: article.image_alt || rawTitle, width: 1200, height: 630 }] : [{ url: 'https://jornalarcanjo.com.br/simbolo.png', alt: 'Jornal Arcanjo', width: 512, height: 512 }],
      type: 'article',
      publishedTime: article.created_at,
      modifiedTime: article.updated_at || article.created_at,
      section: article.categories?.name || 'Notícias',
      authors: [article.author_name || 'Jornal Arcanjo']
    },
    twitter: {
      card: 'summary_large_image',
      title: `${rawTitle} | Jornal Arcanjo`,
      description: metaDesc,
      images: ogImageUrl ? [ogImageUrl] : ['https://jornalarcanjo.com.br/simbolo.png'],
    }
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('articles')
    .select('*, categories(name, slug, color_code)')
    .eq('slug', slug)
    .single();

  if (!article) {
    redirect('/');
  }

  const cleanContent = article.content 
    ? article.content
        .replace(/&nbsp;|\u00a0/g, ' ')
        .replace(/https:\/\/nisbarqzsjqylsvnyxrm\.supabase\.co\/storage\/v1\/object\/public\/images\/[^\s"'>]+/g, (match) => `/api/img?url=${encodeURIComponent(match)}`)
    : '';
  const cleanTitle = article.title ? article.title.replace(/&nbsp;|\u00a0/g, ' ') : '';
  const cleanSummary = article.summary ? article.summary.replace(/&nbsp;|\u00a0/g, ' ') : '';
  const optimizedImageUrl = getOptimizedImageUrl(article.image_url);
  
  const authorData = AUTHORS_META[article.author_name] || AUTHORS_META["Gustavo de Castro Bernardes Rosa"];
  const pubDate = new Date(article.created_at);
  const modDate = article.updated_at ? new Date(article.updated_at) : pubDate;
  const articleUrl = `https://jornalarcanjo.com.br/artigo/${article.slug}`;

  let absoluteImageUrl = article.image_url;
  if (absoluteImageUrl && absoluteImageUrl.startsWith('/')) {
    absoluteImageUrl = `https://jornalarcanjo.com.br${absoluteImageUrl}`;
  }

  // Schema.org JSON-LD para SEO (NewsArticle em conformidade com Google News)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": articleUrl
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": articleUrl
        },
        "headline": (article.meta_title || cleanTitle).substring(0, 110),
        "description": cleanSummary,
        "image": absoluteImageUrl ? [absoluteImageUrl] : ["https://jornalarcanjo.com.br/simbolo.png"],
        "datePublished": pubDate.toISOString(),
        "dateModified": modDate.toISOString(),
        "inLanguage": "pt-BR",
        "isAccessibleForFree": true,
        "articleSection": article.categories?.name || "Notícias",
        "wordCount": cleanContent.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length,
        "author": [
          {
            "@type": "Person",
            "name": article.author_name || 'Jornal Arcanjo',
            "jobTitle": authorData?.role || "Jornalista e Articulista",
            "url": `https://jornalarcanjo.com.br/equipe#${authorData?.slug || 'gustavo-castro'}`,
            ...(authorData?.linkedin ? { "sameAs": [authorData.linkedin] } : {})
          }
        ],
        "publisher": {
          "@type": "NewsMediaOrganization",
          "@id": "https://jornalarcanjo.com.br/#organization",
          "name": "Jornal Arcanjo",
          "url": "https://jornalarcanjo.com.br",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jornalarcanjo.com.br/simbolo.png",
            "width": 512,
            "height": 512
          }
        },
        "articleBody": cleanContent.replace(/<[^>]*>/g, '').trim().substring(0, 2000)
      }
    ]
  };

  return (
    <>
      <PageTracker articleId={article.id} categoryId={article.category_id} />
      
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="main-content article-page-main" style={{ maxWidth: '880px', margin: '0 auto', width: '100%', overflowX: 'hidden', padding: '24px 16px' }}>
        
        {/* Navegação e Categoria */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--gn-text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--gn-blue)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
            <span className="material-icons-extended" style={{ fontSize: '16px' }}>arrow_back</span> Início
          </Link>
          <span>/</span>
          {article.categories && (
            <Link 
              href={`/categoria/${article.categories.slug}`}
              style={{ 
                color: article.categories.color_code || 'var(--gn-blue)', 
                fontWeight: '600',
                textDecoration: 'none',
                textTransform: 'uppercase',
                fontSize: '12px',
                letterSpacing: '0.5px'
              }}
            >
              {article.categories.name}
            </Link>
          )}
        </div>

        {/* Título Principal (H1 Único) */}
        <h1 className="article-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', lineHeight: '1.25', color: 'var(--gn-text)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          {cleanTitle}
        </h1>

        {/* Resumo / Subtítulo */}
        {cleanSummary && (
          <p className="article-summary" style={{ fontSize: '18px', lineHeight: '1.6', color: 'var(--gn-text-secondary)', marginBottom: '24px' }}>
            {cleanSummary}
          </p>
        )}

        {/* Metadados: Autor e Data */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '24px', marginBottom: '24px', borderBottom: '1px solid var(--gn-border)' }}>
          {authorData.img ? (
            <img src={authorData.img} alt={article.author_name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)', fontSize: '16px', fontWeight: '500' }}>
              {authorData.initials}
            </div>
          )}
          <div>
            <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gn-text)' }}>
              <Link href={`/equipe#${authorData?.slug || 'gustavo-castro'}`} style={{ color: 'inherit', textDecoration: 'none' }} title={`Conheça a trajetória de ${article.author_name || article.author}`}>
                {article.author_name || article.author}
              </Link>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--gn-text-secondary)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span>{authorData.role}</span>
              <span>•</span>
              <span>
                Publicado em {pubDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>
        </div>

        {/* Imagem de Capa e Créditos (Otimizado com Edge CDN Proxy, LCP Eager e Zero CLS) */}
        {optimizedImageUrl && (
          <>
            <link 
              rel="preload" 
              as="image" 
              href={getOptimizedImageUrl(article.image_url, 800)} 
              imageSrcSet={getImageSrcSet(article.image_url)} 
              imageSizes="(max-width: 600px) 100vw, 800px" 
              fetchPriority="high" 
            />
            <figure style={{ margin: '0 0 40px 0' }}>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                minHeight: '280px',
                maxHeight: '540px', 
                overflow: 'hidden', 
                borderRadius: '16px', 
                background: 'radial-gradient(circle at center, #1e293b 0%, #090d16 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                border: '1px solid var(--gn-border)'
              }}>
                <div 
                  className="img-ambient-backdrop" 
                  style={{ 
                    position: 'absolute',
                    inset: '-20px',
                    backgroundImage: `url(${getOptimizedImageUrl(article.image_url, 800)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(24px) brightness(0.48)',
                    transform: 'scale(1.2)',
                    opacity: 0.65,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }} 
                />
                <img 
                  src={getOptimizedImageUrl(article.image_url, 800)} 
                  srcSet={getImageSrcSet(article.image_url)}
                  sizes="(max-width: 880px) 100vw, 880px"
                  alt={article.image_alt || cleanTitle} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  style={{ 
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '100%', 
                    maxHeight: '540px', 
                    width: 'auto', 
                    height: 'auto', 
                    objectFit: 'contain', 
                    display: 'block',
                    margin: '0 auto'
                  }} 
                />
              </div>
              {article.image_credits && (
                <figcaption style={{ fontSize: '13px', color: 'var(--gn-text-secondary)', textAlign: 'right', marginTop: '8px', fontStyle: 'italic' }}>
                  Crédito: {article.image_credits}
                </figcaption>
              )}
            </figure>
          </>
        )}

        {/* Conteúdo Rico (HTML) */}
        <article 
          className="article-body" 
          style={{ lineHeight: '1.8', color: 'var(--gn-text)', wordWrap: 'break-word', overflowWrap: 'anywhere', fontSize: '1.1rem' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .article-body h2 { font-size: 24px; font-weight: 700; margin-top: 32px; margin-bottom: 16px; color: var(--gn-text); font-family: 'Plus Jakarta Sans', sans-serif; }
            .article-body h3 { font-size: 20px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; color: var(--gn-text); font-family: 'Plus Jakarta Sans', sans-serif; }
            .article-body p { margin-bottom: 20px; }
            .article-body strong { font-weight: 600; }
            .article-body a { color: var(--gn-blue); text-decoration: none; }
            .article-body a:hover { text-decoration: underline; }
            .article-body blockquote { border-left: 4px solid var(--gn-blue); padding-left: 16px; font-style: italic; color: var(--gn-text-secondary); margin: 24px 0; background: var(--gn-surface); padding: 16px; border-radius: 0 8px 8px 0; }
            .article-body hr { border: 0; border-top: 1px solid var(--gn-border); margin: 32px 0; }
            .article-body ul, .article-body ol { margin-bottom: 20px; padding-left: 24px; }
            .article-body li { margin-bottom: 8px; }
            .article-body img { max-width: 100%; max-height: 380px; height: auto; object-fit: contain; margin: 20px auto; display: block; border-radius: 8px; background: #090e1a; }
          `}} />
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </article>

        {/* Botões de Compartilhamento Social (Zero Scripts, Máxima Performance) */}
        <SocialShare url={articleUrl} title={cleanTitle} />

        {/* Disclaimers Transparentes */}
        {article.disclaimer_type === 'opiniao' && (
          <div style={{ marginTop: '40px', padding: '16px', backgroundColor: 'rgba(216, 27, 96, 0.08)', borderLeft: '4px solid #d81b60', borderRadius: '4px', fontSize: '14px', color: '#d81b60' }}>
            <strong>Nota Editorial:</strong> Este artigo reflete a visão cultural e opinativa do autor, tendo caráter exclusivamente informativo e reflexivo. Não se trata de prestação de serviços comerciais.
          </div>
        )}
        {article.disclaimer_type === 'tecnica' && (
          <div style={{ marginTop: '40px', padding: '16px', backgroundColor: 'rgba(26, 115, 232, 0.08)', borderLeft: '4px solid #1a73e8', borderRadius: '4px', fontSize: '14px', color: '#174ea6' }}>
            <strong>Cobertura Técnica:</strong> Este conteúdo foi redigido com base em fontes técnicas e educacionais verificadas.
          </div>
        )}

        {/* Fontes e Referências */}
        {article.sources && (
          <div style={{ marginTop: '40px', padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--gn-text)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-icons-extended" style={{ fontSize: '18px' }}>menu_book</span>
              Fontes e Referências
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--gn-text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {article.sources}
            </div>
          </div>
        )}

        {/* Mini-Bio do Autor */}
        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          {authorData.img ? (
            <img src={authorData.img} alt={article.author_name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gn-search-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gn-text-secondary)', fontSize: '20px', fontWeight: '500' }}>
              {authorData.initials}
            </div>
          )}
          <div style={{ flex: '1 1 auto' }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--gn-text)', marginBottom: '4px' }}>
              <Link href={`/equipe#${authorData?.slug || 'gustavo-castro'}`} style={{ color: 'inherit', textDecoration: 'none' }} title={`Conheça a trajetória de ${article.author_name || article.author}`}>
                {article.author_name || article.author} &rarr;
              </Link>
            </div>
            <div style={{ fontSize: '14px', color: 'var(--gn-text-secondary)', lineHeight: '1.5' }}>{authorData.bio}</div>
            <div style={{ marginTop: '8px' }}>
              <Link href={`/equipe#${authorData?.slug || 'gustavo-castro'}`} style={{ fontSize: '13px', color: 'var(--gn-blue)', textDecoration: 'none', fontWeight: 600 }}>
                Ver biografia completa e credenciais &rarr;
              </Link>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
