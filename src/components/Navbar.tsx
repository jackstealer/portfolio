import React, { useEffect, useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const Navbar: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Active link = the last section whose top has passed the navbar.
      const ids = navItems.map((n) => n.toLowerCase());
      for (let i = ids.length - 1; i >= 0; i--) {
        const rect = document.getElementById(ids[i])?.getBoundingClientRect();
        if (rect && rect.top <= 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        visible ? '' : 'pointer-events-none'
      } ${scrolled || isOpen ? 'border-white/[0.07] bg-ink/80 backdrop-blur-xl' : 'border-transparent'}`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6 lg:h-[72px] lg:px-11">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go('home');
          }}
          className="text-[15px] font-extrabold tracking-[0.08em] text-white lg:text-xl"
        >
          ATUL RAJ GAUTAM
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((name) => {
            const id = name.toLowerCase();
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className={`relative pb-1 text-[13px] font-medium uppercase tracking-[0.06em] transition-colors ${
                    active === id ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {name}
                  {active === id && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-1 h-px bg-white" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="text-white md:hidden"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Scroll progress line */}
      {scrolled && (
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/60" />
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100svh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2 overflow-hidden px-6 pt-8 md:hidden"
          >
            {navItems.map((name) => {
              const id = name.toLowerCase();
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    className={`text-5xl font-black tracking-[-0.04em] ${active === id ? 'text-white' : 'text-gray-600'}`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
