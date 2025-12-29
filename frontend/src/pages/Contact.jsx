import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { submitLead } from '@/lib/api';
import { BRAND, EVENT_TYPES, BAR_TYPES, GUEST_RANGES, DURATION_OPTIONS, BUDGET_RANGES, getWhatsAppLink } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event_type: '',
    event_date: '',
    city: '',
    venue: '',
    guest_count: '',
    duration: '',
    bar_type: 'both',
    theme: '',
    budget_range: '',
    message: '',
    setup_interest: '',
  });
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const setup = searchParams.get('setup');
    const service = searchParams.get('service');
    const pkg = searchParams.get('package');
    
    if (setup) {
      setFormData(prev => ({ ...prev, setup_interest: setup }));
    }
    if (service) {
      const eventTypeMap = {
        'wedding': 'Wedding',
        'corporate': 'Corporate Event',
        'private': 'Private Party',
        'mocktail': 'Private Party',
      };
      setFormData(prev => ({ ...prev, event_type: eventTypeMap[service] || '' }));
    }
    if (pkg) {
      setFormData(prev => ({ ...prev, message: `Interested in ${pkg.charAt(0).toUpperCase() + pkg.slice(1)} package` }));
    }
  }, [searchParams]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      handleChange('event_date', format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await submitLead(formData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting lead:', err);
      setError('Something went wrong. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-4"
        >
          <div className="h-16 w-16 rounded-full bg-[hsl(46_64%_52%)]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-[hsl(46_64%_52%)]" />
          </div>
          <h1 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Thank You!</h1>
          <p className="text-[hsl(35_33%_97%)]/70 mb-6">
            We've received your inquiry and will get back to you within 24 hours.
          </p>
          <a
            href={getWhatsAppLink('Hi! I just submitted an inquiry on your website.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-11 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Contact</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Let's Create
              <br />
              <span className="text-[hsl(46_64%_52%)]">Something Special</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Tell us about your event and we'll create a custom proposal within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <div>
                  <h3 className="text-h3 text-[hsl(35_33%_97%)] mb-6">Your Details</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[hsl(35_33%_97%)] mb-2 block">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[hsl(35_33%_97%)] mb-2 block">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-email-input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="phone" className="text-[hsl(35_33%_97%)] mb-2 block">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+91"
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-phone-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="text-h3 text-[hsl(35_33%_97%)] mb-6">Event Details</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Event Type *</Label>
                      <Select 
                        value={formData.event_type} 
                        onValueChange={(v) => handleChange('event_type', v)}
                      >
                        <SelectTrigger 
                          className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11"
                          data-testid="contact-event-type-select"
                        >
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                          {EVENT_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="w-full h-11 px-3 rounded-md border border-white/10 bg-transparent text-left flex items-center justify-between text-[hsl(35_33%_97%)] hover:border-[hsl(46_64%_52%)]/50 transition-colors"
                            data-testid="contact-date-picker"
                          >
                            {date ? format(date, 'PPP') : <span className="text-[hsl(42_15%_70%)]">Pick a date</span>}
                            <CalendarIcon className="h-4 w-4 text-[hsl(42_15%_70%)]" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[hsl(226_10%_8%)] border-white/10">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-[hsl(35_33%_97%)] mb-2 block">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-city-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="venue" className="text-[hsl(35_33%_97%)] mb-2 block">Venue (if known)</Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => handleChange('venue', e.target.value)}
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-venue-input"
                      />
                    </div>

                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Expected Guests</Label>
                      <Select 
                        value={formData.guest_count} 
                        onValueChange={(v) => handleChange('guest_count', v)}
                      >
                        <SelectTrigger className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                          {GUEST_RANGES.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Duration</Label>
                      <Select 
                        value={formData.duration} 
                        onValueChange={(v) => handleChange('duration', v)}
                      >
                        <SelectTrigger className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                          {DURATION_OPTIONS.map((duration) => (
                            <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Bar Type</Label>
                      <Select 
                        value={formData.bar_type} 
                        onValueChange={(v) => handleChange('bar_type', v)}
                      >
                        <SelectTrigger className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                          {BAR_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-[hsl(35_33%_97%)] mb-2 block">Budget Range</Label>
                      <Select 
                        value={formData.budget_range} 
                        onValueChange={(v) => handleChange('budget_range', v)}
                      >
                        <SelectTrigger className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                          {BUDGET_RANGES.map((range) => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="theme" className="text-[hsl(35_33%_97%)] mb-2 block">Event Theme (optional)</Label>
                      <Input
                        id="theme"
                        value={formData.theme}
                        onChange={(e) => handleChange('theme', e.target.value)}
                        placeholder="e.g., Royal, Bohemian, Modern, etc."
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                        data-testid="contact-theme-input"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="message" className="text-[hsl(35_33%_97%)] mb-2 block">Additional Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Tell us more about your vision, any specific requirements, or questions you have..."
                        rows={4}
                        className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] resize-none"
                        data-testid="contact-message-input"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-8 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors btn-gold-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="contact-submit-button"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-dark p-6">
                <h3 className="font-display text-xl text-[hsl(35_33%_97%)] mb-4">Prefer WhatsApp?</h3>
                <p className="text-sm text-[hsl(35_33%_97%)]/70 mb-4">
                  Get a faster response by messaging us directly on WhatsApp.
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-[12px] border border-[hsl(46_64%_52%)] text-[hsl(35_33%_97%)] px-6 h-11 font-medium hover:bg-white/5 transition-colors"
                  data-testid="contact-whatsapp-button"
                >
                  <MessageCircle className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="card-dark p-6">
                <h3 className="font-display text-xl text-[hsl(35_33%_97%)] mb-4">What to Expect</h3>
                <ul className="space-y-3 text-sm text-[hsl(35_33%_97%)]/70">
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)] flex items-center justify-center text-xs shrink-0">1</span>
                    We'll review your inquiry within 24 hours
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)] flex items-center justify-center text-xs shrink-0">2</span>
                    Schedule a call to discuss your vision
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="h-5 w-5 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)] flex items-center justify-center text-xs shrink-0">3</span>
                    Receive a custom proposal with options
                  </li>
                </ul>
              </div>

              <div className="card-dark p-6">
                <h3 className="font-display text-xl text-[hsl(35_33%_97%)] mb-2">Email Us</h3>
                <a 
                  href={`mailto:${BRAND.email}`}
                  className="text-[hsl(46_64%_52%)] hover:underline break-all"
                >
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
