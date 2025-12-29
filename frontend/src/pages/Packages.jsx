import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, Sparkles } from 'lucide-react';
import { getPackages } from '@/lib/api';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const tierColors = {
    good: 'border-white/10',
    better: 'border-[hsl(46_64%_52%)] ring-2 ring-[hsl(46_64%_52%)]',
    best: 'border-[hsl(46_64%_52%)]/50',
    ultra: 'border-white/20 bg-gradient-to-b from-[hsl(226_10%_10%)] to-[hsl(226_10%_6%)]',
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Packages</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Tailored to Your
              <br />
              <span className="text-[hsl(46_64%_52%)]">Event</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Every event is unique. We provide custom quotes based on your specific requirements. 
              These packages serve as a starting point for our conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-y">
        <div className="container-hqd">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-dark animate-pulse p-6">
                  <div className="h-8 bg-white/5 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-white/5 rounded w-3/4 mb-6" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-3 bg-white/5 rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 border bg-[hsl(226_10%_8%)] ${tierColors[pkg.tier]} card-hover relative`}
                  data-testid={`package-card-${pkg.tier}`}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] text-xs font-medium">
                      {pkg.highlight}
                    </span>
                  )}
                  
                  <div className="mb-6">
                    {pkg.tier === 'ultra' ? (
                      <Sparkles className="h-8 w-8 text-[hsl(46_64%_52%)] mb-3" />
                    ) : pkg.tier === 'best' ? (
                      <Star className="h-8 w-8 text-[hsl(46_64%_52%)] mb-3" />
                    ) : null}
                    
                    <h3 className="font-display text-2xl text-[hsl(35_33%_97%)]">{pkg.name}</h3>
                    <p className="text-sm text-[hsl(46_64%_52%)] mt-1">{pkg.tagline}</p>
                  </div>
                  
                  <p className="text-sm text-[hsl(35_33%_97%)]/70 mb-6">
                    {pkg.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-xs text-[hsl(42_15%_70%)] block mb-2">Best For</span>
                    <p className="text-sm text-[hsl(35_33%_97%)]">{pkg.best_for}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.inclusions.map((inclusion, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[hsl(35_33%_97%)]/80">
                        <Check className="h-4 w-4 text-[hsl(46_64%_52%)] shrink-0 mt-0.5" />
                        {inclusion}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/contact?package=${pkg.tier}`}
                    className={`w-full inline-flex items-center justify-center gap-2 rounded-[12px] px-6 h-11 font-medium transition-colors ${
                      pkg.tier === 'better' || pkg.tier === 'ultra'
                        ? 'bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] hover:bg-[hsl(46_64%_45%)]'
                        : 'border border-[hsl(46_64%_52%)] text-[hsl(35_33%_97%)] hover:bg-white/5'
                    }`}
                  >
                    Request Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Quote CTA */}
      <section className="pearl-section section-y">
        <div className="container-hqd">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-h2 text-[hsl(228_13%_4%)] mb-4">Need Something Custom?</h2>
            <p className="text-[hsl(228_13%_4%)]/70 mb-8">
              These packages are starting points. We can customize everything - mix and match elements, 
              add unique features, or create something entirely bespoke for your event.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] px-8 h-12 font-medium hover:bg-[hsl(228_13%_10%)] transition-colors"
            >
              Discuss Custom Package <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What's Not Included */}
      <section className="section-y">
        <div className="container-hqd">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-h3 text-[hsl(35_33%_97%)] mb-6 text-center">Important Notes</h3>
            <div className="card-dark p-6 lg:p-8">
              <ul className="space-y-4 text-[hsl(35_33%_97%)]/80">
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)] mt-2 shrink-0" />
                  <span><strong>Alcohol:</strong> Pricing excludes alcohol. We can guide you on procurement or work with alcohol you provide.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)] mt-2 shrink-0" />
                  <span><strong>Travel:</strong> Outstation events include travel and accommodation costs.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)] mt-2 shrink-0" />
                  <span><strong>Bars Only:</strong> We specialize in bar services. We do not provide food or catering.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(46_64%_52%)] mt-2 shrink-0" />
                  <span><strong>Venue Coordination:</strong> We coordinate with your venue for power, space, and logistics.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
