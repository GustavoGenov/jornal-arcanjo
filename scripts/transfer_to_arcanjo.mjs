import { createClient } from '@supabase/supabase-js';

const VOZ_URL = 'https://nisbarqzsjqylsvnyxrm.supabase.co';
const VOZ_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY';
const ARCANJO_URL = 'https://hiaoasipxkxsjcoshscu.supabase.co';
const ARCANJO_KEY = 'sb_publishable_wy-86kCcCmauHuKE5p4chA_NA-_uV4l';

const voz = createClient(VOZ_URL, VOZ_KEY);
const arcanjo = createClient(ARCANJO_URL, ARCANJO_KEY);

const specificSlugs = [
  'a-muralha-de-laquis-a-arqueologia-que-confronta-o-ceticismo-biblico',
  'a-ciencia-do-fim-da-guerra-como-a-odontologia-forense-e-arquivos-desclassificados-confirmaram-a-morte-de-hitler-em-berlim',
  'a-ilusao-do-sobrevivencialismo-moderno-10-motivos-pelos-quais-voce-nao-sobreviveria-na-selva',
  'ciencia-e-fe-podem-coexistir-a-arqueologia-que-tira-a-biblia-do-papel-e-a-coloca-na-terra'
];

// IDs de categorias no Jornal Arcanjo
const ARCANJO_CATS = {
  formiga: '632343fa-543e-42ee-a581-67ca87f7fe4e', // Formiga em Foco & Sociedade
  cultura: 'e26f7f6f-945b-4661-9091-23555b05be2e', // Cultura e Filosofia
  saude: '83e3da1c-ee8b-4be6-947e-e459039f9205',   // Saúde e Bem-Estar
  religiao: '4236a48c-be43-4217-9884-87e79e4e5ff3' // Religião
};

async function runTransfer() {
  console.log('--- INICIANDO MIGRAÇÃO DE MATÉRIAS PARA O JORNAL ARCANJO ---');

  // 1. Buscar matérias da categoria formiga-mg no Voz da IA
  const { data: formigaCat } = await voz.from('categories').select('id, slug').eq('slug', 'formiga-mg').single();
  let formigaArticles = [];
  if (formigaCat) {
    const { data: fArts } = await voz.from('articles').select('*').eq('category_id', formigaCat.id);
    formigaArticles = fArts || [];
  }
  console.log(`Encontrados ${formigaArticles.length} artigos na categoria Formiga MG do Voz da I.A.`);

  // 2. Buscar matérias específicas no Voz da IA
  const { data: specArticles } = await voz.from('articles').select('*').in('slug', specificSlugs);
  console.log(`Encontrados ${specArticles?.length || 0} artigos específicos no Voz da I.A.`);

  const allArticlesToTransfer = [...formigaArticles, ...(specArticles || [])];
  // Deduplicar por id/slug
  const uniqueArticles = Array.from(new Map(allArticlesToTransfer.map(a => [a.slug, a])).values());
  console.log(`Total único para migrar para o Arcanjo: ${uniqueArticles.length} matérias.`);

  let insertedCount = 0;
  for (const art of uniqueArticles) {
    let destCatId = ARCANJO_CATS.formiga;

    if (art.slug === 'a-muralha-de-laquis-a-arqueologia-que-confronta-o-ceticismo-biblico' ||
        art.slug === 'ciencia-e-fe-podem-coexistir-a-arqueologia-que-tira-a-biblia-do-papel-e-a-coloca-na-terra') {
      destCatId = ARCANJO_CATS.religiao;
    } else if (art.slug === 'a-ciencia-do-fim-da-guerra-como-a-odontologia-forense-e-arquivos-desclassificados-confirmaram-a-morte-de-hitler-em-berlim') {
      destCatId = ARCANJO_CATS.cultura;
    } else if (art.slug === 'a-ilusao-do-sobrevivencialismo-moderno-10-motivos-pelos-quais-voce-nao-sobreviveria-na-selva') {
      destCatId = ARCANJO_CATS.saude;
    }

    const payload = {
      ...art,
      category_id: destCatId
    };

    const { data, error } = await arcanjo.from('articles').upsert(payload, { onConflict: 'slug' }).select('id, slug, title');
    if (error) {
      console.error(`Erro ao inserir no Arcanjo [${art.slug}]:`, error.message);
    } else {
      insertedCount++;
      console.log(`[SUCESSO] ${art.slug} inserido/atualizado no Arcanjo.`);
    }
  }

  console.log(`\nMigração concluída! ${insertedCount} matérias agora estão ativas no Jornal Arcanjo.`);
}

runTransfer();
