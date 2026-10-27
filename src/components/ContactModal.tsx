import React, { useState } from 'react';
import { X, MessageCircle, Instagram, Mail, PhoneCall, Send, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';
import { STORE_CONFIG } from '../config/storeConfig.ts';

export const ContactModal: React.FC = () => {
  const { activeModal, closeModal } = useShop();

  const [inquiryTopic, setInquiryTopic] = useState('Product Question');
  const [inquiryMessage, setInquiryMessage] = useState('');

  if (activeModal !== 'contact') {
    return null;
  }

  const handleSendViaWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
    const text = `Hello Black Tecno Shop! I have an inquiry.\n\nTopic: ${inquiryTopic}\nMessage: ${inquiryMessage || 'I would like to inquire about your products.'}`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    closeModal();
  };

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
            <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
            <h3 className="text-base font-bold text-slate-900">Contact Black Tecno Shop</h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* WhatsApp */}
            <a
              href={STORE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 hover:bg-emerald-100/60 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block">Official WhatsApp</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate block">
                  {STORE_CONFIG.whatsappDisplayNumber}
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href={STORE_CONFIG.instagramProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-pink-50/60 border border-pink-200 rounded-2xl flex items-center gap-3 hover:bg-pink-100/60 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[#9F2089] font-bold uppercase block">Instagram</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#9F2089] truncate block">
                  {STORE_CONFIG.instagramUsername}
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={STORE_CONFIG.emailLink}
              className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 hover:bg-slate-100 transition-colors group sm:col-span-2"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-blue-600 font-bold uppercase block">Customer Support Email</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700 truncate block">
                  {STORE_CONFIG.businessEmail}
                </span>
              </div>
            </a>

          </div>

          {/* Operating Hours */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-700">
            <Clock className="w-4 h-4 text-[#9F2089] shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Operating Hours</span>
              <span className="text-slate-500 text-[11px]">{STORE_CONFIG.operatingHours}</span>
            </div>
          </div>

          {/* Quick Inquiry Composer */}
          <form onSubmit={handleSendViaWhatsApp} className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 text-xs">Send Message to Seller on WhatsApp</h4>
            
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Inquiry Topic</label>
              <select
                value={inquiryTopic}
                onChange={(e) => setInquiryTopic(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#9F2089]"
              >
                <option value="Product Availability & Stock">Product Availability & Stock</option>
                <option value="Order Status & Delivery Tracking">Order Status & Delivery Tracking</option>
                <option value="Size or Color Variant Question">Size or Color Variant Question</option>
                <option value="Replacement or Return Request">Replacement or Return Request</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Message</label>
              <textarea
                rows={3}
                placeholder="Type your question or specific product requirement..."
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#9F2089]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-[#25D366]/20"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Send Message via WhatsApp</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
