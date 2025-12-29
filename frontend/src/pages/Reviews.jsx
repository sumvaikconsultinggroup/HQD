import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
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
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Reviews</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              What Our Clients
              <br />
              <span className="text-[hsl(46_64%_52%)]">Say</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Hear from couples, corporate teams, and party hosts who've experienced HQ.D.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-y">
        <div className="container-hqd">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-dark animate-pulse p-8">
                  <div className="h-4 bg-white/5 rounded w-1/4 mb-4" />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-4 bg-white/5 rounded" />
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                  </div>
                  <div className="h-5 bg-white/5 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card-dark p-8 relative"
                  data-testid={`testimonial-card-${testimonial.id}`}
                >
                  <Quote className="absolute top-6 right-6 h-8 w-8 text-[hsl(46_64%_52%)]/20" />
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[hsl(46_64%_52%)] text-[hsl(46_64%_52%)]" />
                    ))}
                  </div>
                  
                  <blockquote className="text-[hsl(35_33%_97%)]/90 leading-relaxed mb-6 text-lg">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div>
                    <p className="font-display text-lg text-[hsl(35_33%_97%)]">{testimonial.name}</p>
                    <p className="text-sm text-[hsl(42_15%_70%)]">
                      {testimonial.event_type}
                      {testimonial.event_date && ` • ${testimonial.event_date}`}
                      {testimonial.location && ` • ${testimonial.location}`}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="pearl-section section-y">
        <div className="container-hqd">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Events Served' },
              { value: '5.0', label: 'Average Rating' },
              { value: '50+', label: 'Corporate Clients' },
              { value: '100%', label: 'Would Recommend' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="font-display text-4xl lg:text-5xl text-[hsl(228_13%_4%)]">{stat.value}</p>
                <p className="text-sm text-[hsl(228_13%_4%)]/70 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
