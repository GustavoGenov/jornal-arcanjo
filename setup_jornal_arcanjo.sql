-- ============================================================================
-- SCRIPT DE INICIALIZAÇÃO COMPLETA: JORNAL ARCANJO
-- Supabase Project Ref: hiaoasipxkxsjcoshscu
-- Data: Setembro de 2026
-- ============================================================================

-- 1. Extensões Essenciais
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Tabela de Categorias (Blocos Editoriais)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    color_code TEXT DEFAULT '#1e3a8a',
    views INTEGER DEFAULT 0
);

-- 3. Tabela de Artigos
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    content TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    author TEXT,
    author_name TEXT,
    fact_check_status TEXT DEFAULT 'verified',
    views INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true,
    image_url TEXT,
    image_credit TEXT,
    image_credits TEXT,
    image_alt TEXT,
    disclaimer_type TEXT DEFAULT 'informativa',
    sources TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_position TEXT DEFAULT 'none'
);

-- 4. Tabela de Métricas / Page Views
CREATE TABLE IF NOT EXISTS public.page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    path TEXT NOT NULL
);

-- 5. Tabela de Inscritos da Newsletter
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 6. Tabela de Comentários
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT true
);

-- 7. Índices de Alta Performance para Busca e Ordenação
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON public.articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON public.articles(featured_position);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON public.page_views(path);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON public.page_views(created_at DESC);

-- 8. Habilitar Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 9. Políticas de Acesso RLS
-- Categorias: leitura livre, gravação administrativa
DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin all categories" ON public.categories;
CREATE POLICY "Admin all categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);

-- Artigos: leitura pública e controle administrativo
DROP POLICY IF EXISTS "Public read articles" ON public.articles;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin all articles" ON public.articles;
CREATE POLICY "Admin all articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

-- Page Views: inserção pública permitida
DROP POLICY IF EXISTS "Public insert page_views" ON public.page_views;
CREATE POLICY "Public insert page_views" ON public.page_views FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin all page_views" ON public.page_views;
CREATE POLICY "Admin all page_views" ON public.page_views FOR ALL USING (true) WITH CHECK (true);

-- Newsletter: cadastro de novos inscritos
DROP POLICY IF EXISTS "Public insert subscribers" ON public.subscribers;
CREATE POLICY "Public insert subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin all subscribers" ON public.subscribers;
CREATE POLICY "Admin all subscribers" ON public.subscribers FOR ALL USING (true) WITH CHECK (true);

-- Comentários: leitura de aprovados e envio de novos
DROP POLICY IF EXISTS "Public read comments" ON public.comments;
CREATE POLICY "Public read comments" ON public.comments FOR SELECT USING (approved = true);

DROP POLICY IF EXISTS "Public insert comments" ON public.comments;
CREATE POLICY "Public insert comments" ON public.comments FOR INSERT WITH CHECK (true);

-- 10. Bucket de Armazenamento de Imagens
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Políticas de Storage para o Bucket de Imagens
DROP POLICY IF EXISTS "Public images read" ON storage.objects;
CREATE POLICY "Public images read" ON storage.objects FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Public images insert" ON storage.objects;
CREATE POLICY "Public images insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');

DROP POLICY IF EXISTS "Public images update" ON storage.objects;
CREATE POLICY "Public images update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Public images delete" ON storage.objects;
CREATE POLICY "Public images delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');

-- 11. Cadastro dos 7 Blocos / Categorias Oficiais do Jornal Arcanjo
INSERT INTO public.categories (name, slug, color_code, views) VALUES
('Formiga em Foco & Sociedade', 'formiga-sociedade', '#0284c7', 0),
('Cultura e Filosofia', 'cultura-filosofia', '#7c3aed', 0),
('Saúde e Bem-Estar', 'saude-bem-estar', '#059669', 0),
('Clima tempo', 'clima-tempo', '#0ea5e9', 0),
('Horóscopo & Tarô', 'horoscopo-taro', '#d97706', 0),
('Passatempos', 'passatempos', '#ea580c', 0),
('Religião', 'religiao', '#b45309', 0)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, color_code = EXCLUDED.color_code;
