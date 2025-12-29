import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getGallery } from '@/lib/api';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = ['all', 'wedding', 'corporate', 'private'];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGallery();
        setItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === filter));
    }
  }, [filter, items]);

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
            <p className="label-gold mb-4">Gallery</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Our work in
              <br /><span className="text-gold">action</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 py-4 bg-[hsl(0_0%_2%)]/95 backdrop-blur-xl border-b border-white/5">
        <div className="container-wide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all capitalize',
                  filter === cat
                    ? 'bg-gold text-[hsl(0_0%_2%)]'
                    : 'border border-white/10 text-[hsl(40_33%_95%)] hover:border-gold/50'
                )}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-spacing pt-12">
        <div className="container-wide">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-square bg-[hsl(0_0%_10%)] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => setSelectedIndex(i)}
                >
                  <img 
                    src={item.image_url} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-medium text-[hsl(40_33%_95%)] text-sm">{item.title}</p>
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
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedIndex(prev => prev === 0 ? filteredItems.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedIndex(prev => prev === filteredItems.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
