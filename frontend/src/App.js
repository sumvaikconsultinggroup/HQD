import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress, GrainOverlay, CustomCursor } from "@/components/animations";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import BarSetups from "@/pages/BarSetups";
import BarSetupDetail from "@/pages/BarSetupDetail";
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-noir">
      <ScrollProgress />
      <CustomCursor />
      <GrainOverlay opacity={0.025} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
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
  );
}

export default App;
