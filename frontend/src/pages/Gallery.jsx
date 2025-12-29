import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGallery } from '@/lib/api';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'wedding', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'private', label: 'Private' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === categoryFilter));
    }
  }, [categoryFilter, items]);

  const handlePrev = () => {
    setSelectedIndex(prev => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex(prev => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Gallery</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Our Work in
              <br />
              <span className="text-[hsl(46_64%_52%)]">Action</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Browse through our portfolio of weddings, corporate events, and private parties.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-white/10 py-6 sticky top-16 lg:top-20 z-30 bg-[hsl(228_13%_4%)]/95 backdrop-blur">
        <div className="container-hqd">
          <ToggleGroup 
            type="single" 
            value={categoryFilter} 
            onValueChange={(v) => v && setCategoryFilter(v)}
            className="flex gap-2"
          >
            {categories.map((cat) => (
              <ToggleGroupItem
                key={cat.value}
                value={cat.value}
                data-testid={`gallery-filter-${cat.value}`}
                className="data-[state=on]:bg-[hsl(46_64%_52%)] data-[state=on]:text-[hsl(228_13%_4%)] rounded-full border border-[hsl(46_64%_52%)]/40 px-4 py-2 text-sm text-[hsl(35_33%_97%)] hover:bg-white/5"
              >
                {cat.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-y">
        <div className="container-hqd">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[hsl(35_33%_97%)]/70">No items in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedIndex(index)}
                  data-testid={`gallery-item-${item.id}`}
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg text-[hsl(35_33%_97%)]">{item.title}</h3>
                      {item.location && (
                        <p className="text-sm text-[hsl(35_33%_97%)]/70">{item.location}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl bg-black/95 border-none p-0">
          {selectedIndex !== null && filteredItems[selectedIndex] && (
            <div className="relative">
              <img 
                src={filteredItems[selectedIndex].image_url} 
                alt={filteredItems[selectedIndex].title}
                className="w-full max-h-[80vh] object-contain"
              />
              
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="font-display text-xl text-[hsl(35_33%_97%)]">
                  {filteredItems[selectedIndex].title}
                </h3>
                {filteredItems[selectedIndex].event_name && (
                  <p className="text-sm text-[hsl(35_33%_97%)]/70 mt-1">
                    {filteredItems[selectedIndex].event_name}
                  </p>
                )}
                {filteredItems[selectedIndex].location && (
                  <p className="text-sm text-[hsl(46_64%_52%)]">
                    {filteredItems[selectedIndex].location}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
