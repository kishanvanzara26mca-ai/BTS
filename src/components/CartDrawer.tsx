import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  Truck,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG, getWhatsAppCartOrderUrl, buildCartWhatsAppMessage } from '../config/storeConfig.ts';

export const CartDrawer: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal, 
    cartShippingFee, 
    cartTotal,
    showToast 
  } = useShop();

  const [copied, setCopied] = useState(false);

  if (activeModal !== 'cart') {
    return null;
  }

  // Map cart items for message builder
  const cartSummaryItems = cart.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.sellingPrice,
    size: item.selectedSize,
    color: item.selectedColor,
  }));

  const whatsappUrl = getWhatsAppCartOrderUrl(cartSummaryItems, cartTotal);
  const whatsappMessage = buildCartWhatsAppMessage(cartSummaryItems, cartTotal);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      showToast('Cart summary copied to clipboard');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Could not copy cart summary.');
    }
  };

  const remainingForFreeShipping = Math.max(0, STORE_CONFIG.freeShippingThreshold - cartSubtotal);

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
            <ShoppingBag className="w-5 h-5 text-[#9F2089]" />
            <h3 className="text-base font-bold text-slate-900">Shopping Cart</h3>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-50 text-[#9F2089] border border-pink-100">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        {cart.length > 0 && (
          <div className="px-4 py-2.5 bg-pink-50/60 border-b border-pink-100 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-slate-700">
                Add <span className="text-[#9F2089] font-bold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more to qualify for <span className="font-bold text-emerald-700">FREE Delivery</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>You've unlocked FREE All-India Delivery!</span>
              </p>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div 
                key={item.cartItemId}
                className="flex gap-3 p-3 bg-white border border-slate-200 rounded-2xl items-center shadow-2xs"
              >
                <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={item.product.images?.[0] || ''}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  
                  {/* Variant info */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    {item.selectedSize && item.selectedColor && <span>·</span>}
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      ₹{(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                      (₹{item.product.sellingPrice} each)
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-xs">
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-slate-700 hover:text-black font-bold bg-white rounded shadow-2xs"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-slate-900 tabular-nums text-xs">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-slate-700 hover:text-black font-bold bg-white rounded shadow-2xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#9F2089]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our trending electronics, accessories, and fashion to start an order.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="px-5 py-2.5 bg-[#9F2089] hover:bg-[#851871] text-white font-bold text-xs rounded-xl transition-colors shadow-2xs"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer & Order All on WhatsApp CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3.5">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charges</span>
                <span className="font-semibold tabular-nums">
                  {cartShippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${cartShippingFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Order Total</span>
                <span className="text-base text-[#9F2089] tabular-nums">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Single "Order on WhatsApp" Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#25D366]/20 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Order on WhatsApp</span>
            </a>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 hover:text-[#9F2089] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Summary Copied' : 'Copy Order Text'}</span>
              </button>
              
              <button
                onClick={closeModal}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Continue Shopping
              </button>
              
              <button
                onClick={clearCart}
                className="text-slate-400 hover:text-rose-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
