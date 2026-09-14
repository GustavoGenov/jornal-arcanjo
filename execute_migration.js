const { createClient } = require('@supabase/supabase-js');

const sourceUrl = 'https://nisbarqzsjqylsvnyxrm.supabase.co';
const sourceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY';
const targetUrl = 'https://hiaoasipxkxsjcoshscu.supabase.co';
const targetKey = 'sb_publishable_wy-86kCcCmauHuKE5p4chA_NA-_uV4l';

const srcClient = createClient(sourceUrl, sourceKey);
const tgtClient = createClient(targetUrl, targetKey);

async function run() {
  const { data: srcArticles, error: err1 } = await srcClient
    .from('articles')
    .select('*, categories(slug, name)');

  if (err1) {
    console.error('Error fetching source articles:', err1);
    return;
  }

  const excludedSlugs = ['ia-e-agentes', 'ciencia-e-espaco', 'tech-e-gaming', 'engenharia-e-hardware'];
  const eligible = srcArticles.filter(a => !excludedSlugs.includes(a.categories?.slug));
  console.log('Total source articles:', srcArticles.length);
  console.log('Eligible articles to migrate:', eligible.length);

  // Target category ID for Cultura e Filosofia
  const TARGET_CAT_ID = 'e26f7f6f-945b-4661-9091-23555b05be2e';

  let successCount = 0;
  for (const art of eligible) {
    // Sanitize mentions of Voz da I.A to Jornal Arcanjo
    const cleanContent = (art.content || '')
      .replace(/Voz da I\.?A\.?/gi, 'Jornal Arcanjo')
      .replace(/vozdaia\.com/gi, 'jornalarcanjo.com');

    const cleanTitle = (art.title || '')
      .replace(/Voz da I\.?A\.?/gi, 'Jornal Arcanjo');

    const cleanSummary = (art.summary || '')
      .replace(/Voz da I\.?A\.?/gi, 'Jornal Arcanjo');

    const newArticle = {
      title: cleanTitle,
      slug: art.slug,
      summary: cleanSummary,
      content: cleanContent,
      category_id: TARGET_CAT_ID,
      author: art.author || art.author_name || 'Redação Arcanjo',
      author_name: art.author_name || art.author || 'Redação Arcanjo',
      fact_check_status: art.fact_check_status || 'verified',
      views: art.views || 0,
      published: true,
      image_url: art.image_url,
      image_credit: art.image_credit,
      image_credits: art.image_credits,
      image_alt: art.image_alt,
      disclaimer_type: art.disclaimer_type || 'opiniao',
      sources: art.sources || null,
      meta_title: (art.meta_title || cleanTitle).replace(/Voz da I\.?A\.?/gi, 'Jornal Arcanjo'),
      meta_description: (art.meta_description || cleanSummary).replace(/Voz da I\.?A\.?/gi, 'Jornal Arcanjo'),
      featured_position: art.featured_position || 'none',
      created_at: art.created_at || new Date().toISOString(),
      updated_at: art.updated_at || new Date().toISOString()
    };

    const { data: upsertData, error: upsertErr } = await tgtClient
      .from('articles')
      .upsert(newArticle, { onConflict: 'slug' })
      .select();

    if (upsertErr) {
      console.error('Failed to migrate slug: ' + art.slug, upsertErr.message);
    } else {
      successCount++;
      console.log(`[OK] Migrated (${successCount}/${eligible.length}): ${art.slug} - Author: ${newArticle.author_name}`);
    }
  }

  console.log(`Finished migration! Successfully migrated ${successCount} of ${eligible.length} articles.`);
}

run();
