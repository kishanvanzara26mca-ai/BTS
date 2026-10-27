import React from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  MessageCircle, 
  Instagram, 
  Mail, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { CATEGORIES } from '../data/products.ts';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlistCount,
    cartSubtotal,
    openCart,
    openWishlist,
    openAbout,
    openContact,
    openPolicy,
    openOwnerGuide,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useShop();

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Compact Announcement Strip - Genuine verified info */}
      <div className="bg-[#FAF5FF] border-b border-pink-100/80 text-xs py-1.5 px-3 sm:px-4 text-slate-700">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9F2089] shrink-0" />
            <span className="truncate text-[11px] sm:text-xs font-medium text-slate-700">
              <span className="font-bold text-[#9F2089]">Black Tecno Shop:</span> Fast All-India Delivery · WhatsApp Orders Confirmed Directly
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-slate-600 text-xs">
            <a
              href={STORE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#25D366] font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{STORE_CONFIG.whatsappDisplayNumber}</span>
            </a>
            <span className="text-slate-300">|</span>
            <a
              href={STORE_CONFIG.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-700 hover:text-[#9F2089] font-medium transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
              <span>{STORE_CONFIG.instagramUsername}</span>
            </a>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => openPolicy('shipping')}
              className="text-slate-600 hover:text-[#9F2089] transition-colors"
            >
              Free delivery over ₹{STORE_CONFIG.freeShippingThreshold}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Meesho-Style Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3 md:gap-8">
            
            {/* Zone 1: Brand & Hamburger Menu */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-1.5 -ml-1 text-slate-700 hover:text-[#9F2089] hover:bg-slate-100 rounded-lg focus:outline-none transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <a href="#" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xs group-hover:bg-[#9F2089] transition-colors">
                  <span className="text-sm font-black tracking-tight text-white">BT</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 leading-tight group-hover:text-[#9F2089] transition-colors">
                    Black Tecno Shop
                  </span>
                  <span className="text-[10px] tracking-wider text-slate-500 font-semibold uppercase hidden sm:block">
                    {STORE_CONFIG.tagline}
                  </span>
                </div>
              </a>
            </div>

            {/* Zone 2: Desktop Prominent Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:block">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#9F2089] focus:ring-2 focus:ring-[#9F2089]/15 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Zone 3: Actions (WhatsApp, Wishlist, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              
              {/* WhatsApp Ordering Direct Button */}
              <a
                href={STORE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/80 rounded-xl transition-colors shadow-2xs"
                title="Chat directly with Black Tecno Shop on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp Order</span>
              </a>

              {/* Wishlist Button */}
              <button
                onClick={openWishlist}
                className="relative p-2 text-slate-700 hover:text-[#9F2089] hover:bg-pink-50 rounded-xl transition-colors flex flex-col items-center"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#9F2089] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none shadow-xs">
                    {wishlistCount}
                  </span>
                )}
                <span className="text-[10px] font-semibold text-slate-600 hidden sm:block mt-0.5">
                  Wishlist
                </span>
              </button>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative p-2 text-slate-700 hover:text-[#9F2089] hover:bg-pink-50 rounded-xl transition-colors flex flex-col items-center"
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5 text-slate-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#9F2089] text-white text-[10px] font-black rounded-full flex items-center justify-center leading-none shadow-xs">
                    {cartCount}
                  </span>
                )}
                <span className="text-[10px] font-semibold text-slate-600 hidden sm:block mt-0.5">
                  Cart
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Permanently available and prominent like Meesho app */}
          <div className="md:hidden mt-2.5 pt-1 border-t border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#9F2089] focus:bg-white focus:ring-2 focus:ring-[#9F2089]/15 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation Strip */}
        <div className="hidden md:block border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 text-xs">
              <button
                onClick={() => handleCategorySelect('all')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all ${
                  selectedCategory === 'all'
                    ? 'text-[#9F2089] bg-pink-50 border-b-2 border-[#9F2089]'
                    : 'text-slate-700 hover:text-[#9F2089] hover:bg-slate-50'
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.id || selectedCategory.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                      isActive
                        ? 'text-[#9F2089] bg-pink-50 border-b-2 border-[#9F2089] font-bold'
                        : 'text-slate-600 hover:text-[#9F2089] hover:bg-slate-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 3. Mobile Navigation Drawer (Clean Meesho-inspired light theme) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white border-r border-slate-200 h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-pink-50 to-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <span className="text-xs font-black text-white">BT</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Black Tecno Shop</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Shop Smart. Order Easy.</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              
              {/* WhatsApp Quick Order CTA Card */}
              <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                  <span>WhatsApp Shopping Store</span>
                </div>
                <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                  Browse products, choose variants, and send orders directly to +919712363773.
                </p>
                <a
                  href={STORE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 px-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors shadow-xs"
                >
                  Message on WhatsApp
                </a>
              </div>

              {/* Categories */}
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  Product Categories
                </span>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      handleCategorySelect('all');
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 text-xs rounded-xl text-left transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-pink-50 text-[#9F2089] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Products</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategorySelect(cat.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 text-xs rounded-xl text-left transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-pink-50 text-[#9F2089] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Store Information */}
              <div className="border-t border-slate-100 pt-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                  Store & Information
                </span>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAbout();
                    }}
                    className="w-full text-left p-2.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    About Black Tecno Shop
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openContact();
                    }}
                    className="w-full text-left p-2.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Contact Us & Customer Support
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openPolicy('shipping');
                    }}
                    className="w-full text-left p-2.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Shipping & Delivery Policy
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openPolicy('returns');
                    }}
                    className="w-full text-left p-2.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                  >
                    Return, Exchange & Cancellation
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openOwnerGuide();
                    }}
                    className="w-full text-left p-2.5 text-[#9F2089] hover:bg-pink-50 rounded-lg font-bold"
                  >
                    Store Owner Guide (Add/Edit Products)
                  </button>
                </div>
              </div>

              {/* Official Social Links */}
              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                <a
                  href={STORE_CONFIG.instagramProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:text-slate-900 hover:bg-pink-50/50"
                >
                  <Instagram className="w-4 h-4 text-[#E1306C]" />
                  <span>Instagram: {STORE_CONFIG.instagramUsername}</span>
                </a>
                <a
                  href={STORE_CONFIG.emailLink}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:text-slate-900 hover:bg-slate-50"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="truncate">{STORE_CONFIG.businessEmail}</span>
                </a>
                <a
                  href={`tel:${STORE_CONFIG.whatsappNumber}`}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:text-slate-900 hover:bg-slate-50"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Call: {STORE_CONFIG.whatsappDisplayNumber}</span>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 text-[11px] text-slate-500 bg-slate-50">
              Black Tecno Shop · Meesho-Inspired Catalog
            </div>
          </div>
        </div>
      )}
    </>
  );
};
