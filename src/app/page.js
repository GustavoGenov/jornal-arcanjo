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
    .select(`id, title, slug, created_at, image_url, summary, content, author_name, featured_position, categories(name, slug, color_code)`)
    .eq('published', true)
    .order('created_at', { ascending: false });

  // Lista de colunistas oficiais com fotos e editorias para a coluna "Opinião & Vozes" (estilo NYT Opinion)
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
            O portal está conectado ao novo banco de dados. Assim que executar o script SQL no Supabase, as editorias oficiais e matérias aparecerão instantaneamente nesta edição broadsheet.
          </p>
          <Link href="/admin" className="nyt-btn-play">
            Acessar Painel de Redação
          </Link>
        </div>
      </main>
    );
  }

  // 1. Manchete Principal (Centro do NYT)
  const heroMainPinned = articles.find(a => a.featured_position === 'hero_main');
  const leadArticle = heroMainPinned || articles[0];

  // 2. Coluna Esquerda: Notícias Analíticas e Breves (2 a 3 matérias)
  const leftColumnArticles = articles
    .filter(a => a.id !== leadArticle?.id)
    .slice(0, 3);

  const usedInFoldIds = new Set([leadArticle?.id, ...leftColumnArticles.map(a => a.id)]);

  // 3. Bloco: Formiga em Foco & Sociedade (Gustavo de Castro)
  const formigaArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    (
      a.categories?.slug?.includes('formiga') ||
      a.title?.toLowerCase().includes('formiga') ||
      a.summary?.toLowerCase().includes('formiga')
    )
  ).slice(0, 3);

  // 4. Bloco: Cultura e Filosofia (Daiene Meneses)
  const culturaArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    (
      a.categories?.slug?.includes('cultura') ||
      a.categories?.slug?.includes('filosofia')
    )
  ).slice(0, 3);

  // 5. Bloco: Saúde e Bem-Estar (Beatriz Freire)
  const saudeArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    (
      a.categories?.slug?.includes('saude') ||
      a.categories?.slug?.includes('bem-estar')
    )
  ).slice(0, 3);

  // 6. Bloco: Religião & Tradições (RuiWenceslau)
  const religiaoArticles = articles.filter(a => 
    !usedInFoldIds.has(a.id) &&
    !formigaArticles.some(f => f.id === a.id) &&
    !culturaArticles.some(c => c.id === a.id) &&
    !saudeArticles.some(s => s.id === a.id) &&
    a.categories?.slug?.includes('religiao')
  ).slice(0, 3);

  // 7. Demais notícias (Feed geral)
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
          1. THE LEAD BROADSHEET PACKAGE (ESTRUTURA EM 3 COLUNAS DO NYT)
          - Coluna Esquerda: Notícias Analíticas / Briefs
          - Coluna Central: A Grande Manchete do Jornal com Foto e Lead
          - Coluna Direita: As Colunas & Opinião (The NYT Opinion Voices)
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
            <span className="nyt-kicker" style={{ color: '#0284c7' }}>
              {leadArticle.categories?.name || 'MANCHETE DESTAQUE'}
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
                <img 
                  src={getOptimizedImageUrl(leadArticle.image_url, 900)}
                  srcSet={getImageSrcSet(leadArticle.image_url)}
                  sizes="(max-width: 768px) 100vw, 700px"
                  alt={leadArticle.title}
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="nyt-media-caption">
                  {leadArticle.image_credits || 'Foto: Arquivo / Ilustração Jornal Arcanjo'}
                </div>
              </div>
            )}
          </article>
        </div>

        {/* COLUNA DIREITA: AS COLUNAS & OPINIÃO (ESTILO NYT OPINION) */}
        <aside className="nyt-col-right">
          <div className="nyt-opinion-header">
            <h3>OPINIÃO & COLUNISTAS</h3>
          </div>

          {columnistsList.map((col, idx) => (
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
          2. SEÇÃO BROADSHEET: FORMIGA EM FOCO & SOCIEDADE (GUSTAVO DE CASTRO)
          ==================================================================== */}
      <div className="nyt-section-banner" id="formiga-em-foco">
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
          3. SEÇÃO BROADSHEET: CULTURA E FILOSOFIA (DAIENE MENESES)
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
              <span className="nyt-kicker">ENSÁIO & PENSAMENTO</span>
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
          4. SEÇÃO: SAÚDE E BEM-ESTAR (BEATRIZ FREIRE)
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
          5. SEÇÃO: RELIGIÃO & TRADIÇÕES DE FÉ (RUIWENCESLAU)
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
          6. SEÇÃO NYT GAMES / PASSATEMPOS (CURADORIA DE KAELARA)
          Inspirada diretamente no famoso The New York Times Games
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
          7. SEÇÃO: HORÓSCOPO & TARÔ (JHONATAN D' OSOGIYAN)
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
          8. MAIS NOTÍCIAS & ARTIGOS GERAIS
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
          9. NEWSLETTER BROADSHEET
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
