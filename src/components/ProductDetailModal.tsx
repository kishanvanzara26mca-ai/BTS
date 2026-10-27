import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Share2, 
  Check, 
  ChevronRight,
  ZoomIn,
  Star
} from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { Product } from '../types.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { PRODUCTS } from '../data/products.ts';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeModal, 
    selectedProduct, 
    selectedVariant, 
    setSelectedVariant, 
    closeModal, 
    addToCart, 
    openOrderPanel,
    isInWishlist, 
    toggleWishlist,
    showToast,
    openProductDetail
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'shipping' | 'returns'>('specs');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (activeModal !== 'product-detail' || !selectedProduct) {
    return null;
  }

  const images = selectedProduct.images && selectedProduct.images.length > 0 
    ? selectedProduct.images 
    : [];

  const isFavorited = isInWishlist(selectedProduct.id);

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 3);

  // Validate variant selection before ordering
  const validateVariants = (): boolean => {
    if (selectedProduct.availableSizes && selectedProduct.availableSizes.length > 0 && !selectedVariant.size) {
      setValidationError('Please select a size to proceed.');
      return false;
    }
    if (selectedProduct.availableColors && selectedProduct.availableColors.length > 0 && !selectedVariant.color) {
      setValidationError('Please select a color to proceed.');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleAddToCart = () => {
    if (!validateVariants()) return;
    addToCart(selectedProduct, selectedVariant.quantity, selectedVariant.size, selectedVariant.color);
  };

  const handleBuyNow = () => {
    if (!validateVariants()) return;
    openOrderPanel(selectedProduct, selectedVariant.size, selectedVariant.color, selectedVariant.quantity);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProduct.name,
          text: `Check out ${selectedProduct.name} at Black Tecno Shop (₹${selectedProduct.sellingPrice.toLocaleString('en-IN')})`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Product link copied to clipboard!');
      } catch {
        showToast('Could not copy link.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[11px] font-mono font-bold text-[#9F2089] bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
              SKU: {selectedProduct.id}
            </span>
            <span className="text-xs text-slate-500 truncate font-medium">
              {selectedProduct.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Share product link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`p-2 rounded-lg hover:bg-slate-200/60 transition-colors ${
                isFavorited ? 'text-pink-600' : 'text-slate-500 hover:text-slate-900'
              }`}
              title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-pink-600 text-pink-600' : ''}`} />
            </button>
            <button
              onClick={closeModal}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="md:col-span-6 space-y-3">
              <div 
                className="relative aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden cursor-zoom-in"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                {images.length > 0 ? (
                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={selectedProduct.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 hover:scale-103'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No image available
                  </div>
                )}
                
                {/* Zoom indicator */}
                <span className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-white/90 shadow-xs text-slate-600 pointer-events-none">
                  <ZoomIn className="w-4 h-4" />
                </span>

                {/* Discount Badge */}
                {selectedProduct.discountPercent && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#9F2089] text-white text-xs font-black shadow-xs">
                    {selectedProduct.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails row */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 ${
                        activeImageIndex === idx ? 'border-[#9F2089] ring-2 ring-pink-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-4">
              
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {selectedProduct.name}
                </h2>
                
                {/* Rating & Availability */}
                <div className="flex items-center gap-2 mt-2">
                  {selectedProduct.rating && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-700 text-white text-xs font-black">
                      <span>{selectedProduct.rating}</span>
                      <Star className="w-3 h-3 fill-white" />
                    </div>
                  )}
                  {selectedProduct.reviewsCount && (
                    <span className="text-xs text-slate-500 font-medium">
                      ({selectedProduct.reviewsCount} Ratings)
                    </span>
                  )}
                  <span className="text-slate-300">·</span>
                  <span className={`text-xs font-bold ${selectedProduct.inStock ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {selectedProduct.stockCountText || (selectedProduct.inStock ? 'In Stock' : 'Out of Stock')}
                  </span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-3.5 bg-pink-50/60 border border-pink-100 rounded-2xl flex items-baseline flex-wrap gap-2.5">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  ₹{selectedProduct.sellingPrice.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.sellingPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedProduct.discountPercent && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedProduct.discountPercent}% OFF
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto font-medium">
                  Free Shipping over ₹{STORE_CONFIG.freeShippingThreshold}
                </span>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
                  {validationError}
                </div>
              )}

              {/* Size Selector */}
              {selectedProduct.availableSizes && selectedProduct.availableSizes.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-700">Select Size:</span>
                    <span className="text-[#9F2089] font-bold">{selectedVariant.size || 'Please select'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedVariant((prev) => ({ ...prev, size }));
                          setValidationError(null);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant.size === size
                            ? 'bg-[#9F2089] text-white border-[#9F2089] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300 hover:text-[#9F2089]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {selectedProduct.availableColors && selectedProduct.availableColors.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-700">Select Color:</span>
                    <span className="text-[#9F2089] font-bold">{selectedVariant.color || 'Please select'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.availableColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedVariant((prev) => ({ ...prev, color }));
                          setValidationError(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant.color === color
                            ? 'bg-[#9F2089] text-white border-[#9F2089] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300 hover:text-[#9F2089]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => setSelectedVariant((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold bg-white rounded-lg shadow-2xs"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-extrabold text-slate-900 tabular-nums text-sm">
                    {selectedVariant.quantity}
                  </span>
                  <button
                    onClick={() => setSelectedVariant((prev) => ({ ...prev, quantity: prev.quantity + 1 }))}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold bg-white rounded-lg shadow-2xs"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart + Prominent Buy Now */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-600" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Buy Now (WhatsApp)</span>
                </button>
              </div>

              {/* Description preview */}
              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                {selectedProduct.description}
              </p>

            </div>

          </div>

          {/* Details / Specs / Shipping Tabs */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex border-b border-slate-200 gap-4 mb-4 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors border-b-2 -mb-px ${
                  activeTab === 'specs' ? 'border-[#9F2089] text-[#9F2089] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-2 transition-colors border-b-2 -mb-px ${
                  activeTab === 'shipping' ? 'border-[#9F2089] text-[#9F2089] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Shipping & Delivery
              </button>
              <button
                onClick={() => setActiveTab('returns')}
                className={`pb-2 transition-colors border-b-2 -mb-px ${
                  activeTab === 'returns' ? 'border-[#9F2089] text-[#9F2089] font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Returns & Exchange
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {selectedProduct.specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500">{spec.label}</span>
                    <span className="font-semibold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed p-2">
                <p>• All orders are dispatched within 24 to 48 hours after WhatsApp confirmation.</p>
                <p>• Delivery takes 3 to 6 business days across India via trusted courier partners.</p>
                <p>• Free shipping applies automatically on all orders above ₹{STORE_CONFIG.freeShippingThreshold}. Standard shipping is ₹{STORE_CONFIG.standardShippingFee} for smaller orders.</p>
                <p>• Tracking link and courier details are shared directly over WhatsApp once dispatched.</p>
              </div>
            )}

            {activeTab === 'returns' && (
              <div className="space-y-2 text-xs text-slate-700 leading-relaxed p-2">
                <p>• 7-day replacement guarantee in case of verified transit damage or manufacturing defect.</p>
                <p>• Free size exchange available for apparel and techwear items.</p>
                <p>• For any exchange, message us directly on WhatsApp at <span className="text-[#9F2089] font-bold">{STORE_CONFIG.whatsappDisplayNumber}</span> with an unboxing photo or video.</p>
              </div>
            )}
          </div>

          {/* Related Products Strip */}
          {relatedProducts.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Similar Products in {selectedProduct.category}</h3>
              <div className="grid grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      openProductDetail(rel);
                      setActiveImageIndex(0);
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-pink-300 cursor-pointer transition-colors"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white mb-2">
                      <img src={rel.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <h5 className="text-[11px] font-semibold text-slate-800 truncate">{rel.name}</h5>
                    <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                      ₹{rel.sellingPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
