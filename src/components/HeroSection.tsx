import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Truck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { heroBannerImg } from '../data/products.ts';

export const HeroSection: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleExplore = () => {
    setSelectedCategory('all');
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50/80 via-white to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            
            {/* Store Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-[#9F2089]">
              <Sparkles className="w-3.5 h-3.5 text-[#9F2089]" />
              <span className="font-bold">Black Tecno Shop</span>
              <span className="text-pink-300">·</span>
              <span>Shop Smart. Order Easy.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-snug" style={{ textWrap: 'balance' }}>
              Trending Mobiles, Audio Gear & Lifestyle Essentials
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore handpicked smartphones, wireless audio, AMOLED smartwatches, and techwear. Order easily via direct WhatsApp chat with seller verification and all-India delivery.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={handleExplore}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#9F2089] hover:bg-[#851871] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href={STORE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Shop on WhatsApp</span>
              </a>
            </div>

            {/* Trust Mini Strip */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-left">
              <div className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#9F2089] shrink-0" />
                <span className="text-xs font-semibold">100% Genuine</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold">All-India Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold">Fast WhatsApp Chat</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white group">
              <img
                src={heroBannerImg}
                alt="Black Tecno Shop flagship electronics and lifestyle showcase"
                className="w-full aspect-[16/9] sm:aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              
              {/* Badge overlay on image */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#9F2089] tracking-wider block">
                    Featured Collection
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    Smartphones, ANC Audio & Smartwatches
                  </span>
                </div>
                <button
                  onClick={handleExplore}
                  className="px-3 py-1.5 bg-[#9F2089] hover:bg-[#851871] text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
