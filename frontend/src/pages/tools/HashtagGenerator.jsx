import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, Check, RefreshCw, Heart, Crown, Smile, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const vibes = [
  { value: 'classic', label: 'Classic & Elegant' },
  { value: 'fun', label: 'Fun & Playful' },
  { value: 'filmy', label: 'Filmy & Bollywood' },
  { value: 'modern', label: 'Modern & Minimal' },
  { value: 'hinglish', label: 'Hinglish' },
];

const generateHashtags = (name1, name2, vibe) => {
  const n1 = name1.trim().replace(/[^a-zA-Z]/g, '');
  const n2 = name2.trim().replace(/[^a-zA-Z]/g, '');
  
  if (!n1 || !n2) return { elegant: [], playful: [], short: [], themed: [] };
  
  const combos = [
    `${n1}${n2}`,
    `${n2}${n1}`,
    `${n1}And${n2}`,
    `${n1}Weds${n2}`,
    `${n2}Weds${n1}`,
    `${n1}Ki${n2}`,
    `${n2}Ka${n1}`,
  ];
  
  const elegant = [
    `#${combos[0]}Forever`,
    `#The${combos[0]}Wedding`,
    `#${combos[2]}SayIDo`,
    `#${combos[0]}TieTheKnot`,
    `#${n1}Finds${n2}`,
    `#TogetherForever${combos[0]}`,
    `#${combos[0]}Chapter`,
    `#${combos[0]}Journey`,
    `#Celebrating${combos[0]}`,
    `#${combos[0]}LoveStory`,
  ];
  
  const playful = [
    `#Finally${combos[0]}`,
    `#${combos[0]}Hitched`,
    `#${n1}Got${n2}`,
    `#${combos[0]}Party`,
    `#${combos[0]}Vibes`,
    `#ShaadiTime${combos[0]}`,
    `#${combos[0]}Dhamaal`,
    `#${n1}Says${n2}Yes`,
    `#${combos[0]}Goals`,
    `#Drunk${combos[0]}Love`,
  ];
  
  const short = [
    `#${combos[0]}`,
    `#${combos[3]}`,
    `#${n1}${n2[0]}`,
    `#${n1[0]}${n2}`,
    `#${n1[0]}And${n2[0]}`,
    `#We${combos[0]}`,
    `#${combos[0]}25`,
    `#${combos[0]}Day`,
  ];
  
  const themed = vibe === 'filmy' ? [
    `#Dilwale${n1}Le${n2}`,
    `#${combos[0]}KiShaadi`,
    `#BandBaajaBaraat${combos[0]}`,
    `#${combos[0]}KaDulha`,
    `#Yeh${n1}Hai${n2}Ki`,
    `#DDLJ${combos[0]}`,
    `#RockyStar${combos[0]}`,
  ] : vibe === 'hinglish' ? [
    `#${combos[5]}`,
    `#${combos[6]}`,
    `#${n1}Ki${n2}KiShaadi`,
    `#Shaadi${combos[0]}`,
    `#Badhai${combos[0]}Ko`,
    `#${combos[0]}WaliShaadi`,
  ] : [
    `#${combos[0]}Signature`,
    `#House${combos[0]}`,
    `#${combos[0]}Affair`,
    `#${combos[0]}Union`,
    `#${combos[0]}Alliance`,
  ];
  
  return { elegant, playful, short, themed };
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

  const copyAllToClipboard = () => {
    if (!hashtags) return;
    const all = [...hashtags.elegant, ...hashtags.playful, ...hashtags.short, ...hashtags.themed].join(' ');
    navigator.clipboard.writeText(all);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  const categories = [
    { key: 'elegant', label: 'Elegant', icon: Crown },
    { key: 'playful', label: 'Playful', icon: Smile },
    { key: 'short', label: 'Short & Sweet', icon: Zap },
    { key: 'themed', label: vibe === 'filmy' ? 'Filmy' : vibe === 'hinglish' ? 'Hinglish' : 'Themed', icon: Heart },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-noir noir-noise relative">
        <div className="container-hqd py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="text-sm text-[hsl(46_64%_52%)] tracking-wider uppercase">Interactive Tool</span>
            <h1 className="text-h1 text-[hsl(35_33%_97%)] mt-4">
              Wedding Hashtag
              <br />
              <span className="text-[hsl(46_64%_52%)]">Generator</span>
            </h1>
            <p className="text-lg text-[hsl(35_33%_97%)]/80 mt-6">
              Create the perfect wedding hashtag for your special day. 
              Enter your names and let us generate creative options!
            </p>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="section-y">
        <div className="container-hqd max-w-4xl">
          {/* Input Form */}
          <div className="card-dark p-6 lg:p-8 mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-[hsl(35_33%_97%)] mb-2 block">Partner 1 Name *</Label>
                <Input
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  placeholder="e.g., Priya"
                  className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                  data-testid="hashtag-name1-input"
                />
              </div>
              <div>
                <Label className="text-[hsl(35_33%_97%)] mb-2 block">Partner 2 Name *</Label>
                <Input
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  placeholder="e.g., Rahul"
                  className="bg-transparent border-white/10 focus-visible:ring-[hsl(46_64%_52%)] h-11"
                  data-testid="hashtag-name2-input"
                />
              </div>
              <div>
                <Label className="text-[hsl(35_33%_97%)] mb-2 block">Vibe</Label>
                <Select value={vibe} onValueChange={setVibe}>
                  <SelectTrigger className="bg-transparent border-white/10 focus:ring-[hsl(46_64%_52%)] h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(226_10%_8%)] border-white/10">
                    {vibes.map((v) => (
                      <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={!name1 || !name2}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-[12px] bg-[hsl(46_64%_52%)] text-[hsl(228_13%_4%)] h-11 font-medium hover:bg-[hsl(46_64%_45%)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="hashtag-generate-button"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence>
            {hashtags && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Copy All Button */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-h3 text-[hsl(35_33%_97%)]">Your Hashtags</h2>
                  <button
                    onClick={copyAllToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(46_64%_52%)]/40 text-[hsl(35_33%_97%)] text-sm hover:bg-white/5 transition-colors"
                    data-testid="hashtag-copy-all-button"
                  >
                    {allCopied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy All
                      </>
                    )}
                  </button>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                  {categories.map((category) => (
                    <div key={category.key}>
                      <div className="flex items-center gap-2 mb-3">
                        <category.icon className="h-4 w-4 text-[hsl(46_64%_52%)]" />
                        <span className="text-sm font-medium text-[hsl(35_33%_97%)]">{category.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hashtags[category.key]?.map((tag, i) => {
                          const index = `${category.key}-${i}`;
                          return (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.03 }}
                              onClick={() => copyToClipboard(tag, index)}
                              className="px-4 py-2 rounded-full bg-[hsl(226_10%_12%)] border border-white/10 text-[hsl(35_33%_97%)] text-sm hover:border-[hsl(46_64%_52%)]/40 hover:bg-[hsl(226_10%_14%)] transition-colors flex items-center gap-2"
                              data-testid={`hashtag-tag-${index}`}
                            >
                              {tag}
                              {copiedIndex === index ? (
                                <Check className="h-3 w-3 text-green-400" />
                              ) : (
                                <Copy className="h-3 w-3 opacity-50" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Regenerate */}
                <div className="mt-8 text-center">
                  <button
                    onClick={handleGenerate}
                    className="inline-flex items-center gap-2 text-[hsl(46_64%_52%)] hover:underline"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try different combinations
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!hashtags && (
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 text-[hsl(46_64%_52%)]/30 mx-auto mb-4" />
              <p className="text-[hsl(35_33%_97%)]/50">
                Enter both names and click Generate to see your hashtag options!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
