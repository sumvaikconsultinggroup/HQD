// Extensive Molecular Mixology Library - 20+ Techniques
// Gamified with difficulty levels, points, and unlock mechanics

export const DIFFICULTY_LEVELS = {
  beginner: { label: 'Beginner', color: 'hsl(142, 76%, 36%)', points: 100, icon: '🌱' },
  intermediate: { label: 'Intermediate', color: 'hsl(352, 33%, 59%)', points: 250, icon: '⚡' },
  advanced: { label: 'Advanced', color: 'hsl(280, 60%, 50%)', points: 500, icon: '🔥' },
  master: { label: 'Master', color: 'hsl(0, 84%, 60%)', points: 1000, icon: '👑' },
};

export const TECHNIQUE_CATEGORIES = [
  { id: 'all', label: 'All Techniques', icon: '✨' },
  { id: 'visual', label: 'Visual Effects', icon: '👁️' },
  { id: 'texture', label: 'Texture Play', icon: '🫧' },
  { id: 'aroma', label: 'Aroma & Scent', icon: '🌸' },
  { id: 'temperature', label: 'Temperature', icon: '❄️' },
  { id: 'presentation', label: 'Presentation', icon: '🎭' },
];

export const MOLECULAR_TECHNIQUES = [
  // ═══════════════════════════════════════════════════════════════════
  // BEGINNER TECHNIQUES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'smoke-bubbles',
    name: 'Smoke Bubbles',
    tagline: 'Bubbles that burst with aromatic smoke',
    description: 'Create mesmerizing bubbles filled with flavored smoke that burst on contact, releasing fragrant clouds. A crowd favorite that turns every sip into a theatrical experience.',
    longDescription: `Smoke bubbles are created using a specialized bubble gun filled with aromatic smoke. When the bubble lands on the drink or bursts near the guest's face, it releases a cloud of scented smoke that enhances the drinking experience.

The smoke can be infused with various flavors like rosemary, cinnamon, applewood, or citrus, adding an olfactory dimension to the cocktail. This technique is perfect for creating Instagram-worthy moments and is especially popular at weddings and high-end events.`,
    difficulty: 'beginner',
    category: 'visual',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80',
    video: null,
    ingredients: ['Bubble solution', 'Smoke gun', 'Flavor chips (rosemary, cinnamon, etc.)'],
    equipmentNeeded: ['Handheld smoke bubble gun', 'Food-grade smoke chips', 'Bubble solution'],
    steps: [
      'Load the smoke gun with your chosen flavor chips',
      'Fill the bubble attachment with food-safe bubble solution',
      'Generate smoke and blow bubbles over the prepared cocktail',
      'Let bubbles float down and burst on the drink surface',
    ],
    proTips: [
      'Use complementary smoke flavors - rosemary with gin, applewood with whiskey',
      'Blow bubbles from above for dramatic descent',
      'Works best in low-wind environments',
    ],
    perfectFor: ['Sangeet', 'Cocktail Night', 'Reception'],
    funFact: 'A single smoke bubble can hold up to 3 seconds of aromatic smoke!',
    popularDrinks: ['Smoky Martini', 'Whiskey Sour', 'Old Fashioned'],
    unlocked: true,
  },
  {
    id: 'dry-ice-fog',
    name: 'Dry Ice Fog',
    tagline: 'Mystical fog that cascades from your glass',
    description: 'Transform ordinary drinks into mystical potions with cascading dry ice fog. The theatrical mist creates an otherworldly atmosphere.',
    longDescription: `Dry ice (solid CO2) sublimates at -78.5°C, creating dense, low-lying fog when it comes in contact with liquid. This technique adds dramatic visual impact to cocktails, making them appear to be brewing with magic.

Safety is paramount - the dry ice must never be consumed directly. We use specialized serving methods like fog chambers, nested glassware, or timed presentations to ensure the dry ice has fully sublimated before the drink reaches the guest's lips.`,
    difficulty: 'beginner',
    category: 'visual',
    wowFactor: 8,
    image: 'https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=600&q=80',
    video: null,
    ingredients: ['Food-grade dry ice', 'Warm water base'],
    equipmentNeeded: ['Insulated gloves', 'Dry ice container', 'Double-walled glassware'],
    steps: [
      'Prepare your cocktail in a double-walled glass',
      'Add a small piece of dry ice to the outer chamber',
      'Pour warm water into the outer chamber to activate',
      'Serve immediately while fog is active (2-3 minutes)',
    ],
    proTips: [
      'Never let guests drink until dry ice fully sublimates',
      'Smaller pieces create longer-lasting, gentler fog',
      'Add food coloring to water for colored fog',
    ],
    perfectFor: ['After-Party', 'Halloween', 'Theme Nights'],
    funFact: 'Dry ice is 3x denser than regular ice, making the fog hug the table surface!',
    popularDrinks: ['Witch\'s Brew', 'Fog Cutter', 'Mystic Margarita'],
    unlocked: true,
  },
  {
    id: 'edible-flowers',
    name: 'Edible Flower Garnish',
    tagline: 'Nature\'s art in every glass',
    description: 'Elevate your cocktails with beautiful, edible flowers frozen in ice or floating fresh. A simple technique with stunning results.',
    longDescription: `Edible flowers bring natural beauty and subtle flavors to cocktails. From vibrant pansies to delicate violas, rose petals to lavender buds, each flower adds its own character.

Flowers can be frozen in ice cubes for slow-reveal beauty, floated fresh on the surface, or used as elegant garnishes. Some flowers like hibiscus or butterfly pea can even change the drink's color!`,
    difficulty: 'beginner',
    category: 'presentation',
    wowFactor: 7,
    image: 'https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=600&q=80',
    video: null,
    ingredients: ['Edible flowers (pansies, violas, roses, lavender)', 'Filtered water for ice'],
    equipmentNeeded: ['Ice cube trays', 'Tweezers for placement', 'Fresh flower storage'],
    steps: [
      'Source organic, pesticide-free edible flowers',
      'Gently wash and dry flowers',
      'Place in ice cube trays, fill halfway with water, freeze',
      'Add more water to cover, freeze again for clear ice',
    ],
    proTips: [
      'Boil water twice and cool for crystal-clear ice',
      'Match flower colors to cocktail themes',
      'Lavender pairs beautifully with gin and vodka',
    ],
    perfectFor: ['Mehendi', 'Brunch', 'Garden Party'],
    funFact: 'Ancient Romans used rose petals in their wine over 2000 years ago!',
    popularDrinks: ['Garden Spritz', 'Lavender Collins', 'Rose Martini'],
    unlocked: true,
  },
  {
    id: 'sugar-rim-art',
    name: 'Artisan Sugar Rims',
    tagline: 'Crystalline edges that sparkle and crunch',
    description: 'Transform glass rims into edible art with colored sugars, spiced salts, and creative combinations.',
    longDescription: `The rim of a glass is prime real estate for flavor and visual impact. Beyond basic salt or sugar, molecular mixology takes rimming to an art form with custom blends, colors, and textures.

Techniques include gradient rims, half-and-half combinations, edible glitter mixes, and flavored salt blends. Each sip begins with a burst of complementary flavor.`,
    difficulty: 'beginner',
    category: 'presentation',
    wowFactor: 6,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
    video: null,
    ingredients: ['Superfine sugar', 'Food coloring', 'Citrus zest', 'Edible glitter'],
    equipmentNeeded: ['Shallow plates', 'Citrus wedge', 'Storage containers'],
    steps: [
      'Mix sugar with food coloring and let dry',
      'Add complementary flavors (citrus zest, spices)',
      'Run citrus wedge around glass rim',
      'Dip rim in sugar mixture at 45° angle',
    ],
    proTips: [
      'Make rims on inside AND outside for professional look',
      'Chili-lime rim for margaritas is a game-changer',
      'Gold edible glitter adds instant luxury',
    ],
    perfectFor: ['All Events'],
    funFact: 'The margarita\'s salt rim was invented in 1948 in Tijuana, Mexico!',
    popularDrinks: ['Margarita', 'Lemon Drop', 'Cosmopolitan'],
    unlocked: true,
  },
  {
    id: 'layered-drinks',
    name: 'Density Layering',
    tagline: 'Rainbow gravity in a glass',
    description: 'Create stunning multi-colored layers using density differences. A visual masterpiece that showcases liquid physics.',
    longDescription: `Layered drinks exploit the density differences between liquids. Syrups sink, spirits float, and with careful pouring, you can create 3-7 distinct visible layers in a single glass.

The technique requires understanding specific gravity - each layer must be less dense than the one below it. Temperature also affects density, allowing for even more creative possibilities.`,
    difficulty: 'beginner',
    category: 'visual',
    wowFactor: 8,
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&q=80',
    video: null,
    ingredients: ['High-sugar syrups', 'Fruit juices', 'Spirits', 'Cream liqueurs'],
    equipmentNeeded: ['Bar spoon', 'Steady hand', 'Shot glasses or tall glasses'],
    steps: [
      'Start with the densest liquid (grenadine, heavy syrups)',
      'Slowly pour next layer over back of spoon',
      'Touch spoon to previous layer surface',
      'Continue with progressively lighter liquids',
    ],
    proTips: [
      'Chill all ingredients to same temperature',
      'Pour VERY slowly for clean layers',
      'Practice with colored water first',
    ],
    perfectFor: ['Cocktail Night', 'Pride Events', 'Kids Mocktails'],
    funFact: 'The B-52 shooter was the first widely popular layered shot, created in 1977!',
    popularDrinks: ['B-52', 'Pousse Café', 'Rainbow Shot'],
    unlocked: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // INTERMEDIATE TECHNIQUES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'champagne-foam',
    name: 'Champagne Foam',
    tagline: 'Clouds of effervescent luxury',
    description: 'Light, airy champagne foam that adds texture and elegance. The bubbles within bubbles create a unique sensory experience.',
    longDescription: `Champagne foam is created using lecithin, a natural emulsifier, combined with champagne or sparkling wine. The result is an airy, stable foam that carries the essence of champagne in a completely new texture.

The foam can be flavored with various additions and colored for visual impact. It's particularly stunning on top of cocktails, adding height and drama while maintaining the celebratory essence of champagne.`,
    difficulty: 'intermediate',
    category: 'texture',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&q=80',
    video: null,
    ingredients: ['Champagne or prosecco', 'Soy lecithin', 'Simple syrup'],
    equipmentNeeded: ['Immersion blender', 'Shallow container', 'Spoon for scooping'],
    steps: [
      'Combine champagne with 0.5% lecithin by weight',
      'Add sweetener if desired',
      'Use immersion blender at surface to create foam',
      'Let settle, scoop top foam onto cocktails',
    ],
    proTips: [
      'Tilt container at 45° for more foam surface area',
      'Foam is best used within 5 minutes',
      'Add food coloring for custom colors',
    ],
    perfectFor: ['Reception', 'Engagement', 'Anniversary'],
    funFact: 'Lecithin comes from egg yolks or soybeans and is a natural emulsifier!',
    popularDrinks: ['French 75', 'Champagne Cocktail', 'Bellini'],
    unlocked: true,
  },
  {
    id: 'aromatic-mists',
    name: 'Aromatic Mists',
    tagline: 'Scent clouds that awaken the senses',
    description: 'Fragrant mists sprayed over or around drinks to enhance aroma. The nose experiences the cocktail before the first sip.',
    longDescription: `Aromatic mists are created using atomizers filled with diluted essential oils, citrus oils, or infused spirits. When misted over a cocktail, they create an aromatic halo that dramatically enhances the drinking experience.

Since 80% of taste is actually smell, these mists can transform a simple cocktail into a multi-sensory journey. Popular scents include orange blossom, rose, lavender, and smoked wood.`,
    difficulty: 'intermediate',
    category: 'aroma',
    wowFactor: 8,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80',
    video: null,
    ingredients: ['Essential oils (food-grade)', 'High-proof neutral spirit', 'Distilled water'],
    equipmentNeeded: ['Fine mist atomizers', 'Mixing bottles', 'Dropper'],
    steps: [
      'Dilute essential oil in high-proof spirit (3-5 drops per oz)',
      'Add equal part distilled water',
      'Fill atomizer and test spray',
      'Mist over completed cocktail from 6 inches above',
    ],
    proTips: [
      'Less is more - 1-2 sprays maximum',
      'Match scents to cocktail flavors',
      'Orange blossom is universally appealing',
    ],
    perfectFor: ['Mehendi', 'Fine Dining', 'Tasting Events'],
    funFact: 'The famous El Bulli restaurant pioneered aromatic mists in cuisine!',
    popularDrinks: ['Jasmine Martini', 'Rose Gimlet', 'Lavender Collins'],
    unlocked: true,
  },
  {
    id: 'fruit-caviar',
    name: 'Fruit Caviar (Spherification)',
    tagline: 'Flavor pearls that pop in your mouth',
    description: 'Turn any liquid into tiny caviar-like spheres that burst with flavor. The textural surprise delights every guest.',
    longDescription: `Basic spherification uses sodium alginate and calcium chloride to create a gel membrane around liquid droplets. When the droplets fall into the calcium bath, they form perfect spheres with liquid centers.

This technique works with juices, liqueurs, and flavored waters. The "caviar" can be made in advance and stored, making it practical for events while delivering impressive results.`,
    difficulty: 'intermediate',
    category: 'texture',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600&q=80',
    video: null,
    ingredients: ['Sodium alginate', 'Calcium chloride', 'Fruit juice or liqueur'],
    equipmentNeeded: ['Precision scale', 'Syringe or caviar maker', 'Strainer', 'Bowls'],
    steps: [
      'Blend 0.5% sodium alginate into your chosen liquid',
      'Let rest to remove air bubbles (30 min)',
      'Prepare 0.5% calcium chloride water bath',
      'Drip alginate mixture into bath, let set 2 min',
      'Rinse pearls in clean water',
    ],
    proTips: [
      'Acidic liquids may need pH adjustment',
      'Larger droppers = larger pearls',
      'Store in the base liquid, not water',
    ],
    perfectFor: ['Cocktail Night', 'Tasting Menu', 'VIP Events'],
    funFact: 'Spherification was invented by Unilever in the 1950s for food processing!',
    popularDrinks: ['Cosmo Caviar', 'Mojito Pearls', 'Passion Fruit Martini'],
    unlocked: true,
  },
  {
    id: 'color-changing',
    name: 'Color-Changing Cocktails',
    tagline: 'Magic that happens before your eyes',
    description: 'Drinks that transform color with pH changes. Add citrus and watch blue become purple or pink!',
    longDescription: `Butterfly pea flower (Clitoria ternatea) contains anthocyanins that change color based on pH. In neutral conditions, it's deep blue. Add acid (citrus) and it shifts to purple, then pink.

This natural magic creates incredibly engaging cocktails where guests can "activate" the color change themselves by adding a squeeze of lime or a splash of tonic.`,
    difficulty: 'intermediate',
    category: 'visual',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80',
    video: null,
    ingredients: ['Butterfly pea flowers', 'Citrus juice', 'Clear spirits'],
    equipmentNeeded: ['Tea infuser', 'Clear glassware', 'Citrus on the side'],
    steps: [
      'Steep butterfly pea flowers in hot water or vodka',
      'Strain and cool the blue liquid',
      'Build your cocktail with the blue base',
      'Serve with citrus on the side for guest interaction',
    ],
    proTips: [
      'The bluer the base, the more dramatic the change',
      'Tonic water also triggers the change (quinine is acidic)',
      'Layer colors for gradient effects',
    ],
    perfectFor: ['Sangeet', 'Theme Parties', 'Interactive Bars'],
    funFact: 'Butterfly pea flower has been used in Southeast Asian cuisine for centuries!',
    popularDrinks: ['Magic Margarita', 'Unicorn Tears', 'Galaxy Gin'],
    unlocked: true,
  },
  {
    id: 'smoke-cloche',
    name: 'Smoke Cloche Service',
    tagline: 'Drama unveiled under glass',
    description: 'Serve drinks under a smoke-filled glass dome that billows dramatically when lifted. Pure theater.',
    longDescription: `The smoke cloche (bell jar) presentation traps aromatic smoke that infuses the cocktail while creating anticipation. When the server lifts the dome, smoke cascades over the table in a dramatic reveal.

The trapped smoke also allows the cocktail to absorb smoky flavors, adding depth to whiskey-based drinks or creating unexpected flavor combinations with clear spirits.`,
    difficulty: 'intermediate',
    category: 'presentation',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1527761939622-933c8cb08598?w=600&q=80',
    video: null,
    ingredients: ['Smoking gun', 'Wood chips (cherry, applewood, hickory)', 'Glass cloche'],
    equipmentNeeded: ['Smoking gun', 'Glass dome/cloche', 'Wood chips', 'Serving board'],
    steps: [
      'Place completed cocktail on serving board',
      'Fill cloche with smoke using smoking gun',
      'Quickly place cloche over drink to trap smoke',
      'Let infuse 30-60 seconds before tableside reveal',
    ],
    proTips: [
      'Practice the reveal for smooth service',
      'Match wood to spirit - cherry for bourbon, apple for scotch',
      'Chill the cloche for denser smoke',
    ],
    perfectFor: ['Whiskey Lounge', 'Fine Dining', 'VIP Service'],
    funFact: 'The smoke cloche technique originated in Michelin-starred restaurants!',
    popularDrinks: ['Smoked Old Fashioned', 'Penicillin', 'Mezcal Negroni'],
    unlocked: true,
  },
  {
    id: 'flavored-ice',
    name: 'Flavored Ice Spheres',
    tagline: 'The cocktail that gets better with time',
    description: 'Large ice spheres infused with complementary flavors that slowly release as they melt.',
    longDescription: `Flavored ice adds a time dimension to cocktails. As the ice melts, it releases new flavors into the drink, creating an evolving experience. A whiskey might start neat and gradually gain notes of coffee, citrus, or herbs.

Large spheres melt slower than cubes due to lower surface area, giving guests more time to enjoy the transformation. The spheres themselves become a conversation piece.`,
    difficulty: 'intermediate',
    category: 'temperature',
    wowFactor: 8,
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80',
    video: null,
    ingredients: ['Filtered water', 'Fruit juices', 'Coffee', 'Herbs', 'Edible flowers'],
    equipmentNeeded: ['Silicone sphere molds', 'Directional freezing setup (optional)'],
    steps: [
      'Prepare flavored liquid (dilute strong flavors)',
      'Pour into sphere molds, leaving expansion room',
      'Freeze for 24+ hours for solid spheres',
      'Unmold and use immediately or store in freezer',
    ],
    proTips: [
      'Boil water twice for clearer ice',
      'Coffee ice in whiskey is incredible',
      'Gradient colors by freezing in stages',
    ],
    perfectFor: ['Whiskey Service', 'Long Drinks', 'Outdoor Events'],
    funFact: 'Japanese bartenders spend years perfecting hand-carved ice spheres!',
    popularDrinks: ['Japanese Highball', 'Negroni', 'Rum Old Fashioned'],
    unlocked: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // ADVANCED TECHNIQUES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'reverse-spherification',
    name: 'Reverse Spherification',
    tagline: 'Liquid-filled orbs of pure flavor',
    description: 'Create larger spheres with thinner membranes and completely liquid centers. The ultimate "flavor bomb".',
    longDescription: `Reverse spherification flips the basic technique - calcium goes in the liquid, alginate in the bath. This creates spheres that can be made larger, stored longer, and have thinner membranes with totally liquid centers.

This technique works better with dairy, alcohol, and acidic liquids that struggle with basic spherification. The spheres can be stored for days without the membrane thickening.`,
    difficulty: 'advanced',
    category: 'texture',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&q=80',
    video: null,
    ingredients: ['Calcium lactate gluconate', 'Sodium alginate', 'Xanthan gum'],
    equipmentNeeded: ['Precision scale', 'Spherical molds', 'Slotted spoon', 'Multiple baths'],
    steps: [
      'Add 1% calcium lactate gluconate to your liquid',
      'Add 0.3% xanthan gum for body',
      'Prepare 0.5% alginate bath',
      'Freeze liquid in hemisphere molds',
      'Drop frozen hemispheres in alginate bath',
      'Let membrane form (3 minutes), rinse',
    ],
    proTips: [
      'Frozen base = perfect spheres',
      'Thicker membrane = longer bath time',
      'Store in oil to prevent sticking',
    ],
    perfectFor: ['Tasting Menus', 'Molecular Events', 'Competition'],
    funFact: 'Ferran Adrià of El Bulli created the first "olive" sphere in 2003!',
    popularDrinks: ['Aperol Sphere', 'Bloody Mary Bomb', 'Espresso Martini Orb'],
    unlocked: true,
  },
  {
    id: 'gel-sheets',
    name: 'Edible Gel Sheets',
    tagline: 'Flavor in architectural form',
    description: 'Thin, flexible sheets of flavored gel that can wrap, drape, or dramatically top cocktails.',
    longDescription: `Agar-based gel sheets are thin, flexible, and can be shaped in countless ways. They can wrap around glass rims, float on drinks, or be shaped into origami-like decorations.

The sheets can be made in any color and flavor, from citrus to herbs to flowers. They dissolve slowly in the drink, adding flavor as they break down.`,
    difficulty: 'advanced',
    category: 'presentation',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    video: null,
    ingredients: ['Agar agar', 'Flavored liquid', 'Food coloring'],
    equipmentNeeded: ['Flat trays', 'Offset spatula', 'Heat source'],
    steps: [
      'Blend 1% agar into cold flavored liquid',
      'Heat while stirring until boiling',
      'Pour thin layer onto flat surface',
      'Let set, then peel and shape',
    ],
    proTips: [
      'Silicone mats make peeling easier',
      'Cut while slightly warm for clean edges',
      'Stack sheets for layered colors',
    ],
    perfectFor: ['Avant-garde Events', 'Competition', 'Food Pairing'],
    funFact: 'Agar was discovered in Japan in 1658 and is made from seaweed!',
    popularDrinks: ['Deconstructed Martini', 'Origami Collins', 'Wrapped Whiskey'],
    unlocked: true,
  },
  {
    id: 'flash-freeze',
    name: 'Liquid Nitrogen Flash',
    tagline: 'Frozen in an instant, -196°C',
    description: 'Use liquid nitrogen for instant freezing, dramatic fog, and unique frozen textures.',
    longDescription: `Liquid nitrogen at -196°C creates instant freezing effects impossible with conventional methods. It can flash-freeze fruit for shatteringly crisp garnishes, create instant ice cream or sorbet, and produce spectacular fog effects.

Safety is critical - proper training, ventilation, and handling equipment are mandatory. When done correctly, it's the most dramatic technique in molecular mixology.`,
    difficulty: 'advanced',
    category: 'temperature',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=600&q=80',
    video: null,
    ingredients: ['Liquid nitrogen (food-grade)', 'Fresh fruits', 'Cocktail bases'],
    equipmentNeeded: ['Dewar flask', 'Cryo gloves', 'Safety goggles', 'Stainless steel bowls'],
    steps: [
      'Ensure proper ventilation and safety gear',
      'Pour small amounts of LN2 into stainless bowl',
      'Drop fruits or liquids in briefly',
      'Remove immediately when frozen',
      'Let items temper before serving (no direct contact)',
    ],
    proTips: [
      'Never seal LN2 in containers (explosion risk)',
      'Always use in well-ventilated spaces',
      'Let frozen items warm slightly before mouth contact',
    ],
    perfectFor: ['High-end Events', 'Special Occasions', 'Show Bars'],
    funFact: 'Liquid nitrogen boils at -196°C - cold enough to freeze anything instantly!',
    popularDrinks: ['Frozen Daiquiri Pearls', 'LN2 Margarita', 'Shattered Berry Cocktail'],
    unlocked: true,
  },
  {
    id: 'cocktail-gel',
    name: 'Cocktail Gel Cubes',
    tagline: 'Solid drinks that melt in your mouth',
    description: 'Transform liquid cocktails into jiggly gel cubes or shapes that you can eat with your hands.',
    longDescription: `Using precise ratios of gelatin or agar, cocktails can be set into solid forms that maintain their flavor while offering an entirely new texture experience. Guests can literally eat their drinks.

The gels can be cut into cubes, molded into shapes, or served in deconstructed presentations. Alcohol weakens gel structure, so careful calibration is essential.`,
    difficulty: 'advanced',
    category: 'texture',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=600&q=80',
    video: null,
    ingredients: ['Gelatin sheets', 'Complete cocktail', 'Additional sugar if needed'],
    equipmentNeeded: ['Silicone molds', 'Refrigerator', 'Precision scale'],
    steps: [
      'Bloom gelatin in cold cocktail (2% ratio for firm)',
      'Gently heat to dissolve gelatin (don\'t boil - alcohol evaporates)',
      'Pour into molds and refrigerate 4+ hours',
      'Unmold and serve immediately',
    ],
    proTips: [
      'Higher proof = more gelatin needed',
      'Agar sets at room temp, gelatin needs cold',
      'Dust with sugar to prevent sticking',
    ],
    perfectFor: ['Dessert Bars', 'Novelty Events', 'Alcohol-free Options'],
    funFact: 'Jello shots were invented during the Civil War era!',
    popularDrinks: ['Negroni Cube', 'Champagne Jelly', 'Whiskey Gummy'],
    unlocked: true,
  },
  {
    id: 'sous-vide-infusion',
    name: 'Sous Vide Infusions',
    tagline: 'Precision-temperature flavor extraction',
    description: 'Use precise temperature control to create rapid, consistent infusions without heat damage.',
    longDescription: `Sous vide infusion uses precise temperature control to extract flavors quickly and consistently. What might take weeks in traditional maceration can be achieved in hours.

The sealed environment preserves volatile aromatics that would be lost to evaporation in open-heat methods. This creates cleaner, more intense flavored spirits and syrups.`,
    difficulty: 'advanced',
    category: 'aroma',
    wowFactor: 7,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    video: null,
    ingredients: ['Base spirit', 'Fresh herbs/fruits/spices', 'Vacuum bags'],
    equipmentNeeded: ['Immersion circulator', 'Vacuum sealer', 'Food-safe bags'],
    steps: [
      'Combine spirit and flavoring agents in vacuum bag',
      'Seal bag, removing all air',
      'Set water bath to 55-60°C',
      'Cook for 2-4 hours depending on ingredient',
      'Strain and cool',
    ],
    proTips: [
      'Different temps extract different compounds',
      'Citrus peel at 55°C for 2 hours = perfect',
      'Strain through coffee filter for clarity',
    ],
    perfectFor: ['Craft Cocktails', 'Custom Infusions', 'Batch Service'],
    funFact: 'Sous vide was developed in France in the 1970s by Georges Pralus!',
    popularDrinks: ['Rapid-aged Whiskey', 'Herb-infused Gin', 'Spiced Rum'],
    unlocked: true,
  },
  {
    id: 'edible-cocktail',
    name: 'Edible Cocktail Paper',
    tagline: 'Dissolving flavor on your tongue',
    description: 'Thin edible films that dissolve instantly, delivering concentrated cocktail flavor.',
    longDescription: `Edible cocktail films are made using maltodextrin or tapioca maltodextrin combined with high-proof spirits and flavorings. The result is paper-thin sheets that dissolve on the tongue, releasing intense cocktail flavors.

This technique allows guests to "taste" a cocktail without drinking - perfect for introductions, palate cleansers, or alcohol-free experiences with full flavor.`,
    difficulty: 'advanced',
    category: 'texture',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1513623935135-c896b59073c1?w=600&q=80',
    video: null,
    ingredients: ['Tapioca maltodextrin', 'High-proof spirit', 'Flavor extracts'],
    equipmentNeeded: ['Dehydrator', 'Silicone mats', 'Blender'],
    steps: [
      'Blend maltodextrin into spirit until thick paste forms',
      'Spread very thin on silicone mat',
      'Dehydrate at 57°C for 4-6 hours',
      'Cut into strips or shapes',
    ],
    proTips: [
      'Fat-wash spirits for richer flavor',
      'Store in airtight container with desiccant',
      'Print patterns with food coloring',
    ],
    perfectFor: ['Tasting Flights', 'Aperitif', 'Avant-garde Events'],
    funFact: 'Edible paper originated in Asia for wrapping candies centuries ago!',
    popularDrinks: ['Negroni Paper', 'Margarita Strip', 'Espresso Martini Film'],
    unlocked: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // MASTER TECHNIQUES
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 'clarified-milk-punch',
    name: 'Clarified Milk Punch',
    tagline: 'Crystal-clear with unbelievable depth',
    description: 'Use milk proteins to clarify complex cocktails into crystal-clear, silky elixirs.',
    longDescription: `Milk clarification is an 18th-century technique that uses milk proteins to bind and remove tannins, harsh flavors, and particles from cocktails. The result is impossibly clear liquid with smooth, rounded flavors.

The process involves intentionally curdling milk with acidic cocktail components, then straining through the curds. The curds act as a filter, and the whey proteins smooth harsh edges.`,
    difficulty: 'master',
    category: 'texture',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80',
    video: null,
    ingredients: ['Whole milk', 'Complete cocktail (must be acidic)', 'Citrus'],
    equipmentNeeded: ['Fine mesh strainer', 'Coffee filters', 'Patience (24+ hours)'],
    steps: [
      'Make your cocktail with citrus (acidity required)',
      'Heat milk slightly, pour cocktail into milk (curdles)',
      'Let rest 30 minutes at room temp',
      'Refrigerate overnight',
      'Strain through curds multiple times until clear',
    ],
    proTips: [
      'Higher fat milk = silkier texture',
      'Don\'t skip the resting time',
      'Filter through curds, not cheesecloth alone',
    ],
    perfectFor: ['Batch Cocktails', 'Clear Presentation', 'Make-ahead Events'],
    funFact: 'Benjamin Franklin drank clarified milk punch, and his recipe survives today!',
    popularDrinks: ['Clear Piña Colada', 'Transparent Tea Punch', 'Crystal Mai Tai'],
    unlocked: true,
  },
  {
    id: 'fat-washing',
    name: 'Fat-Washed Spirits',
    tagline: 'Savory richness meets spirits',
    description: 'Infuse spirits with fat-based flavors (bacon, butter, olive oil) then remove the fat for clean, rich taste.',
    longDescription: `Fat-washing exploits alcohol's ability to extract fat-soluble flavor compounds. The spirit is mixed with melted fat, allowed to infuse, then frozen. The solidified fat is removed, leaving behind fat-soluble flavors in the spirit.

This creates savory, rich spirits impossible to achieve with water-based infusions. Bacon bourbon, butter-washed rum, and olive oil gin showcase this technique beautifully.`,
    difficulty: 'master',
    category: 'aroma',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    video: null,
    ingredients: ['Spirit of choice', 'Fat (bacon, butter, sesame oil, etc.)'],
    equipmentNeeded: ['Mason jars', 'Freezer', 'Fine strainer', 'Cheesecloth'],
    steps: [
      'Render fat and let cool to liquid (not hot)',
      'Combine 1oz fat per 8oz spirit, shake well',
      'Let infuse at room temp 4+ hours',
      'Freeze overnight until fat solidifies',
      'Remove fat cap, strain through cheesecloth',
    ],
    proTips: [
      'Strain multiple times for clarity',
      'Bacon fat + bourbon is the classic',
      'Coconut oil for tropical drinks',
    ],
    perfectFor: ['Craft Bars', 'Savory Cocktails', 'Brunch'],
    funFact: 'PDT bar in NYC made bacon-infused bourbon famous in 2007!',
    popularDrinks: ['Benton\'s Old Fashioned', 'Butter Rum', 'Brown Butter Bourbon'],
    unlocked: true,
  },
  {
    id: 'rotary-evaporation',
    name: 'Rotary Evaporation',
    tagline: 'Laboratory precision for flavor extraction',
    description: 'Use vacuum distillation to capture delicate flavors at low temperatures, preserving volatile aromatics.',
    longDescription: `A rotary evaporator (rotovap) uses vacuum to lower the boiling point of liquids, allowing distillation at near room temperature. This preserves heat-sensitive aromatics that would be destroyed in traditional distillation.

This laboratory technique creates incredibly pure, fresh-tasting distillates from fruits, herbs, and flowers. The clarity and intensity of flavors is unmatched by any other method.`,
    difficulty: 'master',
    category: 'aroma',
    wowFactor: 10,
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    video: null,
    ingredients: ['Fresh aromatics', 'Neutral spirit or water', 'Liquid nitrogen (for cold trap)'],
    equipmentNeeded: ['Rotary evaporator ($3000+)', 'Vacuum pump', 'Receiving flasks'],
    steps: [
      'Prepare aromatic solution (herbs in spirit)',
      'Load into rotating flask',
      'Set vacuum and rotation speed',
      'Heat gently, collect distillate',
      'Store in airtight container',
    ],
    proTips: [
      'Fresh = better than dried aromatics',
      'Lower temperature = more delicate flavors',
      'Small batches for consistency',
    ],
    perfectFor: ['High-end Bars', 'Research', 'Competition'],
    funFact: 'Dave Arnold at Booker & Dax popularized rotovap in bars!',
    popularDrinks: ['Rotovap Gin', 'Strawberry Essence Daiquiri', 'Fresh Herb Spirits'],
    unlocked: true,
  },
  {
    id: 'centrifuge-clarification',
    name: 'Centrifuge Clarification',
    tagline: 'Spin at 4000G for instant clarity',
    description: 'Use high-speed spinning to separate particles and clarify any liquid in minutes.',
    longDescription: `A centrifuge spins liquids at extreme speeds, separating components by density. Pulp, proteins, and particles are forced to the edges while clear liquid remains in the center.

This technique can clarify lime juice (removing bitterness), separate cocktail components, and create unique textures impossible through traditional methods. Minutes achieve what filtering takes hours to accomplish.`,
    difficulty: 'master',
    category: 'texture',
    wowFactor: 9,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80',
    video: null,
    ingredients: ['Cloudy liquid (citrus juice, cocktails)', 'Pectinex enzyme (optional)'],
    equipmentNeeded: ['Laboratory centrifuge', 'Centrifuge tubes', 'Pipettes'],
    steps: [
      'Add pectinex to juice (breaks down pectin)',
      'Let sit 30 minutes',
      'Balance tubes precisely in centrifuge',
      'Spin at 4000+ G for 5 minutes',
      'Carefully pipette clear liquid from top',
    ],
    proTips: [
      'Always balance tubes to prevent damage',
      'Higher G = faster separation',
      'Enzymes dramatically improve results',
    ],
    perfectFor: ['Research Bars', 'Competitions', 'Signature Cocktails'],
    funFact: 'Centrifugal force at 4000G is 4000x the force of gravity!',
    popularDrinks: ['Clarified Lime Daiquiri', 'Crystal Bloody Mary', 'Clear Passion Fruit'],
    unlocked: true,
  },
  {
    id: 'ultrasonic-homogenization',
    name: 'Ultrasonic Infusion',
    tagline: 'Sound waves that extract in seconds',
    description: 'Use ultrasonic waves to rapidly infuse flavors that would take days through traditional methods.',
    longDescription: `Ultrasonic homogenizers create microscopic bubbles through cavitation, which violently collapse and create localized extreme pressure and temperature. This breaks down cell walls and extracts flavors in minutes instead of weeks.

The technique works with fresh herbs, spices, fruits, and even oak chips for rapid barrel "aging." The speed allows for fresh, vibrant flavors impossible with long macerations.`,
    difficulty: 'master',
    category: 'aroma',
    wowFactor: 8,
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80',
    video: null,
    ingredients: ['Spirit', 'Fresh aromatics', 'Ice bath'],
    equipmentNeeded: ['Ultrasonic homogenizer', 'Ice bath', 'Sealed containers'],
    steps: [
      'Combine spirit and aromatics in container',
      'Place in ice bath (prevents heat buildup)',
      'Insert ultrasonic probe below surface',
      'Process for 1-5 minutes depending on intensity desired',
      'Strain and taste',
    ],
    proTips: [
      'Keep cold to prevent cooking',
      'Short bursts work better than continuous',
      'Fresh herbs need only 30 seconds',
    ],
    perfectFor: ['Fast Service', 'Fresh Infusions', 'Research'],
    funFact: 'Ultrasonic waves can age whiskey in minutes rather than years!',
    popularDrinks: ['Instant Aged Cocktails', 'Flash Herb Spirits', 'Rapid Bitters'],
    unlocked: true,
  },
];

// Helper functions
export const getTechniquesByDifficulty = (difficulty) => {
  if (difficulty === 'all') return MOLECULAR_TECHNIQUES;
  return MOLECULAR_TECHNIQUES.filter(t => t.difficulty === difficulty);
};

export const getTechniquesByCategory = (category) => {
  if (category === 'all') return MOLECULAR_TECHNIQUES;
  return MOLECULAR_TECHNIQUES.filter(t => t.category === category);
};

export const getTechniqueById = (id) => {
  return MOLECULAR_TECHNIQUES.find(t => t.id === id);
};

export const calculateTotalPoints = () => {
  return MOLECULAR_TECHNIQUES.reduce((sum, t) => {
    return sum + DIFFICULTY_LEVELS[t.difficulty].points;
  }, 0);
};

export const getUnlockedTechniques = () => {
  return MOLECULAR_TECHNIQUES.filter(t => t.unlocked);
};
