'use client';

/**
 * ============================================================================
 * JORNAL ARCANJO — PAGE TRACKER (TELEMETRIA E VISITAS INTERNAS)
 * ============================================================================
 * Componente invisível (headless) responsável por registrar métricas de leitura
 * e audiência diretamente no banco de dados Supabase do Jornal Arcanjo.
 * 
 * Princípios de Engenharia:
 * 1. Privacidade Absoluta: Não utiliza cookies de rastreamento comportamental nem vende dados a terceiros.
 * 2. Prevenção de Flood: Utiliza `useRef(new Set())` para não duplicar contagem na mesma sessão/rota.
 * 3. Atomicidade no PostgreSQL: Invoca RPCs atômicas (`increment_article_views` e `increment_category_views`)
 *    evitando condições de corrida (race conditions) em acessos simultâneos.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {string|number} [props.articleId] - ID único do artigo visitado (se aplicável)
 * @param {string|number} [props.categoryId] - ID da categoria/editoria visitada (se aplicável)
 * @returns {null} Componente sem renderização no DOM
 */

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PageTracker({ articleId, categoryId }) {
  const pathname = usePathname();
  const tracked = useRef(new Set());

  useEffect(() => {
    // Evitar contar duas vezes a mesma rota na mesma sessão para prevenir flood
    if (pathname && !tracked.current.has(pathname)) {
      tracked.current.add(pathname);
      
      // 1. Registro de Acesso Geral na tabela page_views
      supabase.from('page_views').insert([{ path: pathname }])
        .then(({ error }) => {
          if (error) console.error('Erro ao registrar visita geral:', error);
        });
        
      // 2. Incremento atômico no contador de visualizações do artigo
      if (articleId) {
        supabase.rpc('increment_article_views', { row_id: articleId })
          .then(({ error }) => {
            if (error) console.error('Erro ao registrar visita na matéria:', error);
          });
      }
      
      // 3. Incremento atômico no contador de visualizações da editoria
      if (categoryId) {
        supabase.rpc('increment_category_views', { row_id: categoryId })
          .then(({ error }) => {
            if (error) console.error('Erro ao registrar visita no bloco:', error);
          });
      }
    }
  }, [pathname, articleId, categoryId]);

  return null;
}
