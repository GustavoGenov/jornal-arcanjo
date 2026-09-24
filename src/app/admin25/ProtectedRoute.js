'use client';

/**
 * ============================================================================
 * JORNAL ARCANJO — PROTECTED ROUTE (GUARDA DE AUTENTICAÇÃO DO ADMIN)
 * ============================================================================
 * Componente Higher-Order que protege as rotas administrativas `/admin25`.
 * 
 * Mecanismo de Segurança:
 * 1. Verifica se existe uma sessão ativa via `supabase.auth.getSession()`.
 * 2. Redireciona usuários não autenticados para `/admin25/login`.
 * 3. Monitora eventos em tempo real (`onAuthStateChange`) para deslogar imediatamente caso a sessão expire.
 * 
 * @component
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo seguro protegido
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Se não tem sessão e não está na tela de login, joga pro login
      if (!session && pathname !== '/admin25/login') {
        router.push('/admin25/login');
      } else {
        setLoading(false);
      }
    };

    checkUser();
    
    // Listener reativo para alterações no estado de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== '/admin25/login') {
        router.push('/admin25/login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Carregando painel seguro...
      </div>
    );
  }

  return <>{children}</>;
}
