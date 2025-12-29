import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

export function StickyCTA() {
  return (
    <div 
      className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-[hsl(228_13%_4%)]/85 backdrop-blur border-t border-[hsl(46_64%_52%)]/25 px-4 py-3 flex items-center gap-3"
      data-testid="sticky-cta-bar"
    >
      <Link
        to="/contact"
        data-testid="sticky-check-availability-button"
        className="flex-1 inline-flex items-center justify-center rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] h-11 font-medium"
      >
        Check Availability
      </Link>
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="sticky-whatsapp-button"
        className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[hsl(46_64%_52%)]/40 hover:bg-white/5 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5 text-[hsl(46_64%_52%)]" />
      </a>
    </div>
  );
}
