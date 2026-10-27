import React from 'react';
import { ShieldCheck, MessageCircle, Truck, RotateCcw } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const WhyShopWithUs: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 bg-[#F7F8FA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#9F2089]">
            Customer Trust & Care
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Why Shop with Black Tecno Shop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We combine high-performance tech essentials with personal, friendly human customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#9F2089]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              100% Genuine Quality
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Every gadget, charger, and tech accessory is verified before being cataloged and dispatched.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Direct WhatsApp Support
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              No generic automated bots. Speak with human support directly at {STORE_CONFIG.whatsappDisplayNumber}.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              All-India Express Delivery
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Fast door-to-door courier shipping with live tracking updates shared immediately after dispatch.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Easy Replacement & Exchange
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Hassle-free replacement guarantee on defective units or size exchanges for apparel.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
