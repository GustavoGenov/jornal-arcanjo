import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import PageTracker from './components/PageTracker';
import SubscribeForm from './components/SubscribeForm';
import HoroscopoWidget from './components/HoroscopoWidget';
import GamesBlock from './components/GamesBlock';
import { getOptimizedImageUrl, getImageSrcSet } from '@/lib/imageHelper';

export const revalidate = 60;

export const metadata = {
  title: 'Jornal Arcanjo - Sociedade, Cultura, Filosofia & Sabedoria',
  description: 'Jornal independente de Formiga (MG) e do Brasil focado em jornalismo humanizado, cultura, espiritualidade, saúde, sociedade e fatos checados.',
  alternates: {
    canonical: 'https://jornalarcanjo.com.br',
  },
  openGraph: {
    title: 'Jornal Arcanjo - Sociedade, Cultura, Filosofia & Sabedoria',
    description: 'Jornal independente focado em cultura, espiritualidade, saúde, sociedade e fatos checados.',
    url: 'https://jornalarcanjo.com.br',
    siteName: 'Jornal Arcanjo',
    locale: 'pt_BR',
    type: 'website',
  },
};

function getCategoryClass(slug) {
  if (!slug) return 'cat-arcanjo';
  if (slug.includes('formiga') || slug.includes('sociedade')) return 'cat-formiga';
  if (slug.includes('cultura') || slug.includes('filosofia')) return 'cat-cultura';
  if (slug.includes('saude') || slug.includes('bem-estar')) return 'cat-saude';
  if (slug.includes('religiao')) return 'cat-religiao';
  if (slug.includes('clima')) return 'cat-clima';
  if (slug.includes('horoscopo') || slug.includes('taro')) return 'cat-horoscopo';
  if (slug.includes('passatempo')) return 'cat-passatempos';
  return 'cat-arcanjo';
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
        <div style={{ textAlign: 'center', padding: '90px 20px', color: 'var(--text-muted)' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }} aria-hidden="true">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Bem-vindo ao Jornal Arcanjo</h2>
          <p style={{ fontSize: '16px', maxWidth: '500px', margin: '0 auto 24px' }}>
            O banco de dados está pronto para receber as primeiras matérias das editorias oficiais. Acesse o painel para publicar.
          </p>
          <Link href="/admin" className="btn btn-primary" style={{ padding: '10px 24px', borderRadius: '8px', textDecoration: 'none' }}>
            Acessar Painel de Redação
          </Link>
        </div>
      </main>
    );
  }

  // 1. Hero Principal
  const heroMainPinned = articles.find(a => a.featured_position === 'hero_main');
  const featuredArticle = heroMainPinned || articles[0];

  // 2. Cards Secundários do Hero
  const heroSidePinned = articles.filter(a => a.featured_position === 'hero_side' && a.id !== featuredArticle?.id);
  const availableForHeroSide = articles.filter(a => a.id !== featuredArticle?.id && !heroSidePinned.some(p => p.id === a.id));
  const sideArticles = [
    ...heroSidePinned,
    ...availableForHeroSide
  ].slice(0, 2);

  const usedHeroIds = new Set([featuredArticle?.id, ...sideArticles.map(s => s.id)]);

  // 3. Bloco: Formiga em Foco & Sociedade (Gustavo de Castro)
  const formigaArticles = articles.filter(a => 
    !usedHeroIds.has(a.id) &&
    (
      a.featured_position === 'formiga_main' ||
      a.categories?.slug?.includes('formiga') ||
      a.title?.toLowerCase().includes('formiga') ||
      a.summary?.toLowerCase().includes('formiga')
    )
  ).slice(0, 3);

  // 4. Bloco: Cultura e Filosofia (Daiene Meneses)
  const culturaArticles = articles.filter(a => 
    !usedHeroIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    (
      a.categories?.slug?.includes('cultura') ||
      a.categories?.slug?.includes('filosofia')
    )
  ).slice(0, 3);

  // 5. Bloco: Saúde e Bem-Estar (Beatriz Freire)
  const saudeArticles = articles.filter(a => 
    !usedHeroIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    (
      a.categories?.slug?.includes('saude') ||
      a.categories?.slug?.includes('bem-estar')
    )
  ).slice(0, 3);

  // 6. Bloco: Religião & Tradições (RuiWenceslau)
  const religiaoArticles = articles.filter(a => 
    !usedHeroIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    !saudeArticles.some(s => s.id === a.id) &&
    a.categories?.slug?.includes('religiao')
  ).slice(0, 3);

  // 7. Demais notícias (Feed geral)
  const allUsedIds = new Set([
    featuredArticle?.id,
    ...sideArticles.map(s => s.id),
    ...formigaArticles.map(a => a.id),
    ...culturaArticles.map(a => a.id),
    ...saudeArticles.map(a => a.id),
    ...religiaoArticles.map(a => a.id)
  ]);

  const latestArticles = articles.filter(a => !allUsedIds.has(a.id)).slice(0, 6);

  return (
    <main className="container" style={{ paddingTop: '16px' }}>
      <PageTracker />

      {/* PLANTÃO AO VIVO / TICKER */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7', animation: 'pulse 1.5s infinite' }}></span>
          Edição Jornal Arcanjo
        </div>
        <div style={{ width: '1px', height: '16px', background: 'var(--gn-border)' }}></div>
        <div style={{ color: 'var(--gn-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
          <Link href={`/artigo/${featuredArticle.slug}`} style={{ color: 'var(--gn-text)', fontWeight: 500 }}>
            {featuredArticle.title}
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gn-text-secondary)', fontSize: '12px', whiteSpace: 'nowrap' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#059669" style={{ flexShrink: 0 }} aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
          Jornalismo Verificado
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
              <span style={{ fontSize: '12px', color: '#ffffff', background: 'rgba(15, 23, 42, 0.8)', padding: '3px 8px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
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
                Por {featuredArticle.author_name || 'Redação Jornal Arcanjo'}
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
                    {article.categories?.name || 'Destaque'}
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

      {/* ADSENSE SLOT 1 */}
      <AdBanner dataAdSlot="SEU_SLOT_HOME_1" />

      {/* BLOCO 1: FORMIGA EM FOCO & SOCIEDADE (GUSTAVO DE CASTRO) */}
      <div className="section-title" id="formiga-em-foco" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#0284c7' }}></span> 
          Formiga em Foco & Sociedade
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Coluna de Gustavo de Castro
          </small>
        </h2>
        <Link href="/categoria/formiga-sociedade" className="see-all">
          Ver todas →
        </Link>
      </div>

      {formigaArticles.length > 0 ? (
        <section className="formiga-grid">
          {formigaArticles.map((article) => (
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
                  {article.categories?.name || 'Formiga em Foco'}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 110 
                    ? article.summary.substring(0, 110) + '...' 
                    : article.summary}
                </p>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Gustavo de Castro'}</span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', textAlign: 'center', color: 'var(--gn-text-secondary)' }}>
          Matérias em preparação pela coluna de Gustavo de Castro Bernardes Rosa.
        </div>
      )}

      {/* BLOCO 2: CULTURA E FILOSOFIA (DAIENE MENESES) */}
      <div className="section-title" id="cultura-e-filosofia" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#7c3aed' }}></span> 
          Cultura e Filosofia
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Coluna de Daiene Maria de Meneses
          </small>
        </h2>
        <Link href="/categoria/cultura-filosofia" className="see-all">
          Ver todas →
        </Link>
      </div>

      {culturaArticles.length > 0 ? (
        <section className="formiga-grid">
          {culturaArticles.map((article) => (
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
                  {article.categories?.name || 'Cultura & Filosofia'}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 110 
                    ? article.summary.substring(0, 110) + '...' 
                    : article.summary}
                </p>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Daiene Meneses'}</span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', textAlign: 'center', color: 'var(--gn-text-secondary)' }}>
          Ensaios, literatura e reflexões em preparação por Daiene Maria de Meneses.
        </div>
      )}

      {/* BLOCO 3: SAÚDE E BEM-ESTAR (BEATRIZ FREIRE) */}
      <div className="section-title" id="saude-e-bem-estar" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#059669' }}></span> 
          Saúde e Bem-Estar
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Coluna de Beatriz Freire
          </small>
        </h2>
        <Link href="/categoria/saude-bem-estar" className="see-all">
          Ver todas →
        </Link>
      </div>

      {saudeArticles.length > 0 ? (
        <section className="formiga-grid">
          {saudeArticles.map((article) => (
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
                  {article.categories?.name || 'Saúde & Bem-Estar'}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 110 
                    ? article.summary.substring(0, 110) + '...' 
                    : article.summary}
                </p>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'Beatriz Freire'}</span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', textAlign: 'center', color: 'var(--gn-text-secondary)' }}>
          Dicas de equilíbrio, prevenção e qualidade de vida em preparação por Beatriz Freire.
        </div>
      )}

      {/* BLOCO 4: RELIGIÃO & TRADIÇÕES (RUIWENCESLAU) */}
      <div className="section-title" id="religiao" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#b45309' }}></span> 
          Religião & Tradições de Fé
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Coluna de RuiWenceslau
          </small>
        </h2>
        <Link href="/categoria/religiao" className="see-all">
          Ver todas →
        </Link>
      </div>

      {religiaoArticles.length > 0 ? (
        <section className="formiga-grid">
          {religiaoArticles.map((article) => (
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
                  {article.categories?.name || 'Religião'}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 110 
                    ? article.summary.substring(0, 110) + '...' 
                    : article.summary}
                </p>
                <div className="meta">
                  <span style={{ fontWeight: '500' }}>{article.author_name ? `Por ${article.author_name}` : 'RuiWenceslau'}</span>
                  <span>•</span>
                  <span>{formatDate(article.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '12px', textAlign: 'center', color: 'var(--gn-text-secondary)' }}>
          Mensagens de fé, teologia popular e reflexões morais sob a assinatura de RuiWenceslau.
        </div>
      )}

      {/* BLOCO INTERATIVO: HORÓSCOPO & TARÔ (JHONATAN D' OSOGIYAN) */}
      <div className="section-title" id="horoscopo" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#d97706' }}></span> 
          Horóscopo & Tarô Diário
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Com Pai Jhonatan d' Osogiyan
          </small>
        </h2>
        <Link href="/horoscopo" className="see-all">
          Página Completa →
        </Link>
      </div>

      <HoroscopoWidget />

      {/* BLOCO INTERATIVO: PASSATEMPOS & JOGOS DA MENTE (KAELARA) */}
      <div className="section-title" id="passatempos" style={{ marginTop: '4rem' }}>
        <h2>
          <span style={{ background: '#ea580c' }}></span> 
          Passatempos & Lazer
          <small style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gn-text-secondary)', marginLeft: '12px' }}>
            Curadoria de Kaelara
          </small>
        </h2>
        <Link href="/passatempos" className="see-all">
          Todos os Jogos →
        </Link>
      </div>

      <GamesBlock />

      {/* SEÇÃO: MAIS NOTÍCIAS RECENTES */}
      {latestArticles.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: '4rem' }}>
            <h2><span style={{ background: '#1e3a8a' }}></span> Mais Notícias & Artigos</h2>
            <Link href="/busca" className="see-all">
              Ver arquivo →
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
        </>
      )}

      {/* NEWSLETTER */}
      <SubscribeForm />

      {/* ADSENSE SLOT 2 */}
      <AdBanner dataAdSlot="SEU_SLOT_HOME_2" />
    </main>
  );
}
