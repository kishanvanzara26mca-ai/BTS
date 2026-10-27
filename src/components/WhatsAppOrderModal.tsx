import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  Instagram, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG, buildProductWhatsAppMessage, getWhatsAppOrderUrl } from '../config/storeConfig.ts';

export const WhatsAppOrderModal: React.FC = () => {
  const { 
    activeModal, 
    selectedProduct, 
    selectedVariant, 
    setSelectedVariant, 
    closeModal,
    showToast 
  } = useShop();

  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (activeModal !== 'order-panel' || !selectedProduct) {
    return null;
  }

  const primaryImage = selectedProduct.images?.[0] || '';
  const currentTotal = selectedProduct.sellingPrice * selectedVariant.quantity;

  // Build the dynamic WhatsApp message for this exact product and options
  const whatsappMessage = buildProductWhatsAppMessage({
    productName: selectedProduct.name,
    productId: selectedProduct.id,
    price: selectedProduct.sellingPrice,
    quantity: selectedVariant.quantity,
    size: selectedVariant.size,
    color: selectedVariant.color,
    imageUrl: primaryImage,
    productUrl: typeof window !== 'undefined' ? window.location.href : '',
  });

  const whatsappUrl = getWhatsAppOrderUrl({
    productName: selectedProduct.name,
    productId: selectedProduct.id,
    price: selectedProduct.sellingPrice,
    quantity: selectedVariant.quantity,
    size: selectedVariant.size,
    color: selectedVariant.color,
    imageUrl: primaryImage,
    productUrl: typeof window !== 'undefined' ? window.location.href : '',
  });

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      showToast('Order details copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Please select and copy text manually.');
    }
  };

  const handleShareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedProduct.name,
          text: `Check out ${selectedProduct.name} on Black Tecno Shop (₹${selectedProduct.sellingPrice.toLocaleString('en-IN')})`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            <h3 className="text-base font-bold text-slate-900">Order via WhatsApp</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close order dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Selected Product Summary Card */}
          <div className="flex gap-3.5 p-3 bg-slate-50 border border-slate-200 rounded-2xl items-center">
            <div className="w-18 h-18 rounded-xl bg-white overflow-hidden shrink-0 border border-slate-200">
              {!imageError && primaryImage ? (
                <img
                  src={primaryImage}
                  alt={selectedProduct.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 font-bold">
                  {selectedProduct.category}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-[#9F2089] uppercase tracking-wider block truncate">
                SKU: {selectedProduct.id} · {selectedProduct.category}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate mt-0.5">
                {selectedProduct.name}
              </h4>
              
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm sm:text-base font-extrabold text-slate-900 tabular-nums">
                  ₹{selectedProduct.sellingPrice.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {selectedProduct.discountPercent && (
                  <span className="text-[10px] text-emerald-600 font-bold">
                    {selectedProduct.discountPercent}% off
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Variant / Quantity Pickers */}
          <div className="space-y-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            
            {/* Size selector if available */}
            {selectedProduct.availableSizes && selectedProduct.availableSizes.length > 0 && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Select Size:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedVariant((prev) => ({ ...prev, size }))}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        selectedVariant.size === size
                          ? 'bg-[#9F2089] text-white border-[#9F2089] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:text-[#9F2089]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color selector if available */}
            {selectedProduct.availableColors && selectedProduct.availableColors.length > 0 && (
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                  Select Color:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedVariant((prev) => ({ ...prev, color }))}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        selectedVariant.color === color
                          ? 'bg-[#9F2089] text-white border-[#9F2089] shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:text-[#9F2089]'
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
              <span className="text-[11px] font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => setSelectedVariant((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                  className="w-6 h-6 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-slate-900 tabular-nums">
                  {selectedVariant.quantity}
                </span>
                <button
                  onClick={() => setSelectedVariant((prev) => ({ ...prev, quantity: prev.quantity + 1 }))}
                  className="w-6 h-6 flex items-center justify-center text-slate-700 hover:text-slate-950 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Calculation */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-medium">
              <span className="text-slate-600 font-medium">Order Subtotal:</span>
              <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                ₹{currentTotal.toLocaleString('en-IN')}
              </span>
            </div>

          </div>

          {/* Option A: ORDER ON WHATSAPP */}
          <div className="space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-md shadow-[#25D366]/20 group"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order on WhatsApp</span>
              <ExternalLink className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <p className="text-[11px] text-slate-500 text-center leading-relaxed">
              Opens WhatsApp chat with our seller team at <span className="text-slate-800 font-bold">{STORE_CONFIG.whatsappDisplayNumber}</span>. Stock & dispatch details will be confirmed directly with you.
            </p>
          </div>

          {/* Formatted Message Live Preview */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-bold">
              <span>Dynamic WhatsApp Message Preview</span>
              <button
                onClick={handleCopyMessage}
                className="flex items-center gap-1 text-[#9F2089] hover:underline"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="text-[11px] font-mono text-slate-700 bg-white border border-slate-200 p-2.5 rounded-xl whitespace-pre-wrap break-words leading-relaxed select-all">
              {whatsappMessage}
            </pre>
          </div>

          {/* Option B: VISIT INSTAGRAM */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            <a
              href={STORE_CONFIG.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-gradient-to-r from-pink-50 via-purple-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 border border-pink-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Follow us on Instagram ({STORE_CONFIG.instagramUsername})</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              Explore our Instagram profile for product updates, reels, and new arrivals. Instagram is for social discovery and not an automated checkout.
            </p>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-600 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9F2089]" />
            <span>Verified Seller</span>
          </div>
          <span className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-600" />
            <span>All-India Delivery</span>
          </div>
        </div>

      </div>
    </div>
  );
};
