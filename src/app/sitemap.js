/**
 * ============================================================================
 * JORNAL ARCANJO — SITEMAP XML DINÂMICO
 * ============================================================================
 * Gerador oficial de sitemap.xml do App Router do Next.js para indexação
 * nos motores de busca (Google, Bing, DuckDuckGo).
 * 
 * Regras de SEO & Rastreabilidade:
 * 1. Prioridades Hierárquicas:
 *    - Capa: 1.0 (always)
 *    - Artigos / Reportagens: 0.9 (daily)
 *    - Editorias e Páginas Especiais: 0.8 (hourly / monthly)
 *    - Termos e Privacidade: 0.5 (yearly)
 * 2. Prevenção de Soft 404: Apenas categorias com matérias publicadas são indexadas.
 * 3. `lastModified` Dinâmico: Utiliza timestamps reais de atualização (`updated_at`).
 * 
 * @module src/app/sitemap
 * @returns {Promise<import('next').MetadataRoute.Sitemap>}
 */

import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Cache de 5 minutos

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jornal-arcanjo.vercel.app';
  
  try {
    // 1. Busca os últimos 10.000 artigos publicados
    const { data: articles, error: artError } = await supabase
      .from('articles')
      .select('id, slug, category_id, created_at, updated_at')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(10000);

    const latestArticleDate = articles && articles.length > 0
      ? new Date(articles[0].updated_at || articles[0].created_at).toISOString()
      : new Date().toISOString();

    // 2. Rotas institucionais e editoriais fixas
    const routes = [
      {
        url: baseUrl,
        lastModified: latestArticleDate,
        changeFrequency: 'always',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/sobre`,
        lastModified: '2026-09-01T12:00:00.000Z',
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/equipe`,
        lastModified: '2026-09-01T12:00:00.000Z',
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/clima`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/horoscopo`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/termos`,
        lastModified: '2026-08-01T12:00:00.000Z',
        changeFrequency: 'yearly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/politica-de-privacidade`,
        lastModified: '2026-08-01T12:00:00.000Z',
        changeFrequency: 'yearly',
        priority: 0.5,
      },
    ];

    // 3. Adiciona URLs individuais de artigos
    if (!artError && articles) {
      const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/artigo/${article.slug}`,
        lastModified: new Date(article.updated_at || article.created_at).toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));
      routes.push(...articleRoutes);

      // 4. Mapeia categorias ativas que contêm artigos (Prevenção de Soft 404)
      const usedCategoryIds = new Set(articles.map(a => a.category_id).filter(Boolean));
      
      const { data: categories } = await supabase
        .from('categories')
        .select('id, slug');

      if (categories) {
        const activeCategories = categories.filter(c => usedCategoryIds.has(c.id) && c.slug !== 'clima-tempo' && c.slug !== 'horoscopo-e-taro');
        const categoryRoutes = activeCategories.map((cat) => {
          const latestCatArticle = articles.find(a => a.category_id === cat.id);
          const catLastMod = latestCatArticle 
            ? new Date(latestCatArticle.updated_at || latestCatArticle.created_at).toISOString() 
            : latestArticleDate;

          return {
            url: `${baseUrl}/categoria/${cat.slug}`,
            lastModified: catLastMod,
            changeFrequency: 'hourly',
            priority: 0.8,
          };
        });
        routes.push(...categoryRoutes);
      }
    }

    return routes;
  } catch (err) {
    console.error('Erro ao gerar rotas no sitemap:', err);
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'always',
        priority: 1.0,
      }
    ];
  }
}
