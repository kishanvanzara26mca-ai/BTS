import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig.ts';
import smartwatchImg from '../assets/images/product_smartwatch_ultra_1792173640627.jpg';
import earbudsImg from '../assets/images/product_earbuds_pro_1792173640896.jpg';
import smartphoneImg from '../assets/images/product_smartphone_flagship_1792173641965.jpg';
import jacketImg from '../assets/images/product_streetwear_jacket_1792173641791.jpg';

export const InstagramSection: React.FC = () => {
  const showcaseProducts = [
    {
      img: smartwatchImg,
      title: 'Titanium Apex Ultra Smartwatch',
      category: 'Smartwatches',
    },
    {
      img: earbudsImg,
      title: 'Aether Pro Hybrid ANC Earbuds',
      category: 'Audio Gear',
    },
    {
      img: jacketImg,
      title: 'Stealth Techwear Bomber Jacket',
      category: 'Fashion Essentials',
    },
    {
      img: smartphoneImg,
      title: 'Nova 10 Pro 5G Flagship',
      category: 'Mobile Phones',
    },
  ];

  return (
    <section className="py-10 sm:py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-[#E1306C]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E1306C]">
                Official Social Discovery
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Connect on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Follow <span className="font-bold text-slate-900">{STORE_CONFIG.instagramUsername}</span> for new gadget arrivals, unboxings, and product video reels.
            </p>
          </div>

          <a
            href={STORE_CONFIG.instagramProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs sm:text-sm rounded-xl hover:opacity-90 transition-opacity shadow-sm self-start sm:self-auto shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow us on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4 Image Grid showcasing genuine products */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {showcaseProducts.map((item, idx) => (
            <a
              key={idx}
              href={STORE_CONFIG.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-pink-300 transition-all duration-300 shadow-2xs"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                <span className="text-[10px] text-pink-300 font-bold uppercase tracking-wider">
                  {item.category}
                </span>
                <p className="text-xs text-white font-bold truncate">
                  {item.title}
                </p>
                <span className="text-[10px] text-slate-300 font-medium mt-1 flex items-center gap-1">
                  <Instagram className="w-3 h-3 text-[#E1306C]" />
                  <span>View on Instagram</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Informational Disclaimer as requested */}
        <p className="text-[11px] text-slate-500 text-center mt-5">
          Instagram is our social media discovery channel. All orders are confirmed directly with our seller team on WhatsApp for prompt verification.
        </p>

      </div>
    </section>
  );
};
