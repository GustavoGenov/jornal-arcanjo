import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import '../../page.module.css';
import { notFound, redirect } from 'next/navigation';
import AdBanner from '@/components/AdBanner';
import PageTracker from '../../components/PageTracker';
import HoroscopoWidget from '../../components/HoroscopoWidget';
import GamesBlock from '../../components/GamesBlock';
import { getOptimizedImageUrl } from '@/lib/imageHelper';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Metadados dinâmicos para a página da categoria
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  if (slug === 'clima' || slug === 'clima-tempo') {
    return {
      title: 'Clima tempo | Jornal Arcanjo',
      description: 'Previsão do tempo atualizada e reportagens climáticas.',
      alternates: {
        canonical: 'https://jornalarcanjo.com.br/clima',
      },
    };
  }

  if (slug === 'horoscopo' || slug === 'horoscopo-taro' || slug === 'horoscopo-e-taro') {
    return {
      title: 'Horóscopo & Tarô | Jornal Arcanjo',
      description: 'Horóscopo diário dos 12 signos e tiragem do Tarô de Marselha com Pai Jhonatan.',
      alternates: {
        canonical: 'https://jornalarcanjo.com.br/horoscopo',
      },
    };
  }

  let categoryName = '';
  const { data: category } = await supabase
    .from('categories')
    .select('name')
    .eq('slug', slug)
    .single();
  if (!category) return { title: 'Categoria não encontrada | Jornal Arcanjo' };
  categoryName = category.name;

  const categoryUrl = `https://jornalarcanjo.com.br/categoria/${slug}`;

  return {
    title: `${categoryName} | Jornal Arcanjo`,
    description: `Últimas notícias sobre ${categoryName} no Jornal Arcanjo.`,
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  if (slug === 'clima' || slug === 'clima-tempo') {
    redirect('/clima');
  }

  if (slug === 'horoscopo' || slug === 'horoscopo-taro' || slug === 'horoscopo-e-taro') {
    redirect('/horoscopo');
  }

  if (slug === 'passatempos') {
    redirect('/passatempos');
  }

  // Busca a categoria no banco de dados
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!category) notFound();

  if (category.slug === 'religiao') {
    category.color_code = '#8e24aa';
  }

  // Busca os artigos desta categoria específica
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`id, title, slug, created_at, image_url, summary, author_name, categories(name, slug, color_code)`)
    .eq('published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false });



  return (
    <main className="container">
      <PageTracker categoryId={category.id} />
      
      <div className="section-title" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <h2>
          <span style={{ background: category.color_code || 'var(--accent)' }}></span>
          {category.name}
        </h2>
      </div>

      {category.slug === 'horoscopo-e-taro' && (
        <div style={{ marginBottom: '40px' }}>
          <HoroscopoWidget />
        </div>
      )}

      {category.slug === 'tech-e-gaming' && (
        <div style={{ marginBottom: '40px' }}>
          <GamesBlock />
        </div>
      )}

      <div className="articles-grid">
        {error ? (
          <p>Erro ao carregar notícias: {error.message}</p>
        ) : articles && articles.length > 0 ? (
          articles.map((article, index) => (
            <Link key={article.id} href={`/artigo/${article.slug}`} className="card">
              <div className="card-img-wrap">
                {getOptimizedImageUrl(article.image_url) ? (
                  <img 
                    src={getOptimizedImageUrl(article.image_url, 400)} 
                    alt={article.title} 
                    width="400"
                    height="225"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "low"}
                    decoding="async"
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--border)' }}>
                    <span className="material-icons-extended" style={{ fontSize: '32px', color: 'var(--text-muted)' }}>image</span>
                  </div>
                )}
              </div>

              <div className="card-body">
                <span className="category" style={{ color: category.color_code || 'var(--accent)' }}>
                  {category.name}
                </span>
                <h3>{article.title}</h3>
                <p>
                  {article.summary?.length > 120 ? article.summary.substring(0, 120) + '...' : article.summary}
                </p>
                <div className="meta">
                  <span>{article.author_name || 'Voz da I.A'}</span>
                  <span>•</span>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
           <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
              <span className="material-icons-extended" style={{ fontSize: '48px', color: 'var(--border)', marginBottom: '16px' }}>article</span>
              <h2>Nenhum artigo publicado ainda nesta categoria.</h2>
          </div>
        )}
      </div>

      {/* AdSense Slot */}
      <AdBanner dataAdSlot="SEU_SLOT_CATEGORY" />
    </main>
  );
}
