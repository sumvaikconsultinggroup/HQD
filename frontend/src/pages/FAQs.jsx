import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { getFAQs } from '@/lib/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

export default function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    let filtered = [...faqs];
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(f => f.category === categoryFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredFaqs(filtered);
  }, [categoryFilter, searchQuery, faqs]);

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'booking', label: 'Booking' },
    { value: 'service', label: 'Service' },
    { value: 'logistics', label: 'Logistics' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">FAQs</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Frequently Asked
              <br />
              <span className="text-[hsl(46_64%_52%)]">Questions</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Everything you need to know about working with HQ.D.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-white/10 py-6 sticky top-16 lg:top-20 z-30 bg-[hsl(228_13%_4%)]/95 backdrop-blur">
        <div className="container-hqd">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(42_15%_70%)]" />
              <Input
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)]"
                data-testid="faq-search-input"
              />
            </div>
            
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    categoryFilter === cat.value
                      ? 'bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)]'
                      : 'border border-[hsl(46_64%_52%)]/40 text-[hsl(35_33%_97%)] hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-y">
        <div className="container-hqd max-w-3xl">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-white/10 rounded-lg p-6 animate-pulse">
                  <div className="h-5 bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[hsl(35_33%_97%)]/70">No questions match your search.</p>
              <button 
                onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
                className="mt-4 text-[hsl(46_64%_52%)] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem 
                    value={faq.id}
                    className="border border-white/10 rounded-lg px-6 data-[state=open]:border-[hsl(46_64%_52%)]/25"
                  >
                    <AccordionTrigger 
                      data-testid="faq-question"
                      className="text-left text-[hsl(35_33%_97%)] hover:text-[hsl(46_64%_52%)] py-5"
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent 
                      data-testid="faq-answer"
                      className="text-[hsl(42_15%_70%)] pb-5 leading-relaxed"
                    >
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="pearl-section section-y">
        <div className="container-hqd text-center">
          <h2 className="text-h2 text-[hsl(228_13%_4%)] mb-4">Still Have Questions?</h2>
          <p className="text-[hsl(228_13%_4%)]/70 mb-8 max-w-xl mx-auto">
            We're happy to answer any questions you have. Reach out and we'll respond within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)] px-8 h-12 font-medium hover:bg-[hsl(228_13%_10%)] transition-colors"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
