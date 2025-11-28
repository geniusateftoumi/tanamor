import React from 'react';
import { ShieldCheck, Share2, User } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onShowLaws: () => void;
  onShowProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onShowLaws, onShowProfile }) => {
  const handleShare = async () => {
    const shareData = {
      title: 'بيئة عمل آمنة',
      text: 'جرب هذه اللعبة التثقيفية حول التنمر في بيئة العمل',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط التطبيق بنجاح!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16">
      <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300 group-hover:scale-105 overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-6 h-6 bg-white/20 rounded-full blur-md -mr-2 -mt-2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 bg-black/10 rounded-full blur-sm -ml-1 -mb-1 pointer-events-none"></div>
            <ShieldCheck size={22} className="relative z-10" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-brand-700 transition-colors">
            بيئة آمنة
          </span>
        </div>
        
        <nav className="flex items-center gap-3 sm:gap-4">
          <button onClick={onReset} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden md:block">
            الرئيسية
          </button>
          <button onClick={onShowLaws} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden md:block">
            قوانين العمل
          </button>
          
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-colors"
            title="مشاركة التطبيق"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">مشاركة</span>
          </button>

          <button 
            onClick={onShowProfile}
            className="flex items-center gap-2 px-1 py-1 sm:pr-3 sm:pl-1 rounded-full text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors border border-transparent hover:border-slate-200"
            title="الملف الشخصي"
          >
             <span className="hidden sm:inline text-sm font-bold">أنا</span>
             <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
               <User size={16} />
             </div>
          </button>
        </nav>
      </div>
    </header>
  );
};