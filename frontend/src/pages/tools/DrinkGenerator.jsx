import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, GlassWater, Sparkles, ArrowRight, ArrowLeft, RefreshCw, Download, Share2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FLAVOR_PROFILES, MOLECULAR_TECHNIQUES } from '@/lib/constants';
import html2canvas from 'html2canvas';

const steps = [
  { id: 'type', title: 'Drink Type' },
  { id: 'flavor', title: 'Flavor Profile' },
  { id: 'sweetness', title: 'Sweetness' },
  { id: 'molecular', title: 'Molecular Element' },
];

const drinkNames = {
  cocktail: ['Velvet Coupe', 'Golden Hour', 'Midnight Bloom', 'Crimson Silk', 'Amber Eclipse', 'Pearl Fizz'],
  mocktail: ['Garden Mist', 'Sunset Cloud', 'Crystal Rain', 'Meadow Breeze', 'Citrus Dream', 'Berry Blush'],
};

const generateDrinks = (prefs) => {
  const { type, flavor, sweetness, molecular } = prefs;
  
  const names = drinkNames[type] || drinkNames.cocktail;
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  
  const techniques = molecular ? [molecular] : MOLECULAR_TECHNIQUES;
  
  return [0, 1, 2].map((i) => ({
    id: i + 1,
    name: shuffled[i],
    type,
    flavor,
    sweetness,
    technique: techniques[i % techniques.length],
    notes: `A ${sweetness} ${flavor} creation with ${type === 'mocktail' ? 'fresh juices' : 'premium spirits'}. ${molecular ? `Features our signature ${molecular} presentation.` : 'Perfect for your celebration.'}`,
    ingredients: type === 'cocktail' 
      ? ['Premium Spirit', 'Fresh Citrus', 'House Syrup', 'Aromatic Bitters', 'Garnish']
      : ['Fresh Juice', 'Natural Syrup', 'Sparkling Water', 'Fresh Herbs', 'Garnish'],
    garnish: flavor === 'floral' ? 'Edible flowers & rose petals' 
      : flavor === 'citrus' ? 'Dehydrated citrus wheel'
      : flavor === 'fruity' ? 'Fresh berry skewer'
      : 'Herb sprig & gold dust',
    glass: i === 0 ? 'Coupe' : i === 1 ? 'Highball' : 'Martini',
  }));
};

