import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles, Filter } from 'lucide-react';
import { AutoPlayVideo } from '@/components/AutoPlayVideo';
import { getSetups } from '@/lib/api';
import { OCCASIONS, STYLES } from '@/lib/constants';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function BarSetups() {
  const [searchParams] = useSearchParams();
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
        console.error('Error fetching setups:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSetups();
  }, []);

  useEffect(() => {
    let filtered = [...setups];
    
    if (occasionFilter !== 'All') {
      const filterKey = occasionFilter.toLowerCase().replace(/ /g, '-');
      filtered = filtered.filter(s => 
        s.occasion.some(o => o.toLowerCase() === filterKey)
      );
    }
    
    if (styleFilter !== 'All') {
      filtered = filtered.filter(s => s.style === styleFilter);
    }
    
    setFilteredSetups(filtered);
  }, [occasionFilter, styleFilter, setups]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Bar Setups</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Bar Setups Crafted for
              <br />
              <span className="text-[hsl(46_64%_52%)]">Every Wedding Moment</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              From intimate after-parties to grand receptions, find the perfect bar setup for your celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-white/10 py-6 sticky top-16 lg:top-20 z-30 bg-[hsl(228_13%_4%)]/95 backdrop-blur">
        <div className="container-hqd">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[hsl(46_64%_52%)]" />
              <span className="text-sm text-[hsl(35_33%_97%)]">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <span className="text-xs text-[hsl(42_15%_70%)] mb-2 block">Occasion</span>
                <ToggleGroup 
                  type="single" 
                  value={occasionFilter} 
                  onValueChange={(v) => v && setOccasionFilter(v)}
                  className="flex flex-wrap gap-2"
                >
                  {OCCASIONS.slice(0, 6).map((occasion) => (
                    <ToggleGroupItem
                      key={occasion}
                      value={occasion}
                      data-testid="bar-setup-filter-chip"
                      className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-3 py-1.5 text-xs text-[hsl(35_33%_97%)] hover:bg-white/5"
                    >
                      {occasion}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>

              <div>
                <span className="text-xs text-[hsl(42_15%_70%)] mb-2 block">Style</span>
                <ToggleGroup 
                  type="single" 
                  value={styleFilter} 
                  onValueChange={(v) => v && setStyleFilter(v)}
                  className="flex flex-wrap gap-2"
                >
                  {STYLES.slice(0, 4).map((style) => (
                    <ToggleGroupItem
                      key={style}
                      value={style}
                      data-testid="bar-setup-style-chip"
                      className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-3 py-1.5 text-xs text-[hsl(35_33%_97%)] hover:bg-white/5"
                    >
                      {style}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setups Grid */}
      <section className="section-y">
        <div className="container-hqd">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-dark animate-pulse">
                  <div className="aspect-[4/3] bg-white/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-white/5 rounded w-3/4" />
                    <div className="h-4 bg-white/5 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSetups.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[hsl(35_33%_97%)]/70">No setups match your filters. Try different criteria.</p>
              <button 
                onClick={() => { setOccasionFilter('All'); setStyleFilter('All'); }}
                className="mt-4 text-[hsl(46_64%_52%)] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSetups.map((setup, index) => (
                <motion.div
                  key={setup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card-dark overflow-hidden card-hover cursor-pointer group"
                  onClick={() => setSelectedSetup(setup)}
                  data-testid={`setup-card-${setup.id}`}
                >
                  {setup.video_url ? (
                    <AutoPlayVideo
                      src={setup.video_url}
                      className="w-full"
                      aspectRatio="4/3"
                      testid={`setup-video-${setup.id}`}
                    />
                  ) : (
                    <img 
                      src={setup.image_url} 
                      alt={setup.title}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  
                  <div className="p-5">
                    <h3 className="font-display text-xl text-[hsl(35_33%_97%)] mb-2">{setup.title}</h3>
                    
                    <div className="flex items-center gap-4 text-sm text-[hsl(42_15%_70%)] mb-3">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {setup.best_for}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[hsl(35_33%_97%)]/70 mb-4 line-clamp-2">
                      {setup.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {setup.menu_highlights.slice(0, 2).map((drink, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/5 text-[hsl(35_33%_97%)]">
                          {drink}
                        </span>
                      ))}
                      {setup.molecular_tag && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)] flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          {setup.molecular_tag}
                        </span>
                      )}
                    </div>
                    
                    <button className="inline-flex items-center gap-2 text-sm text-[hsl(46_64%_52%)] hover:underline">
                      View Details <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Setup Detail Modal */}
      <Dialog open={!!selectedSetup} onOpenChange={() => setSelectedSetup(null)}>
        <DialogContent className="max-w-3xl bg-[hsl(226_10%_8%)] border-[hsl(46_64%_52%)]/25">
          {selectedSetup && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-[hsl(35_33%_97%)]">
                  {selectedSetup.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {selectedSetup.video_url ? (
                  <AutoPlayVideo
                    src={selectedSetup.video_url}
                    className="w-full rounded-lg"
                    aspectRatio="16/9"
                    testid="setup-modal-video"
                  />
                ) : (
                  <img 
                    src={selectedSetup.image_url} 
                    alt={selectedSetup.title}
                    className="w-full rounded-lg aspect-video object-cover"
                  />
                )}
                
                <p className="text-[hsl(35_33%_97%)]/80 leading-relaxed">
                  {selectedSetup.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm text-[hsl(46_64%_52%)] mb-2">Best For</h4>
                    <p className="text-[hsl(35_33%_97%)]">{selectedSetup.best_for}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-[hsl(46_64%_52%)] mb-2">Style</h4>
                    <p className="text-[hsl(35_33%_97%)]">{selectedSetup.style}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm text-[hsl(46_64%_52%)] mb-3">Menu Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSetup.menu_highlights.map((drink, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-[hsl(35_33%_97%)]">
                        {drink}
                      </span>
                    ))}
                    {selectedSetup.molecular_tag && (
                      <span className="px-3 py-1.5 rounded-full bg-[hsl(46_64%_52%)]/10 text-sm text-[hsl(46_64%_52%)] flex items-center gap-1">
                        <Sparkles className="h-4 w-4" />
                        {selectedSetup.molecular_tag}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link
                    to={`/contact?setup=${selectedSetup.slug}`}
                    onClick={() => setSelectedSetup(null)}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-11 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors"
                    data-testid="setup-modal-cta"
                  >
                    Get This Setup for My Date <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="pearl-section section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(228_13%_4%)] mb-4">Can't Decide?</h2>
          <p className="text-[hsl(228_13%_4%)]/70 mb-8 max-w-xl mx-auto">
            Tell us about your event and we'll recommend the perfect setup.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] px-8 h-12 font-medium hover:bg-[hsl(228_13%_10%)] transition-colors"
          >
            Get Expert Recommendations <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
