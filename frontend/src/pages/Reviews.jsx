import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/api';

export default function Reviews() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
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
            <p className="label-gold mb-4">Reviews</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              What clients
              <br /><span className="text-gold">say</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-spacing pt-0">
        <div className="container-wide">
          {loading ? (
            <div className="grid-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-minimal p-8 animate-pulse">
                  <div className="h-4 bg-[hsl(0_0%_15%)] rounded w-1/4 mb-4" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 bg-[hsl(0_0%_15%)] rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid-2">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-minimal p-8"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="body-lg text-[hsl(40_33%_95%)] mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-medium text-[hsl(40_33%_95%)]">{t.name}</p>
                    <p className="body-sm">{t.event_type} • {t.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing bg-pearl">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Events Served' },
              { value: '5.0', label: 'Average Rating' },
              { value: '50+', label: 'Corporate Clients' },
              { value: '100%', label: 'Would Recommend' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="heading-xl text-[hsl(0_0%_10%)]">{stat.value}</p>
                <p className="body-sm text-[hsl(0_0%_40%)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
