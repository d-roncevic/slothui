import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  ListChecks,
  Users,
  BookOpen,
  CreditCard,
  HelpCircle,
} from 'lucide-react';
import NavBar from '../NavBar';

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen((prev) => !prev);
  const location = useLocation();

  const links = useMemo(() => {
    if (location.pathname === '/') {
      return [
        { to: '/', icon: Home, label: 'Home', badge: 10 },
        { to: '/tasks', icon: ListChecks, label: 'Tasks' },
        { to: '/users', icon: Users, label: 'Users', badge: 2 },
        { to: '/apis', icon: BookOpen, label: 'APIs' },
        { to: '/billing', icon: CreditCard, label: 'Subscription' },
        { to: '/settings', icon: Settings, label: 'Settings' },
        { to: '/help', icon: HelpCircle, label: 'Help & Support' },
      ];
    }

    // default for other paths
    return [
      { to: '/', icon: Home, label: 'Home' },
      { to: '/tasks', icon: ChartColumnIncreasing, label: 'Tasks' },
      { to: '/users', icon: User, label: 'Users' },
      { to: '/apis', icon: Calendar, label: 'APIs' },
      { to: '/billing', icon: Zap, label: 'Subscription' },
      { to: '/help', icon: Bell, label: 'Help & Support' },
    ];
  }, [location.pathname]);

  return (
    <aside className="px-4 sm:h-screen flex flex-col justify-between sm:border-r border-[#E2E8F0] py-6 w-full sm:w-20 border-b sm:border-b-0">
      {/* Top - Logo and Hamburger */}
      <div className="flex items-center justify-between sm:justify-center">
        <div className="flex items-center gap-2.5 h-8">
          <img src="../test-logo.svg" alt="Logo" />
          <img src="../text-logo.svg" className="block sm:hidden" alt="Text Logo" />
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
        <img src="../user-avatar.svg" alt="User Avatar" width={48} height={48} />
      </div>

      {/* Mobile Slide-in menu */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4"
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
