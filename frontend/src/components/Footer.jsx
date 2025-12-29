import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { BRAND, NAV_ITEMS, getWhatsAppLink } from '@/lib/constants';

export function Footer() {
  const quickLinks = [
    { label: 'Wedding Hashtag Generator', href: '/tools/hashtag-generator' },
    { label: 'Signature Drink Generator', href: '/tools/drink-generator' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[hsl(226_10%_6%)] border-t border-[hsl(46_64%_52%)]/25">
      <div className="container-hqd section-y">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={BRAND.logo} alt="HQ.D logo" className="h-12 w-12" />
              <div>
                <span className="font-display text-xl text-[hsl(35_33%_97%)] block">
                  {BRAND.name}
                </span>
                <span className="text-xs text-[hsl(42_15%_70%)]">
                  {BRAND.tagline}
                </span>
              </div>
            </Link>
            <p className="text-sm text-[hsl(42_15%_70%)] leading-relaxed">
              Premium cocktail & mocktail bar setups for weddings, corporate events, and private parties. 
              Molecular mixology specialists.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display text-lg text-[hsl(35_33%_97%)] mb-4">Explore</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[hsl(42_15%_70%)] hover:text-[hsl(46_64%_52%)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-[hsl(35_33%_97%)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[hsl(42_15%_70%)] hover:text-[hsl(46_64%_52%)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-[hsl(35_33%_97%)] mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[hsl(42_15%_70%)] hover:text-[hsl(46_64%_52%)] transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-sm text-[hsl(42_15%_70%)] hover:text-[hsl(46_64%_52%)] transition-colors"
                >
                  <Mail className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${BRAND.whatsapp}`}
                  className="flex items-center gap-3 text-sm text-[hsl(42_15%_70%)] hover:text-[hsl(46_64%_52%)] transition-colors"
                >
                  <Phone className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                  +91 {BRAND.whatsapp.slice(2)}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-[hsl(46_64%_52%)]/40 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-[hsl(46_64%_52%)]" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full border border-[hsl(46_64%_52%)]/40 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-[hsl(46_64%_52%)]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[hsl(46_64%_52%)]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(42_15%_70%)]">
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-[hsl(46_64%_52%)]">
            Bars only. We do not provide food or catering.
          </p>
        </div>
      </div>
    </footer>
  );
}
