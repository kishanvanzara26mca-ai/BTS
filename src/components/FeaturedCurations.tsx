import React, { useState } from 'react';
import { Sparkles, Flame, Tag, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { PRODUCTS } from '../data/products.ts';

export const FeaturedCurations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'trending' | 'new' | 'offers'>('bestsellers');
  const { recentlyViewed } = useShop();

  // Curated lists from real product data
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
  const trending = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const featuredOffers = PRODUCTS.filter((p) => (p.discountPercent || 0) >= 45).slice(0, 4);

  let activeList = bestsellers;
  if (activeTab === 'trending') activeList = trending;
  if (activeTab === 'new') activeList = newArrivals;
  if (activeTab === 'offers') activeList = featuredOffers;

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Curated Tabs Header (Meesho-inspired clean marketplace styling) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Curated Highlights
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Popular essentials, trending gadgets, new releases, and verified offers
            </p>
          </div>

          {/* Segmented Tab Controls */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto no-scrollbar border border-slate-200/80">
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'bestsellers'
                  ? 'bg-white text-[#9F2089] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Popular</span>
            </button>

            <button
              onClick={() => setActiveTab('trending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'trending'
                  ? 'bg-white text-[#9F2089] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9F2089]" />
              <span>Trending</span>
            </button>

            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'new'
                  ? 'bg-white text-[#9F2089] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'offers'
                  ? 'bg-white text-[#9F2089] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-rose-500" />
              <span>Special Offers</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid (Strict 2 cols mobile, 4 cols desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {activeList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Recently Viewed Products strip */}
        {recentlyViewed.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Recently Viewed by You</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                Saved in your session
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
              {recentlyViewed.slice(0, 4).map((product) => (
                <ProductCard key={`recent-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
