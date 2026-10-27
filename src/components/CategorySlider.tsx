import React from 'react';
import { 
  Smartphone, 
  Cable, 
  Headphones, 
  Watch, 
  Keyboard, 
  Cpu, 
  Shirt, 
  Home, 
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { CATEGORIES } from '../data/products.ts';

const iconMap: Record<string, React.ElementType> = {
  Smartphone,
  Cable,
  Headphones,
  Watch,
  Keyboard,
  Cpu,
  Shirt,
  Home,
  Sparkles,
};

export const CategorySlider: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(selectedCategory === catId ? 'all' : catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white border-b border-slate-200/90 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Horizontal Category Scroll Bar (Meesho signature circular category row) */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
          
          {/* All Products Item */}
          <button
            onClick={() => handleCategoryClick('all')}
            className="group flex flex-col items-center shrink-0 w-16 sm:w-20 text-center focus:outline-none"
          >
            <div
              className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-[#9F2089] text-white shadow-md ring-2 ring-[#9F2089] ring-offset-2'
                  : 'bg-slate-100 text-slate-700 group-hover:bg-pink-50 group-hover:text-[#9F2089] border border-slate-200'
              }`}
            >
              <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span
              className={`text-[11px] sm:text-xs font-semibold mt-1.5 leading-tight line-clamp-1 transition-colors ${
                selectedCategory === 'all'
                  ? 'text-[#9F2089] font-bold'
                  : 'text-slate-700 group-hover:text-[#9F2089]'
              }`}
            >
              All
            </span>
          </button>

          {/* Individual Categories */}
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.iconName] || Sparkles;
            const isSelected =
              selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
              selectedCategory.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group flex flex-col items-center shrink-0 w-16 sm:w-20 text-center focus:outline-none"
              >
                <div
                  className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#9F2089] text-white shadow-md ring-2 ring-[#9F2089] ring-offset-2'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-pink-50 group-hover:text-[#9F2089] border border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-medium mt-1.5 leading-tight line-clamp-1 transition-colors ${
                    isSelected
                      ? 'text-[#9F2089] font-bold'
                      : 'text-slate-700 group-hover:text-[#9F2089]'
                  }`}
                >
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
