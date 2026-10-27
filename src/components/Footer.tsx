import React from 'react';
import { MessageCircle, Instagram, Mail, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import { CATEGORIES } from '../data/products.ts';
import { useShop } from '../context/ShopContext.tsx';

export const Footer: React.FC = () => {
  const { setSelectedCategory, openAbout, openContact, openPolicy, openOwnerGuide } = useShop();

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-xs">
                <span className="text-sm font-black tracking-tight text-white">BT</span>
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-900 tracking-tight block">
                  {STORE_CONFIG.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#9F2089] font-bold">
                  {STORE_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed text-xs max-w-sm">
              Your trusted destination for trending smartphones, high-fidelity wireless audio, smart wearables, GaN chargers, and tech lifestyle essentials. Connect and order directly on WhatsApp with quick personal seller assistance.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <a
                href={STORE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {STORE_CONFIG.whatsappDisplayNumber}</span>
              </a>

              <a
                href={STORE_CONFIG.instagramProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-700 hover:text-[#9F2089] font-medium transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E1306C] shrink-0" />
                <span>Instagram: {STORE_CONFIG.instagramUsername}</span>
              </a>

              <a
                href={STORE_CONFIG.emailLink}
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate">{STORE_CONFIG.businessEmail}</span>
              </a>
            </div>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#9F2089] transition-colors text-left font-medium"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Store & Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Store & Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={openAbout} className="hover:text-[#9F2089] transition-colors font-medium">
                  About Black Tecno Shop
                </button>
              </li>
              <li>
                <button onClick={openContact} className="hover:text-[#9F2089] transition-colors font-medium">
                  Contact & Customer Support
                </button>
              </li>
              <li>
                <button onClick={() => openPolicy('shipping')} className="hover:text-[#9F2089] transition-colors font-medium">
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button onClick={() => openPolicy('returns')} className="hover:text-[#9F2089] transition-colors font-medium">
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => openPolicy('privacy')} className="hover:text-[#9F2089] transition-colors font-medium">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => openPolicy('terms')} className="hover:text-[#9F2089] transition-colors font-medium">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Store Management Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Store Owner
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Store owner can easily add, edit, and update catalog items by editing <code className="text-[#9F2089] font-mono bg-pink-50 px-1 py-0.5 rounded">products.ts</code> and redeploying.
            </p>
            <button
              onClick={openOwnerGuide}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 text-[#9F2089] hover:bg-pink-50 hover:border-pink-200 text-xs font-bold rounded-xl transition-colors block text-left shadow-2xs"
            >
              Store Owner Guide →
            </button>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
              <span className="text-slate-900 font-bold block">Courier Partners</span>
              <span>Delhivery · BlueDart · DTDC</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {STORE_CONFIG.brandName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => openPolicy('privacy')} className="hover:text-slate-800">
              Privacy
            </button>
            <span>·</span>
            <button onClick={() => openPolicy('terms')} className="hover:text-slate-800">
              Terms
            </button>
            <span>·</span>
            <button onClick={() => openPolicy('shipping')} className="hover:text-slate-800">
              Shipping
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
