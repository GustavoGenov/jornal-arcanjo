// components/Sidebar.jsx
import Link from 'next/link';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/app/constants';

export default function Sidebar({ categories }) {
  // Remover duplicatas e categorias utilitárias que possuem páginas próprias
  const mergedSlugs = ['horoscopo', 'clima', 'passatempos', 'religiao', 'horoscopo-e-taro', 'clima-tempo'];
  
  const filteredCategories = categories?.filter(
    (cat) => !mergedSlugs.includes(cat.slug)
  ) || [];

  // Ordenar alfabeticamente, mas forçar IA no topo
  const sortedCategories = filteredCategories.sort((a, b) => {
    if (a.slug === 'ia-e-agentes') return -1;
    if (b.slug === 'ia-e-agentes') return 1;
    return a.name.localeCompare(b.name, 'pt-BR');
  });

  return (
    <>
      <Link href="/" className="nav-item active">
        <span className="material-icons-extended" style={{ color: '#1a73e8' }}>language</span>
        <span>Principais notícias</span>
      </Link>
      <Link href="/#destaques" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#fbbc04' }}>star_border</span>
        <span>Para você</span>
      </Link>
      <div className="sidebar-divider"></div>
      {sortedCategories.map((cat) => {
        const iconName = CATEGORY_ICONS[cat.slug] || 'category';
        const color = CATEGORY_COLORS[cat.slug] || cat.color_code || '#1a73e8';
        
        return (
          <Link key={cat.id} href={`/categoria/${cat.slug}`} className="nav-item">
            <span className="material-icons-extended" style={{ color: color, marginRight: '8px', fontSize: '20px' }}>
              {iconName}
            </span>
            <span>{cat.name}</span>
          </Link>
        );
      })}
      <div className="sidebar-divider"></div>
      <Link href="/clima" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#00bcd4', marginRight: '8px', fontSize: '20px' }}>
          wb_sunny
        </span>
        <span>Clima Tempo BR</span>
      </Link>
      <Link href="/horoscopo" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#e040fb', marginRight: '8px', fontSize: '20px' }}>
          auto_awesome
        </span>
        <span>Horóscopo & Tarô</span>
      </Link>
    </>
  );
}
