import React from 'react';
import { X, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const AboutModal: React.FC = () => {
  const { activeModal, closeModal } = useShop();

  if (activeModal !== 'about') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9F2089]" />
            <h3 className="text-base font-bold text-slate-900">About Black Tecno Shop</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[75vh] overflow-y-auto">
          
          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-100">
            <span className="text-[10px] uppercase font-bold text-[#9F2089] tracking-wider block">
              Our Vision
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1">
              Shop Smart. Order Easy.
            </h4>
            <p className="text-xs text-slate-600 mt-1.5">
              Black Tecno Shop is designed as an accessible Indian e-commerce marketplace catalog. We bring quality smartphones, audio gear, smartwatches, and fashion essentials directly to customers via transparent WhatsApp shopping.
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Why WhatsApp & Instagram Shopping
            </h4>
            <p>
              Traditional online stores force users through tedious account creations, complicated checkout flows, and unresponsive bots. We make shopping conversational and personal.
            </p>
            <p>
              When you click <strong>Buy Now</strong>, your selected item details (SKU, title, price, size, and color) are automatically formatted and sent to our official WhatsApp (<span className="text-emerald-700 font-bold">{STORE_CONFIG.whatsappDisplayNumber}</span>). You receive real human assistance, instant stock confirmation, and seamless courier dispatch.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-900 block">Official Contact Directory</span>
            <p className="text-slate-600">WhatsApp: {STORE_CONFIG.whatsappDisplayNumber}</p>
            <p className="text-slate-600">Instagram: {STORE_CONFIG.instagramUsername}</p>
            <p className="text-slate-600">Email: {STORE_CONFIG.businessEmail}</p>
          </div>

        </div>

      </div>
    </div>
  );
};
