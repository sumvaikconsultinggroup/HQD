import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Layout Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { Toaster } from "@/components/ui/sonner";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import BarSetups from "@/pages/BarSetups";
import MolecularMixology from "@/pages/MolecularMixology";
import Menus from "@/pages/Menus";
import Packages from "@/pages/Packages";
import Gallery from "@/pages/Gallery";
import Reviews from "@/pages/Reviews";
import About from "@/pages/About";
import FAQs from "@/pages/FAQs";
import Contact from "@/pages/Contact";
import HashtagGenerator from "@/pages/tools/HashtagGenerator";
import DrinkGenerator from "@/pages/tools/DrinkGenerator";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[hsl(228_13%_4%)] text-[hsl(35_33%_97%)]">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>HQ.D | Luxury Bar Setups for Weddings & Events</title>
          <meta name="description" content="HQ.D - Headquarters of Drinks. Premium cocktail & mocktail bar setups for weddings, corporate events & private parties. Molecular mixology specialists." />
        </Helmet>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bar-setups" element={<BarSetups />} />
            <Route path="/molecular" element={<MolecularMixology />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
            <Route path="/tools/drink-generator" element={<DrinkGenerator />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
