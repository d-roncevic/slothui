import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavBarProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  showText?: boolean;
  badge?: number;
};

const NavBar: React.FC<NavBarProps> = ({ to, icon: Icon, label, showText = false, badge }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex justify-center justify-between items-center p-3 rounded hover:bg-[#F8FAFC] rounded-full ${isActive ? ' bg-[#F8FAFC] font-bold' : ''}`}
    >
      <div className={`relative flex gap-2 items-center`}>
        <Icon size={24} color="#475569" />
        {showText && <p>{label}</p>}
        {badge && <p className="absolute right-0 bottom-0">{badge}</p>}
      </div>
    </Link>
  );
};

export default NavBar;
