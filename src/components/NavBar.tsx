import type { LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavBarProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: number;
  expanded: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ to, icon: Icon, label, badge, expanded }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex ${!expanded && 'justify-center'} justify-between items-center px-2 py-2 rounded hover:bg-[#F8FAFC] ${isActive ? 'rounded-full bg-[#F8FAFC] font-bold' : ''}`}
    >
      <div className={`flex gap-2`}>
        <Icon size={24} color="#94A3B8" />
        {expanded && <span className="text-[#1E293B] font-bold">{label}</span>}
      </div>

      {badge && expanded && (
        <span className="border border-[#A5B4FC] bg-[#EEF2FF] text-[#4F46E5] font-semibold text-xs rounded-full py-1 px-2.5">
          {badge}
        </span>
      )}
    </Link>
  );
};

export default NavBar;
