import Link from 'next/link';

export const metadata = {
  title: 'Página Não Encontrada (404) | Jornal Arcanjo',
  description: 'A página que você procura não existe ou foi movida.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto', background: 'var(--gn-surface)', border: '1px solid var(--gn-border)', borderRadius: '16px', padding: '48px 32px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
        <div style={{ fontSize: '72px', fontWeight: '900', color: 'var(--gn-blue)', lineHeight: 1, marginBottom: '16px', letterSpacing: '-2px' }}>
          404
        </div>
        <h1 className="google-sans" style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--gn-text)' }}>
          Página não encontrada
        </h1>
        <p style={{ color: 'var(--gn-text-secondary)', fontSize: '16px', lineHeight: '1.6', marginBottom: '32px' }}>
          O artigo ou endereço que você tentou acessar não está disponível, foi movido ou nunca existiu. Utilize a busca abaixo ou volte para a página inicial.
        </p>

        <form action="/busca" method="GET" style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
          <input 
            type="text" 
            name="q" 
            placeholder="Pesquisar notícias no Jornal Arcanjo..." 
            required 
            style={{ 
              flex: 1, 
              padding: '12px 16px', 
              borderRadius: '8px', 
              border: '1px solid var(--gn-border)', 
              background: 'var(--gn-bg)', 
              color: 'var(--gn-text)',
              fontSize: '15px' 
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '12px 20px', 
              borderRadius: '8px', 
              background: 'var(--gn-blue)', 
              color: '#fff', 
              border: 'none', 
              fontWeight: '600', 
              cursor: 'pointer' 
            }}
          >
            Buscar
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link 
            href="/" 
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              background: 'var(--gn-surface)', 
              border: '1px solid var(--gn-border)', 
              color: 'var(--gn-text)', 
              textDecoration: 'none', 
              fontWeight: '600', 
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="material-icons-extended" style={{ fontSize: '18px' }}>home</span>
            Página Inicial
          </Link>
          <Link 
            href="/categoria/ia-e-agentes" 
            style={{ 
              padding: '10px 20px', 
              borderRadius: '8px', 
              background: 'var(--gn-surface)', 
              border: '1px solid var(--gn-border)', 
              color: 'var(--gn-text)', 
              textDecoration: 'none', 
              fontWeight: '600', 
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="material-icons-extended" style={{ fontSize: '18px' }}>smart_toy</span>
            IA & Agentes
          </Link>
        </div>
      </div>
    </main>
  );
}
