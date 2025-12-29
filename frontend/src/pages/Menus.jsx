import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wine, GlassWater, Sparkles, Search } from 'lucide-react';
import { getMenus } from '@/lib/api';
import { FLAVOR_PROFILES } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Menus() {
  const [drinks, setDrinks] = useState([]);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const data = await getMenus();
        setDrinks(data);
        setFilteredDrinks(data);
      } catch (error) {
        console.error('Error:', error);
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
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      );
    }
    setFilteredDrinks(filtered);
  }, [typeFilter, searchQuery, drinks]);

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
            <p className="label-gold mb-4">Our Menu</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Signature cocktails
              <br /><span className="text-gold">& mocktails</span>
            </h1>
            <p className="body-lg">
              Every menu is customized for your event. These are some of our signature creations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 py-4 bg-[hsl(0_0%_2%)]/95 backdrop-blur-xl border-b border-white/5">
        <div className="container-wide flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All', icon: null },
              { value: 'cocktail', label: 'Cocktails', icon: Wine },
              { value: 'mocktail', label: 'Mocktails', icon: GlassWater },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setTypeFilter(type.value)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                  typeFilter === type.value
                    ? 'bg-gold text-[hsl(0_0%_2%)]'
                    : 'border border-white/10 text-[hsl(40_33%_95%)] hover:border-gold/50'
                )}
              >
                {type.icon && <type.icon className="h-4 w-4" />}
                {type.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(40_20%_65%)]" />
            <Input
              placeholder="Search drinks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-transparent border-white/10 focus-visible:ring-gold h-10"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-spacing pt-12">
        <div className="container-wide">
          {loading ? (
            <div className="grid-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card-minimal p-4 animate-pulse">
                  <div className="aspect-square bg-[hsl(0_0%_10%)] rounded-xl mb-4" />
                  <div className="h-5 bg-[hsl(0_0%_15%)] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[hsl(0_0%_15%)] rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : filteredDrinks.length === 0 ? (
            <div className="text-center py-20">
              <p className="body-md">No drinks match your search.</p>
            </div>
          ) : (
            <div className="grid-4">
              {filteredDrinks.map((drink, i) => (
                <motion.div
                  key={drink.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="card-minimal p-5 hover-lift"
                >
                  {drink.image_url && (
                    <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-[hsl(0_0%_10%)]">
                      <img src={drink.image_url} alt={drink.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="heading-sm text-[hsl(40_33%_95%)]">{drink.name}</h3>
                    {drink.type === 'cocktail' 
                      ? <Wine className="h-4 w-4 text-gold shrink-0" />
                      : <GlassWater className="h-4 w-4 text-gold shrink-0" />
                    }
                  </div>
                  {drink.spirit_base && (
                    <p className="text-xs text-gold mb-2">{drink.spirit_base}</p>
                  )}
                  <p className="body-sm line-clamp-2 mb-3">{drink.description}</p>
                  {drink.molecular && (
                    <span className="text-xs text-gold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> {drink.molecular_technique}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
