import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import { BRAND, getWhatsAppLink } from '@/lib/constants';

export function Footer() {
  const links = {
    explore: [
      { label: 'Services', href: '/services' },
      { label: 'Bar Setups', href: '/bar-setups' },
      { label: 'Menus', href: '/menus' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Packages', href: '/packages' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact', href: '/contact' },
    ],
    tools: [
      { label: 'Hashtag Generator', href: '/tools/hashtag-generator' },
      { label: 'Drink Generator', href: '/tools/drink-generator' },
    ],
  };

  return (
    <footer className="bg-[hsl(0_0%_3%)] border-t border-white/5">
      <div className="container-wide section-spacing">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={BRAND.logo} alt="HQ.D" className="h-12 w-12" />
              <div>
                <span className="font-display text-xl text-[hsl(40_33%_95%)] block">HQ.D</span>
                <span className="text-xs text-[hsl(40_20%_65%)]">{BRAND.tagline}</span>
              </div>
            </Link>
            <p className="body-sm max-w-xs mb-6">
              Premium cocktail & mocktail bar setups for weddings, corporate events, and private celebrations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[hsl(43_74%_49%/0.5)] transition-colors"
              >
                <MessageCircle className="h-4 w-4 text-[hsl(43_74%_49%)]" />
              </a>
              <a
                href={`mailto:${BRAND.email}`}
                className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[hsl(43_74%_49%/0.5)] transition-colors"
              >
                <Mail className="h-4 w-4 text-[hsl(43_74%_49%)]" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-sm font-medium text-[hsl(40_33%_95%)] mb-4">Explore</h4>
            <ul className="space-y-3">
              {links.explore.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="body-sm hover:text-[hsl(43_74%_49%)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-[hsl(40_33%_95%)] mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="body-sm hover:text-[hsl(43_74%_49%)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-medium text-[hsl(40_33%_95%)] mb-4">Free Tools</h4>
            <ul className="space-y-3">
              {links.tools.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="body-sm hover:text-[hsl(43_74%_49%)] transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="gold-line mt-16 mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(40_20%_50%)]">
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-[hsl(43_74%_49%)]">
            Bars only — We do not provide food or catering.
          </p>
        </div>
        
        {/* Site Credit */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-[hsl(40_20%_50%)]">
            Site made by:{' '}
            <a 
              href="https://www.Sumvaik.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[hsl(43_74%_49%)] hover:text-[hsl(43_74%_60%)] transition-colors font-medium"
            >
              Sumvaik Consulting Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
