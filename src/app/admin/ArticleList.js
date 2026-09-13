'use client';

import { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ArticleList({ articles }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [loadingId, setLoadingId] = useState(null);
  const [pinningId, setPinningId] = useState(null);
  const router = useRouter();

  const filteredArticles = useMemo(() => {
    return (articles || []).filter(art => {
      const matchSearch = (art.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (art.author_name || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'all' || art.category_id === selectedCategory;
      const matchPosition = selectedPosition === 'all' || 
                            (selectedPosition === 'pinned' ? (art.featured_position && art.featured_position !== 'none') : (art.featured_position || 'none') === selectedPosition);
      return matchSearch && matchCategory && matchPosition;
    });
  }, [articles, searchTerm, selectedCategory, selectedPosition]);

  const categoriesList = useMemo(() => {
    const catsMap = new Map();
    (articles || []).forEach(a => {
      if (a.categories) {
        catsMap.set(a.categories.id || a.category_id, a.categories.name);
      }
    });
    return Array.from(catsMap.entries());
  }, [articles]);

  const pinnedCount = useMemo(() => {
    return (articles || []).filter(a => a.featured_position && a.featured_position !== 'none').length;
  }, [articles]);

  const handleResetAllPins = async () => {
    if (!window.confirm('Deseja desafixar todas as matérias da capa e restaurar a ordem cronológica 100% automática por data de publicação?')) {
      return;
    }
    setPinningId('reset_all');
    try {
      const { error } = await supabase.from('articles').update({ featured_position: 'none' }).neq('featured_position', 'none');
      if (error) throw new Error(error.message);
      alert('Ordem cronológica automática restaurada com sucesso!');
      router.refresh();
    } catch (error) {
      alert(`Erro ao restaurar: ${error.message}`);
    } finally {
      setPinningId(null);
    }
  };

  const handleQuickPin = async (id, newPosition) => {
    setPinningId(id);
    try {
      if (newPosition === 'hero_main') {
        // Desafixa manchete principal anterior
        await supabase.from('articles').update({ featured_position: 'none' }).eq('featured_position', 'hero_main');
      }
      const { error } = await supabase.from('articles').update({ featured_position: newPosition }).eq('id', id);
      if (error) throw new Error(error.message);
      router.refresh();
    } catch (error) {
      alert(`Erro ao alterar destaque: ${error.message}`);
    } finally {
      setPinningId(null);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Tem certeza que deseja excluir a notícia "${title}"?\nEsta ação é permanente e removerá o artigo do ar.`)) {
      return;
    }

    setLoadingId(id);

    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      alert('Notícia excluída com sucesso!');
      router.refresh();
      
    } catch (error) {
      alert(`Erro ao excluir: ${error.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '32px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '18px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 4px 0', fontWeight: '700' }}>
            <span className="material-icons-extended" style={{ color: '#EA4335' }}>article</span> 
            Gerenciar Matérias & Destaques da Capa
          </h2>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Exibindo {filteredArticles.length} de {articles?.length || 0} matérias
          </span>
        </div>

        {/* Filtro e Busca Rápida */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Filtrar por título ou autor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', background: 'var(--bg)', color: 'var(--text)', minWidth: '200px' }}
          />

          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', background: 'var(--bg)', color: 'var(--text)' }}
          >
            <option value="all">Todas as Categorias</option>
            {categoriesList.map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>

          <select 
            value={selectedPosition} 
            onChange={(e) => setSelectedPosition(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '13px', background: 'var(--bg)', color: 'var(--text)' }}
          >
            <option value="all">Todos os Destaques</option>
            <option value="pinned">⭐ Todos os Fixados ({pinnedCount})</option>
            <option value="hero_main">🌟 Manchete Topo</option>
            <option value="hero_side">📌 Destaques Laterais</option>
            <option value="formiga_main">📍 Destaque Formiga</option>
            <option value="none">⚪ Automático (Padrão)</option>
          </select>

          <button
            onClick={handleResetAllPins}
            disabled={pinningId === 'reset_all'}
            title="Desafixa todas as matérias e faz a Capa seguir 100% a ordem cronológica por data de publicação"
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: pinnedCount > 0 ? 'rgba(234, 67, 53, 0.08)' : 'var(--bg)',
              color: pinnedCount > 0 ? '#d93025' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="material-icons-extended" style={{ fontSize: '16px' }}>restart_alt</span>
            {pinningId === 'reset_all' ? 'Restaurando...' : 'Restaurar Ordem Automática'}
          </button>
        </div>
      </div>

      {pinnedCount > 0 && (
        <div style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#b45309', fontWeight: 500 }}>
            <span className="material-icons-extended" style={{ fontSize: '18px', color: '#f59e0b' }}>push_pin</span>
            <span>Atenção: Existem <strong>{pinnedCount} matéria(s) fixada(s) manualmente</strong> na Capa. Novas matérias ficarão atrás dos itens fixados até você alterá-los ou restaurar a ordem cronológica.</span>
          </div>
          <button
            onClick={handleResetAllPins}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #f59e0b', background: '#f59e0b', color: '#fff', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
          >
            Desafixar Todas Agora
          </button>
        </div>
      )}
      
      {filteredArticles.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '600px', overflowY: 'auto', paddingRight: '4px' }}>
          {filteredArticles.map(article => (
            <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: article.featured_position && article.featured_position !== 'none' ? '1px solid #f59e0b' : '1px solid var(--border)', borderRadius: '10px', background: article.featured_position === 'hero_main' ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg)', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: '600', color: 'var(--text)', fontSize: '15px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {article.title}
                  </span>
                  
                  {article.featured_position === 'hero_main' && (
                    <span style={{ fontSize: '11px', background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid #f59e0b' }}>
                      🌟 Manchete Topo
                    </span>
                  )}
                  {article.featured_position === 'hero_side' && (
                    <span style={{ fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid #38bdf8' }}>
                      📌 Destaque Lateral
                    </span>
                  )}
                  {article.featured_position === 'formiga_main' && (
                    <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, border: '1px solid #4ade80' }}>
                      📍 Destaque Formiga
                    </span>
                  )}

                  {!article.published && (
                    <span style={{ fontSize: '11px', background: '#fef3c7', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                      Rascunho
                    </span>
                  )}
                </div>
                
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <span style={{ fontWeight: '500', color: '#1a73e8' }}>{article.categories?.name || 'Sem Categoria'}</span>
                  <span>•</span>
                  <span>Por {article.author_name || 'Redação'}</span>
                  <span>•</span>
                  <span style={{ color: '#ea580c', fontWeight: '600' }}>{article.views || 0} visualizações</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
                {/* Seletor Rápido de Destaque */}
                <select
                  value={article.featured_position || 'none'}
                  onChange={(e) => handleQuickPin(article.id, e.target.value)}
                  disabled={pinningId === article.id}
                  title="Alterar Posição de Destaque na Capa"
                  style={{
                    background: article.featured_position && article.featured_position !== 'none' ? '#fef3c7' : 'var(--card)',
                    color: article.featured_position && article.featured_position !== 'none' ? '#b45309' : 'var(--text)',
                    borderColor: article.featured_position && article.featured_position !== 'none' ? '#f59e0b' : 'var(--border)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <option value="none">⚪ Automático (Data)</option>
                  <option value="hero_main">🌟 Manchete Topo</option>
                  <option value="hero_side">📌 Destaque Lateral</option>
                  <option value="formiga_main">📍 Destaque Formiga</option>
                </select>

                <Link 
                  href={`/artigo/${article.slug}`}
                  target="_blank"
                  title="Ver no site"
                  style={{ 
                    background: 'var(--card)', color: 'var(--text-muted)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>visibility</span>
                  Ver
                </Link>

                <Link 
                  href={`/admin/editar/${article.id}`}
                  style={{ 
                    background: 'rgba(26, 115, 232, 0.1)', color: '#1a73e8', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>edit</span>
                  Editar
                </Link>

                <button 
                  onClick={() => handleDelete(article.id, article.title)}
                  disabled={loadingId === article.id}
                  style={{ 
                    background: 'rgba(217, 48, 37, 0.1)', color: '#d93025', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' 
                  }}
                >
                  <span className="material-icons-extended" style={{ fontSize: '16px' }}>delete</span>
                  {loadingId === article.id ? '...' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', fontSize: '14px' }}>
          Nenhuma matéria encontrada com os filtros selecionados.
        </div>
      )}
    </div>
  );
}
