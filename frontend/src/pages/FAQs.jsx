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
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFAQs();
        setFaqs(data);
        setFilteredFaqs(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredFaqs(faqs);
    } else {
      const q = search.toLowerCase();
      setFilteredFaqs(faqs.filter(f => 
        f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      ));
    }
  }, [search, faqs]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-narrow">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="label-gold mb-4">FAQs</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Frequently asked
              <br /><span className="text-gold">questions</span>
            </h1>
            <div className="relative max-w-md mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(40_20%_65%)]" />
              <Input
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 bg-transparent border-white/10 focus-visible:ring-gold h-12 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-spacing pt-0">
        <div className="container-narrow">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border border-white/10 rounded-xl p-6 animate-pulse">
                  <div className="h-5 bg-[hsl(0_0%_15%)] rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-16">
              <p className="body-md">No questions match your search.</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem 
                    value={faq.id}
                    className="border border-white/10 rounded-xl px-6 data-[state=open]:border-gold/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-[hsl(40_33%_95%)] hover:text-gold py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="body-md pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-pearl">
        <div className="container-narrow text-center">
          <h2 className="heading-md text-[hsl(0_0%_10%)] mb-4">Still have questions?</h2>
          <p className="body-lg text-[hsl(0_0%_40%)] mb-8">
            We're happy to help. Reach out and we'll respond within 24 hours.
          </p>
          <Link to="/contact" className="btn-primary bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_20%)]">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
