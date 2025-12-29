import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, MessageCircle, ArrowRight, Atom } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Bar Setups', href: '/bar-setups' },
  { label: 'Molecular Mixology', href: '/molecular', special: true },
  { label: 'Menus', href: '/menus' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        hasScrolled 
          ? "bg-[hsl(0_0%_2%)]/90 backdrop-blur-xl border-b border-[hsl(43_74%_49%/0.1)]" 
          : "bg-transparent border-b border-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="container-wide h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
          <motion.img 
            src={BRAND.logo} 
            alt="HQ.D" 
            className="h-10 w-10 lg:h-11 lg:w-11"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          />
          <motion.span 
            className="font-display text-xl text-[hsl(40_33%_95%)] hidden sm:block"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            HQ.D
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
            >
              {item.special ? (
                <Link
                  to={item.href}
                  className={cn(
                    'relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all',
                    location.pathname === item.href 
                      ? 'bg-gradient-to-r from-[hsl(43_74%_49%)] to-[hsl(280_60%_50%)] text-[hsl(0_0%_2%)]' 
                      : 'bg-gradient-to-r from-[hsl(43_74%_49%/0.15)] to-[hsl(280_60%_50%/0.15)] text-[hsl(43_74%_49%)] hover:from-[hsl(43_74%_49%/0.25)] hover:to-[hsl(280_60%_50%/0.25)]'
                  )}
                  data-testid={`nav-${item.label.toLowerCase().replace(/ /g, '-')}`}
                >
                  <Atom className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors',
                    location.pathname === item.href 
                      ? 'text-[hsl(43_74%_49%)]' 
                      : 'text-[hsl(40_20%_75%)] hover:text-[hsl(40_33%_95%)]'
                  )}
                  data-testid={`nav-${item.label.toLowerCase().replace(/ /g, '-')}`}
                >
                  {item.label}
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[hsl(43_74%_49%)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: location.pathname === item.href ? 1 : 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0.5 }}
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[hsl(43_74%_49%)] hover:bg-[hsl(43_74%_49%/0.1)] transition-all duration-300"
            aria-label="WhatsApp"
            data-testid="nav-whatsapp"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="h-4 w-4 text-[hsl(43_74%_49%)]" />
          </motion.a>
          
          <Link
            to="/contact"
            data-testid="nav-quote-btn"
          >
            <motion.span
              className="hidden sm:inline-flex items-center gap-2 bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)] text-sm font-medium h-10 px-5 rounded-full"
              whileHover={{ scale: 1.02, backgroundColor: 'hsl(43, 74%, 55%)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.span>
          </Link>

          {/* Mobile Toggle */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full border border-white/10 hover:border-[hsl(43_74%_49%/0.5)] transition-colors"
            aria-label="Menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-[hsl(40_33%_95%)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-[hsl(40_33%_95%)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:hidden bg-[hsl(0_0%_2%)]/95 backdrop-blur-xl border-t border-[hsl(43_74%_49%/0.1)]"
          >
            <nav className="container-wide py-6 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all',
                      location.pathname === item.href 
                        ? 'text-[hsl(43_74%_49%)] bg-[hsl(43_74%_49%/0.1)]' 
                        : 'text-[hsl(40_33%_95%)] hover:bg-white/5'
                    )}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                className="my-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="h-px bg-gradient-to-r from-transparent via-[hsl(43_74%_49%/0.3)] to-transparent" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-[hsl(43_74%_49%)] text-[hsl(0_0%_2%)] font-medium py-4 rounded-xl"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
