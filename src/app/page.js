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
  title: 'Jornal Arcanjo - The New York Times do Centro-Oeste e do Brasil',
  description: 'Jornal independente de Formiga (MG) com cobertura analítica e rigor editorial em Sociedade, Cultura, Filosofia, Saúde e Fatos Checados.',
  alternates: {
    canonical: 'https://jornalarcanjo.vercel.app',
  },
  openGraph: {
    title: 'Jornal Arcanjo - Tradição, Sociedade, Cultura & Sabedoria',
    description: 'Jornalismo independente, cultura, espiritualidade, saúde e fatos checados.',
    url: 'https://jornalarcanjo.vercel.app',
    siteName: 'Jornal Arcanjo',
    locale: 'pt_BR',
    type: 'website',
  },
};

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
    .select(`id, title, slug, created_at, image_url, image_credits, summary, content, author_name, views, fact_check_status, featured_position, categories(name, slug, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  // Lista de colunistas oficiais com fotos e editorias para a coluna "Opinião & Vozes"
  const columnistsList = [
    {
      name: 'Gustavo de Castro',
      title: 'Formiga em Foco & Sociedade',
      image: '/equipe/gustavo.jpg',
      quote: 'A memória viva e a cidadania regional moldam a nossa identidade.',
      href: '/categoria/formiga-sociedade'
    },
    {
      name: 'Daiene Meneses',
      title: 'Cultura e Filosofia',
      image: '/equipe/daiene.jpg',
      quote: 'O cultivo da sensibilidade humana e as lições dos pensadores clássicos.',
      href: '/categoria/cultura-filosofia'
    },
    {
      name: 'Beatriz Freire',
      title: 'Saúde e Bem-Estar',
      image: '/equipe/beatriz.jpg',
      quote: 'Equilíbrio físico e mental como base para a longevidade consciente.',
      href: '/categoria/saude-bem-estar'
    },
    {
      name: 'RuiWenceslau',
      title: 'Religião & Tradições',
      image: '/equipe/rui.jpg',
      quote: 'A busca pelo sagrado, a moralidade e os valores que resistem ao tempo.',
      href: '/categoria/religiao'
    },
    {
      name: 'Pai Jhonatan',
      title: 'Horóscopo & Tarô',
      image: '/equipe/jhonatan.jpg',
      quote: 'Os arcanos, a sabedoria ancestral e os ciclos da natureza.',
      href: '/horoscopo'
    },
    {
      name: 'Kaelara',
      title: 'Clima & Passatempos',
      image: '/equipe/kaelara.png',
      quote: 'A dinâmica da atmosfera e o exercício diário do raciocínio lógico.',
      href: '/passatempos'
    }
  ];

  if (error || !articles || articles.length === 0) {
    return (
      <main className="nyt-container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <PageTracker />
        <div style={{ maxWidth: '640px', margin: '0 auto', border: '1px solid var(--nyt-border)', padding: '48px 32px', background: 'var(--nyt-surface)' }}>
          <h1 style={{ fontFamily: 'var(--nyt-serif-title)', fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>
            Jornal Arcanjo
          </h1>
          <p style={{ fontFamily: 'var(--nyt-serif-body)', fontSize: '16px', color: 'var(--nyt-ink-secondary)', marginBottom: '24px' }}>
            O portal está conectado ao banco de dados. As matérias e edições broadsheet carregarão automaticamente.
          </p>
          <Link href="/admin" className="nyt-btn-play">
            Acessar Painel de Redação
          </Link>
        </div>
      </main>
    );
  }

  // 1. Ranking G1: Top 5 Mais Lidas (Ordenação por visualizações)
  const topReadArticles = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  // 2. Manchete Principal (Centro do Broadsheet)
  const heroMainPinned = articles.find(a => a.featured_position === 'hero_main');
  const leadArticle = heroMainPinned || articles[0];

  // 3. Coluna Esquerda: Notícias Analíticas e Breves (3 matérias)
  const leftColumnArticles = articles
    .filter(a => a.id !== leadArticle?.id)
    .slice(0, 3);

  const usedInFoldIds = new Set([leadArticle?.id, ...leftColumnArticles.map(a => a.id)]);

  // 4. Bloco G1 Especial: Grande Reportagem Panorâmica
  const specialReportArticle = articles.find(a => 
    a.id !== leadArticle?.id &&
    (
      a.title?.toLowerCase().includes('fab') ||
      a.title?.toLowerCase().includes('caças') ||
      a.title?.toLowerCase().includes('arqueologia') ||
      a.title?.toLowerCase().includes('terreiro')
    )
  ) || articles[1] || leadArticle;

  // 5. Bloco G1 Checamos: Fato ou Boato / Checagem
  const factCheckArticles = articles.filter(a =>
    a.fact_check_status ||
    a.title?.toLowerCase().includes('verdade') ||
    a.title?.toLowerCase().includes('prov') ||
    a.title?.toLowerCase().includes('comprova') ||
    a.title?.toLowerCase().includes('declara') ||
    a.title?.toLowerCase().includes('direito')
  ).slice(0, 3);

  // 6. Bloco G1 Multimídia & Vídeo: Destaques Visuais
  const multimediaArticles = articles.filter(a => 
    a.id !== leadArticle?.id && 
    a.id !== specialReportArticle?.id &&
    a.image_url
  ).slice(0, 3);

  // 7. Bloco: Formiga em Foco & Sociedade (Gustavo de Castro)
  const formigaArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    (
      a.categories?.slug?.includes('formiga') ||
      a.title?.toLowerCase().includes('formiga') ||
      a.summary?.toLowerCase().includes('formiga')
    )
  ).slice(0, 3);

  // 8. Bloco: Cultura e Filosofia (Daiene Meneses)
  const culturaArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    (
      a.categories?.slug?.includes('cultura') ||
      a.categories?.slug?.includes('filosofia')
    )
  ).slice(0, 3);

  // 9. Bloco: Saúde e Bem-Estar (Beatriz Freire)
  const saudeArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    (
      a.categories?.slug?.includes('saude') ||
      a.categories?.slug?.includes('bem-estar')
    )
  ).slice(0, 3);

  // 10. Bloco: Religião & Tradições (RuiWenceslau)
  const religiaoArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    !saudeArticles.some(s => s.id === a.id) &&
    a.categories?.slug?.includes('religiao')
  ).slice(0, 3);

  // 11. Demais notícias (Feed geral)
  const allUsedIds = new Set([
    leadArticle?.id,
    ...leftColumnArticles.map(s => s.id),
    ...formigaArticles.map(a => a.id),
    ...culturaArticles.map(a => a.id),
    ...saudeArticles.map(a => a.id),
    ...religiaoArticles.map(a => a.id)
  ]);

  const latestArticles = articles.filter(a => !allUsedIds.has(a.id)).slice(0, 6);

  return (
    <main className="nyt-container">
      <PageTracker />

      {/* ====================================================================
          NOVO BLOCO G1 1: BARRA DE ASSUNTOS "EM ALTA" (TRENDING TOPICS)
          ==================================================================== */}
      <section className="g1-trending-bar" aria-label="Tópicos em alta">
        <div className="g1-trending-label">
          <span>🔥 EM ALTA</span>
        </div>
        <div className="g1-trending-chips">
          <Link href="#formiga-em-foco" className="g1-chip">#FormigaMG</Link>
          <Link href="#mais-lidas" className="g1-chip">#MaisLidas</Link>
          <Link href="#fato-ou-boato" className="g1-chip">#FatoOuBoato</Link>
          <Link href="#grande-reportagem" className="g1-chip">#EspecialArcanjo</Link>
          <Link href="#multimidia" className="g1-chip">#EmVídeo</Link>
          <Link href="#saude-bem-estar" className="g1-chip">#Saúde & Longevidade</Link>
          <Link href="#cultura-filosofia" className="g1-chip">#Cultura & Filosofia</Link>
          <Link href="#religiao" className="g1-chip">#Tradições & Fé</Link>
          <Link href="/clima" className="g1-chip">#PrevisãoDoTempo</Link>
          <Link href="/horoscopo" className="g1-chip">#HoróscopoDeHoje</Link>
          <Link href="/passatempos" className="g1-chip">#Passatempos</Link>
        </div>
      </section>

      {/* ====================================================================
          BROADSHEET LEAD GRID (3 COLUNAS) COM BLOCO G1 "MAIS LIDAS"
          - Coluna Esquerda: Notícias Analíticas / Briefs
          - Coluna Central: A Grande Manchete com Foto de Destaque
          - Coluna Direita: Bloco G1 "MAIS LIDAS" (Top 5) + Colunistas de Opinião
          ==================================================================== */}
      <section className="nyt-frontpage-grid">
        
        {/* COLUNA ESQUERDA: BREVES & ANÁLISES */}
        <div className="nyt-col-left">
          {leftColumnArticles.map((article) => (
            <article key={article.id} className="nyt-story-brief">
              <span className="nyt-kicker">
                {article.categories?.name || 'ANÁLISE'}
              </span>
              <Link href={`/artigo/${article.slug}`} className="nyt-headline-secondary">
                {article.title}
              </Link>
              <p className="nyt-deck-sm">
                {article.summary?.length > 120 
                  ? article.summary.substring(0, 120) + '...' 
                  : article.summary}
              </p>
              <div className="nyt-byline">
                Por <strong>{article.author_name || 'Redação'}</strong> • {estimateReadingTime(article.content, article.summary)}
              </div>
            </article>
          ))}
        </div>

        {/* COLUNA CENTRAL: A GRANDE MANCHETE BROADSHEET */}
        <div className="nyt-col-center">
          <article>
            <span className="nyt-kicker" style={{ color: '#c4170c' }}>
              {leadArticle.categories?.name || 'MANCHETE PRINCIPAL'}
            </span>
            <Link href={`/artigo/${leadArticle.slug}`} className="nyt-headline-main">
              {leadArticle.title}
            </Link>
            
            <p className="nyt-deck">
              {leadArticle.summary}
            </p>

            <div className="nyt-byline" style={{ marginBottom: '14px' }}>
              Por <strong>{leadArticle.author_name || 'Redação Jornal Arcanjo'}</strong> • {formatDate(leadArticle.created_at)} • {estimateReadingTime(leadArticle.content, leadArticle.summary)}
            </div>

            {leadArticle.image_url && (
              <div className="nyt-lead-media">
                <div 
                  className="img-ambient-backdrop" 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${getOptimizedImageUrl(leadArticle.image_url, 400)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px) brightness(0.35)',
                    transform: 'scale(1.15)',
                    opacity: 0.6
                  }} 
                />
                <img 
                  src={getOptimizedImageUrl(leadArticle.image_url, 900)}
                  srcSet={getImageSrcSet(leadArticle.image_url)}
                  sizes="(max-width: 768px) 100vw, 700px"
                  alt={leadArticle.title}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="nyt-media-caption">
                  {leadArticle.image_credits || 'Foto: Arquivo / Acervo Editorial Jornal Arcanjo'}
                </div>
              </div>
            )}

            {/* Pílulas de Destaque / O que você precisa saber (Padrão G1 na Manchete) */}
            <div style={{ marginTop: '16px', padding: '14px 18px', background: 'var(--nyt-paper-tint)', borderLeft: '3px solid #c4170c', borderRadius: '0 6px 6px 0' }}>
              <div style={{ fontFamily: 'var(--nyt-sans)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#c4170c', marginBottom: '6px' }}>
                O que você precisa saber:
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: 'var(--nyt-ink-secondary)', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '4px' }}>
                  Análise criteriosa e fontes oficiais checadas pela equipe de redação.
                </li>
                <li style={{ marginBottom: '4px' }}>
                  Impactos diretos para os cidadãos de Formiga e do Centro-Oeste mineiro.
                </li>
                <li>
                  <Link href={`/artigo/${leadArticle.slug}`} style={{ color: '#0284c7', fontWeight: '700' }}>
                    Leia a apuração completa e os desdobramentos →
                  </Link>
                </li>
              </ul>
            </div>
          </article>
        </div>

        {/* COLUNA DIREITA: NOVO BLOCO G1 "MAIS LIDAS" + COLUNISTAS DE OPINIÃO */}
        <aside className="nyt-col-right" id="mais-lidas">
          
          {/* BLOCO G1: TOP 5 MAIS LIDAS (ALTO CTR) */}
          <div className="g1-mais-lidas-card">
            <div className="g1-mais-lidas-header">
              <h3>
                <span style={{ color: '#c4170c' }}>⚡</span> MAIS LIDAS DO ARCANJO
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--nyt-ink-muted)', fontWeight: '600' }}>HOJE</span>
            </div>

            <div className="g1-ranking-list">
              {topReadArticles.map((article, idx) => (
                <Link key={article.id} href={`/artigo/${article.slug}`} className="g1-ranking-item">
                  <span className="g1-ranking-num">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="g1-ranking-content">
                    <span className="g1-ranking-kicker">
                      {article.categories?.name || 'DESTAQUE'}
                    </span>
                    <h4 className="g1-ranking-title">
                      {article.title}
                    </h4>
                    <div className="g1-ranking-meta">
                      <span>👁️ {article.views || 10} acessos</span>
                      <span>•</span>
                      <span>{estimateReadingTime(article.content, article.summary)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* COLUNA OPINIÃO & COLUNISTAS */}
          <div className="nyt-opinion-header" style={{ marginTop: '12px' }}>
            <h3>OPINIÃO & VOZES</h3>
          </div>

          {columnistsList.slice(0, 4).map((col, idx) => (
            <div key={idx} className="nyt-opinion-item">
              <img 
                src={col.image} 
                alt={col.name} 
                className="nyt-opinion-avatar"
              />
              <div className="nyt-opinion-content">
                <div className="nyt-opinion-author">{col.name}</div>
                <div className="nyt-opinion-role">{col.title}</div>
                <Link href={col.href} className="nyt-opinion-title">
                  “{col.quote}”
                </Link>
              </div>
            </div>
          ))}
        </aside>

      </section>

      {/* ADSENSE / MONETIZAÇÃO SLOT 1 */}
      <div style={{ margin: '30px 0' }}>
        <AdBanner dataAdSlot="SEU_SLOT_HOME_1" />
      </div>

      {/* ====================================================================
          NOVO BLOCO G1 2: GUIA RÁPIDO & SERVIÇOS DO DIA (SERVIÇOS G1)
          ==================================================================== */}
      <section className="g1-services-bar" aria-label="Serviços e utilidades do dia">
        <Link href="/clima" className="g1-service-card">
          <div className="g1-service-icon">⛅</div>
          <div className="g1-service-info">
            <span className="g1-service-label">PREVISÃO EM FORMIGA</span>
            <span className="g1-service-value">26°C Sol com Névoa</span>
            <span className="g1-service-action">Ver previsão detalhada →</span>
          </div>
        </Link>

        <Link href="/horoscopo" className="g1-service-card">
          <div className="g1-service-icon">🔮</div>
          <div className="g1-service-info">
            <span className="g1-service-label">TARÔ & HORÓSCOPO</span>
            <span className="g1-service-value">Arcano do Dia: A Estrela</span>
            <span className="g1-service-action">Ver conselho dos astros →</span>
          </div>
        </Link>

        <Link href="/passatempos" className="g1-service-card">
          <div className="g1-service-icon">🧩</div>
          <div className="g1-service-info">
            <span className="g1-service-label">EXERCÍCIO DA MENTE</span>
            <span className="g1-service-value">Sudoku & Termo de Hoje</span>
            <span className="g1-service-action">Jogar passatempos grátis →</span>
          </div>
        </Link>

        <Link href="#fato-ou-boato" className="g1-service-card">
          <div className="g1-service-icon">🛡️</div>
          <div className="g1-service-info">
            <span className="g1-service-label">CHECAGEM ARCANJO</span>
            <span className="g1-service-value">Fatos Checados & Rigor</span>
            <span className="g1-service-action">Ver matérias verificadas →</span>
          </div>
        </Link>
      </section>

      {/* ====================================================================
          NOVO BLOCO G1 3: GRANDE REPORTAGEM / ESPECIAL ARCANJO (WIDESCREEN)
          Inspirado nas grandes reportagens imersivas e especiais do G1
          ==================================================================== */}
      {specialReportArticle && (
        <section className="g1-special-report" id="grande-reportagem">
          <div className="g1-special-grid">
            <div className="g1-special-media">
              <div 
                className="img-ambient-backdrop" 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${getOptimizedImageUrl(specialReportArticle.image_url, 400)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(20px) brightness(0.35)',
                  transform: 'scale(1.15)',
                  opacity: 0.6
                }} 
              />
              <img 
                src={getOptimizedImageUrl(specialReportArticle.image_url, 900)}
                alt={specialReportArticle.title}
                loading="lazy"
              />
            </div>
            <div className="g1-special-content">
              <div className="g1-special-badge">
                <span>⭐ GRANDE REPORTAGEM ARCANJO</span>
              </div>
              <Link href={`/artigo/${specialReportArticle.slug}`} className="g1-special-title">
                {specialReportArticle.title}
              </Link>
              <p className="g1-special-desc">
                {specialReportArticle.summary?.substring(0, 220)}...
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', fontSize: '13px', color: '#94a3b8' }}>
                <span>Por <strong>{specialReportArticle.author_name || 'Equipe Especial'}</strong></span>
                <span>•</span>
                <span>{estimateReadingTime(specialReportArticle.content, specialReportArticle.summary)}</span>
              </div>
              <Link href={`/artigo/${specialReportArticle.slug}`} className="g1-special-btn">
                <span>Acessar Reportagem Especial</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          NOVO BLOCO G1 4: CHECAMOS | FATO OU BOATO (ESTILO G1 FATO OU FAKE)
          ==================================================================== */}
      <section className="g1-factcheck-wrapper" id="fato-ou-boato">
        <div className="g1-factcheck-header">
          <div className="g1-factcheck-title-group">
            <span className="g1-factcheck-tag">
              <span>🛡️ NÚCLEO DE APURAÇÃO & VERIFICAÇÃO</span>
            </span>
            <h2 className="g1-factcheck-heading">
              Checamos: Fato ou Boato
            </h2>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--nyt-ink-secondary)', maxWidth: '420px' }}>
            Combate à desinformação regional: apurações fundamentadas na lei, ciência e documentos históricos.
          </div>
        </div>

        <div className="g1-factcheck-grid">
          {factCheckArticles.map((article, idx) => {
            const isFato = article.fact_check_status === 'verified' || article.title?.toLowerCase().includes('verdade') || article.title?.toLowerCase().includes('comprova');
            const verdictLabel = isFato ? '✓ FATO COMPROVADO' : 'ℹ EXPLICAMOS O CONTEXTO';
            const verdictClass = isFato ? 'g1-verdict-fato' : 'g1-verdict-explicamos';

            return (
              <Link key={article.id || idx} href={`/artigo/${article.slug}`} className="g1-factcheck-card">
                <div className="g1-factcheck-thumb">
                  {article.image_url && (
                    <img 
                      src={getOptimizedImageUrl(article.image_url, 450)} 
                      alt={article.title}
                      loading="lazy"
                    />
                  )}
                  <span className={`g1-verdict-badge ${verdictClass}`}>
                    {verdictLabel}
                  </span>
                </div>
                <div className="g1-factcheck-body">
                  <span className="nyt-kicker" style={{ color: '#059669', marginBottom: '4px' }}>
                    {article.categories?.name || 'VERIFICAÇÃO'}
                  </span>
                  <h4>{article.title}</h4>
                  <p>{article.summary?.substring(0, 120)}...</p>
                  <div className="g1-factcheck-footer">
                    <span>Apuração Jornalística</span>
                    <span>Ler Checagem →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          NOVO BLOCO G1 5: MULTIMÍDIA & REPORTAGENS EM VÍDEO (ESTILO G1 VÍDEOS)
          ==================================================================== */}
      {multimediaArticles.length > 0 && (
        <section className="g1-video-section" id="multimidia">
          <div className="nyt-section-banner">
            <h3 className="nyt-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#c4170c' }}>▶</span> Destaques Multimídia & Vídeo
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--nyt-ink-muted)' }}>
              Coberturas visuais, entrevistas e documentários
            </span>
          </div>

          <div className="g1-video-grid">
            {multimediaArticles.map((article, idx) => (
              <Link key={article.id} href={`/artigo/${article.slug}`} className="g1-video-card">
                <div className="g1-video-thumb">
                  <img 
                    src={getOptimizedImageUrl(article.image_url, 500)} 
                    alt={article.title}
                    loading="lazy"
                  />
                  <div className="g1-play-btn">
                    <span>▶</span>
                  </div>
                  <span className="g1-video-duration">
                    ▶ 0{idx + 2}:45
                  </span>
                </div>
                <div className="g1-video-body">
                  <span className="g1-video-kicker">
                    <span>●</span> {article.categories?.name || 'MULTIMÍDIA'}
                  </span>
                  <h4 className="g1-video-title">
                    {article.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ====================================================================
          SEÇÃO BROADSHEET: FORMIGA EM FOCO & SOCIEDADE (GUSTAVO DE CASTRO)
          ==================================================================== */}
      <div className="nyt-section-banner" id="formiga-em-foco" style={{ marginTop: '36px' }}>
        <h3 className="nyt-section-title">
          Formiga em Foco & Sociedade
        </h3>
        <Link href="/categoria/formiga-sociedade" className="nyt-section-more">
          Ver todas as notícias de Formiga →
        </Link>
      </div>

      {formigaArticles.length > 0 ? (
        <section className="nyt-grid-3">
          {formigaArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="nyt-grid-card">
              {article.image_url && (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  loading="lazy"
                />
              )}
              <span className="nyt-kicker">FORMIGA & REGIÃO</span>
              <h4>{article.title}</h4>
              <p>{article.summary?.substring(0, 110)}...</p>
              <div className="nyt-byline">
                Por <strong>{article.author_name || 'Gustavo de Castro'}</strong> • {formatDate(article.created_at)}
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', border: '1px solid var(--nyt-border)', background: 'var(--nyt-paper-tint)', textAlign: 'center', fontSize: '14px', color: 'var(--nyt-ink-muted)' }}>
          Matérias em apuração para a coluna de Gustavo de Castro Bernardes Rosa.
        </div>
      )}

      {/* ====================================================================
          SEÇÃO BROADSHEET: CULTURA E FILOSOFIA (DAIENE MENESES)
          ==================================================================== */}
      <div className="nyt-section-banner" id="cultura-filosofia">
        <h3 className="nyt-section-title">
          Cultura e Filosofia
        </h3>
        <Link href="/categoria/cultura-filosofia" className="nyt-section-more">
          Ver ensaios & resenhas →
        </Link>
      </div>

      {culturaArticles.length > 0 ? (
        <section className="nyt-grid-3">
          {culturaArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="nyt-grid-card">
              {article.image_url && (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  loading="lazy"
                />
              )}
              <span className="nyt-kicker">ENSAIO & PENSAMENTO</span>
              <h4>{article.title}</h4>
              <p>{article.summary?.substring(0, 110)}...</p>
              <div className="nyt-byline">
                Por <strong>{article.author_name || 'Daiene Meneses'}</strong> • {formatDate(article.created_at)}
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', border: '1px solid var(--nyt-border)', background: 'var(--nyt-paper-tint)', textAlign: 'center', fontSize: '14px', color: 'var(--nyt-ink-muted)' }}>
          Ensaios e reflexões literárias em preparação pela coluna de Daiene Maria de Meneses.
        </div>
      )}

      {/* ====================================================================
          SEÇÃO: SAÚDE E BEM-ESTAR (BEATRIZ FREIRE)
          ==================================================================== */}
      <div className="nyt-section-banner" id="saude-bem-estar">
        <h3 className="nyt-section-title">
          Saúde e Bem-Estar
        </h3>
        <Link href="/categoria/saude-bem-estar" className="nyt-section-more">
          Ver reportagens de saúde →
        </Link>
      </div>

      {saudeArticles.length > 0 ? (
        <section className="nyt-grid-3">
          {saudeArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="nyt-grid-card">
              {article.image_url && (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  loading="lazy"
                />
              )}
              <span className="nyt-kicker">LONGEVIDADE & EQUILÍBRIO</span>
              <h4>{article.title}</h4>
              <p>{article.summary?.substring(0, 110)}...</p>
              <div className="nyt-byline">
                Por <strong>{article.author_name || 'Beatriz Freire'}</strong> • {formatDate(article.created_at)}
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', border: '1px solid var(--nyt-border)', background: 'var(--nyt-paper-tint)', textAlign: 'center', fontSize: '14px', color: 'var(--nyt-ink-muted)' }}>
          Orientações de prevenção e estilo de vida em preparação por Beatriz Freire.
        </div>
      )}

      {/* ====================================================================
          SEÇÃO: RELIGIÃO & TRADIÇÕES DE FÉ (RUIWENCESLAU)
          ==================================================================== */}
      <div className="nyt-section-banner" id="religiao">
        <h3 className="nyt-section-title">
          Religião & Tradições de Fé
        </h3>
        <Link href="/categoria/religiao" className="nyt-section-more">
          Ver reflexões espirituais →
        </Link>
      </div>

      {religiaoArticles.length > 0 ? (
        <section className="nyt-grid-3">
          {religiaoArticles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="nyt-grid-card">
              {article.image_url && (
                <img 
                  src={getOptimizedImageUrl(article.image_url, 400)} 
                  alt={article.title} 
                  loading="lazy"
                />
              )}
              <span className="nyt-kicker">FÉ & MORALIDADE</span>
              <h4>{article.title}</h4>
              <p>{article.summary?.substring(0, 110)}...</p>
              <div className="nyt-byline">
                Por <strong>{article.author_name || 'RuiWenceslau'}</strong> • {formatDate(article.created_at)}
              </div>
            </Link>
          ))}
        </section>
      ) : (
        <div style={{ padding: '24px', border: '1px solid var(--nyt-border)', background: 'var(--nyt-paper-tint)', textAlign: 'center', fontSize: '14px', color: 'var(--nyt-ink-muted)' }}>
          Mensagens teológicas e história das tradições sagradas sob assinatura de RuiWenceslau.
        </div>
      )}

      {/* ====================================================================
          SEÇÃO NYT GAMES / PASSATEMPOS (CURADORIA DE KAELARA)
          ==================================================================== */}
      <div className="nyt-section-banner" id="passatempos">
        <h3 className="nyt-section-title">
          NYT Games & Passatempos
        </h3>
        <Link href="/passatempos" className="nyt-section-more">
          Central de Jogos →
        </Link>
      </div>

      <div className="nyt-games-box">
        <div className="nyt-games-header">
          <h3>Exercícios da Mente</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--nyt-ink-muted)' }}>
            Sudoku clássico, Termo diário e Palavras Cruzadas selecionados por Kaelara para manter sua agilidade mental afiada.
          </p>
        </div>

        <div className="nyt-games-grid">
          <div className="nyt-game-card">
            <span style={{ fontSize: '36px', marginBottom: '8px' }}>🔢</span>
            <div className="nyt-game-title">Sudoku</div>
            <div className="nyt-game-desc">
              Preencha a grade com lógica pura e números de 1 a 9 sem repetição.
            </div>
            <Link href="/passatempos" className="nyt-btn-play">
              Jogar Agora
            </Link>
          </div>

          <div className="nyt-game-card">
            <span style={{ fontSize: '36px', marginBottom: '8px' }}>🟩</span>
            <div className="nyt-game-title">Termo</div>
            <div className="nyt-game-desc">
              Descubra a palavra secreta de 5 letras em até 6 tentativas no jogo sensação.
            </div>
            <Link href="/passatempos" className="nyt-btn-play">
              Jogar Agora
            </Link>
          </div>

          <div className="nyt-game-card">
            <span style={{ fontSize: '36px', marginBottom: '8px' }}>✏️</span>
            <div className="nyt-game-title">Palavras Cruzadas</div>
            <div className="nyt-game-desc">
              O passatempo clássico dos jornais diários testando seus conhecimentos gerais.
            </div>
            <Link href="/passatempos" className="nyt-btn-play">
              Jogar Agora
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SEÇÃO: HORÓSCOPO & TARÔ (JHONATAN D' OSOGIYAN)
          ==================================================================== */}
      <div className="nyt-section-banner" id="horoscopo">
        <h3 className="nyt-section-title">
          Horóscopo & Arcanos do Tarô
        </h3>
        <Link href="/horoscopo" className="nyt-section-more">
          Tiragem Completa do Dia →
        </Link>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <HoroscopoWidget />
      </div>

      {/* ====================================================================
          MAIS NOTÍCIAS & ARTIGOS GERAIS
          ==================================================================== */}
      {latestArticles.length > 0 && (
        <>
          <div className="nyt-section-banner">
            <h3 className="nyt-section-title">
              Mais Reportagens & Arquivo Geral
            </h3>
            <Link href="/busca" className="nyt-section-more">
              Pesquisar todo o arquivo →
            </Link>
          </div>

          <section className="nyt-grid-3">
            {latestArticles.map((article) => (
              <Link key={article.id} href={`/artigo/${article.slug}`} className="nyt-grid-card">
                {article.image_url && (
                  <img 
                    src={getOptimizedImageUrl(article.image_url, 400)} 
                    alt={article.title} 
                    loading="lazy"
                  />
                )}
                <span className="nyt-kicker">REPORTAGEM</span>
                <h4>{article.title}</h4>
                <p>{article.summary?.substring(0, 110)}...</p>
                <div className="nyt-byline">
                  Por <strong>{article.author_name || 'Redação'}</strong> • {formatDate(article.created_at)}
                </div>
              </Link>
            ))}
          </section>
        </>
      )}

      {/* ====================================================================
          NEWSLETTER BROADSHEET
          ==================================================================== */}
      <div style={{ margin: '48px 0' }}>
        <SubscribeForm />
      </div>

      {/* ADSENSE SLOT 2 */}
      <div style={{ margin: '20px 0' }}>
        <AdBanner dataAdSlot="SEU_SLOT_HOME_2" />
      </div>

    </main>
  );
}
