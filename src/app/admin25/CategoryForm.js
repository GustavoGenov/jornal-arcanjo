'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CategoryForm() {
  const [name, setName] = useState('');
  const [colorCode, setColorCode] = useState('#1a73e8');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const slugify = (text) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage('Preencha o nome do bloco.');
      return;
    }

    setLoading(true);
    setMessage('Criando bloco...');

    try {
      const slug = slugify(name);
      
      const { error: insertError } = await supabase.from('categories').insert([{
        name,
        slug,
        color_code: colorCode,
        views: 0
      }]);

      if (insertError) {
        throw new Error('Erro ao criar bloco: ' + insertError.message);
      }

      setMessage('Bloco criado com sucesso!');
      setName('');
      setColorCode('#1a73e8');
      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupCategories = async () => {
    if (!window.confirm('Atenção: Isso irá reestruturar os blocos para o padrão oficial do Jornal Arcanjo. Deseja continuar?')) {
      return;
    }

    setResetLoading(true);
    setMessage('Configurando blocos oficiais...');

    const newCategories = [
      { name: 'Formiga em Foco & Sociedade', slug: 'formiga-sociedade', color_code: '#0284c7', views: 0 },
      { name: 'Cultura e Filosofia', slug: 'cultura-filosofia', color_code: '#7c3aed', views: 0 },
      { name: 'Saúde e Bem-Estar', slug: 'saude-bem-estar', color_code: '#059669', views: 0 },
      { name: 'Clima tempo', slug: 'clima-tempo', color_code: '#0ea5e9', views: 0 },
      { name: 'Horóscopo & Tarô', slug: 'horoscopo-taro', color_code: '#d97706', views: 0 },
      { name: 'Passatempos', slug: 'passatempos', color_code: '#ea580c', views: 0 },
      { name: 'Religião', slug: 'religiao', color_code: '#b45309', views: 0 }
    ];

    try {
      const { error: insertErr } = await supabase.from('categories').upsert(newCategories, { onConflict: 'slug' });

      if (insertErr) {
        throw new Error('Erro ao atualizar blocos: ' + insertErr.message);
      }

      setMessage('Blocos oficiais atualizados com sucesso!');
      router.refresh();

    } catch (err) {
      setMessage(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', marginBottom: '32px', background: 'var(--card)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0, fontWeight: '700' }}>
          <span className="material-icons-extended" style={{ color: '#34A853' }}>category</span> 
          Gerenciar Blocos e Editorias
        </h2>
        <button 
          onClick={handleSetupCategories}
          disabled={resetLoading}
          style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: resetLoading ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)' }}
        >
          <span className="material-icons-extended" style={{ fontSize: '18px' }}>sync</span>
          {resetLoading ? 'Sincronizando...' : 'Restaurar Blocos Oficiais'}
        </button>
      </div>

      <form onSubmit={handleCreateCategory} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div>
          <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
            Nome do Novo Bloco / Editoria:
          </label>
          <input 
            type="text" 
            placeholder="Ex: Economia & Negócios, Saúde Digital..." 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '14px', background: 'var(--bg)', color: 'var(--text)' }} 
            required
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '600' }}>Cor do Destaque:</label>
          <input 
            type="color" 
            value={colorCode}
            onChange={(e) => setColorCode(e.target.value)}
            style={{ width: '48px', height: '38px', padding: '0', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }} 
            required
          />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{colorCode}</span>
        </div>

        {message && (
          <div style={{ 
            padding: '12px', 
            borderRadius: '8px', 
            fontSize: '14px',
            fontWeight: '500',
            background: message.includes('sucesso') ? '#e6f4ea' : (message.includes('Erro') || message.includes('Preencha') ? '#fce8e6' : '#e8f0fe'),
            color: message.includes('sucesso') ? '#137333' : (message.includes('Erro') || message.includes('Preencha') ? '#c5221f' : '#1a73e8'),
          }}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'wait' : 'pointer', alignSelf: 'flex-start' }}
        >
          {loading ? 'Salvando...' : 'Adicionar Novo Bloco'}
        </button>
      </form>
    </div>
  );
}
