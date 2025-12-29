import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CloudFog, Droplets, Wind } from 'lucide-react';

const techniques = [
  { id: 'smoke', icon: CloudFog, title: 'Smoke Bubbles', desc: 'Dramatic smoke-filled bubbles that burst to release aromatic mist.', uses: ['Welcome drinks', 'Signature cocktails', 'Photo moments'] },
  { id: 'mist', icon: Wind, title: 'Aromatic Mists', desc: 'Scented vapor clouds that enhance the drinking experience.', uses: ['Gin cocktails', 'Whiskey presentations', 'Themed drinks'] },
  { id: 'foam', icon: Droplets, title: 'Champagne Foam', desc: 'Light, airy foam made from champagne that adds elegance.', uses: ['Reception toasts', 'Celebration drinks', 'Dessert cocktails'] },
  { id: 'art', icon: Sparkles, title: 'Foam Art', desc: 'Custom flavored foams for creative presentations.', uses: ['Espresso martinis', 'Mocktails', 'Themed events'] },
];

export default function MolecularMixology() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm text-[hsl(40_33%_95%)]">Signature Experience</span>
            </div>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Molecular
              <br /><span className="text-gold">Mixology</span>
            </h1>
            <p className="body-lg max-w-2xl">
              Transform ordinary drinks into extraordinary experiences. Our molecular techniques 
              create memorable moments that guests talk about long after the event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Techniques */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {techniques.map((tech, i) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-minimal p-8"
              >
                <tech.icon className="h-10 w-10 text-gold mb-4" />
                <h3 className="heading-md text-[hsl(40_33%_95%)] mb-3">{tech.title}</h3>
                <p className="body-md mb-6">{tech.desc}</p>
                <div>
                  <p className="text-xs text-gold mb-2">Best For</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.uses.map((use, j) => (
                      <span key={j} className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-[hsl(40_33%_95%)]">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-narrow text-center">
          <Sparkles className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="heading-md text-[hsl(40_33%_95%)] mb-4">Safe & Professional</h2>
          <p className="body-lg">
            All molecular techniques use food-grade materials and are prepared by trained professionals. 
            The magic is in the presentation — the drinks remain delicious and safe.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <h2 className="heading-md text-[hsl(40_33%_95%)] mb-4">Add some magic</h2>
          <p className="body-lg mb-8">
            Molecular mixology is included in our Signature, Luxe, and Ultra packages.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/packages" className="btn-primary">
              View Packages <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
