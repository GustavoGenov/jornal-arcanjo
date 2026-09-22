import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hiaoasipxkxsjcoshscu.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_wy-86kCcCmauHuKE5p4chA_NA-_uV4l';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getTodayString() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const backupDate = getTodayString();
const backupFolder = path.resolve('D:/Backup_Projetos/Backups_Completos', `JornalArcanjo_Backup_${backupDate}`);
const dbFolder = path.join(backupFolder, 'database');
const storageImgFolder = path.join(dbFolder, 'supabase_storage_images');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download ${url}: HTTP status ${res.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function sqlEscape(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    const escapedArr = val.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
    return `'${escapedArr}'`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function runBackup() {
  console.log('====================================================');
  console.log(`INICIANDO BACKUP COMPLETO DO JORNAL ARCANJO (${backupDate})`);
  console.log('Pasta destino:', backupFolder);
  console.log('====================================================\n');

  fs.mkdirSync(storageImgFolder, { recursive: true });

  // 1. Exportar Categorias
  console.log('1. Exportando categorias do Supabase...');
  const { data: categories, error: errCat } = await supabase.from('categories').select('*').order('id', { ascending: true });
  if (errCat) throw new Error('Erro ao buscar categorias: ' + errCat.message);
  
  fs.writeFileSync(path.join(dbFolder, 'categories.json'), JSON.stringify(categories, null, 2), 'utf-8');
  console.log(`   ✓ ${categories.length} categorias exportadas para database/categories.json`);

  // 2. Exportar Artigos
  console.log('\n2. Exportando artigos do Supabase...');
  const { data: articles, error: errArt } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
  if (errArt) throw new Error('Erro ao buscar artigos: ' + errArt.message);

  fs.writeFileSync(path.join(dbFolder, 'articles.json'), JSON.stringify(articles, null, 2), 'utf-8');
  console.log(`   ✓ ${articles.length} artigos exportados para database/articles.json`);

  // 3. Gerar Script SQL de Restauração
  console.log('\n3. Gerando script SQL de restauração (restore_database.sql)...');
  let sql = `-- BACKUP COMPLETO DO BANCO DE DADOS JORNAL ARCANJO\n-- Gerado em: ${new Date().toISOString()}\n\n`;
  
  // Categorias
  sql += `-- ==========================================\n-- CATEGORIAS (${categories.length} registros)\n-- ==========================================\n`;
  if (categories && categories.length > 0) {
    const catCols = Object.keys(categories[0]);
    const catUpdateCols = catCols.filter(c => c !== 'id').map(c => `${c} = EXCLUDED.${c}`).join(', ');
    for (const c of categories) {
      const vals = catCols.map(col => sqlEscape(c[col])).join(', ');
      sql += `INSERT INTO categories (${catCols.join(', ')}) VALUES (${vals}) ON CONFLICT (id) DO UPDATE SET ${catUpdateCols};\n`;
    }
  }

  // Artigos
  sql += `\n-- ==========================================\n-- ARTIGOS (${articles.length} registros)\n-- ==========================================\n`;
  if (articles && articles.length > 0) {
    const artCols = Object.keys(articles[0]);
    const artUpdateCols = artCols.filter(c => c !== 'id').map(c => `${c} = EXCLUDED.${c}`).join(', ');
    for (const a of articles) {
      const vals = artCols.map(col => sqlEscape(a[col])).join(', ');
      sql += `INSERT INTO articles (${artCols.join(', ')}) VALUES (${vals}) ON CONFLICT (id) DO UPDATE SET ${artUpdateCols};\n`;
    }
  }

  // Tabelas adicionais caso existam
  const additionalTables = ['admins', 'page_views', 'tags', 'article_tags'];
  for (const t of additionalTables) {
    try {
      const { data: tData, error: tErr } = await supabase.from(t).select('*');
      if (!tErr && tData && tData.length > 0) {
        fs.writeFileSync(path.join(dbFolder, `${t}.json`), JSON.stringify(tData, null, 2), 'utf-8');
        sql += `\n-- ==========================================\n-- ${t.toUpperCase()} (${tData.length} registros)\n-- ==========================================\n`;
        const tCols = Object.keys(tData[0]);
        for (const row of tData) {
          const vals = tCols.map(col => sqlEscape(row[col])).join(', ');
          sql += `INSERT INTO ${t} (${tCols.join(', ')}) VALUES (${vals}) ON CONFLICT DO NOTHING;\n`;
        }
        console.log(`   ✓ Tabela ${t} exportada (${tData.length} registros).`);
      }
    } catch {
      // Ignora tabelas inexistentes
    }
  }

  fs.writeFileSync(path.join(dbFolder, 'restore_database.sql'), sql, 'utf-8');
  console.log(`   ✓ Script SQL gerado (${(sql.length / 1024).toFixed(1)} KB) com todas as categorias e matérias.`);

  // 4. Download das Imagens do Storage do Supabase
  console.log('\n4. Verificando e baixando imagens hospedadas no bucket do Supabase...');
  const remoteImages = articles.filter(a => a.image_url && a.image_url.includes('supabase.co/storage'));
  console.log(`   Identificadas ${remoteImages.length} imagens no Supabase Storage.`);

  const imageManifest = [];
  for (let i = 0; i < remoteImages.length; i++) {
    const art = remoteImages[i];
    try {
      const fileName = path.basename(new URL(art.image_url).pathname);
      const destPath = path.join(storageImgFolder, fileName);
      await downloadFile(art.image_url, destPath);
      imageManifest.push({
        article_id: art.id,
        article_title: art.title,
        remote_url: art.image_url,
        local_backup_file: fileName,
        status: 'downloaded'
      });
      console.log(`   [${i + 1}/${remoteImages.length}] Baixado: ${fileName}`);
    } catch (err) {
      console.warn(`   [${i + 1}/${remoteImages.length}] Falha ao baixar ${art.image_url}: ${err.message}`);
      imageManifest.push({
        article_id: art.id,
        article_title: art.title,
        remote_url: art.image_url,
        status: 'failed: ' + err.message
      });
    }
  }

  fs.writeFileSync(path.join(storageImgFolder, 'manifest.json'), JSON.stringify(imageManifest, null, 2), 'utf-8');
  console.log(`   ✓ Manifesto de imagens do storage salvo em manifest.json`);

  // 5. Copiar Código-Fonte e Assets Locais
  console.log('\n5. Copiando código-fonte, assets e configurações...');
  
  function copyDir(src, dest) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git' || entry.name === '.vercel' || entry.name === 'scratch') continue;
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  // Copiar pastas principais
  const foldersToCopy = ['src', 'public', 'scripts', 'supabase'];
  for (const folder of foldersToCopy) {
    copyDir(path.join(projectRoot, folder), path.join(backupFolder, folder));
    console.log(`   ✓ Pasta ${folder}/ copiada.`);
  }

  // Copiar arquivos raiz relevantes
  const rootFiles = fs.readdirSync(projectRoot, { withFileTypes: true });
  for (const file of rootFiles) {
    if (file.isFile()) {
      const name = file.name;
      if (
        name.startsWith('.env') ||
        name.endsWith('.json') ||
        name.endsWith('.mjs') ||
        name.endsWith('.js') ||
        name.endsWith('.sql') ||
        name.endsWith('.md') ||
        name === '.npmrc'
      ) {
        fs.copyFileSync(path.join(projectRoot, name), path.join(backupFolder, name));
      }
    }
  }
  console.log('   ✓ Arquivos de configuração, documentação, rotinas e .env copiados.');

  // 6. Criar Relatório/Manifesto do Backup
  console.log('\n6. Criando MANIFESTO_BACKUP.md...');
  const manifestContent = `# MANIFESTO DE BACKUP COMPLETO - JORNAL ARCANJO
**Data do Backup:** ${new Date().toLocaleString('pt-BR')}
**URL de Produção:** https://jornal-arcanjo.vercel.app

---

## 1. Conteúdo do Banco de Dados (Supabase)
- **Total de Artigos:** ${articles.length} matérias salvas com texto completo, leads, slugs e metadados.
- **Total de Categorias:** ${categories.length} categorias.
- **Arquivos Gerados:**
  - \`database/articles.json\`: Conteúdo integral em formato JSON estruturado.
  - \`database/categories.json\`: Categorias em formato JSON estruturado.
  - \`database/restore_database.sql\`: Script SQL completo com instruções \`INSERT INTO ... ON CONFLICT\` pronto para restauração direta no Editor SQL do Supabase.
  - \`database/supabase_storage_images/\`: ${remoteImages.length} imagens baixadas diretamente do bucket de armazenamento do Supabase para preservação offline.

---

## 2. Código-Fonte e Assets da Aplicação
- \`src/\`: Todas as páginas, componentes (Next.js 16 App Router), rotas de API, SEO dinâmico, layouts e CSS.
- \`public/\`: Todas as imagens estáticas locais (\`public/articles/\`), fotos da equipe (\`public/equipe/\`), ícones, ads.txt e símbolos.
- \`scripts/\`: Scripts operacionais e de automação.
- \`supabase/\`: Funções Edge e regras do Supabase.
- Arquivos de Configuração: \`package.json\`, \`next.config.mjs\`, \`eslint.config.mjs\`, \`.env.local\`, \`.env.production\`, etc.

---

## 3. Instruções de Restauração
1. **Restaurar Código:**
   Basta clonar/copiar esta pasta para seu ambiente, rodar \`npm install\` e \`npm run dev\` (ou \`npm run build\`).
2. **Restaurar Banco de Dados:**
   - Acesse o painel do Supabase do Jornal Arcanjo.
   - Abra o **SQL Editor**.
   - Abra o arquivo \`database/restore_database.sql\`, copie o conteúdo e clique em **Run**. Todas as categorias e os ${articles.length} artigos serão recriados ou atualizados imediatamente.
`;

  fs.writeFileSync(path.join(backupFolder, 'MANIFESTO_BACKUP.md'), manifestContent, 'utf-8');
  console.log('   ✓ MANIFESTO_BACKUP.md gerado.');

  console.log('\n====================================================');
  console.log('BACKUP COMPLETO DO JORNAL ARCANJO CONCLUÍDO COM SUCESSO!');
  console.log('====================================================');
}

runBackup().catch(err => {
  console.error('ERRO FATAL NO BACKUP DO JORNAL ARCANJO:', err);
  process.exit(1);
});
