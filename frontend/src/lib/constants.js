// Brand Constants
export const BRAND = {
  name: 'HQ.D',
  fullName: 'Headquarters of Drinks',
  tagline: 'We Take Drinks Seriously',
  logo: 'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/iytlm6tl_HQD%20Tranparent%20Logo.png',
  whatsapp: '919540343437',
  email: 'Rupesh@Headquartersofdrinks.co.in',
};

// Video URLs
export const VIDEOS = [
  'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/5if3jo8e_6ed5da08-8e47-4c62-95e1-594fc854688c.mp4',
  'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/91amfrgt_c839badf-d007-42a6-ad69-487b21abdaa8.mp4',
  'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/9lwf5b60_652a3209-9aa4-4751-8442-eaa11e571476.mp4',
  'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/jbuu83v8_97efb419-8fda-4ece-b870-1fbb600cb81c.mp4',
  'https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/ju2ki38n_6abda637-ea97-4d01-8861-eb67f7787ef2.mp4',
  'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/sxjx1bn5_4ade1c00-35cc-48ec-b2ed-e163a81f64b2.mp4',
  'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/y6jsolbp_4fdc671c-f0f3-4fc6-a299-1e0f4d7f2214.mp4',
  'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/lc23goik_09cf3eba-bd3e-464e-b2cc-c9a42bc52beb.mp4',
  'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/x5ka5w30_6036e393-ae82-4f5e-b035-6f9d0fd2320c.mp4',
  'https://customer-assets.emergentagent.com/job_ff2df9ce-7c56-472c-a16a-bca56f6db073/artifacts/mjqm8fkw_31058b77-48f6-4d3f-b9fe-38a0654fc046.mp4',
];

// Navigation Items
export const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Bar Setups', href: '/bar-setups' },
  { label: 'Molecular Mixology', href: '/molecular' },
  { label: 'Menus', href: '/menus' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Packages', href: '/packages' },
  { label: 'About', href: '/about' },
];

// WhatsApp Message
export const getWhatsAppLink = (message = '') => {
  const encodedMsg = encodeURIComponent(message || 'Hi! I\'m interested in HQ.D bar services for my event.');
  return `https://wa.me/${BRAND.whatsapp}?text=${encodedMsg}`;
};

// Event Types
export const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Private Party',
  'Engagement/Roka',
  'Sangeet',
  'Mehendi',
  'Cocktail Night',
  'Reception',
  'After-Party',
  'Pool Party',
  'Birthday',
  'Other',
];

// Bar Types
export const BAR_TYPES = [
  { value: 'both', label: 'Both Cocktail & Mocktail' },
  { value: 'cocktail', label: 'Cocktail Only' },
  { value: 'mocktail', label: 'Mocktail Only' },
];

// Guest Ranges
export const GUEST_RANGES = [
  'Up to 50',
  '50-100',
  '100-200',
  '200-300',
  '300-500',
  '500+',
];

// Duration Options
export const DURATION_OPTIONS = [
  '2-3 hours',
  '4-5 hours',
  '6-8 hours',
  'Full day',
  'Multiple days',
];

// Budget Ranges
export const BUDGET_RANGES = [
  'Under ₹1 Lakh',
  '₹1-3 Lakhs',
  '₹3-5 Lakhs',
  '₹5-10 Lakhs',
  '₹10 Lakhs+',
  'Flexible',
];

// Occasion Filters
export const OCCASIONS = [
  'All',
  'Mehendi',
  'Haldi',
  'Sangeet',
  'Cocktail Night',
  'Reception',
  'Engagement',
  'After-Party',
  'Pool Party',
  'Brunch',
  'Corporate',
];

// Style Filters
export const STYLES = [
  'All',
  'Minimal Luxe',
  'Royal',
  'Tropical',
  'Bollywood',
  'Modern Monochrome',
];

// Flavor Profiles
export const FLAVOR_PROFILES = [
  'citrus',
  'floral',
  'fruity',
  'sweet',
  'spicy',
  'smoky',
  'herbal',
  'creamy',
];

// Spirit Bases
export const SPIRIT_BASES = [
  'Gin',
  'Vodka',
  'Rum',
  'Whiskey',
  'Tequila',
  'Champagne',
  'None (Mocktail)',
];

// Molecular Techniques
export const MOLECULAR_TECHNIQUES = [
  'Smoke Bubble',
  'Aromatic Mist',
  'Champagne Foam',
  'Rose Foam',
  'Foam Art',
];
