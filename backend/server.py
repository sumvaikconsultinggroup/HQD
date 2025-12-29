from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'hqd_drinks')]

# Email configuration (placeholder mode)
EMAIL_ENABLED = os.environ.get('EMAIL_ENABLED', 'false').lower() == 'true'
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
EMAIL_TO = os.environ.get('EMAIL_TO', 'Rupesh@Headquartersofdrinks.co.in')
EMAIL_FROM = os.environ.get('EMAIL_FROM', 'onboarding@resend.dev')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="HQ.D API", description="Headquarters of Drinks - Luxury Bar Services")
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: Optional[str] = None
    city: Optional[str] = None
    venue: Optional[str] = None
    guest_count: Optional[str] = None
    duration: Optional[str] = None
    bar_type: str = "both"  # cocktail, mocktail, both
    theme: Optional[str] = None
    budget_range: Optional[str] = None
    message: Optional[str] = None
    setup_interest: Optional[str] = None  # For "Get this setup" CTA
    source: str = "website"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    event_type: str
    event_date: Optional[str] = None
    city: Optional[str] = None
    venue: Optional[str] = None
    guest_count: Optional[str] = None
    duration: Optional[str] = None
    bar_type: str = "both"
    theme: Optional[str] = None
    budget_range: Optional[str] = None
    message: Optional[str] = None
    setup_interest: Optional[str] = None

