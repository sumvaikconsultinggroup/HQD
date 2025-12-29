import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, GlassWater, Sparkles, Search } from 'lucide-react';
import { getMenus } from '@/lib/api';
import { FLAVOR_PROFILES } from '@/lib/constants';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';

export default function Menus() {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [flavorFilter, setFlavorFilter] = useState('all');
  const [molecularOnly, setMolecularOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const data = await getMenus();
        setDrinks(data);
        setFilteredDrinks(data);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    let filtered = [...drinks];
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(d => d.type === typeFilter);
    }
    
    if (flavorFilter !== 'all') {
      filtered = filtered.filter(d => d.flavor_profile.includes(flavorFilter));
    }
    
    if (molecularOnly) {
      filtered = filtered.filter(d => d.molecular);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredDrinks(filtered);
  }, [typeFilter, flavorFilter, molecularOnly, searchQuery, drinks]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Our Menu</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Signature Cocktails &
              <br />
              <span className="text-[hsl(46_64%_52%)]">Mocktails</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Every menu is customized for your event. These are some of our signature creations 
              to inspire your selection.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-white/10 py-6 sticky top-16 lg:top-20 z-30 bg-[hsl(228_13%_4%)]/95 backdrop-blur">
        <div className="container-hqd">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(42_15%_70%)]" />
              <Input
                placeholder="Search drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)]"
                data-testid="menu-search-input"
              />
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <ToggleGroup 
                type="single" 
                value={typeFilter} 
                onValueChange={(v) => v && setTypeFilter(v)}
                className="flex gap-2"
              >
                <ToggleGroupItem
                  value="all"
                  className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-4 py-2 text-sm text-[hsl(35_33%_97%)] hover:bg-white/5"
                >
                  All
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="cocktail"
                  className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-4 py-2 text-sm text-[hsl(35_33%_97%)] hover:bg-white/5 flex items-center gap-2"
                >
                  <Wine className="h-4 w-4" /> Cocktails
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="mocktail"
                  className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-4 py-2 text-sm text-[hsl(35_33%_97%)] hover:bg-white/5 flex items-center gap-2"
                >
                  <GlassWater className="h-4 w-4" /> Mocktails
                </ToggleGroupItem>
              </ToggleGroup>

              {/* Molecular Toggle */}
              <button
                onClick={() => setMolecularOnly(!molecularOnly)}
                className={`rounded-full border px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                  molecularOnly 
                    ? 'bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] border-[hsl(46_64%_52%)]' 
                    : 'border-[hsl(46_64%_52%)]/40 text-[hsl(35_33%_97%)] hover:bg-white/5'
                }`}
              >
                <Sparkles className="h-4 w-4" /> Molecular
              </button>
            </div>
          </div>

          {/* Flavor Profile */}
          <div className="mt-4">
            <span className="text-xs text-[hsl(42_15%_70%)] mb-2 block">Flavor Profile</span>
            <ToggleGroup 
              type="single" 
              value={flavorFilter} 
              onValueChange={(v) => v && setFlavorFilter(v)}
              className="flex flex-wrap gap-2"
            >
              <ToggleGroupItem
                value="all"
                className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-3 py-1.5 text-xs text-[hsl(35_33%_97%)] hover:bg-white/5"
              >
                All
              </ToggleGroupItem>
              {FLAVOR_PROFILES.map((flavor) => (
                <ToggleGroupItem
                  key={flavor}
                  value={flavor}
                  className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-3 py-1.5 text-xs text-[hsl(35_33%_97%)] hover:bg-white/5 capitalize"
                >
                  {flavor}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Drinks Grid */}
      <section className="section-y">
        <div className="container-hqd">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-dark animate-pulse p-4">
                  <div className="aspect-square bg-white/5 rounded-lg mb-4" />
                  <div className="h-5 bg-white/5 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredDrinks.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[hsl(35_33%_97%)]/70">No drinks match your filters.</p>
              <button 
                onClick={() => { setTypeFilter('all'); setFlavorFilter('all'); setMolecularOnly(false); setSearchQuery(''); }}
                className="mt-4 text-[hsl(46_64%_52%)] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDrinks.map((drink, index) => (
                <motion.div
                  key={drink.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="card-dark p-4 card-hover"
                  data-testid={`drink-card-${drink.id}`}
                >
                  {drink.image_url && (
                    <img 
                      src={drink.image_url} 
                      alt={drink.name}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg text-[hsl(35_33%_97%)]">{drink.name}</h3>
                    {drink.type === 'cocktail' ? (
                      <Wine className="h-4 w-4 text-[hsl(46_64%_52%)] shrink-0" />
                    ) : (
                      <GlassWater className="h-4 w-4 text-[hsl(46_64%_52%)] shrink-0" />
                    )}
                  </div>
                  
                  {drink.spirit_base && (
                    <p className="text-xs text-[hsl(46_64%_52%)] mb-2">{drink.spirit_base}</p>
                  )}
                  
                  <p className="text-sm text-[hsl(35_33%_97%)]/70 mb-3 line-clamp-2">
                    {drink.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {drink.flavor_profile.map((flavor, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[hsl(35_33%_97%)]/70 capitalize">
                        {flavor}
                      </span>
                    ))}
                  </div>
                  
                  {drink.molecular && (
                    <div className="flex items-center gap-1 text-xs text-[hsl(46_64%_52%)]">
                      <Sparkles className="h-3 w-3" />
                      {drink.molecular_technique}
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-[hsl(42_15%_70%)]">
                      <span className="font-medium">Garnish:</span> {drink.garnish}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Menu CTA */}
      <section className="pearl-section section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(228_13%_4%)] mb-4">Want a Custom Menu?</h2>
          <p className="text-[hsl(228_13%_4%)]/70 mb-8 max-w-xl mx-auto">
            We can create signature drinks just for your event - from couple cocktails for weddings 
            to branded beverages for corporate events.
          </p>
        </div>
      </section>
    </div>
  );
}
