import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, RefreshCw, SearchX, IndianRupee, X } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { ProductCard } from './ProductCard.tsx';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  title = 'Product Catalog', 
  subtitle = 'Discover verified tech accessories, gadgets, and lifestyle essentials' 
}) => {
  const {
    filteredProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    setSortBy,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    inStockOnly,
    setInStockOnly,
    resetFilters,
  } = useShop();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const pricePresets = [
    { label: 'All Prices', min: 0, max: 30000 },
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹2,500', min: 1000, max: 2500 },
    { label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
    { label: 'Above ₹5,000', min: 5000, max: 30000 },
  ];

  const hasActiveFilters = 
    Boolean(searchQuery) || 
    selectedCategory !== 'all' || 
    inStockOnly || 
    sortBy !== 'recommended' || 
    minPrice > 0 || 
    maxPrice < 30000;

  return (
    <section id="catalog-section" className="py-8 sm:py-10 bg-[#F7F8FA]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Section Header & Top Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  {title}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-50 text-[#9F2089] border border-pink-100">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {subtitle}
              </p>
            </div>

            {/* Quick Filter & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              
              {/* Sort Selector */}
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-medium text-slate-800 focus:outline-none cursor-pointer pr-1"
                  aria-label="Sort products by"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {/* In-Stock Toggle */}
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                  inStockOnly
                    ? 'bg-pink-50 border-[#9F2089] text-[#9F2089] font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    inStockOnly ? 'bg-[#9F2089] border-[#9F2089] text-white' : 'border-slate-400'
                  }`}
                >
                  {inStockOnly && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
                <span>In Stock Only</span>
              </button>

              {/* Price Filter Toggle Button */}
              <button
                onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                  isFilterPanelOpen || minPrice > 0 || maxPrice < 30000
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Price Filter</span>
                {(minPrice > 0 || maxPrice < 30000) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                )}
              </button>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-200 rounded-xl transition-colors font-medium"
                  title="Clear all filters"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}

            </div>
          </div>

          {/* Expandable Price Range Filter Panel */}
          {isFilterPanelOpen && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Filter by Price (INR):</span>
                <span className="text-xs text-slate-500 font-medium">
                  Current: ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Quick preset price buttons */}
              <div className="flex flex-wrap gap-1.5">
                {pricePresets.map((preset, idx) => {
                  const isActive = minPrice === preset.min && maxPrice === preset.max;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setMinPrice(preset.min);
                        setMaxPrice(preset.max);
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        isActive
                          ? 'bg-[#9F2089] text-white border-[#9F2089] font-bold shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Min / Max Inputs */}
              <div className="flex items-center gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
                  <span className="text-slate-500">Min: ₹</span>
                  <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value) || 0))}
                    className="w-20 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>
                <span className="text-slate-400">to</span>
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
                  <span className="text-slate-500">Max: ₹</span>
                  <input
                    type="number"
                    min={minPrice}
                    max="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Math.max(minPrice, Number(e.target.value) || 30000))}
                    className="w-20 bg-transparent text-xs font-bold text-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Cards Grid: Strict 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Search / No Results State */
          <div className="bg-white rounded-2xl border border-slate-200 py-16 px-4 text-center max-w-md mx-auto space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center mx-auto text-[#9F2089]">
              <SearchX className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">No products found</h3>
              <p className="text-xs text-slate-500 mt-1">
                We couldn't find any products matching your filters or search term {searchQuery ? `"${searchQuery}"` : ''}.
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-[#9F2089] hover:bg-[#851871] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
