import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Award, Heart, Users } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="label-gold mb-4">About Us</p>
              <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
                {BRAND.fullName}
              </h1>
              <p className="heading-md text-gold mb-8">{BRAND.tagline}</p>
              <div className="body-lg space-y-4">
                <p>
                  HQ.D was born from a simple observation: while every aspect of Indian 
                  celebrations has evolved, the bar experience often remains an afterthought.
                </p>
                <p>
                  We set out to change that — to bring artistry, attention to detail, and 
                  premium experience to every glass we serve.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <img src={BRAND.logo} alt="HQ.D" className="w-48 lg:w-64" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-pearl">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-[hsl(0_0%_10%)]">What we stand for</h2>
          </div>
          <div className="grid-4">
            {[
              { icon: Award, title: 'Excellence', desc: 'Premium quality in every pour' },
              { icon: Heart, title: 'Passion', desc: 'We love creating memorable moments' },
              { icon: Users, title: 'Service', desc: 'Professional and attentive always' },
              { icon: MapPin, title: 'Reach', desc: 'Pan-India with destination expertise' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <value.icon className="h-10 w-10 text-gold mx-auto mb-4" />
                <h3 className="heading-sm text-[hsl(0_0%_10%)] mb-2">{value.title}</h3>
                <p className="body-sm text-[hsl(0_0%_40%)]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clear Focus */}
      <section className="section-spacing">
        <div className="container-narrow">
          <div className="card-minimal p-10 lg:p-16 text-center">
            <h2 className="heading-md text-[hsl(40_33%_95%)] mb-6">A clear focus</h2>
            <p className="body-lg text-[hsl(40_33%_95%)] mb-4">
              We specialize exclusively in <span className="text-gold">bar services</span> — 
              cocktails and mocktails.
            </p>
            <p className="body-md">
              We do not provide food, catering, or any other services. This focus allows us 
              to be the absolute best at what we do.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-narrow text-center">
          <h2 className="heading-lg text-[hsl(40_33%_95%)] mb-4">Let's create together</h2>
          <p className="body-lg mb-8">
            We'd love to be part of your celebration.
          </p>
          <Link to="/contact" className="btn-primary">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
