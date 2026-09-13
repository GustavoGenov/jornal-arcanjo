import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from './components/PageTracker';
import SubscribeForm from './components/SubscribeForm';
import { getOptimizedImageUrl, getImageSrcSet } from '@/lib/imageHelper';

export const revalidate = 60;

export const metadata = {
  title: 'Voz da I.A - Combate às Fake News com Tecnologia',
  description: 'O Voz da I.A é o primeiro jornal inteligente 100% focado em combater fake news através de alta tecnologia, checagem de fatos e notícias verificadas em tempo real.',
  alternates: {
    canonical: 'https://vozdaia.com',
  },
  openGraph: {
    title: 'Voz da I.A - Combate às Fake News com Tecnologia',
    description: 'O primeiro jornal inteligente 100% focado em combater fake news através de alta tecnologia.',
    url: 'https://vozdaia.com',
    siteName: 'Voz da I.A',
    locale: 'pt_BR',
    type: 'website',
  },
};

function getCategoryClass(slug) {
  if (!slug) return 'cat-tech';
  if (slug.includes('ia') || slug.includes('agente')) return 'cat-ia';
  if (slug.includes('ciencia') || slug.includes('espaco')) return 'cat-ciencia';
  if (slug.includes('cultura') || slug.includes('filosofia')) return 'cat-cultura';
  if (slug.includes('formiga') || slug.includes('local')) return 'cat-formiga';
  if (slug.includes('hardware') || slug.includes('engenharia')) return 'cat-hardware';
  return 'cat-tech';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

function estimateReadingTime(content, summary) {
  const text = (content || summary || '').replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 180) || 3;
  return `${minutes} min de leitura`;
}

