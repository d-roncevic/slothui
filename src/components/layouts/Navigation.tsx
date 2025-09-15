import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Menu,
  X,
  Home,
  ChartColumnIncreasing,
  User,
  Calendar,
  Zap,
  Bell,
} from 'lucide-react';
import NavBar from '../NavBar';

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  const links = useMemo(
    () => [
      { to: '/', icon: Home, label: 'Home' },
      { to: '/tasks', icon: ChartColumnIncreasing, label: 'Tasks' },
      { to: '/users', icon: User, label: 'Users' },
      { to: '/apis', icon: Calendar, label: 'APIs' },
      { to: '/billing', icon: Zap, label: 'Subscription' },
      { to: '/help', icon: Bell, label: 'Help & Support' },
    ],
    [],
  );

  return (
    <aside className="px-4 h-screen flex flex-col justify-between sm:border-r border-[#E2E8F0] py-6 w-full sm:w-20 border-b sm:border-b-0">
      {/* Top - Logo and Hamburger */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 h-8">
          <img src="test-logo.svg" alt="Logo" />
          <img src="text-logo.svg" className="block sm:hidden" alt="Text Logo" />
        </div>

        {/* Hamburger (samo na <375px) */}
        <button className="sm:hidden p-2" onClick={toggleMenu} aria-label="Toggle navigation">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar links (desktop) */}
      <nav className="hidden sm:flex flex-col gap-4 mt-8">
        {links.map((link, index) => (
          <NavBar key={index} {...link} />
        ))}
      </nav>

      {/* Bottom dio (samo desktop) */}
      <div className="hidden sm:flex flex-col gap-4 justify-center items-center mt-auto">
        <Link to="/settings" className="p-3">
          <Settings size={24} color="#475569" />
        </Link>
        <img src="user-avatar.svg" alt="User Avatar" width={48} height={48} />
      </div>

      {/* Mobile Slide-in menu */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={toggleMenu}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((link, index) => (
              <NavBar key={index} {...link} showText={open} />
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Navigation;
