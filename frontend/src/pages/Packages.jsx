import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { getPackages } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

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
            <p className="label-gold mb-4">Packages</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Tailored to
              <br /><span className="text-gold">your event</span>
            </h1>
            <p className="body-lg">
              Every event is unique. We provide custom quotes based on your requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          {loading ? (
            <div className="grid-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-minimal p-6 animate-pulse">
                  <div className="h-6 bg-[hsl(0_0%_15%)] rounded w-1/2 mb-4" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-4 bg-[hsl(0_0%_15%)] rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-4">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'card-minimal p-6 relative hover-lift',
                    pkg.highlight && 'border-gold'
                  )}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gold text-[hsl(0_0%_2%)] text-xs font-medium">
                      {pkg.highlight}
                    </span>
                  )}
                  <h3 className="heading-md text-[hsl(40_33%_95%)] mb-1">{pkg.name}</h3>
                  <p className="text-sm text-gold mb-4">{pkg.tagline}</p>
                  <p className="body-sm mb-4">{pkg.description}</p>
                  <p className="text-xs text-gold mb-2">Best For</p>
                  <p className="body-sm mb-6 text-[hsl(40_33%_95%)]">{pkg.best_for}</p>
                  <ul className="space-y-2 mb-6">
                    {pkg.inclusions.slice(0, 5).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 body-sm">
                        <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?package=${pkg.tier}`}
                    className={cn(
                      'w-full justify-center',
                      pkg.highlight ? 'btn-primary' : 'btn-outline'
                    )}
                  >
                    Request Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notes */}
      <section className="section-spacing bg-elevated border-y border-white/5">
        <div className="container-narrow">
          <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-6 text-center">Important Notes</h3>
          <div className="card-minimal p-8">
            <ul className="space-y-4 body-md">
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <span><strong className="text-[hsl(40_33%_95%)]">Alcohol:</strong> Pricing excludes alcohol. We guide you on procurement.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <span><strong className="text-[hsl(40_33%_95%)]">Travel:</strong> Outstation events include travel costs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" />
                <span><strong className="text-[hsl(40_33%_95%)]">Bars Only:</strong> We do not provide food or catering.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
