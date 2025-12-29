import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Bar Setups', href: '/bar-setups' },
  { label: 'Menus', href: '/menus' },
  { label: 'Packages', href: '/packages' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[hsl(0_0%_2%)]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container-wide h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
          <img src={BRAND.logo} alt="HQ.D" className="h-10 w-10 lg:h-11 lg:w-11" />
          <span className="font-display text-xl text-[hsl(40_33%_95%)] hidden sm:block">HQ.D</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors link-underline',
                location.pathname === item.href 
                  ? 'text-[hsl(43_74%_49%)]' 
                  : 'text-[hsl(40_20%_75%)] hover:text-[hsl(40_33%_95%)]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[hsl(43_74%_49%/0.5)] transition-colors"
            aria-label="WhatsApp"
            data-testid="nav-whatsapp"
          >
            <MessageCircle className="h-4 w-4 text-[hsl(43_74%_49%)]" />
          </a>
          
          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-primary text-sm h-10 px-5"
            data-testid="nav-quote-btn"
          >
            Get a Quote
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center"
            aria-label="Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[hsl(0_0%_3%)] border-t border-white/5"
          >
            <nav className="container-wide py-6 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === item.href 
                      ? 'text-[hsl(43_74%_49%)] bg-white/5' 
                      : 'text-[hsl(40_33%_95%)] hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="gold-line my-4" />
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm justify-center"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
