import React from 'react';
import { Home, Grid, Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartCount, 
    wishlistCount, 
    openCart, 
    openWishlist, 
    setIsMobileMenuOpen,
    setSelectedCategory,
    closeModal 
  } = useShop();

  const handleHomeClick = () => {
    closeModal();
    setSelectedCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg safe-area-bottom">
      <div className="grid grid-cols-5 items-center justify-items-center">
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center p-1.5 text-slate-700 hover:text-[#9F2089] transition-colors focus:outline-none"
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Categories Drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-slate-700 hover:text-[#9F2089] transition-colors focus:outline-none"
          aria-label="Categories"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Categories</span>
        </button>

        {/* Direct WhatsApp Order Link */}
        <a
          href={STORE_CONFIG.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-1 text-emerald-600 transition-colors -mt-3.5 focus:outline-none"
          aria-label="WhatsApp Store"
        >
          <div className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md shadow-emerald-400/40 ring-4 ring-white">
            <MessageCircle className="w-6 h-6 fill-white" />
          </div>
          <span className="text-[9px] font-bold text-emerald-700 mt-0.5">Order WA</span>
        </a>

        {/* Wishlist */}
        <button
          onClick={openWishlist}
          className="relative flex flex-col items-center justify-center p-1.5 text-slate-700 hover:text-[#9F2089] transition-colors focus:outline-none"
          aria-label={`Wishlist (${wishlistCount} items)`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 right-1.5 min-w-[16px] h-4 px-1 bg-[#9F2089] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
          <span className="text-[10px] font-semibold mt-1">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center justify-center p-1.5 text-slate-700 hover:text-[#9F2089] transition-colors focus:outline-none"
          aria-label={`Cart (${cartCount} items)`}
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 right-1.5 min-w-[16px] h-4 px-1 bg-[#9F2089] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] font-semibold mt-1">Cart</span>
        </button>
      </div>
    </div>
  );
};
