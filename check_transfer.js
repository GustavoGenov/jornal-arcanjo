const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nisbarqzsjqylsvnyxrm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY');

async function listEligible() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, slug, author_name, created_at, category_id, categories(name, slug)');

  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  const excludedSlugs = ['ia-e-agentes', 'ciencia-e-espaco', 'tech-e-gaming', 'engenharia-e-hardware'];
  
  const eligible = articles.filter(a => !excludedSlugs.includes(a.categories?.slug));
  console.log('Total eligible articles to transfer:', eligible.length);
  eligible.forEach((a, i) => {
    console.log((i + 1) + '. [' + (a.categories?.slug || 'none') + '] ' + a.title + ' (Autor: ' + a.author_name + ')');
  });
}

listEligible();
