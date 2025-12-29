import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Award, Heart } from 'lucide-react';
import { BRAND, VIDEOS } from '@/lib/constants';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';

export default function About() {
  const values = [
    { icon: Award, title: 'Excellence', desc: 'Premium quality in every pour, every presentation, every moment.' },
    { icon: Heart, title: 'Passion', desc: 'We love what we do - creating memorable drink experiences.' },
    { icon: Users, title: 'Service', desc: 'Attentive, professional, and always going the extra mile.' },
    { icon: MapPin, title: 'Reach', desc: 'Pan-India service with destination wedding expertise.' },
  ];

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
              <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">About Us</span>
              <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
                {BRAND.fullName}
              </h1>
              <p className="text-3xl text-[hsl(46_64%_52%)] font-display mt-4">
                {BRAND.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={BRAND.logo} 
                alt="HQ.D Logo" 
                className="w-48 lg:w-64 mx-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <AutoPlayVideo
                src={VIDEOS[4]}
                className="w-full rounded-2xl"
                aspectRatio="4/3"
                testid="about-video"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-h2 text-[hsl(35_33%_97%)]">Our Story</h2>
              <div className="space-y-4 text-[hsl(35_33%_97%)]/80 leading-relaxed">
                <p>
                  HQ.D was born from a simple observation: while every aspect of Indian celebrations 
                  has evolved to embrace sophistication, the bar experience often remains an afterthought.
                </p>
                <p>
                  We set out to change that. To bring the same level of artistry, attention to detail, 
                  and premium experience to the bar that couples invest in every other element of their events.
                </p>
                <p>
                  Today, we're proud to be the choice of discerning hosts across India - from intimate 
                  Delhi soirées to grand Udaipur destination weddings, from Fortune 500 corporate galas 
                  to celebrity celebrations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="pearl-section section-y">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-[hsl(228_13%_4%)]">What We Stand For</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <value.icon className="h-10 w-10 text-[hsl(46_64%_52%)] mx-auto mb-4" />
                <h3 className="font-display text-xl text-[hsl(228_13%_4%)] mb-2">{value.title}</h3>
                <p className="text-sm text-[hsl(228_13%_4%)]/70">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="max-w-3xl mx-auto">
            <div className="card-dark p-8 lg:p-12 text-center">
              <h2 className="text-h3 text-[hsl(35_33%_97%)] mb-6">A Clear Focus</h2>
              <p className="text-lg text-[hsl(35_33%_97%)]/80 mb-6">
                We specialize exclusively in <span className="text-[hsl(46_64%_52%)]">bar services</span> - 
                cocktails and mocktails.
              </p>
              <p className="text-[hsl(35_33%_97%)]/70">
                We do not provide food, catering, or any other services. This focus allows us to 
                be the absolute best at what we do. We work seamlessly with your caterers, planners, 
                and venue teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="bg-[hsl(226_10%_6%)] section-y border-y border-[hsl(46_64%_52%)]/10">
        <div className="container-hqd">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Where We Serve</h2>
            <p className="text-[hsl(35_33%_97%)]/70">Pan-India coverage with destination wedding expertise</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { city: 'Delhi NCR', type: 'Home Base' },
              { city: 'Jaipur & Udaipur', type: 'Destination Weddings' },
              { city: 'Mumbai & Goa', type: 'Corporate & Beach' },
              { city: 'Pan India', type: 'Anywhere You Celebrate' },
            ].map((location, i) => (
              <div key={i} className="p-6">
                <MapPin className="h-6 w-6 text-[hsl(46_64%_52%)] mx-auto mb-3" />
                <h3 className="font-display text-lg text-[hsl(35_33%_97%)]">{location.city}</h3>
                <p className="text-sm text-[hsl(42_15%_70%)]">{location.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Let's Create Together</h2>
          <p className="text-[hsl(35_33%_97%)]/70 mb-8 max-w-xl mx-auto">
            Whether it's your wedding, your company's milestone, or a personal celebration - 
            we'd love to be part of your story.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-8 h-12 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors btn-gold-glow"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
