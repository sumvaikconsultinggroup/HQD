import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Wine, Users, PartyPopper, GlassWater } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const services = [
  {
    id: 'wedding',
    icon: Wine,
    title: 'Wedding Bars',
    description: 'From mehendi to reception, we create bespoke bar experiences for every wedding moment. Signature couple cocktails and themed setups.',
    features: ['Mehendi & Haldi bars', 'Sangeet & Cocktail Night', 'Reception champagne towers', 'Signature couple cocktails'],
  },
  {
    id: 'corporate',
    icon: Users,
    title: 'Corporate Events',
    description: 'Impress clients and celebrate milestones with professional bar setups. Brandable bars and high-volume service.',
    features: ['Product launches', 'Annual galas', 'Client entertainment', 'Brand activations'],
  },
  {
    id: 'private',
    icon: PartyPopper,
    title: 'Private Parties',
    description: 'Birthday bashes, anniversaries, house parties. We bring the premium bar experience to your celebration.',
    features: ['Birthday parties', 'Anniversary celebrations', 'House warmings', 'Pool parties'],
  },
  {
    id: 'mocktail',
    icon: GlassWater,
    title: 'Mocktail Bars',
    description: 'Full non-alcoholic experiences with premium presentation. Perfect for dry events or mixed gatherings.',
    features: ['Complete mocktail menus', 'Molecular mocktails', 'Fresh juice bars', 'Themed presentations'],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <p className="label-gold mb-4">Our Services</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Premium bar experiences
              <br /><span className="text-gold">for every occasion</span>
            </h1>
            <p className="body-lg max-w-2xl">
              We specialize exclusively in bar services — cocktails and mocktails. 
              No food, no catering, just exceptional drinks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="pb-20">
        <div className="container-wide space-y-20">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <service.icon className="h-12 w-12 text-gold mb-6" />
                <h2 className="heading-lg text-[hsl(40_33%_95%)] mb-4">{service.title}</h2>
                <p className="body-lg mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 body-md text-[hsl(40_33%_95%)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/contact?service=${service.id}`} className="btn-outline text-sm">
                  Request Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(0_0%_8%)] to-[hsl(0_0%_5%)] border border-white/5 flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <service.icon className="h-24 w-24 text-[hsl(43_74%_49%/0.2)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Molecular Strip */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1">
              <Sparkles className="h-10 w-10 text-gold mb-4" />
              <h2 className="heading-md text-[hsl(40_33%_95%)] mb-4">Molecular Mixology Included</h2>
              <p className="body-md mb-6">
                Our Signature, Luxe, and Ultra packages include molecular elements — 
                smoke bubbles, aromatic mists, and champagne foams.
              </p>
              <Link to="/packages" className="btn-ghost text-sm p-0">
                View packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex gap-4">
              {['Smoke Bubbles', 'Aromatic Mists', 'Foam Art'].map((tech) => (
                <div key={tech} className="text-center px-6 py-4 rounded-xl border border-white/10">
                  <Sparkles className="h-6 w-6 text-gold mx-auto mb-2" />
                  <p className="text-sm text-[hsl(40_33%_95%)]">{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="heading-lg text-[hsl(40_33%_95%)] mb-4">Ready to get started?</h2>
          <p className="body-lg mb-8 max-w-xl mx-auto">
            Tell us about your event and we'll craft the perfect bar experience.
          </p>
          <Link to="/contact" className="btn-primary">
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
