import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavBarProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  showText?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ to, icon: Icon, label, showText = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex justify-center justify-between items-center p-3 rounded hover:bg-[#F8FAFC] rounded-full ${isActive ? ' bg-[#F8FAFC] font-bold' : ''}`}
    >
      <div className={`flex gap-2 items-center`}>
        <Icon size={24} color="#475569" />
        {showText && <p>{label}</p>}
      </div>
    </Link>
  );
};

export default NavBar;
