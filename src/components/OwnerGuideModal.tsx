import React from 'react';
import { X, Code, FileText, CheckCircle2, RefreshCw, Plus } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

export const OwnerGuideModal: React.FC = () => {
  const { activeModal, closeModal } = useShop();

  if (activeModal !== 'owner-guide') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={closeModal} 
      />

      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-[#9F2089]" />
            <h3 className="text-base font-bold text-slate-900">Store Owner Management Guide</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 space-y-1 text-slate-800">
            <h4 className="font-bold text-[#9F2089] text-sm">Static Catalog Architecture</h4>
            <p className="text-xs">
              Black Tecno Shop is built with a fast, reliable static catalog. All products and store contact details are centralized in structured configuration files. Whenever you add or edit products, commit and redeploy your website.
            </p>
          </div>

          {/* 1. Adding a new product */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#9F2089]" />
              <span>1. How to Add, Edit, or Remove Products</span>
            </h4>
            <p className="text-xs text-slate-600">
              Open the product catalog file at <code className="text-[#9F2089] bg-pink-50 px-1.5 py-0.5 rounded border border-pink-150 font-mono">src/data/products.ts</code>. Add or modify a product object inside the <code className="text-slate-900 font-mono font-bold">PRODUCTS</code> array:
            </p>
            <pre className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-800 overflow-x-auto leading-relaxed">
{`{
  id: 'BTS-ACC-003',                          // Unique SKU
  name: 'Magnetic MagSafe Stand Charger',      // Product title
  category: 'Mobile Accessories',              // Must match a category
  description: 'Fast 15W wireless stand...',   // Full description
  images: ['/path-to-image.jpg'],              // Image URL array
  sellingPrice: 1299,                          // Price in INR
  originalPrice: 2499,                         // Optional MRP
  discountPercent: 48,                         // Optional % off
  availableColors: ['Matte Black', 'Silver'],  // Optional colors
  availableSizes: [],                          // Optional sizes
  inStock: true,                               // Stock status
  specifications: [
    { label: 'Charging Speed', value: '15W Fast Qi' },
    { label: 'Warranty', value: '6 Months' },
  ],
  offers: ['Free Shipping included'],
  isFeatured: true,
  isBestseller: true,
}`}
            </pre>
          </div>

          {/* 2. Editing store phone or Instagram */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>2. How to Update Store Contact & WhatsApp Details</span>
            </h4>
            <p className="text-xs text-slate-600">
              All official contacts are managed centrally in <code className="text-[#9F2089] bg-pink-50 px-1.5 py-0.5 rounded border border-pink-150 font-mono">src/config/storeConfig.ts</code>:
            </p>
            <pre className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-mono text-slate-800 overflow-x-auto">
{`export const STORE_CONFIG = {
  brandName: 'Black Tecno Shop',
  whatsappNumber: '+919712363773',
  whatsappDisplayNumber: '+91 97123 63773',
  instagramUsername: '@blacktecnoshop',
  businessEmail: 'vanzarakisu17@gmail.com',
  freeShippingThreshold: 999,
  standardShippingFee: 49,
};`}
            </pre>
          </div>

          {/* 3. Redeployment note */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
            <RefreshCw className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block">Static Deployment</span>
              <span className="text-slate-600">
                Because Black Tecno Shop is a static catalog without database latency, modifying <code className="text-slate-800 font-mono">products.ts</code> requires compiling via <code className="text-slate-800 font-mono">npm run build</code>. This guarantees instant page loads and zero hosting overhead.
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
