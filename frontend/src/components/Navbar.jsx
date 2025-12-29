import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BRAND, NAV_ITEMS, getWhatsAppLink } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[hsl(228_13%_4%)]/70 border-b border-[hsl(46_64%_52%)]/25">
      <div className="container-hqd flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link 
          to="/" 
          data-testid="nav-logo-link" 
          className="flex items-center gap-3"
        >
          <img 
            src={BRAND.logo} 
            alt="HQ.D logo" 
            className="h-10 w-10 lg:h-12 lg:w-12" 
          />
          <span className="font-display text-lg lg:text-xl text-[hsl(35_33%_97%)] hidden sm:block">
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              data-testid={`nav-${item.label.toLowerCase().replace(/ /g, '-')}-link`}
              className={cn(
                'px-4 py-2 text-sm text-[hsl(35_33%_97%)] hover:text-[hsl(46_64%_52%)] transition-colors link-underline',
                location.pathname === item.href && 'text-[hsl(46_64%_52%)]'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-icon-button"
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[hsl(46_64%_52%)]/40 hover:bg-white/5 transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5 text-[hsl(46_64%_52%)]" />
          </a>
          
          <Link
            to="/contact"
            data-testid="nav-get-a-quote-button"
            className="hidden sm:inline-flex items-center rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-5 h-10 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors btn-gold-glow"
          >
            Get a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-[hsl(35_33%_97%)]" />
            ) : (
              <Menu className="h-6 w-6 text-[hsl(35_33%_97%)]" />
            )}
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
            className="lg:hidden bg-[hsl(228_13%_4%)] border-t border-[hsl(46_64%_52%)]/25"
          >
            <nav className="container-hqd py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/ /g, '-')}-link`}
                  className={cn(
                    'px-4 py-3 text-sm text-[hsl(35_33%_97%)] hover:text-[hsl(46_64%_52%)] hover:bg-white/5 rounded-lg transition-colors',
                    location.pathname === item.href && 'text-[hsl(46_64%_52%)] bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-5 h-11 font-medium"
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
