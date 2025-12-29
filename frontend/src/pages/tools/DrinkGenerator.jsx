import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, GlassWater, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FLAVOR_PROFILES, MOLECULAR_TECHNIQUES } from '@/lib/constants';
import html2canvas from 'html2canvas';

const steps = ['Type', 'Flavor', 'Sweetness', 'Molecular'];

const drinkNames = {
  cocktail: ['Velvet Coupe', 'Golden Hour', 'Midnight Bloom', 'Crimson Silk', 'Amber Eclipse'],
  mocktail: ['Garden Mist', 'Sunset Cloud', 'Crystal Rain', 'Meadow Breeze', 'Citrus Dream'],
};

const generateDrinks = (prefs) => {
  const names = drinkNames[prefs.type] || drinkNames.cocktail;
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  
  return [0, 1, 2].map((i) => ({
    id: i + 1,
    name: shuffled[i],
    type: prefs.type,
    flavor: prefs.flavor,
    sweetness: prefs.sweetness,
    technique: prefs.molecular || MOLECULAR_TECHNIQUES[i % MOLECULAR_TECHNIQUES.length],
    notes: `A ${prefs.sweetness} ${prefs.flavor} creation with ${prefs.type === 'mocktail' ? 'fresh juices' : 'premium spirits'}.`,
    garnish: prefs.flavor === 'floral' ? 'Edible flowers' : prefs.flavor === 'citrus' ? 'Citrus wheel' : 'Fresh herbs',
  }));
};

export default function DrinkGenerator() {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({ type: '', flavor: '', sweetness: '', molecular: '' });
  const [drinks, setDrinks] = useState(null);

  const handleSelect = (field, value) => setPrefs(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else setDrinks(generateDrinks(prefs));
  };

  const handleBack = () => {
    if (drinks) setDrinks(null);
    else if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setStep(0);
    setPrefs({ type: '', flavor: '', sweetness: '', molecular: '' });
    setDrinks(null);
  };

  const handleSave = async () => {
    const el = document.getElementById('drink-results');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { backgroundColor: '#050505', scale: 2 });
      const link = document.createElement('a');
      link.download = 'my-drinks-hqd.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (e) {
      console.error(e);
    }
  };

  const canProceed = () => {
    const fields = ['type', 'flavor', 'sweetness', 'molecular'];
    if (step === 3) return true; // molecular is optional
    return !!prefs[fields[step]];
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-gold mb-4">Free Tool</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Signature Drink
              <br /><span className="text-gold">Generator</span>
            </h1>
            <p className="body-lg">Discover your perfect signature cocktail or mocktail.</p>
          </motion.div>
        </div>
      </section>

      {/* Generator */}
      <section className="section-spacing pt-0">
        <div className="container-narrow">
          {/* Progress */}
          {!drinks && (
            <div className="flex justify-center gap-2 mb-10">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    'h-2 w-10 rounded-full transition-colors',
                    i <= step ? 'bg-gold' : 'bg-white/10'
                  )} />
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {!drinks ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card-minimal p-8 lg:p-12"
              >
                {step === 0 && (
                  <div className="text-center">
                    <h2 className="heading-md text-[hsl(40_33%_95%)] mb-8">What's your preference?</h2>
                    <div className="flex justify-center gap-6">
                      {[{ value: 'cocktail', icon: Wine, label: 'Cocktail' }, { value: 'mocktail', icon: GlassWater, label: 'Mocktail' }].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleSelect('type', opt.value)}
                          className={cn(
                            'flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all',
                            prefs.type === opt.value ? 'border-gold bg-gold/10' : 'border-white/10 hover:border-white/20'
                          )}
                          data-testid={`drink-type-${opt.value}`}
                        >
                          <opt.icon className="h-12 w-12 text-gold" />
                          <span className="text-lg text-[hsl(40_33%_95%)]">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="text-center">
                    <h2 className="heading-md text-[hsl(40_33%_95%)] mb-8">Flavor profile?</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                      {FLAVOR_PROFILES.map((f) => (
                        <button
                          key={f}
                          onClick={() => handleSelect('flavor', f)}
                          className={cn(
                            'px-6 py-3 rounded-full border transition-all capitalize',
                            prefs.flavor === f ? 'border-gold bg-gold text-[hsl(0_0%_2%)]' : 'border-white/10 text-[hsl(40_33%_95%)] hover:border-white/20'
                          )}
                          data-testid={`drink-flavor-${f}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="text-center">
                    <h2 className="heading-md text-[hsl(40_33%_95%)] mb-8">How sweet?</h2>
                    <div className="flex justify-center gap-4">
                      {['dry', 'balanced', 'sweet'].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleSelect('sweetness', level)}
                          className={cn(
                            'px-8 py-4 rounded-2xl border transition-all capitalize',
                            prefs.sweetness === level ? 'border-gold bg-gold text-[hsl(0_0%_2%)]' : 'border-white/10 text-[hsl(40_33%_95%)] hover:border-white/20'
                          )}
                          data-testid={`drink-sweetness-${level}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center">
                    <h2 className="heading-md text-[hsl(40_33%_95%)] mb-4">Molecular touch?</h2>
                    <p className="body-sm mb-8">Optional — skip for classic presentation</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {MOLECULAR_TECHNIQUES.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => handleSelect('molecular', prefs.molecular === tech ? '' : tech)}
                          className={cn(
                            'px-5 py-3 rounded-full border transition-all flex items-center gap-2',
                            prefs.molecular === tech ? 'border-gold bg-gold text-[hsl(0_0%_2%)]' : 'border-white/10 text-[hsl(40_33%_95%)] hover:border-white/20'
                          )}
                          data-testid={`drink-molecular-${tech.toLowerCase().replace(/ /g, '-')}`}
                        >
                          <Sparkles className="h-4 w-4" /> {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nav */}
                <div className="flex justify-between mt-10">
                  <button onClick={handleBack} disabled={step === 0} className="btn-ghost disabled:opacity-30">
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button onClick={handleNext} disabled={!canProceed()} className="btn-primary" data-testid="drink-next">
                    {step === 3 ? 'Generate' : 'Next'} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="heading-md text-[hsl(40_33%_95%)]">Your Drinks</h2>
                  <button onClick={handleSave} className="btn-ghost text-sm" data-testid="drink-save">
                    <Download className="h-4 w-4" /> Save
                  </button>
                </div>

                <div id="drink-results" className="grid md:grid-cols-3 gap-6 p-1">
                  {drinks.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="card-minimal p-6"
                      data-testid={`drink-result-${d.id}`}
                    >
                      <span className="text-xs text-gold uppercase tracking-wide">{d.type}</span>
                      <h3 className="heading-md text-[hsl(40_33%_95%)] mt-2 mb-3">{d.name}</h3>
                      <p className="body-sm mb-4">{d.notes}</p>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gold">Flavor:</span> {d.flavor} • {d.sweetness}</p>
                        <p><span className="text-gold">Garnish:</span> {d.garnish}</p>
                      </div>
                      {d.technique && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10 text-sm text-gold">
                          <Sparkles className="h-4 w-4" /> {d.technique}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <p className="text-center body-sm mt-8">Final menu curated with our mixologists.</p>

                <div className="text-center mt-8">
                  <button onClick={handleReset} className="btn-ghost text-sm">
                    <RefreshCw className="h-4 w-4" /> Start Over
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
