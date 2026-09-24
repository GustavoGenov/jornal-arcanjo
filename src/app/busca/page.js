/**
 * ============================================================================
 * JORNAL ARCANJO — BUSCA DE MATÉRIAS & ARQUIVO JORNALÍSTICO
 * ============================================================================
 * Motor de pesquisa textual que permite aos leitores encontrar reportagens,
 * artigos de opinião e ensaios históricos por palavras-chave.
 * 
 * @module src/app/busca/page
 */

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { getOptimizedImageUrl } from '@/lib/imageHelper';

export const revalidate = 0; // Página dinâmica baseada em searchParams

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const query = params.q || '';
  const title = query ? `Busca por "${query}" | Jornal Arcanjo` : 'Busca de Notícias | Jornal Arcanjo';
  return {
    title,
    description: 'Pesquise notícias verificadas, cultura, sociedade e fatos no Jornal Arcanjo.',
    alternates: {
      canonical: 'https://jornal-arcanjo.vercel.app/busca',
    },
  };
}

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
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export default async function BuscaPage({ searchParams }) {
  const params = await searchParams;
  const query = params.q || '';
  
  let articles = [];
  
  if (query) {
    // Busca por título ou resumo usando OR
    const { data } = await supabase
      .from('articles')
      .select('id, title, slug, created_at, image_url, summary, author_name, categories(name, slug, color_code)')
      .eq('published', true)
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
      .order('created_at', { ascending: false });
      
    articles = data || [];
  }

  return (
    <main className="container" style={{ padding: '40px 16px', minHeight: '60vh' }}>
      <div className="section-title">
        <h2>
          <span style={{ background: '#3b82f6' }}></span> 
          Resultados da Busca
        </h2>
      </div>

      <p style={{ marginBottom: '32px', color: 'var(--text-muted)' }}>
        {query ? `Mostrando resultados para: "${query}"` : 'Digite algo no campo de busca para encontrar notícias.'}
      </p>

      {articles.length === 0 && query ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--border)', marginBottom: '16px' }}>search_off</span>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: '8px' }}>Nenhum resultado encontrado</h3>
          <p style={{ color: 'var(--text-muted)' }}>Não encontramos nenhuma notícia que contenha &ldquo;{query}&rdquo;. Tente buscar por outros termos.</p>
        </div>
      ) : (
        <section className="articles-grid">
          {articles.map((article) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="card">
              <div className="card-img-wrap">
                {getOptimizedImageUrl(article.image_url) ? (
                  <>
                    <div 
                      className="img-ambient-backdrop" 
                      style={{ backgroundImage: `url(${getOptimizedImageUrl(article.image_url, 400)})` }} 
                    />
                    <img 
                      src={getOptimizedImageUrl(article.image_url, 400)} 
                      alt={article.title} 
                      width="400"
                      height="225"
                      loading="lazy"
                      decoding="async"
                    />
                  </>
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)' }}>
                    <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--text-muted)' }}>image</span>
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
      )}
    </main>
  );
}
