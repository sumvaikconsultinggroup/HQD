import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CloudFog, Droplets, Wind } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';
import { VIDEOS } from '@/lib/constants';

const techniques = [
  {
    id: 'smoke-bubbles',
    title: 'Smoke Bubbles',
    icon: CloudFog,
    description: 'Dramatic smoke-filled bubbles that burst to release aromatic mist. Perfect for making an entrance or creating photo moments.',
    uses: ['Welcome drinks', 'Signature cocktails', 'Table presentations'],
    video: VIDEOS[1],
  },
  {
    id: 'aromatic-mists',
    title: 'Aromatic Mists',
    icon: Wind,
    description: 'Scented vapor clouds that enhance the drinking experience with complementary aromas - rosemary, lavender, citrus, and more.',
    uses: ['Gin cocktails', 'Whiskey presentations', 'Themed drinks'],
    image: 'https://images.unsplash.com/photo-1695979993783-af8b55b488ff?w=600',
  },
  {
    id: 'champagne-foam',
    title: 'Champagne Foam',
    icon: Droplets,
    description: 'Light, airy foam made from champagne that adds elegance and texture. Dissolves on the tongue releasing bubbles.',
    uses: ['Reception toasts', 'Celebration drinks', 'Dessert cocktails'],
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600',
  },
  {
    id: 'foam-art',
    title: 'Foam Art',
    icon: Sparkles,
    description: 'Custom flavored foams for creative presentations - coffee, rose, passion fruit. Can be shaped and styled.',
    uses: ['Espresso martinis', 'Mocktails', 'Themed events'],
    video: VIDEOS[3],
  },
];

export default function MolecularMixology() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(46_64%_52%)]/30 bg-white/5 mb-6">
                <Sparkles className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                <span className="text-sm text-[hsl(35_33%_97%)]">Signature Experience</span>
              </div>
              
              <h1 className="text-h1 text-[hsl(35_33%_97%)]">
                Molecular
                <br />
                <span className="text-[hsl(46_64%_52%)]">Mixology</span>
              </h1>
              
              <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6 max-w-xl leading-relaxed">
                Transform ordinary drinks into extraordinary experiences. Our molecular techniques create memorable moments 
                that guests talk about long after the event.
              </p>
              
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors mt-8"
              >
                Add Molecular Magic to Your Event <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AutoPlayVideo
                src={VIDEOS[0]}
                className="w-full rounded-2xl"
                aspectRatio="4/3"
                testid="molecular-hero-video"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Our Techniques</span>
            <h2 className="text-h2 text-[hsl(35_33%_97%)] mt-2">The Science of Spectacle</h2>
            <p className="text-[hsl(35_33%_97%)]/70 mt-4 max-w-2xl mx-auto">
              Every technique is food-safe, professionally executed, and designed to enhance - not overpower - 
              the drink experience.
            </p>
          </div>

          <div className="space-y-16">
            {techniques.map((technique, index) => (
              <motion.div
                key={technique.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? '' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {technique.video ? (
                    <AutoPlayVideo
                      src={technique.video}
                      className="w-full rounded-2xl"
                      aspectRatio="4/3"
                      testid={`technique-video-${technique.id}`}
                    />
                  ) : (
                    <img 
                      src={technique.image} 
                      alt={technique.title}
                      className="w-full rounded-2xl aspect-[4/3] object-cover"
                    />
                  )}
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <technique.icon className="h-10 w-10 text-[hsl(46_64%_52%)] mb-4" />
                  <h3 className="text-h3 text-[hsl(35_33%_97%)] mb-4">{technique.title}</h3>
                  <p className="text-[hsl(35_33%_97%)]/80 leading-relaxed mb-6">{technique.description}</p>
                  
                  <div>
                    <span className="text-sm text-[hsl(46_64%_52%)] mb-3 block">Best Used For</span>
                    <div className="flex flex-wrap gap-2">
                      {technique.uses.map((use, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-[hsl(35_33%_97%)]">
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Note */}
      <section className="bg-[hsl(226_10%_6%)] section-y border-y border-[hsl(46_64%_52%)]/10">
        <div className="container-hqd">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-10 w-10 text-[hsl(46_64%_52%)] mx-auto mb-4" />
            <h2 className="text-h3 text-[hsl(35_33%_97%)] mb-4">Safe & Professional</h2>
            <p className="text-[hsl(35_33%_97%)]/70 leading-relaxed">
              All our molecular techniques use food-grade materials and are prepared by trained professionals. 
              We follow strict safety protocols and can accommodate dietary restrictions. 
              The magic is in the presentation - the drinks remain delicious and safe to consume.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Add Some Magic</h2>
          <p className="text-[hsl(35_33%_97%)]/70 mb-8 max-w-xl mx-auto">
            Molecular mixology is included in our Signature, Luxe, and Ultra packages, 
            or can be added to any event.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors"
            >
              View Packages <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-[12px] border border-[hsl(46_64%_52%)] text-[hsl(35_33%_97%)] px-6 h-12 font-medium hover:bg-white/5 transition-colors"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
