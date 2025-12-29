import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { submitLead } from '@/lib/api';
import { BRAND, EVENT_TYPES, BAR_TYPES, GUEST_RANGES, BUDGET_RANGES, getWhatsAppLink } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', event_type: '', event_date: '',
    city: '', venue: '', guest_count: '', bar_type: 'both',
    budget_range: '', message: '', setup_interest: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const setup = searchParams.get('setup');
    const service = searchParams.get('service');
    if (setup) setFormData(prev => ({ ...prev, setup_interest: setup }));
    if (service) {
      const map = { wedding: 'Wedding', corporate: 'Corporate Event', private: 'Private Party' };
      setFormData(prev => ({ ...prev, event_type: map[service] || '' }));
    }
  }, [searchParams]);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitLead(formData);
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md px-5"
        >
          <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-gold" />
          </div>
          <h1 className="heading-lg text-[hsl(40_33%_95%)] mb-4">Thank you!</h1>
          <p className="body-md mb-8">We'll get back to you within 24 hours.</p>
          <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="label-gold mb-4">Contact</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Let's create something
              <br /><span className="text-gold">special</span>
            </h1>
            <p className="body-lg">Tell us about your event. Custom quote within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.form 
              onSubmit={handleSubmit} 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Your Details */}
              <div>
                <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-6">Your Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Full Name *</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                      data-testid="contact-name"
                    />
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Email *</Label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                      data-testid="contact-email"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Phone *</Label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+91"
                      className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                      data-testid="contact-phone"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-6">Event Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Event Type *</Label>
                    <Select value={formData.event_type} onValueChange={(v) => handleChange('event_type', v)}>
                      <SelectTrigger className="bg-transparent border-white/10 h-11" data-testid="contact-event-type">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_5%)] border-white/10">
                        {EVENT_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Event Date</Label>
                    <Input
                      type="date"
                      value={formData.event_date}
                      onChange={(e) => handleChange('event_date', e.target.value)}
                      className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                    />
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">City</Label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                    />
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Guests</Label>
                    <Select value={formData.guest_count} onValueChange={(v) => handleChange('guest_count', v)}>
                      <SelectTrigger className="bg-transparent border-white/10 h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_5%)] border-white/10">
                        {GUEST_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Bar Type</Label>
                    <Select value={formData.bar_type} onValueChange={(v) => handleChange('bar_type', v)}>
                      <SelectTrigger className="bg-transparent border-white/10 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_5%)] border-white/10">
                        {BAR_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Budget</Label>
                    <Select value={formData.budget_range} onValueChange={(v) => handleChange('budget_range', v)}>
                      <SelectTrigger className="bg-transparent border-white/10 h-11">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_5%)] border-white/10">
                        {BUDGET_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Message</Label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                      className="bg-transparent border-white/10 focus-visible:ring-gold resize-none"
                      data-testid="contact-message"
                    />
                  </div>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button type="submit" disabled={loading} className="btn-primary" data-testid="contact-submit">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : <><Send className="h-4 w-4" /> Send Inquiry</>}
              </button>
            </motion.form>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-minimal p-6">
                <h4 className="heading-sm text-[hsl(40_33%_95%)] mb-4">Prefer WhatsApp?</h4>
                <p className="body-sm mb-4">Get a faster response.</p>
                <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full justify-center text-sm" data-testid="contact-whatsapp">
                  <MessageCircle className="h-4 w-4 text-gold" /> Chat Now
                </a>
              </div>
              <div className="card-minimal p-6">
                <h4 className="heading-sm text-[hsl(40_33%_95%)] mb-4">What to Expect</h4>
                <ul className="space-y-3 body-sm">
                  <li className="flex items-start gap-3"><span className="h-5 w-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs shrink-0">1</span> Review within 24 hours</li>
                  <li className="flex items-start gap-3"><span className="h-5 w-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs shrink-0">2</span> Call to discuss your vision</li>
                  <li className="flex items-start gap-3"><span className="h-5 w-5 rounded-full bg-gold/10 text-gold flex items-center justify-center text-xs shrink-0">3</span> Custom proposal with options</li>
                </ul>
              </div>
              <div className="card-minimal p-6">
                <h4 className="heading-sm text-[hsl(40_33%_95%)] mb-2">Email</h4>
                <a href={`mailto:${BRAND.email}`} className="text-gold text-sm hover:underline break-all">{BRAND.email}</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
