import React from 'react';
import { Search, MessageSquare, PackageCheck, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const WhatsAppGuideSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F2089]">
            Simple & Transparent
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            How WhatsApp Ordering Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse products freely without mandatory login. Simply connect with us directly on WhatsApp to confirm availability and dispatch.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          
          {/* Step 1 */}
          <div className="p-5 sm:p-6 bg-slate-50 border border-slate-200/90 rounded-2xl relative space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-black text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Browse & Select Variant
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore the catalog, pick your preferred size or color, and review specifications and pricing.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 sm:p-6 bg-pink-50/70 border border-pink-200 rounded-2xl relative space-y-2.5 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#9F2089] text-white flex items-center justify-center font-black text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Click “Buy Now” or “Order on WhatsApp”
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our system generates an itemized message with product SKU, price, variant, and photo link ready for WhatsApp.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 sm:p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl relative space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center font-black text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Confirm & Express Dispatch
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We verify stock instantly, provide payment options (UPI/COD), and dispatch your package with live tracking details.
            </p>
          </div>

        </div>

        {/* WhatsApp Callout Strip */}
        <div className="mt-6 sm:mt-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">
              Have questions or need product assistance?
            </span>
            <span className="text-[11px] text-slate-600">
              Chat with our team anytime on WhatsApp at <span className="text-emerald-700 font-bold">{STORE_CONFIG.whatsappDisplayNumber}</span>
            </span>
          </div>
          <a
            href={STORE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
