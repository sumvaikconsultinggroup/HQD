import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Hash, Wine, Play } from 'lucide-react';
import { VideoReel } from '@/components/VideoReel';
import { VIDEOS, BRAND } from '@/lib/constants';
import { getSetups, getTestimonials, getFAQs } from '@/lib/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const [setups, setSetups] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [setupsData, testimonialsData, faqsData] = await Promise.all([
          getSetups({ featured: true }),
          getTestimonials({ featured: true }),
          getFAQs()
        ]);
        setSetups(setupsData.slice(0, 3));
        setTestimonials(testimonialsData.slice(0, 3));
        setFaqs(faqsData.slice(0, 4));
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Minimal */}
      <section className="min-h-[90vh] flex items-center pt-20">
        <div className="container-wide">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.p variants={fadeUp} className="label-gold mb-6">
              Luxury Bar Experiences
            </motion.p>
            
            <motion.h1 variants={fadeUp} className="heading-xl text-[hsl(40_33%_95%)] mb-8">
              Crafting unforgettable
              <br />
              <span className="text-gold">moments in every glass</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="body-lg max-w-2xl mb-10">
              Premium cocktail & mocktail bar setups for weddings, corporate events, 
              and private celebrations. Molecular mixology included.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary" data-testid="hero-cta-quote">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/bar-setups" className="btn-outline" data-testid="hero-cta-setups">
                Explore Setups
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={fadeUp} className="flex items-center gap-8 mt-16 pt-16 border-t border-white/5">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(43_74%_49%)] text-[hsl(43_74%_49%)]" />
                  ))}
                </div>
                <p className="text-xs text-[hsl(40_20%_65%)]">500+ Events Served</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-6 text-sm text-[hsl(40_20%_65%)]">
                <span>Weddings</span>
                <span>Corporate</span>
                <span>Private</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-16">
            {[
              { title: 'Molecular Mixology', desc: 'Smoke bubbles, aromatic mists, champagne foams', link: '/services' },
              { title: 'Custom Menus', desc: 'Signature cocktails crafted for your event', link: '/menus' },
              { title: 'Full Service', desc: 'Setup, service, and complete cleanup', link: '/packages' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={item.link} className="block group">
                  <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-2 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="body-sm">{item.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar Setups Preview */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-gold mb-3">Our Setups</p>
              <h2 className="heading-lg text-[hsl(40_33%_95%)]">For every moment</h2>
            </div>
            <Link to="/bar-setups" className="btn-ghost text-sm hidden sm:inline-flex">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid-3">
            {setups.map((setup, i) => (
              <motion.div
                key={setup.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-minimal overflow-hidden hover-lift"
              >
                <div className="aspect-[4/3] bg-[hsl(0_0%_10%)] overflow-hidden">
                  <img 
                    src={setup.image_url} 
                    alt={setup.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-2">{setup.title}</h3>
                  <p className="body-sm mb-4">Best for {setup.best_for}</p>
                  <div className="flex flex-wrap gap-2">
                    {setup.molecular_tag && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[hsl(43_74%_49%/0.1)] text-gold">
                        {setup.molecular_tag}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link to="/bar-setups" className="btn-outline mt-8 sm:hidden w-full justify-center">
            View All Setups <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="section-spacing bg-pearl">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="label-gold mb-3">Free Tools</p>
            <h2 className="heading-lg text-[hsl(0_0%_10%)]">Plan your celebration</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link 
              to="/tools/hashtag-generator" 
              className="group p-8 rounded-2xl border border-[hsl(0_0%_85%)] bg-white hover:border-[hsl(43_74%_49%)] transition-all hover-lift"
              data-testid="home-hashtag-tool"
            >
              <Hash className="h-10 w-10 text-[hsl(43_74%_49%)] mb-4" />
              <h3 className="heading-sm text-[hsl(0_0%_10%)] mb-2">Wedding Hashtag Generator</h3>
              <p className="text-sm text-[hsl(0_0%_40%)] mb-4">
                Create the perfect hashtag for your special day. Enter your names and get creative suggestions.
              </p>
              <span className="text-sm font-medium text-[hsl(43_74%_49%)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Try it free <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link 
              to="/tools/drink-generator" 
              className="group p-8 rounded-2xl border border-[hsl(0_0%_85%)] bg-white hover:border-[hsl(43_74%_49%)] transition-all hover-lift"
              data-testid="home-drink-tool"
            >
              <Wine className="h-10 w-10 text-[hsl(43_74%_49%)] mb-4" />
              <h3 className="heading-sm text-[hsl(0_0%_10%)] mb-2">Signature Drink Generator</h3>
              <p className="text-sm text-[hsl(0_0%_40%)] mb-4">
                Discover your perfect signature cocktail or mocktail through our interactive quiz.
              </p>
              <span className="text-sm font-medium text-[hsl(43_74%_49%)] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Try it free <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="label-gold mb-3">Testimonials</p>
            <h2 className="heading-lg text-[hsl(40_33%_95%)]">What our clients say</h2>
          </div>

          <div className="grid-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-minimal p-8"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[hsl(43_74%_49%)] text-[hsl(43_74%_49%)]" />
                  ))}
                </div>
                <p className="body-md text-[hsl(40_33%_95%)] mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-medium text-[hsl(40_33%_95%)]">{t.name}</p>
                  <p className="body-sm">{t.event_type} • {t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/reviews" className="btn-ghost text-sm">
              Read more reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="label-gold mb-3">FAQs</p>
            <h2 className="heading-lg text-[hsl(40_33%_95%)]">Common questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-white/10 rounded-xl px-6 data-[state=open]:border-[hsl(43_74%_49%/0.3)] transition-colors"
              >
                <AccordionTrigger className="text-left text-[hsl(40_33%_95%)] hover:text-gold py-5 text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="body-md pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link to="/faqs" className="btn-ghost text-sm">
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Video Reels Section - ONLY VIDEOS ON THIS PAGE */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="label-gold mb-3">Our Work</p>
            <h2 className="heading-lg text-[hsl(40_33%_95%)]">See us in action</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {VIDEOS.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-shrink-0 w-[200px] md:w-[240px] snap-start"
              >
                <VideoReel src={video} className="rounded-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing bg-pearl">
        <div className="container-narrow text-center">
          <h2 className="heading-lg text-[hsl(0_0%_10%)] mb-4">
            Ready to elevate your event?
          </h2>
          <p className="body-lg text-[hsl(0_0%_40%)] mb-8 max-w-xl mx-auto">
            Let's create an unforgettable bar experience. Get a custom quote within 24 hours.
          </p>
          <Link to="/contact" className="btn-primary bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_20%)]">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
