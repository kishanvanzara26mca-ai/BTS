import React from 'react';
import { X, Heart, ShoppingBag, MessageCircle, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

export const WishlistDrawer: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    wishlistProducts, 
    toggleWishlist, 
    addToCart, 
    openOrderPanel 
  } = useShop();

  if (activeModal !== 'wishlist') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col z-10 shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
            <h3 className="text-base font-bold text-slate-900">Your Wishlist</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-50 text-[#9F2089] border border-pink-100">
              {wishlistProducts.length} items
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((product) => (
              <div 
                key={product.id}
                className="flex gap-3 p-3 bg-white border border-slate-200 rounded-2xl items-center shadow-2xs"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={product.images?.[0] || ''}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {product.category} · {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      ₹{product.sellingPrice.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-slate-400 line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toggleWishlist(product.id);
                    }}
                    className="p-1.5 bg-slate-100 hover:bg-pink-50 hover:text-[#9F2089] text-slate-700 rounded-lg text-xs border border-slate-200/60"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => openOrderPanel(product)}
                    className="p-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-bold shadow-2xs"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Your wishlist is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Save your favorite items here while browsing for quick ordering.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-[#9F2089] text-white font-bold text-xs rounded-xl hover:bg-[#851871] transition-colors shadow-2xs"
              >
                Explore Products
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
