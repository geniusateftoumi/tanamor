import React from 'react';
import { ShieldCheck, Share2 } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  onShowLaws: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, onShowLaws }) => {
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
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-300">
            <ShieldCheck size={18} fill="currentColor" className="text-brand-400" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            بيئة آمنة
          </span>
        </div>
        
        <nav className="flex items-center gap-4 sm:gap-6">
          <button onClick={onReset} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
            الرئيسية
          </button>
          <button onClick={onShowLaws} className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors hidden sm:block">
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

          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
            <span className="text-xs font-bold">أنا</span>
          </div>
        </nav>
      </div>
    </header>
  );
};