export default async function Home() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`id, title, slug, created_at, image_url, summary, content, author_name, featured_position, categories(name, slug, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error || !articles || articles.length === 0) {
    return (
      <main className="container">
        <PageTracker />
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }} aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2>Nenhum artigo publicado ainda.</h2>
        </div>
      </main>
    );
  }

  // 1. Manchete Principal do Hero (Busca fixado 'hero_main' ou o mais recente)
  const heroMainPinned = articles.find(a => a.featured_position === 'hero_main');
  const featuredArticle = heroMainPinned || articles[0];

  // 2. Cards Secundários do Hero (Busca fixados 'hero_side' e preenche com os mais recentes)
  const heroSidePinned = articles.filter(a => a.featured_position === 'hero_side' && a.id !== featuredArticle?.id);
  const availableForHeroSide = articles.filter(a => a.id !== featuredArticle?.id && !heroSidePinned.some(p => p.id === a.id));
  const sideArticles = [
    ...heroSidePinned,
    ...availableForHeroSide
  ].slice(0, 2);

  // 3. Seção Formiga em Foco & Sociedade (Busca fixado 'formiga_main', temas de Formiga e preenche vagas)
  const usedHeroIds = new Set([featuredArticle?.id, ...sideArticles.map(s => s.id)]);
  
  const formigaPinned = articles.filter(a => a.featured_position === 'formiga_main' && !usedHeroIds.has(a.id));
  const formigaMatches = articles.filter(a => 
    !usedHeroIds.has(a.id) &&
    !formigaPinned.some(p => p.id === a.id) &&
    (
      a.title?.toLowerCase().includes('formiga') || 
      a.summary?.toLowerCase().includes('formiga') ||
      a.categories?.slug?.includes('formiga')
    )
  );
  const availableForFormiga = articles.filter(a => 
    !usedHeroIds.has(a.id) && 
    !formigaPinned.some(p => p.id === a.id) && 
    !formigaMatches.some(f => f.id === a.id)
  );
  
  const formigaCards = [
    ...formigaPinned,
    ...formigaMatches,
    ...availableForFormiga
  ].slice(0, 3);

  // 4. Seção Últimas Publicações (Demais notícias em ordem cronológica)
  const usedIds = new Set([
    featuredArticle?.id,
    ...sideArticles.map(s => s.id),
    ...formigaCards.map(f => f.id)
  ]);

  const latestArticles = articles.filter(a => !usedIds.has(a.id)).slice(0, 9);

  return (
    <main className="container" style={{ paddingTop: '16px' }}>
      <PageTracker />

      {/* PLANTÃO AO VIVO / TICKER DE NOTÍCIAS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: 'var(--gn-surface)',
        border: '1px solid var(--gn-border)',
        borderRadius: '12px',
        marginBottom: '24px',
        fontSize: '14px',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#dc2626', animation: 'pulse 1.5s infinite' }}></span>
          Plantão Voz da I.A
        </div>
        <div style={{ width: '1px', height: '16px', background: 'var(--gn-border)' }}></div>
        <div style={{ color: 'var(--gn-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          <Link href={`/artigo/${featuredArticle.slug}`} style={{ color: 'var(--gn-text)', fontWeight: 500 }}>
            {featuredArticle.title}
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gn-text-secondary)', fontSize: '12px', whiteSpace: 'nowrap' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#16a34a" style={{ flexShrink: 0 }} aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          100% Verificado
        </div>
      </div>

      {featuredArticle.image_url && (
        <link 
          rel="preload" 
          as="image" 
          href={getOptimizedImageUrl(featuredArticle.image_url, 800)} 
          imageSrcSet={getImageSrcSet(featuredArticle.image_url)} 
          imageSizes="(max-width: 600px) 100vw, 800px" 
          fetchPriority="high" 
        />
      )}

      {/* HERO SECTION PRINCIPAL */}
      <section className="hero-grid">
        {/* CARD PRINCIPAL (MANCHETE DESTAQUE) */}
        <Link href={`/artigo/${featuredArticle.slug}`} className="hero-main" prefetch={true}>
          <div className="hero-main-img-wrap">
            {featuredArticle.image_url ? (
              <img 
                src={getOptimizedImageUrl(featuredArticle.image_url, 800)} 
                srcSet={getImageSrcSet(featuredArticle.image_url)}
                sizes="(max-width: 600px) 100vw, 800px"
                alt={featuredArticle.title} 
                width="800"
                height="450"
                className="hero-main-img" 
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gn-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </div>
            )}
            <div className="hero-img-overlay"></div>
          </div>

          <div className="hero-main-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span className={`category ${getCategoryClass(featuredArticle.categories?.slug)}`}>
                {featuredArticle.categories?.name || 'Manchete Principal'}
              </span>
              <span style={{ fontSize: '12px', color: '#ffffff', background: 'rgba(0,0,0,0.75)', padding: '3px 8px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                {estimateReadingTime(featuredArticle.content, featuredArticle.summary)}
              </span>
            </div>
            
            <h2>{featuredArticle.title}</h2>
            <p>{featuredArticle.summary}</p>
            
            <div className="meta">
              <span style={{ fontWeight: '600' }}>
                Por {featuredArticle.author_name || 'Redação Voz da I.A'}
              </span>
              <span>•</span>
              <span>{formatDate(featuredArticle.created_at)}</span>
            </div>
          </div>
        </Link>

        {/* 2 CARDS SECUNDÁRIOS */}
        <div className="hero-side">
          {sideArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="hero-side-card" prefetch={false}>
              <div className="hero-side-img-wrap">
                {article.image_url ? (
                  <img 
                    src={getOptimizedImageUrl(article.image_url, 400)} 
                    alt={article.title} 
                    width="400"
                    height="225"
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gn-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}
              </div>

              <div className="hero-side-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                    {article.categories?.name || 'Tech'}
                  </span>
                </div>
                <h3>{article.title}</h3>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>
                    Por {article.author_name || 'Equipe Editorial'}
                  </span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEÇÃO FORMIGA EM FOCO */}
      <div className="section-title" id="formiga-em-foco" style={{ marginTop: '4.5rem' }}>
        <h2><span></span> Formiga em Foco & Sociedade</h2>
        <Link href="/categoria/cultura-filosofia-bem-estar" className="see-all">
          Ver todas →
        </Link>
      </div>

      <section className="formiga-grid">
        {formigaCards.map((article) => (
          <Link key={article.id} href={`/artigo/${article.slug}`} className="card" prefetch={false}>
            <div className="card-img-wrap">
              {article.image_url ? (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  width="400"
                  height="225"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gn-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              )}
            </div>

            <div className="card-body">
              <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                {article.categories?.name || 'Formiga'}
              </span>
              <h3>{article.title}</h3>
              <p>
                {article.summary?.length > 110 
                  ? article.summary.substring(0, 110) + '...' 
                  : article.summary}
              </p>
              <div className="meta">
                <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Equipe Editorial'}</span>
                <span>•</span>
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* ADSENSE SLOT 1 (ENTRE SEÇÕES - AD COMPLIANCE) */}
      <AdBanner dataAdSlot="SEU_SLOT_HOME_1" />

      {/* COLUNA DO GUSTAVO / OPINIÃO E TECNOLOGIA */}
      <div className="section-title" id="coluna-do-gustavo" style={{ marginTop: '3.5rem' }}>
        <h2>
          <span style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}></span> 
          Coluna Editorial & Tecnologia
        </h2>
        <Link href="/equipe" className="see-all">
          Conheça o autor →
        </Link>
      </div>

      <section style={{ 
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 158, 11, 0.02))', 
        border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: '16px',
        padding: '28px',
        marginBottom: '40px',
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #f59e0b', flexShrink: 0 }}>
          <img 
            src="/simbolo.png" 
            alt="Gustavo" 
            width="90" 
            height="90" 
            loading="lazy" 
            decoding="async"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{ display: 'inline-block', background: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', marginBottom: '12px', textTransform: 'uppercase' }}>
            Visão & Editorial
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--gn-text)', marginBottom: '10px', lineHeight: 1.3 }}>
            Bem-vindo à Voz da I.A: Como a tecnologia molda a nossa realidade e combate a desinformação.
          </h3>
          <p style={{ color: 'var(--gn-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '0' }}>
            Uma análise franca sobre o ecossistema tecnológico global, os desafios da inteligência artificial e o impacto direto na nossa sociedade. Acompanhe os artigos técnicos, ensaios e reflexões do fundador do portal.
          </p>
        </div>
      </section>

      {/* SEÇÃO DEMAIS PUBLICAÇÕES */}
      <div className="section-title">
        <h2><span style={{ background: '#3b82f6' }}></span> Últimas Publicações</h2>
        <Link href="/categoria/ia-e-agentes" className="see-all">
          Ver todas →
        </Link>
      </div>

      <section className="articles-grid">
        {latestArticles.map((article) => (
          <Link key={article.id} href={`/artigo/${article.slug}`} className="card" prefetch={false}>
            <div className="card-img-wrap">
              {article.image_url ? (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  width="400"
                  height="225"
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--gn-search-bg)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--gn-text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
              )}
            </div>

            <div className="card-body">
              <span className={`category ${getCategoryClass(article.categories?.slug)}`}>
                {article.categories?.name || 'Notícias'}
              </span>
              <h3>{article.title}</h3>
              <p>
                {article.summary?.length > 110 
                  ? article.summary.substring(0, 110) + '...' 
                  : article.summary}
              </p>
              <div className="meta">
                <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Equipe Editorial'}</span>
                <span>•</span>
                <span>{formatDate(article.created_at)}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* NEWSLETTER */}
      <SubscribeForm />

      {/* ECOSSISTEMA & PROJETOS PARCEIROS */}
      <div style={{ marginTop: '50px' }} id="ecossistema">
        <h3 className="google-sans" style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--gn-text-secondary)', fontWeight: 600 }}>
          Acesso Rápido aos Nossos Projetos
        </h3>
        <div className="ecosystem-grid">
          <a href="https://kaelara-online.vercel.app/" target="_blank" rel="noopener noreferrer" className="ecosystem-card">
            <div style={{ width: '48px', height: '48px', minWidth: '48px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C4DFF, #d12a7a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                <circle cx="12" cy="5" r="2"></circle>
                <path d="M12 7v4"></path>
                <line x1="8" y1="16" x2="8.01" y2="16"></line>
                <line x1="16" y1="16" x2="16.01" y2="16"></line>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600', color: 'var(--gn-text)' }}>Kaelara Online</div>
              <div style={{ fontSize: '13px', color: 'var(--gn-text-secondary)' }}>Fale com nossa Inteligência Artificial</div>
            </div>
          </a>
        </div>
      </div>

      {/* ADSENSE SLOT 2 (FINAL DA PÁGINA) */}
      <AdBanner dataAdSlot="SEU_SLOT_HOME_2" />
    </main>
  );
}
