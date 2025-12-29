import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles, X } from 'lucide-react';
import { getSetups } from '@/lib/api';
import { OCCASIONS, STYLES } from '@/lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function BarSetups() {
  const [setups, setSetups] = useState([]);
  const [filteredSetups, setFilteredSetups] = useState([]);
  const [occasionFilter, setOccasionFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const data = await getSetups();
        setSetups(data);
        setFilteredSetups(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSetups();
  }, []);

  useEffect(() => {
    let filtered = [...setups];
    if (occasionFilter !== 'All') {
      const key = occasionFilter.toLowerCase().replace(/ /g, '-');
      filtered = filtered.filter(s => s.occasion.some(o => o.toLowerCase() === key));
    }
    if (styleFilter !== 'All') {
      filtered = filtered.filter(s => s.style === styleFilter);
    }
    setFilteredSetups(filtered);
  }, [occasionFilter, styleFilter, setups]);

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
            <p className="label-gold mb-4">Bar Setups</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Crafted for every
              <br /><span className="text-gold">wedding moment</span>
            </h1>
            <p className="body-lg">
              From intimate after-parties to grand receptions, find the perfect bar setup.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 py-4 bg-[hsl(0_0%_2%)]/95 backdrop-blur-xl border-b border-white/5">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p className="text-xs text-[hsl(40_20%_65%)] mb-2">Occasion</p>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.slice(0, 6).map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccasionFilter(occ)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      occasionFilter === occ
                        ? 'bg-gold text-[hsl(0_0%_2%)]'
                        : 'border border-white/10 text-[hsl(40_33%_95%)] hover:border-gold/50'
                    )}
                    data-testid={`filter-occasion-${occ.toLowerCase()}`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:ml-auto">
              <p className="text-xs text-[hsl(40_20%_65%)] mb-2">Style</p>
              <div className="flex flex-wrap gap-2">
                {STYLES.slice(0, 4).map((style) => (
                  <button
                    key={style}
                    onClick={() => setStyleFilter(style)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                      styleFilter === style
                        ? 'bg-gold text-[hsl(0_0%_2%)]'
                        : 'border border-white/10 text-[hsl(40_33%_95%)] hover:border-gold/50'
                    )}
                    data-testid={`filter-style-${style.toLowerCase()}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-spacing pt-12">
        <div className="container-wide">
          {loading ? (
            <div className="grid-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-minimal animate-pulse">
                  <div className="aspect-[4/3] bg-[hsl(0_0%_10%)]" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-[hsl(0_0%_15%)] rounded w-3/4" />
                    <div className="h-4 bg-[hsl(0_0%_15%)] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSetups.length === 0 ? (
            <div className="text-center py-20">
              <p className="body-md mb-4">No setups match your filters.</p>
              <button 
                onClick={() => { setOccasionFilter('All'); setStyleFilter('All'); }}
                className="text-gold text-sm hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid-3">
              {filteredSetups.map((setup, i) => (
                <motion.div
                  key={setup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-minimal overflow-hidden cursor-pointer hover-lift"
                  onClick={() => setSelectedSetup(setup)}
                  data-testid={`setup-card-${setup.id}`}
                >
                  <div className="aspect-[4/3] bg-[hsl(0_0%_10%)] overflow-hidden">
                    <img 
                      src={setup.image_url} 
                      alt={setup.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="heading-sm text-[hsl(40_33%_95%)] mb-2">{setup.title}</h3>
                    <p className="body-sm flex items-center gap-2 mb-4">
                      <Users className="h-4 w-4" /> {setup.best_for}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {setup.molecular_tag && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-[hsl(43_74%_49%/0.1)] text-gold flex items-center gap-1">
                          <Sparkles className="h-3 w-3" /> {setup.molecular_tag}
                        </span>
                      )}
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-[hsl(40_33%_95%)]">
                        {setup.style}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <Dialog open={!!selectedSetup} onOpenChange={() => setSelectedSetup(null)}>
        <DialogContent className="max-w-2xl bg-[hsl(0_0%_5%)] border-white/10">
          {selectedSetup && (
            <>
              <DialogHeader>
                <DialogTitle className="heading-md text-[hsl(40_33%_95%)]">
                  {selectedSetup.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img 
                  src={selectedSetup.image_url} 
                  alt={selectedSetup.title}
                  className="w-full aspect-video object-cover rounded-xl"
                />
                <p className="body-md text-[hsl(40_33%_95%)]">{selectedSetup.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gold mb-1">Best For</p>
                    <p className="body-sm text-[hsl(40_33%_95%)]">{selectedSetup.best_for}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gold mb-1">Style</p>
                    <p className="body-sm text-[hsl(40_33%_95%)]">{selectedSetup.style}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gold mb-2">Menu Highlights</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSetup.menu_highlights.map((item, i) => (
                      <span key={i} className="text-sm px-3 py-1.5 rounded-full bg-white/5 text-[hsl(40_33%_95%)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/contact?setup=${selectedSetup.slug}`}
                  onClick={() => setSelectedSetup(null)}
                  className="btn-primary w-full justify-center"
                  data-testid="setup-cta"
                >
                  Get This Setup <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="section-spacing bg-pearl">
        <div className="container-narrow text-center">
          <h2 className="heading-md text-[hsl(0_0%_10%)] mb-4">Can't decide?</h2>
          <p className="body-lg text-[hsl(0_0%_40%)] mb-8">
            Tell us about your event and we'll recommend the perfect setup.
          </p>
          <Link to="/contact" className="btn-primary bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_20%)]">
            Get Recommendations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
