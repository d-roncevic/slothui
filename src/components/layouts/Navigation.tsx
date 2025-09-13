import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import {
  Home,
  ListChecks,
  Users,
  BookOpen,
  CreditCard,
  Settings,
  HelpCircle,
  X,
  TriangleAlert,
} from 'lucide-react';
import NavBar from '../NavBar';
import SearchInput from '../SearchInput';

const Navigation: React.FC = () => {
  // State for hover and animation
  const [hovering, setHovering] = useState<boolean>(true);
  const [showContent, setShowContent] = useState<boolean>(true);
  const asideControls = useAnimationControls();
  const collapseTimeout = useRef<number | null>(null);

  // Navigation links
  const links = useMemo(
    () => [
      { to: '/', icon: Home, label: 'Home', badge: 10 },
      { to: '/tasks', icon: ListChecks, label: 'Tasks' },
      { to: '/users', icon: Users, label: 'Users', badge: 2 },
      { to: '/apis', icon: BookOpen, label: 'APIs' },
      { to: '/billing', icon: CreditCard, label: 'Subscription' },
      { to: '/settings', icon: Settings, label: 'Settings' },
      { to: '/help', icon: HelpCircle, label: 'Help & Support' },
    ],
    [],
  );

  // Animation constants
  const COLLAPSED: number = 80;
  const EXPANDED: number = 312;
  const D_WIDTH = 0.28;
  const D_CHILD = 0.2;
  const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1];
  const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];
  const EASE_SOFT: [number, number, number, number] = [0.2, 0, 0, 1];
  const itemVariants = {
    collapsed: { opacity: 0, x: -8, transition: { duration: D_CHILD, ease: EASE_OUT } },
    expanded: { opacity: 1, x: 0, transition: { duration: D_CHILD, ease: EASE_SOFT } },
  };

  // Orkestracija: širina -> sadržaj
  useEffect(() => {
    const run = async () => {
      if (collapseTimeout.current) {
        window.clearTimeout(collapseTimeout.current);
        collapseTimeout.current = null;
      }

      if (hovering) {
        await asideControls.start({
          width: EXPANDED,
          transition: { duration: D_WIDTH, ease: EASE_IN },
        });
        setShowContent(true);
      } else {
        setShowContent(false);
        collapseTimeout.current = window.setTimeout(() => {
          asideControls.start({
            width: COLLAPSED,
            transition: { duration: D_WIDTH, ease: EASE_OUT },
          });
        }, D_CHILD * 1000) as unknown as number;
      }
    };
    run();
    return () => {
      if (collapseTimeout.current) window.clearTimeout(collapseTimeout.current);
    };
  }, [hovering, asideControls]);

  // Message visibility state
  const [messageVisible, setMessageVisible] = useState<boolean>(
    localStorage.getItem('messageVisibility') !== 'false',
  );
  const messageVisibility: boolean = messageVisible && showContent;
  const hideMessage = () => {
    setMessageVisible(false);
    localStorage.setItem('messageVisibility', 'false');
  };

  // varijante za fade/slide sadržaja (logo tekst, search, nav)

  return (
    <motion.aside
      className={`px-4 max-w-[312px] h-screen flex flex-col gap-8 justify-between border-r border-[#E2E8F0] ${hovering ? 'py-8' : 'py-6 w-20'}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(true)}
      animate={asideControls}
      style={{ willChange: 'width' }}
    >
      {/* Logo and Search */}
      <motion.div
        className="flex flex-col gap-8 justify-center"
        initial={false}
        animate={hovering ? 'expanded' : 'collapsed'}
        transition={{ staggerChildren: 0.04, delayChildren: hovering ? 0.04 : 0 }}
      >
        <div className={`flex items-center gap-2.5 h-8 ${!hovering ? 'justify-center' : ''}`}>
          <img src="test-logo.svg" alt="Logo" />
          <AnimatePresence initial={false}>
            {hovering && (
              <motion.p
                key="brand"
                className="text-[#1E293B]"
                variants={itemVariants}
                initial="hidden"
                animate="shown"
                exit="hidden"
              >
                <img src="text-logo.svg" alt="SlothUI" />
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        {/* Search */}
        <AnimatePresence initial={false}>
          {hovering && (
            <motion.div
              key="search"
              variants={itemVariants}
              initial="hidden"
              animate="shown"
              exit="hidden"
              className="w-full"
              layout
            >
              <SearchInput className="w-full h-10" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Links */}
        <nav className="flex justify-center flex-col gap-2">
          {links.map((link, index) => {
            return <NavBar key={index} {...link} expanded={hovering} />;
          })}
        </nav>
      </motion.div>
      {/* Bottom */}
      <motion.div className="flex flex-col">
        {/* Message */}
        <AnimatePresence initial={false}>
          {messageVisibility && (
            <motion.div
              key="message"
              layout
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: D_CHILD, ease: EASE_OUT }}
              className={`flex p-4 overflow-hidden rounded-[24px] bg-[#F8FAFC] flex-col gap-4 mb-6`}
              role="status"
              aria-live="polite"
            >
              <div className="flex justify-between items-start">
                <div className="bg-[#E2E8F0] p-2.5 rounded-full">
                  <TriangleAlert color="#475569" />
                </div>
                <button className="float right cursor-pointer" onClick={hideMessage}>
                  <X color="#94A3B8" />
                </button>
              </div>
              <p className="text-[#475569] font-normal text-sm">
                Enjoy unlimited access to our app with only a small price monthly
              </p>
              <div className="flex gap-4 justify-start text-sm font-bold">
                <button className="text-[#475569]" onClick={hideMessage}>
                  Dismiss
                </button>
                <button className="text-[#4F46E5]">Go Pro</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Info */}
        <motion.div
          layout
          className={`pt-6 border-t border-[#E2E8F0] flex items-center gap-2 cursor-pointer hover:bg-[#F8FAFC] rounded ${!hovering ? 'justify-center' : 'justify-between'}`}
        >
          <div className="flex gap-2">
            <img src="user-avatar.svg" alt="User Avatar" />
            <div
              className={`flex flex-col text-sm leading-tight text-start ${!hovering && 'hidden'}`}
            >
              <span className="truncate text-base font-bold text-[#1E293B]">Azunyan U. Wu</span>
              <span className="truncate text-sm font-medium text-[#475569]">Basic Member</span>
            </div>
          </div>

          <button className={`${!hovering && 'hidden'} cursor-pointer`}>
            <img src="logout-icon.svg" alt="Logout" />
          </button>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Navigation;
