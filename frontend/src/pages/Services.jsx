import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wine, Users, PartyPopper, GlassWater } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';
import { VIDEOS } from '@/lib/constants';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const services = [
  {
    id: 'wedding',
    title: 'Wedding Bars',
    icon: Wine,
    description: 'From mehendi to reception, we create bespoke bar experiences for every wedding moment. Signature couple cocktails, themed setups, and molecular magic.',
    features: [
      'Mehendi & Haldi bars',
      'Sangeet & Cocktail Night',
      'Reception champagne towers',
      'Signature couple cocktails',
      'After-party lounges',
    ],
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
    video: VIDEOS[2],
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    icon: Users,
    description: 'Impress clients and celebrate milestones with professional bar setups. Brandable bars, high-volume service, and sophisticated menus.',
    features: [
      'Product launches',
      'Annual galas',
      'Client entertainment',
      'Team celebrations',
      'Brand activations',
    ],
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
    video: VIDEOS[4],
  },
  {
    id: 'private',
    title: 'Private Parties',
    icon: PartyPopper,
    description: 'Birthday bashes, anniversaries, house parties - intimate to extravagant. We bring the bar to your celebration.',
    features: [
      'Birthday parties',
      'Anniversary celebrations',
      'House warmings',
      'Pool parties',
      'Themed events',
    ],
    image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=800',
    video: VIDEOS[3],
  },
  {
    id: 'mocktail',
    title: 'Mocktail Bars',
    icon: GlassWater,
    description: 'Full non-alcoholic experiences with the same premium presentation. Perfect for dry events or mixed gatherings.',
    features: [
      'Complete mocktail menus',
      'Molecular mocktails',
      'Virgin versions of classics',
      'Fresh juice bars',
      'Themed presentations',
    ],
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800',
  },
];

const process = [
  { step: '01', title: 'Consultation', desc: 'We discuss your vision, guest count, venue, and preferences.' },
  { step: '02', title: 'Menu Curation', desc: 'Our mixologists craft a custom drink menu for your event.' },
  { step: '03', title: 'Setup Design', desc: 'We design the bar aesthetic to match your theme.' },
  { step: '04', title: 'Event Day', desc: 'Professional bartenders deliver exceptional service.' },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-24">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Our Services</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Premium Bar Experiences
              <br />
              <span className="text-[hsl(46_64%_52%)]">For Every Occasion</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6 max-w-2xl leading-relaxed">
              We specialize exclusively in bar services - cocktails and mocktails. 
              No food, no catering, just exceptional drinks and unforgettable presentations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, index) => (
        <section 
          key={service.id}
          className={`section-y ${index % 2 === 1 ? 'bg-[hsl(226_10%_6%)]' : ''}`}
        >
          <div className="container-hqd">
            <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                {service.video ? (
                  <AutoPlayVideo
                    src={service.video}
                    className="w-full rounded-2xl"
                    aspectRatio="4/3"
                    testid={`service-video-${service.id}`}
                  />
                ) : (
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full rounded-2xl aspect-[4/3] object-cover"
                  />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <service.icon className="h-10 w-10 text-[hsl(46_64%_52%)] mb-4" />
                <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">{service.title}</h2>
                <p className="text-[hsl(35_33%_97%)]/80 leading-relaxed mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[hsl(35_33%_97%)]/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=${service.id}`}
                  className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-11 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors"
                >
                  Request {service.title} Quote <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Process */}
      <section className="pearl-section section-y">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Our Process</span>
            <h2 className="text-h2 text-[hsl(228_13%_4%)] mt-2">How We Work</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-5xl text-[hsl(46_64%_52%)]">{item.step}</span>
                <h3 className="font-display text-xl text-[hsl(228_13%_4%)] mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-[hsl(228_13%_4%)]/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Let's Create Something Extraordinary</h2>
          <p className="text-[hsl(35_33%_97%)]/70 mb-8 max-w-xl mx-auto">
            Tell us about your event and we'll craft the perfect bar experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-8 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors btn-gold-glow"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
