import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, RefreshCw, Crown, Smile, Zap, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const vibes = [
  { value: 'classic', label: 'Classic' },
  { value: 'fun', label: 'Fun' },
  { value: 'filmy', label: 'Filmy' },
  { value: 'minimal', label: 'Minimal' },
];

const generateHashtags = (n1, n2, vibe) => {
  const name1 = n1.trim().replace(/[^a-zA-Z]/g, '');
  const name2 = n2.trim().replace(/[^a-zA-Z]/g, '');
  if (!name1 || !name2) return null;
  const combo = `${name1}${name2}`;
  
  return {
    elegant: [`#${combo}Forever`, `#The${combo}Wedding`, `#${name1}And${name2}`, `#${combo}SayIDo`, `#TogetherForever${combo}`, `#Celebrating${combo}`, `#${combo}LoveStory`, `#${combo}Chapter`],
    playful: [`#Finally${combo}`, `#${combo}Hitched`, `#${name1}Got${name2}`, `#${combo}Party`, `#${combo}Vibes`, `#${name1}Says${name2}Yes`, `#${combo}Goals`, `#Cheers${combo}`],
    short: [`#${combo}`, `#${name1}Weds${name2}`, `#${name1}${name2[0]}`, `#We${combo}`, `#${combo}25`],
    themed: vibe === 'filmy' 
      ? [`#Dilwale${name1}Le${name2}`, `#${combo}KiShaadi`, `#BandBaajaBaraat${combo}`, `#DDLJ${combo}`]
      : [`#${combo}Signature`, `#House${combo}`, `#${combo}Affair`, `#${combo}Union`],
  };
};

export default function HashtagGenerator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [vibe, setVibe] = useState('classic');
  const [hashtags, setHashtags] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [allCopied, setAllCopied] = useState(false);

  const handleGenerate = () => {
    const results = generateHashtags(name1, name2, vibe);
    setHashtags(results);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    if (!hashtags) return;
    const all = [...hashtags.elegant, ...hashtags.playful, ...hashtags.short, ...hashtags.themed].join(' ');
    navigator.clipboard.writeText(all);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const categories = [
    { key: 'elegant', label: 'Elegant', icon: Crown },
    { key: 'playful', label: 'Playful', icon: Smile },
    { key: 'short', label: 'Short', icon: Zap },
    { key: 'themed', label: vibe === 'filmy' ? 'Filmy' : 'Themed', icon: Heart },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="section-spacing pb-12">
        <div className="container-narrow text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label-gold mb-4">Free Tool</p>
            <h1 className="heading-xl text-[hsl(40_33%_95%)] mb-6">
              Wedding Hashtag
              <br /><span className="text-gold">Generator</span>
            </h1>
            <p className="body-lg">Create the perfect hashtag for your special day.</p>
          </motion.div>
        </div>
      </section>

      {/* Generator */}
      <section className="section-spacing pt-0">
        <div className="container-narrow">
          {/* Input */}
          <motion.div 
            className="card-minimal p-6 lg:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="grid sm:grid-cols-4 gap-4">
              <div>
                <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Partner 1 *</Label>
                <Input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="Priya"
                  className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                  data-testid="hashtag-name1"
                />
              </div>
              <div>
                <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Partner 2 *</Label>
                <Input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="Rahul"
                  className="bg-transparent border-white/10 focus-visible:ring-gold h-11"
                  data-testid="hashtag-name2"
                />
              </div>
              <div>
                <Label className="body-sm text-[hsl(40_33%_95%)] mb-2 block">Vibe</Label>
                <Select value={vibe} onValueChange={setVibe}>
                  <SelectTrigger className="bg-transparent border-white/10 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(0_0%_5%)] border-white/10">
                    {vibes.map((v) => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={!name1 || !name2}
                  className="btn-primary w-full justify-center text-sm h-11"
                  data-testid="hashtag-generate"
                >
                  <Sparkles className="h-4 w-4" /> Generate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {hashtags && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="heading-md text-[hsl(40_33%_95%)]">Your Hashtags</h2>
                  <button onClick={copyAll} className="btn-ghost text-sm" data-testid="hashtag-copy-all">
                    {allCopied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    {allCopied ? 'Copied!' : 'Copy All'}
                  </button>
                </div>

                <div className="space-y-6">
                  {categories.map((cat) => (
                    <div key={cat.key}>
                      <div className="flex items-center gap-2 mb-3">
                        <cat.icon className="h-4 w-4 text-gold" />
                        <span className="text-sm font-medium text-[hsl(40_33%_95%)]">{cat.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hashtags[cat.key]?.map((tag, i) => {
                          const idx = `${cat.key}-${i}`;
                          return (
                            <motion.button
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              onClick={() => copyToClipboard(tag, idx)}
                              className="px-4 py-2 rounded-full bg-[hsl(0_0%_7%)] border border-white/10 text-sm text-[hsl(40_33%_95%)] hover:border-gold/40 transition-colors flex items-center gap-2"
                              data-testid={`hashtag-${idx}`}
                            >
                              {tag}
                              {copiedIndex === idx ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3 opacity-40" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button onClick={handleGenerate} className="btn-ghost text-sm">
                    <RefreshCw className="h-4 w-4" /> Regenerate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!hashtags && (
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 text-gold/20 mx-auto mb-4" />
              <p className="body-md">Enter names and click Generate!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