export default function DrinkGenerator() {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({
    type: '',
    flavor: '',
    sweetness: '',
    molecular: '',
  });
  const [drinks, setDrinks] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleSelect = (field, value) => {
    setPrefs(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const results = generateDrinks(prefs);
      setDrinks(results);
    }
  };

  const handleBack = () => {
    if (drinks) {
      setDrinks(null);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setPrefs({ type: '', flavor: '', sweetness: '', molecular: '' });
    setDrinks(null);
  };

  const handleSaveImage = async () => {
    const element = document.getElementById('drink-results');
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#0A0A0A',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = 'my-signature-drinks-hqd.png';
      link.href = canvas.toDataURL();
      link.click();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Signature Drinks from HQ.D',
          text: `Check out my signature drink concepts: ${drinks.map(d => d.name).join(', ')}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  const canProceed = () => {
    const currentStep = steps[step];
    if (currentStep.id === 'molecular') return true; // Optional
    return !!prefs[currentStep.id];
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Interactive Tool</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Signature Drink
              <br />
              <span className="text-[hsl(46_64%_52%)]">Generator</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Discover your perfect signature drink. Answer a few questions and we'll 
              create custom concepts just for you.
            </p>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="section-y">
        <div className="container-hqd max-w-4xl">
          {/* Progress */}
          {!drinks && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className={cn(
                    'h-2 w-8 rounded-full transition-colors',
                    i <= step ? 'bg-[hsl(46_64%_52%)]' : 'bg-white/10'
                  )} />
                  {i < steps.length - 1 && <div className="w-2" />}
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
                className="card-dark p-6 lg:p-10"
              >
                {/* Step Content */}
                {step === 0 && (
                  <div className="text-center">
                    <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-8">What's your preference?</h2>
                    <div className="flex justify-center gap-6">
                      <button
                        onClick={() => handleSelect('type', 'cocktail')}
                        className={cn(
                          'flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all',
                          prefs.type === 'cocktail'
                            ? 'border-[hsl(46_64%_52%)] bg-[hsl(46_64%_52%)]/10'
                            : 'border-white/10 hover:border-white/20'
                        )}
                        data-testid="drink-type-cocktail"
                      >
                        <Wine className="h-12 w-12 text-[hsl(46_64%_52%)]" />
                        <span className="text-lg text-[hsl(35_33%_97%)]">Cocktail</span>
                      </button>
                      <button
                        onClick={() => handleSelect('type', 'mocktail')}
                        className={cn(
                          'flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all',
                          prefs.type === 'mocktail'
                            ? 'border-[hsl(46_64%_52%)] bg-[hsl(46_64%_52%)]/10'
                            : 'border-white/10 hover:border-white/20'
                        )}
                        data-testid="drink-type-mocktail"
                      >
                        <GlassWater className="h-12 w-12 text-[hsl(46_64%_52%)]" />
                        <span className="text-lg text-[hsl(35_33%_97%)]">Mocktail</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="text-center">
                    <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-8">What flavor profile appeals to you?</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                      {FLAVOR_PROFILES.map((flavor) => (
                        <button
                          key={flavor}
                          onClick={() => handleSelect('flavor', flavor)}
                          className={cn(
                            'px-6 py-3 rounded-full border transition-all capitalize',
                            prefs.flavor === flavor
                              ? 'border-[hsl(46_64%_52%)] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)]'
                              : 'border-white/10 text-[hsl(35_33%_97%)] hover:border-white/20'
                          )}
                          data-testid={`drink-flavor-${flavor}`}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="text-center">
                    <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-8">How sweet do you like it?</h2>
                    <div className="flex justify-center gap-4">
                      {['dry', 'balanced', 'sweet'].map((level) => (
                        <button
                          key={level}
                          onClick={() => handleSelect('sweetness', level)}
                          className={cn(
                            'px-8 py-4 rounded-2xl border transition-all capitalize',
                            prefs.sweetness === level
                              ? 'border-[hsl(46_64%_52%)] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)]'
                              : 'border-white/10 text-[hsl(35_33%_97%)] hover:border-white/20'
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
                    <h2 className="text-h2 text-[hsl(35_33%_97%)] mb-4">Add a molecular touch?</h2>
                    <p className="text-[hsl(42_15%_70%)] mb-8">Optional - skip if you prefer classic presentation</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {MOLECULAR_TECHNIQUES.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => handleSelect('molecular', prefs.molecular === tech ? '' : tech)}
                          className={cn(
                            'px-5 py-3 rounded-full border transition-all flex items-center gap-2',
                            prefs.molecular === tech
                              ? 'border-[hsl(46_64%_52%)] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)]'
                              : 'border-white/10 text-[hsl(35_33%_97%)] hover:border-white/20'
                          )}
                          data-testid={`drink-molecular-${tech.toLowerCase().replace(/ /g, '-')}`}
                        >
                          <Sparkles className="h-4 w-4" />
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-10">
                  <button
                    onClick={handleBack}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[hsl(35_33%_97%)] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] px-6 h-11 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="drink-next-button"
                  >
                    {step === steps.length - 1 ? 'Generate Drinks' : 'Next'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <h2 className="text-h2 text-[hsl(35_33%_97%)]">Your Signature Drinks</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveImage}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(46_64%_52%)]/40 text-[hsl(35_33%_97%)] text-sm hover:bg-white/5 transition-colors"
                      data-testid="drink-save-button"
                    >
                      {saved ? <Check className="h-4 w-4 text-green-400" /> : <Download className="h-4 w-4" />}
                      {saved ? 'Saved!' : 'Save Image'}
                    </button>
                    {navigator.share && (
                      <button
                        onClick={handleShare}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(46_64%_52%)]/40 text-[hsl(35_33%_97%)] text-sm hover:bg-white/5 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    )}
                  </div>
                </div>

                {/* Drink Cards */}
                <div id="drink-results" className="grid md:grid-cols-3 gap-6 p-1">
                  {drinks.map((drink, index) => (
                    <motion.div
                      key={drink.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="card-dark p-6"
                      data-testid={`drink-result-${drink.id}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs px-2 py-1 rounded-full bg-[hsl(46_64%_52%)]/10 text-[hsl(46_64%_52%)] capitalize">
                          {drink.type}
                        </span>
                        <span className="text-xs text-[hsl(42_15%_70%)]">{drink.glass} Glass</span>
                      </div>
                      
                      <h3 className="font-display text-2xl text-[hsl(35_33%_97%)] mb-3">{drink.name}</h3>
                      <p className="text-sm text-[hsl(35_33%_97%)]/70 mb-4">{drink.notes}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div>
                          <span className="text-xs text-[hsl(46_64%_52%)] block mb-1">Flavor</span>
                          <span className="text-sm text-[hsl(35_33%_97%)] capitalize">{drink.flavor} • {drink.sweetness}</span>
                        </div>
                        <div>
                          <span className="text-xs text-[hsl(46_64%_52%)] block mb-1">Garnish</span>
                          <span className="text-sm text-[hsl(35_33%_97%)]">{drink.garnish}</span>
                        </div>
                      </div>
                      
                      {drink.technique && (
                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                          <Sparkles className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                          <span className="text-sm text-[hsl(46_64%_52%)]">{drink.technique}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-sm text-[hsl(42_15%_70%)] mt-8">
                  These are concept suggestions. Your final menu will be curated by our mixologists based on your preferences.
                </p>

                {/* Actions */}
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Start Over
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
