import React from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { PolicyTab } from '../types.ts';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const PolicyModal: React.FC = () => {
  const { activeModal, activePolicyTab, setActivePolicyTab, closeModal } = useShop();

  if (activeModal !== 'policy') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#9F2089]" />
            <h3 className="text-base font-bold text-slate-900">Store Policies & Terms</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Tabs */}
        <div className="flex border-b border-slate-200 px-4 sm:px-6 gap-2 sm:gap-4 overflow-x-auto no-scrollbar text-xs font-semibold bg-white">
          <button
            onClick={() => setActivePolicyTab('shipping')}
            className={`py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activePolicyTab === 'shipping'
                ? 'border-[#9F2089] text-[#9F2089] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Shipping & Delivery
          </button>
          <button
            onClick={() => setActivePolicyTab('returns')}
            className={`py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activePolicyTab === 'returns'
                ? 'border-[#9F2089] text-[#9F2089] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Return & Exchange
          </button>
          <button
            onClick={() => setActivePolicyTab('privacy')}
            className={`py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activePolicyTab === 'privacy'
                ? 'border-[#9F2089] text-[#9F2089] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActivePolicyTab('terms')}
            className={`py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activePolicyTab === 'terms'
                ? 'border-[#9F2089] text-[#9F2089] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Terms of Service
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {activePolicyTab === 'shipping' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Truck className="w-4 h-4 text-[#9F2089]" />
                <h4>Shipping & Delivery Information</h4>
              </div>
              <p>
                At <strong>Black Tecno Shop</strong>, we provide door-to-door delivery across India using trusted express courier partners (Delhivery, BlueDart, DTDC, and Xpressbees).
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Confirmation:</span>
                  <span className="font-semibold text-slate-900">Directly over WhatsApp (+919712363773)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatch Time:</span>
                  <span className="font-semibold text-slate-900">Within 24 to 48 hours of confirmation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Delivery:</span>
                  <span className="font-semibold text-slate-900">3 to 6 business days across India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Free Delivery Threshold:</span>
                  <span className="font-bold text-emerald-700">Orders above ₹{STORE_CONFIG.freeShippingThreshold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Shipping Fee:</span>
                  <span className="font-semibold text-slate-900">₹{STORE_CONFIG.standardShippingFee} for smaller orders</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Tracking numbers and live status links are sent straight to your WhatsApp as soon as your package is dispatched from our fulfillment facility.
              </p>
            </div>
          )}

          {activePolicyTab === 'returns' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <RotateCcw className="w-4 h-4 text-[#9F2089]" />
                <h4>Replacement, Exchange & Cancellation Policy</h4>
              </div>
              <p>
                Customer satisfaction is our highest priority. Because orders are verified directly on WhatsApp, our return process is transparent and human-guided:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
                <li>
                  <strong>Replacement Guarantee:</strong> If an item arrives damaged or functionally defective, message us on WhatsApp with an unboxing photo/video within 7 days of delivery for an immediate free replacement.
                </li>
                <li>
                  <strong>Size & Variant Exchange:</strong> For clothing, jackets, or wearables, we offer one hassle-free size exchange if the fit does not meet expectations.
                </li>
                <li>
                  <strong>Order Cancellation:</strong> You can cancel any order free of charge at any time before the parcel has been picked up by the courier. Simply send a message to {STORE_CONFIG.whatsappDisplayNumber}.
                </li>
              </ul>
            </div>
          )}

          {activePolicyTab === 'privacy' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#9F2089]" />
                <h4>Privacy Policy</h4>
              </div>
              <p>
                Black Tecno Shop is committed to protecting your privacy. We operate as a catalog with direct WhatsApp customer communication:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
                <li>We do not require you to create an account, password, or provide sensitive banking credentials on this website.</li>
                <li>Your delivery address and contact information are shared voluntarily only within WhatsApp chat solely for the purpose of shipping and delivering your chosen items.</li>
                <li>We will never sell or share your contact number or email address with third-party advertisers.</li>
              </ul>
            </div>
          )}

          {activePolicyTab === 'terms' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileText className="w-4 h-4 text-[#9F2089]" />
                <h4>Terms of Service</h4>
              </div>
              <p>
                By using Black Tecno Shop, you acknowledge that this website operates as a product showcase and catalog. Order confirmation, stock verification, and shipping arrangements occur directly between the buyer and Black Tecno Shop management via official WhatsApp (+919712363773) or email ({STORE_CONFIG.businessEmail}).
              </p>
              <p className="text-xs text-slate-500">
                Product specifications and prices are maintained accurately. In the rare case of sudden supplier out-of-stock, our team will notify you immediately during the WhatsApp chat before dispatching.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
