import { Link } from 'react-router-dom';
import { MessageCircle, CalendarCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[hsl(0_0%_2%)]/90 backdrop-blur-xl border-t border-white/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <Link
          to="/contact"
          className="flex-1 btn-primary text-sm h-11 justify-center"
          data-testid="sticky-cta-quote"
        >
          <CalendarCheck className="h-4 w-4" />
          Check Availability
        </Link>
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 w-11 rounded-full border border-[hsl(43_74%_49%/0.4)] flex items-center justify-center"
          data-testid="sticky-cta-whatsapp"
        >
          <MessageCircle className="h-5 w-5 text-[hsl(43_74%_49%)]" />
        </a>
      </div>
    </div>
  );
}