class BarSetup(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    slug: str
    description: str
    best_for: str
    guest_range: str
    occasion: List[str]
    style: str
    format: str
    menu_highlights: List[str]
    molecular_tag: Optional[str] = None
    image_url: str
    video_url: Optional[str] = None
    featured: bool = False

class Drink(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    type: str  # cocktail, mocktail
    flavor_profile: List[str]
    spirit_base: Optional[str] = None
    description: str
    ingredients: List[str]
    garnish: str
    molecular: bool = False
    molecular_technique: Optional[str] = None
    image_url: Optional[str] = None
    signature: bool = False

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    event_type: str
    event_date: Optional[str] = None
    location: Optional[str] = None
    quote: str
    rating: int = 5
    image_url: Optional[str] = None
    featured: bool = False

class GalleryItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    category: str  # wedding, corporate, private
    image_url: str
    video_url: Optional[str] = None
    event_name: Optional[str] = None
    location: Optional[str] = None
    featured: bool = False

class Package(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    tier: str  # good, better, best, ultra
    tagline: str
    description: str
    inclusions: List[str]
    best_for: str
    highlight: Optional[str] = None

class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    question: str
    answer: str
    category: str  # booking, service, logistics
    order: int = 0

# ============ EMAIL SERVICE (Placeholder) ============

async def send_lead_email(lead: Lead):
    """Send email notification for new lead (placeholder mode)"""
    if not EMAIL_ENABLED or not RESEND_API_KEY:
        logger.info(f"Email disabled - Lead saved: {lead.name} ({lead.email})")
        return {"status": "skipped", "message": "Email disabled"}
    
    try:
        import resend
        resend.api_key = RESEND_API_KEY
        
        html_content = f"""
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0A; color: #FAF8F5; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; font-size: 24px; margin: 0;">HQ.D | New Event Inquiry</h1>
            </div>
            <div style="border-top: 1px solid #D4AF37; padding-top: 20px;">
                <h2 style="color: #D4AF37; font-size: 18px;">Contact Details</h2>
                <p><strong>Name:</strong> {lead.name}</p>
                <p><strong>Email:</strong> {lead.email}</p>
                <p><strong>Phone:</strong> {lead.phone}</p>
            </div>
            <div style="border-top: 1px solid rgba(212,175,55,0.3); padding-top: 20px; margin-top: 20px;">
                <h2 style="color: #D4AF37; font-size: 18px;">Event Details</h2>
                <p><strong>Event Type:</strong> {lead.event_type}</p>
                <p><strong>Date:</strong> {lead.event_date or 'Not specified'}</p>
                <p><strong>City/Venue:</strong> {lead.city or ''} {lead.venue or ''}</p>
                <p><strong>Guests:</strong> {lead.guest_count or 'Not specified'}</p>
                <p><strong>Duration:</strong> {lead.duration or 'Not specified'}</p>
                <p><strong>Bar Type:</strong> {lead.bar_type}</p>
                <p><strong>Theme:</strong> {lead.theme or 'Not specified'}</p>
                <p><strong>Budget Range:</strong> {lead.budget_range or 'Not specified'}</p>
            </div>
            {f'<div style="border-top: 1px solid rgba(212,175,55,0.3); padding-top: 20px; margin-top: 20px;"><h2 style="color: #D4AF37; font-size: 18px;">Setup Interest</h2><p>{lead.setup_interest}</p></div>' if lead.setup_interest else ''}
            {f'<div style="border-top: 1px solid rgba(212,175,55,0.3); padding-top: 20px; margin-top: 20px;"><h2 style="color: #D4AF37; font-size: 18px;">Message</h2><p>{lead.message}</p></div>' if lead.message else ''}
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #D4AF37;">
                <p style="color: #D4AF37; font-size: 12px;">Headquarters of Drinks | We Take Drinks Seriously</p>
            </div>
        </div>
        """
        
        email = await asyncio.to_thread(
            resend.Emails.send,
            {
                "from": EMAIL_FROM,
                "to": [EMAIL_TO],
                "subject": f"HQ.D | New {lead.event_type} Inquiry from {lead.name}",
                "html": html_content
            }
        )
        logger.info(f"Email sent successfully: {email.get('id')}")
        return {"status": "success", "email_id": email.get('id')}
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return {"status": "error", "message": str(e)}

# ============ API ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "HQ.D API - Headquarters of Drinks", "status": "operational"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "email_enabled": EMAIL_ENABLED,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Leads
@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate, background_tasks: BackgroundTasks):
    lead_obj = Lead(**input.model_dump())
    doc = lead_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.leads.insert_one(doc)
    background_tasks.add_task(send_lead_email, lead_obj)
    
    return lead_obj

@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads

# Bar Setups
@api_router.get("/setups", response_model=List[BarSetup])
async def get_setups(occasion: Optional[str] = None, style: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if occasion:
        query["occasion"] = {"$in": [occasion]}
    if style:
        query["style"] = style
    if featured is not None:
        query["featured"] = featured
    
    setups = await db.setups.find(query, {"_id": 0}).to_list(50)
    if not setups:
        return get_default_setups()
    return setups

@api_router.get("/setups/{slug}", response_model=BarSetup)
async def get_setup_by_slug(slug: str):
    setup = await db.setups.find_one({"slug": slug}, {"_id": 0})
    if not setup:
        default_setups = get_default_setups()
        for s in default_setups:
            if s["slug"] == slug:
                return s
        raise HTTPException(status_code=404, detail="Setup not found")
    return setup

# Drinks/Menus
@api_router.get("/menus", response_model=List[Drink])
async def get_menus(type: Optional[str] = None, flavor: Optional[str] = None, molecular: Optional[bool] = None):
    query = {}
    if type:
        query["type"] = type
    if flavor:
        query["flavor_profile"] = {"$in": [flavor]}
    if molecular is not None:
        query["molecular"] = molecular
    
    drinks = await db.menus.find(query, {"_id": 0}).to_list(100)
    if not drinks:
        return get_default_drinks()
    return drinks

# Testimonials
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials(featured: Optional[bool] = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    
    testimonials = await db.testimonials.find(query, {"_id": 0}).to_list(50)
    if not testimonials:
        return get_default_testimonials()
    return testimonials

# Gallery
@api_router.get("/gallery", response_model=List[GalleryItem])
async def get_gallery(category: Optional[str] = None, featured: Optional[bool] = None):
    query = {}
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    
    items = await db.gallery.find(query, {"_id": 0}).to_list(100)
    if not items:
        return get_default_gallery()
    return items

# Packages
@api_router.get("/packages", response_model=List[Package])
async def get_packages():
    packages = await db.packages.find({}, {"_id": 0}).to_list(10)
    if not packages:
        return get_default_packages()
    return packages

# FAQs
@api_router.get("/faqs", response_model=List[FAQ])
async def get_faqs(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    faqs = await db.faqs.find(query, {"_id": 0}).sort("order", 1).to_list(50)
    if not faqs:
        return get_default_faqs()
    return faqs

# ============ DEFAULT DATA ============

def get_default_setups():
    return [
        {"id": "1", "title": "Mehendi Soirée", "slug": "mehendi-soiree", "description": "Vibrant bar setup with colorful cocktails and traditional aesthetics. Perfect for your mehendi celebration with folk-inspired decor.", "best_for": "150-250 guests", "guest_range": "150-250", "occasion": ["mehendi", "haldi"], "style": "Royal", "format": "Both", "menu_highlights": ["Kufri", "Mango Tango", "Rose Lassi Mocktail"], "molecular_tag": "Aromatic Mists", "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600", "video_url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/5if3jo8e_6ed5da08-8e47-4c62-95e1-594fc854688c.mp4", "featured": True},
        {"id": "2", "title": "Sangeet Spectacular", "slug": "sangeet-spectacular", "description": "High-energy bar with LED accents and signature cocktails. Dance the night away with premium drinks and dramatic presentations.", "best_for": "200-400 guests", "guest_range": "200-400", "occasion": ["sangeet", "cocktail-night"], "style": "Bollywood", "format": "Both", "menu_highlights": ["Bollywood Blast", "Disco Daiquiri", "Starlight Spritz"], "molecular_tag": "Smoke Bubbles", "image_url": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600", "video_url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/91amfrgt_c839badf-d007-42a6-ad69-487b21abdaa8.mp4", "featured": True},
        {"id": "3", "title": "Reception Royale", "slug": "reception-royale", "description": "Elegant champagne-tower bar with gold accents. The perfect finale for your wedding with signature couple cocktails.", "best_for": "300-500 guests", "guest_range": "300-500", "occasion": ["reception", "engagement"], "style": "Minimal Luxe", "format": "Both", "menu_highlights": ["Forever New", "His & Hers", "Golden Toast"], "molecular_tag": "Champagne Foam", "image_url": "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600", "video_url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/9lwf5b60_652a3209-9aa4-4751-8442-eaa11e571476.mp4", "featured": True},
        {"id": "4", "title": "Cocktail Night Noir", "slug": "cocktail-night-noir", "description": "Moody, sophisticated setup with dark aesthetics and premium spirits. For the discerning couple who loves drama.", "best_for": "100-200 guests", "guest_range": "100-200", "occasion": ["cocktail-night", "after-party"], "style": "Modern Monochrome", "format": "Cocktail", "menu_highlights": ["Midnight Noir", "Velvet Kiss", "Smoky Old Fashioned"], "molecular_tag": "Smoke Bubbles", "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600", "video_url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/jbuu83v8_97efb419-8fda-4ece-b870-1fbb600cb81c.mp4", "featured": True},
        {"id": "5", "title": "Pool Party Paradise", "slug": "pool-party-paradise", "description": "Tropical vibes with refreshing cocktails and mocktails. Waterside bar setup with island-inspired drinks.", "best_for": "50-150 guests", "guest_range": "50-150", "occasion": ["pool-party", "brunch"], "style": "Tropical", "format": "Both", "menu_highlights": ["Tropical Thunder", "Coconut Cloud", "Blue Lagoon"], "molecular_tag": "Aromatic Mists", "image_url": "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=600", "featured": False},
        {"id": "6", "title": "Corporate Excellence", "slug": "corporate-excellence", "description": "Professional setup with brandable elements and high-volume service. Impress your clients with sophisticated beverages.", "best_for": "100-500 guests", "guest_range": "100-500", "occasion": ["corporate"], "style": "Minimal Luxe", "format": "Both", "menu_highlights": ["Executive Espresso Martini", "The Boardroom", "Sparkling Success"], "molecular_tag": "Foam Art", "image_url": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=600", "video_url": "https://customer-assets.emergentagent.com/job_ac6c9480-7211-41d1-abd8-0c6fb67adb33/artifacts/ju2ki38n_6abda637-ea97-4d01-8861-eb67f7787ef2.mp4", "featured": True},
        {"id": "7", "title": "After-Party Lounge", "slug": "after-party-lounge", "description": "Intimate setup for the inner circle. Late-night vibes with premium shots and signature cocktails.", "best_for": "30-80 guests", "guest_range": "30-80", "occasion": ["after-party"], "style": "Modern Monochrome", "format": "Cocktail", "menu_highlights": ["Night Owl", "Last Dance", "Shooter Selection"], "molecular_tag": "Smoke Bubbles", "image_url": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600", "featured": False},
        {"id": "8", "title": "Garden Elegance", "slug": "garden-elegance", "description": "Rustic-chic outdoor setup with floral accents. Perfect for garden ceremonies and daytime events.", "best_for": "100-300 guests", "guest_range": "100-300", "occasion": ["engagement", "reception"], "style": "Royal", "format": "Both", "menu_highlights": ["Garden Spritz", "Lavender Dreams", "Rosemary Gin Fizz"], "molecular_tag": "Aromatic Mists", "image_url": "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600", "featured": False}
    ]

def get_default_drinks():
    return [
        {"id": "1", "name": "Kufri", "type": "cocktail", "flavor_profile": ["citrus", "herbal"], "spirit_base": "Gin", "description": "A refreshing Himalayan-inspired cocktail with botanicals and a hint of mountain mist. Our signature house creation.", "ingredients": ["Premium Gin", "Fresh Lime", "Elderflower", "Himalayan Herbs", "Tonic"], "garnish": "Dehydrated lime wheel & rosemary sprig", "molecular": True, "molecular_technique": "Aromatic Mist", "signature": True, "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400"},
        {"id": "2", "name": "Forever New", "type": "cocktail", "flavor_profile": ["floral", "sweet"], "spirit_base": "Champagne", "description": "A romantic champagne cocktail for the couple. Rose petals meet bubbles in this ethereal creation.", "ingredients": ["Champagne", "Rose Syrup", "Elderflower Liqueur", "Fresh Strawberry"], "garnish": "Edible rose petals & gold dust", "molecular": True, "molecular_technique": "Champagne Foam", "signature": True, "image_url": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400"},
        {"id": "3", "name": "Midnight Noir", "type": "cocktail", "flavor_profile": ["smoky", "spicy"], "spirit_base": "Whiskey", "description": "Dark, mysterious, and unforgettable. A smoky whiskey creation with activated charcoal and spice.", "ingredients": ["Bourbon", "Activated Charcoal", "Maple Syrup", "Angostura Bitters", "Orange Zest"], "garnish": "Flamed orange peel", "molecular": True, "molecular_technique": "Smoke Bubble", "signature": True, "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400"},
        {"id": "4", "name": "Mango Tango", "type": "mocktail", "flavor_profile": ["fruity", "sweet"], "spirit_base": None, "description": "A tropical dance of Alphonso mango and passion fruit. Refreshingly festive.", "ingredients": ["Alphonso Mango Puree", "Passion Fruit", "Lime Juice", "Coconut Water", "Mint"], "garnish": "Mango slice & mint bouquet", "molecular": False, "signature": False, "image_url": "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400"},
        {"id": "5", "name": "Rose Lassi Cloud", "type": "mocktail", "flavor_profile": ["floral", "creamy"], "spirit_base": None, "description": "Traditional lassi meets modern presentation. Creamy, rose-infused, topped with a cloud of foam.", "ingredients": ["Fresh Yogurt", "Rose Water", "Cardamom", "Saffron", "Honey"], "garnish": "Dried rose petals & pistachio", "molecular": True, "molecular_technique": "Rose Foam", "signature": True, "image_url": "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400"},
        {"id": "6", "name": "Velvet Kiss", "type": "cocktail", "flavor_profile": ["fruity", "sweet"], "spirit_base": "Vodka", "description": "Smooth as velvet, sweet as a kiss. Berry-infused vodka with a silky finish.", "ingredients": ["Premium Vodka", "Mixed Berries", "Vanilla", "Lemon", "Simple Syrup"], "garnish": "Fresh berries on a pick", "molecular": False, "signature": False, "image_url": "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=400"},
        {"id": "7", "name": "Bollywood Blast", "type": "cocktail", "flavor_profile": ["spicy", "citrus"], "spirit_base": "Rum", "description": "Vibrant and bold like a Bollywood dance number. Spiced rum with a citrus kick.", "ingredients": ["Spiced Rum", "Pineapple", "Jalapeño", "Lime", "Ginger Beer"], "garnish": "Pineapple leaf & chili", "molecular": True, "molecular_technique": "Smoke Bubble", "signature": False, "image_url": "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400"},
        {"id": "8", "name": "Golden Toast", "type": "cocktail", "flavor_profile": ["sweet", "citrus"], "spirit_base": "Champagne", "description": "Raise a glass to forever. Champagne meets gold in this celebratory creation.", "ingredients": ["Champagne", "Grand Marnier", "Honey", "Edible Gold Flakes"], "garnish": "Sugar rim & gold flakes", "molecular": False, "signature": True, "image_url": "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=400"}
    ]

def get_default_testimonials():
    return [
        {"id": "1", "name": "Priya & Rahul Sharma", "event_type": "Wedding", "event_date": "December 2024", "location": "Delhi", "quote": "HQ.D transformed our wedding into a cinematic experience. The molecular cocktails had our guests mesmerized, and the bar setup was absolutely stunning. Every detail was perfect.", "rating": 5, "featured": True},
        {"id": "2", "name": "Ananya Mehta", "event_type": "Corporate Event", "event_date": "November 2024", "location": "Mumbai", "quote": "We hired HQ.D for our product launch and they exceeded all expectations. Professional, creative, and the branded cocktails were a huge hit with our clients.", "rating": 5, "featured": True},
        {"id": "3", "name": "Vikram & Neha Kapoor", "event_type": "Wedding", "event_date": "October 2024", "location": "Jaipur", "quote": "The smoke bubble cocktails were the talk of our sangeet! HQ.D's team was incredibly professional and managed our 400-guest event flawlessly.", "rating": 5, "featured": True},
        {"id": "4", "name": "Rohan Gupta", "event_type": "Private Party", "event_date": "September 2024", "location": "Gurgaon", "quote": "Hired HQ.D for my 30th birthday bash. The after-party bar setup was intimate yet luxurious. Best decision ever!", "rating": 5, "featured": False},
        {"id": "5", "name": "Simran & Arjun Malhotra", "event_type": "Wedding", "event_date": "January 2025", "location": "Udaipur", "quote": "From mehendi to reception, HQ.D was with us for all 4 functions. Each setup was unique and the signature 'Forever New' cocktail they created for us was magical.", "rating": 5, "featured": True}
    ]

def get_default_gallery():
    return [
        {"id": "1", "title": "Royal Reception Setup", "category": "wedding", "image_url": "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=800", "event_name": "Sharma Wedding", "location": "The Leela Palace, Delhi", "featured": True},
        {"id": "2", "title": "Sangeet Night Bar", "category": "wedding", "image_url": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800", "event_name": "Kapoor Sangeet", "location": "Taj Falaknuma, Hyderabad", "featured": True},
        {"id": "3", "title": "Corporate Launch Event", "category": "corporate", "image_url": "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800", "event_name": "Tech Summit 2024", "location": "Four Seasons, Mumbai", "featured": True},
        {"id": "4", "title": "Molecular Mixology Display", "category": "wedding", "image_url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800", "event_name": "Mehta Reception", "location": "ITC Grand Bharat", "featured": True},
        {"id": "5", "title": "Poolside Cocktail Bar", "category": "private", "image_url": "https://images.unsplash.com/photo-1560963689-b5682b6440f8?w=800", "event_name": "Private Villa Party", "location": "Goa", "featured": False},
        {"id": "6", "title": "Noir Cocktail Evening", "category": "private", "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800", "event_name": "Birthday Celebration", "location": "Private Residence, Delhi", "featured": False},
        {"id": "7", "title": "Garden Wedding Bar", "category": "wedding", "image_url": "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800", "event_name": "Singh Wedding", "location": "Raas Jodhpur", "featured": True},
        {"id": "8", "title": "Brand Activation Setup", "category": "corporate", "image_url": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800", "event_name": "Luxury Brand Launch", "location": "Ritz Carlton, Bangalore", "featured": False}
    ]

def get_default_packages():
    return [
        {"id": "1", "name": "Essential", "tier": "good", "tagline": "Perfect start for intimate gatherings", "description": "Our foundational package for smaller events. Premium service with curated selections.", "inclusions": ["Professional bartenders (2)", "Standard bar setup", "Curated menu of 8 drinks", "Premium glassware", "4-hour service", "Basic garnish station"], "best_for": "Intimate gatherings, small parties (up to 100 guests)", "highlight": None},
        {"id": "2", "name": "Signature", "tier": "better", "tagline": "Elevated experience for memorable events", "description": "Our most popular package. Enhanced bar presence with signature drinks and molecular elements.", "inclusions": ["Professional bartenders (3-4)", "Customized bar setup", "Expanded menu of 12 drinks", "2 signature cocktails", "Basic molecular elements", "Premium glassware", "6-hour service", "Full garnish station"], "best_for": "Medium events, engagement parties (100-250 guests)", "highlight": "Most Popular"},
        {"id": "3", "name": "Luxe", "tier": "best", "tagline": "Luxury experience for grand celebrations", "description": "Comprehensive bar experience with full molecular mixology and premium selections.", "inclusions": ["Professional bartenders (4-6)", "Premium designer bar setup", "Complete menu of 16+ drinks", "4 signature cocktails", "Full molecular mixology", "Crystal glassware", "8-hour service", "Champagne tower", "Dedicated bar manager"], "best_for": "Large weddings, corporate galas (250-400 guests)", "highlight": "Best Value"},
        {"id": "4", "name": "Ultra", "tier": "ultra", "tagline": "The ultimate bespoke experience", "description": "Completely customized luxury bar experience. White-glove service for the most discerning clients.", "inclusions": ["Unlimited professional bartenders", "Bespoke bar design & fabrication", "Unlimited custom menu", "Personal mixologist consultation", "Complete molecular arsenal", "Premium crystal & gold glassware", "Unlimited service hours", "Multiple bar stations", "VIP lounge setup", "Dedicated event coordinator"], "best_for": "Destination weddings, ultra-luxury events (400+ guests)", "highlight": "Ultimate Luxury"}
    ]

def get_default_faqs():
    return [
        {"id": "1", "question": "Do you provide food or only bars?", "answer": "We specialize exclusively in bar services - cocktails and mocktails only. We do not provide food or catering services. However, we work seamlessly with caterers and event planners to ensure perfect coordination.", "category": "service", "order": 1},
        {"id": "2", "question": "Do you offer mocktail-only packages?", "answer": "Absolutely! We have extensive mocktail menus and can create fully non-alcoholic bar experiences. Our molecular mixology techniques work beautifully with mocktails too.", "category": "service", "order": 2},
        {"id": "3", "question": "What is molecular mixology?", "answer": "Molecular mixology uses scientific techniques to create unique drink experiences - think smoke bubbles that release aromas, foams, caviar-like spheres, and aromatic mists. It's about creating memorable moments, not just drinks.", "category": "service", "order": 3},
        {"id": "4", "question": "How far in advance should we book?", "answer": "We recommend booking 3-6 months in advance for weddings and large events. For smaller private parties, 4-6 weeks notice is usually sufficient. Peak wedding season (October-February) books up quickly.", "category": "booking", "order": 4},
        {"id": "5", "question": "Do you travel outside Delhi NCR?", "answer": "Yes! We service events across India and have experience with destination weddings in Udaipur, Jaipur, Goa, Kerala, and more. Travel and accommodation costs apply for outstation events.", "category": "logistics", "order": 5},
        {"id": "6", "question": "Can we customize the menu?", "answer": "Absolutely! Menu customization is at the heart of what we do. We can create signature 'couple cocktails' for weddings, branded drinks for corporate events, and tailor menus to your theme and preferences.", "category": "service", "order": 6},
        {"id": "7", "question": "What about alcohol procurement?", "answer": "We can either work with alcohol you provide, or assist with procurement recommendations. Final procurement and permits are the client's responsibility, but we guide you through the process.", "category": "logistics", "order": 7},
        {"id": "8", "question": "How does pricing work?", "answer": "Every event is unique, so we provide custom quotes based on guest count, duration, setup requirements, menu complexity, and location. Contact us for a personalized quote - there's no obligation.", "category": "booking", "order": 8}
    ]

# Include router and middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
