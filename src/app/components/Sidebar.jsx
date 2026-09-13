// components/Sidebar.jsx
import Link from 'next/link';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/app/constants';

export default function Sidebar({ categories }) {
  // Categorias utilitárias que possuem páginas exclusivas
  const utilitySlugs = ['horoscopo', 'clima', 'passatempos', 'clima-tempo', 'horoscopo-taro'];
  
  const standardCategories = categories?.filter(
    (cat) => !utilitySlugs.includes(cat.slug)
  ) || [];

  return (
    <>
      <Link href="/" className="nav-item active">
        <span className="material-icons-extended" style={{ color: '#1e3a8a' }}>newspaper</span>
        <span>Capa Principal</span>
      </Link>
      <Link href="/categoria/formiga-sociedade" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#0284c7' }}>location_city</span>
        <span>Formiga em Foco</span>
      </Link>
      <div className="sidebar-divider"></div>
      
      {standardCategories.map((cat) => {
        const iconName = CATEGORY_ICONS[cat.slug] || 'article';
        const color = CATEGORY_COLORS[cat.slug] || cat.color_code || '#1e3a8a';
        
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
        <span className="material-icons-extended" style={{ color: '#0ea5e9', marginRight: '8px', fontSize: '20px' }}>
          wb_sunny
        </span>
        <span>Clima tempo</span>
      </Link>
      
      <Link href="/horoscopo" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#d97706', marginRight: '8px', fontSize: '20px' }}>
          auto_awesome
        </span>
        <span>Horóscopo & Tarô</span>
      </Link>

      <Link href="/passatempos" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#ea580c', marginRight: '8px', fontSize: '20px' }}>
          extension
        </span>
        <span>Passatempos</span>
      </Link>

      <div className="sidebar-divider"></div>

      <Link href="/equipe" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#64748b', marginRight: '8px', fontSize: '20px' }}>
          groups
        </span>
        <span>Nossa Equipe</span>
      </Link>

      <Link href="/sobre" className="nav-item">
        <span className="material-icons-extended" style={{ color: '#64748b', marginRight: '8px', fontSize: '20px' }}>
          info
        </span>
        <span>Quem Somos</span>
      </Link>
    </>
  );
}
