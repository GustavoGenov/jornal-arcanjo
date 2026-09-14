const { createClient } = require('@supabase/supabase-js');
const sourceClient = createClient('https://nisbarqzsjqylsvnyxrm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY');

async function inspectAll() {
  const { data: articles } = await sourceClient
    .from('articles')
    .select('id, title, slug, summary, author_name, category_id, categories(name, slug)');

  const excluded = ['ia-e-agentes', 'ciencia-e-espaco', 'tech-e-gaming', 'engenharia-e-hardware'];

  const transferList = [];
  const excludedList = [];

  for (const a of articles) {
    const slug = a.categories?.slug || '';
    if (excluded.includes(slug)) {
      excludedList.push({ title: a.title, cat: slug });
    } else {
      transferList.push({ title: a.title, cat: slug, author: a.author_name, slug: a.slug });
    }
  }

  console.log("=== ARTIGOS A TRANSFERIR PARA JORNAL ARCANJO (" + transferList.length + ") ===");
  transferList.forEach((t, i) => {
    console.log(`${i+1}. [${t.cat}] ${t.title} (${t.author})`);
  });

  console.log("\n=== ARTIGOS EXCLUÍDOS (" + excludedList.length + ") ===");
  excludedList.forEach((e, i) => {
    console.log(`${i+1}. [${e.cat}] ${e.title}`);
  });
}

inspectAll();
