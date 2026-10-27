import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext.tsx';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 left-4 sm:left-auto sm:right-8 z-50 pointer-events-none flex justify-center sm:justify-end">
      <div className="bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-200">
        <CheckCircle2 className="w-4 h-4 text-[#9F2089] shrink-0" />
        <span>{toast}</span>
      </div>
    </div>
  );
};
