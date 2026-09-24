/**
 * ============================================================================
 * JORNAL ARCANJO — CLIENTE SUPABASE OFICIAL
 * ============================================================================
 * Inicializa a instância do cliente JavaScript do Supabase (@supabase/supabase-js)
 * para consultas no PostgreSQL gerenciado, autenticação de redatores e storage.
 * 
 * Variáveis de Ambiente Requeridas:
 * - `NEXT_PUBLIC_SUPABASE_URL`: Endpoint da API do projeto Supabase.
 * - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima pública (sujeita a Row Level Security - RLS).
 * 
 * @module src/lib/supabase
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nisbarqzsjqylsvnyxrm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pc2JhcnF6c2pxeWxzdm55eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MjkxMDUsImV4cCI6MjEwMTUwNTEwNX0.wHxnRRC6vyqNhGfKgKluG-ytfJKvyIxXG4RooJrMDbY';

/**
 * Cliente Supabase singleton exportado para uso em Server Components, Client Components e rotas de API
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
