import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Users, Clock, Wine } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';
import { VIDEOS, BRAND } from '@/lib/constants';
import { getSetups, getTestimonials, getFAQs } from '@/lib/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } }
};

const stagger = {
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
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
        setSetups(setupsData.slice(0, 6));
        setTestimonials(testimonialsData.slice(0, 4));
        setFaqs(faqsData.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-noir noir-noise">
        <div className="container-hqd min-h-[85vh] py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Copy */}
            <motion.div 
              initial="hidden"
              animate="show"
              variants={stagger}
              className="space-y-6 lg:space-y-8 order-2 lg:order-1"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(46_64%_52%)]/30 bg-white/5">
                <Sparkles className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                <span className="text-sm text-[hsl(35_33%_97%)]">{BRAND.tagline}</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-h1 text-[hsl(35_33%_97%)]"
              >
                Cinematic Bars.
                <br />
                <span className="text-[hsl(46_64%_52%)]">Editorial Drinks.</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-base lg:text-lg text-[hsl(35_33%_97%)]/80 max-w-xl leading-relaxed"
              >
                Premium cocktail & mocktail bar setups for weddings, corporate events, and private parties. 
                Molecular mixology included.
              </motion.p>
              
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  data-testid="primary-cta-button"
                  className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors btn-gold-glow"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/bar-setups"
                  data-testid="secondary-cta-button"
                  className="inline-flex items-center gap-2 rounded-[12px] border border-[hsl(46_64%_52%)] text-[hsl(35_33%_97%)] px-6 h-12 font-medium hover:bg-white/5 transition-colors"
                >
                  Explore Setups
                </Link>
              </motion.div>

              {/* Trust Strip */}
              <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(46_64%_52%)] text-[hsl(46_64%_52%)]" />
                  ))}
                  <span className="ml-2 text-sm text-[hsl(35_33%_97%)]/70">500+ Events</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[hsl(46_64%_52%)]" />
                  <span className="text-sm text-[hsl(35_33%_97%)]/70">Weddings</span>
                  <span className="h-1 w-1 rounded-full bg-[hsl(46_64%_52%)]" />
                  <span className="text-sm text-[hsl(35_33%_97%)]/70">Corporate</span>
                  <span className="h-1 w-1 rounded-full bg-[hsl(46_64%_52%)]" />
                  <span className="text-sm text-[hsl(35_33%_97%)]/70">Private</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Video Grid */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="reel-grid order-1 lg:order-2"
            >
              {VIDEOS.slice(0, 4).map((video, index) => (
                <AutoPlayVideo
                  key={index}
                  src={video}
                  testid={`hero-reel-${index + 1}`}
                  className={index % 2 === 1 ? 'mt-8' : ''}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Molecular Mixology Strip */}
      <section className="bg-[hsl(226_10%_6%)] border-y border-[hsl(46_64%_52%)]/10">
        <div className="container-hqd py-12 lg:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Signature Experience</span>
              <h2 className="text-h2 text-[hsl(35_33%_97%)]">Molecular Mixology</h2>
              <p className="text-[hsl(35_33%_97%)]/70 leading-relaxed">
                Transform your event with smoke bubbles, aromatic mists, champagne foams, and more. 
                Our molecular techniques create unforgettable moments, not just drinks.
              </p>
              <Link
                to="/molecular"
                className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['Smoke Bubbles', 'Aromatic Mists', 'Champagne Foam'].map((technique, i) => (
                <div key={i} className="text-center p-4 rounded-lg bg-[hsl(228_10%_10%)] border border-white/5">
                  <Sparkles className="h-8 w-8 text-[hsl(46_64%_52%)] mx-auto mb-3" />
                  <span className="text-sm text-[hsl(35_33%_97%)]">{technique}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bar Setups Preview */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Our Setups</span>
              <h2 className="text-h2 text-[hsl(35_33%_97%)] mt-2">Bar Setups for Every Moment</h2>
            </div>
            <Link
              to="/bar-setups"
              className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
            >
              View All Setups <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {setups.map((setup) => (
              <motion.div
                key={setup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-dark overflow-hidden card-hover"
              >
                {setup.video_url ? (
                  <AutoPlayVideo
                    src={setup.video_url}
                    className="w-full"
                    aspectRatio="4/3"
                    testid={`setup-video-${setup.id}`}
                  />
                ) : (
                  <img 
                    src={setup.image_url} 
                    alt={setup.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-display text-xl text-[hsl(35_33%_97%)] mb-2">{setup.title}</h3>
                  <p className="text-sm text-[hsl(42_15%_70%)] mb-3">Best for {setup.best_for}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {setup.menu_highlights.slice(0, 2).map((drink, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-[hsl(35_33%_97%)]">
                        {drink}
                      </span>
                    ))}
                    {setup.molecular_tag && (
                      <span className="text-xs px-2 py-1 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)]">
                        {setup.molecular_tag}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/contact?setup=${setup.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-[hsl(46_64%_52%)] hover:underline"
                  >
                    Get this setup <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="pearl-section section-y">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Packages</span>
            <h2 className="text-h2 text-[hsl(228_13%_4%)] mt-2">Tailored to Your Event</h2>
            <p className="text-[hsl(228_13%_4%)]/70 mt-3 max-w-2xl mx-auto">
              Every event is unique. We offer custom quotes based on your specific requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
              name: 'Essential',
              icon: Wine,
              desc: 'Intimate gatherings up to 100 guests',
              features: ['2 Bartenders', '8 Drink Menu', '4-Hour Service']
            }, {
              name: 'Signature',
              icon: Star,
              desc: 'Medium events 100-250 guests',
              features: ['3-4 Bartenders', '12 Drink Menu', 'Molecular Elements'],
              popular: true
            }, {
              name: 'Luxe',
              icon: Sparkles,
              desc: 'Grand celebrations 250-400 guests',
              features: ['4-6 Bartenders', '16+ Drinks', 'Full Molecular']
            }, {
              name: 'Ultra',
              icon: Users,
              desc: 'Bespoke luxury 400+ guests',
              features: ['Unlimited Staff', 'Custom Everything', 'White Glove']
            }].map((pkg, i) => (
              <div key={i} className={`rounded-2xl p-6 ${pkg.popular ? 'bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] ring-2 ring-[hsl(46_64%_52%)]' : 'bg-white border border-[hsl(228_13%_4%)]/10'}`}>
                {pkg.popular && (
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] mb-4">Most Popular</span>
                )}
                <pkg.icon className={`h-8 w-8 mb-4 ${pkg.popular ? 'text-[hsl(46_64%_52%)]' : 'text-[hsl(228_13%_4%)]'}`} />
                <h3 className="font-display text-xl mb-2">{pkg.name}</h3>
                <p className={`text-sm mb-4 ${pkg.popular ? 'text-[hsl(35_33%_97%)]/70' : 'text-[hsl(228_13%_4%)]/70'}`}>{pkg.desc}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, j) => (
                    <li key={j} className={`text-sm flex items-center gap-2 ${pkg.popular ? 'text-[hsl(35_33%_97%)]/80' : 'text-[hsl(228_13%_4%)]/80'}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] px-6 h-12 font-medium hover:bg-[hsl(228_13%_10%)] transition-colors"
            >
              View All Packages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">How We Work</span>
            <h2 className="text-h2 text-[hsl(35_33%_97%)] mt-2">Seamless from Start to Finish</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Inquiry', desc: 'Share your event details' },
              { step: '02', title: 'Curation', desc: 'We craft your custom menu' },
              { step: '03', title: 'Setup', desc: 'Premium bar installation' },
              { step: '04', title: 'Service', desc: 'Expert bartending' },
              { step: '05', title: 'Cleanup', desc: 'Complete pack-down' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <span className="font-display text-4xl text-[hsl(46_64%_52%)]">{item.step}</span>
                <h3 className="font-display text-lg text-[hsl(35_33%_97%)] mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(42_15%_70%)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[hsl(226_10%_6%)] section-y border-y border-[hsl(46_64%_52%)]/10">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Testimonials</span>
            <h2 className="text-h2 text-[hsl(35_33%_97%)] mt-2">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="card-dark p-6 lg:p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[hsl(46_64%_52%)] text-[hsl(46_64%_52%)]" />
                  ))}
                </div>
                <p className="text-[hsl(35_33%_97%)]/90 leading-relaxed mb-6">"{t.quote}"</p>
                <div>
                  <p className="font-display text-lg text-[hsl(35_33%_97%)]">{t.name}</p>
                  <p className="text-sm text-[hsl(42_15%_70%)]">{t.event_type} • {t.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
            >
              Read More Reviews <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-y">
        <div className="container-hqd max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">FAQs</span>
            <h2 className="text-h2 text-[hsl(35_33%_97%)] mt-2">Common Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-white/10 rounded-lg px-6 data-[state=open]:border-[hsl(46_64%_52%)]/25"
              >
                <AccordionTrigger 
                  data-testid="faq-question"
                  className="text-left text-[hsl(35_33%_97%)] hover:text-[hsl(46_64%_52%)] py-5"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent 
                  data-testid="faq-answer"
                  className="text-[hsl(42_15%_70%)] pb-5"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
            >
              View All FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pearl-section section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(228_13%_4%)] mb-4">Ready to Elevate Your Event?</h2>
          <p className="text-[hsl(228_13%_4%)]/70 mb-8 max-w-xl mx-auto">
            Let's create an unforgettable bar experience for your guests. Get a custom quote in 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] px-8 h-12 font-medium hover:bg-[hsl(228_13%_10%)] transition-colors"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tools/hashtag-generator"
              className="inline-flex items-center gap-2 rounded-[12px] border border-[hsl(228_13%_4%)] text-[hsl(228_13%_4%)] px-8 h-12 font-medium hover:bg-[hsl(228_13%_4%)]/5 transition-colors"
            >
              Try Hashtag Generator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
