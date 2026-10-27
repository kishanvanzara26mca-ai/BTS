import React from 'react';
import { ShopProvider } from './context/ShopContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { CategorySlider } from './components/CategorySlider.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { FeaturedCurations } from './components/FeaturedCurations.tsx';
import { ProductGrid } from './components/ProductGrid.tsx';
import { WhatsAppGuideSection } from './components/WhatsAppGuideSection.tsx';
import { WhyShopWithUs } from './components/WhyShopWithUs.tsx';
import { InstagramSection } from './components/InstagramSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { WishlistDrawer } from './components/WishlistDrawer.tsx';
import { PolicyModal } from './components/PolicyModal.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { OwnerGuideModal } from './components/OwnerGuideModal.tsx';
import { Toast } from './components/Toast.tsx';

function MainShopContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-slate-900 selection:bg-[#9F2089] selection:text-white pb-20 md:pb-0">
      {/* 1. Announcement Strip & Header with Prominent Search Bar */}
      <Navbar />

      {/* Main Content Sections in Meesho-Inspired Homepage Order */}
      <main className="flex-1">
        {/* 2. Horizontally Scrollable Product Categories */}
        <CategorySlider />

        {/* 3. Hero Banner with Shopping Call-to-Action */}
        <HeroSection />

        {/* 4. Curated Highlights: Popular, Trending, New Arrivals, Special Offers */}
        <FeaturedCurations />

        {/* 5. Products Grouped by Category & Full Filterable Catalog */}
        <ProductGrid />

        {/* 6. Why Shop With Us Trust Pillars */}
        <WhyShopWithUs />

        {/* 7. WhatsApp Ordering 3-Step Guide & Support */}
        <WhatsAppGuideSection />

        {/* 8. Instagram Promotional Section */}
        <InstagramSection />
      </main>

      {/* 9. Complete Footer with Policies and Contact Details */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation (Home, Categories, Order WA, Wishlist, Cart) */}
      <MobileBottomNav />

      {/* Interactive Modals and Drawers */}
      <WhatsAppOrderModal />
      <ProductDetailModal />
      <CartDrawer />
      <WishlistDrawer />
      <PolicyModal />
      <ContactModal />
      <AboutModal />
      <OwnerGuideModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainShopContent />
    </ShopProvider>
  );
}
