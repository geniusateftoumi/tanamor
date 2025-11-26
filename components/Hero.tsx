import React from 'react';
import { ArrowLeft, ShieldCheck, MessageSquareWarning, BrainCircuit, ShieldAlert } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onStart: () => void;
  onShowRights: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onShowRights }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 pb-20 pt-10 text-center animate-fade-in">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-8">
        <ShieldCheck size={14} fill="currentColor" className="opacity-20" />
        <span>تدريب تفاعلي ذكي</span>
      </div>

      {/* Main Heading */}
      <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight mb-6 leading-[1.2]">
        بيئة عمل <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-sky-600">
          آمنة وخالية من التنمر
        </span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-light">
        هل تواجه صعوبات مع زملاء العمل أو الإدارة؟ جرب هذه المحاكاة لتعلم كيفية التعامل مع التنمر الوظيفي، الحفاظ على حدودك المهنية، وحماية صحتك النفسية.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Button size="lg" onClick={onStart} className="group font-bold bg-slate-900 text-white hover:bg-slate-800">
          ابدأ المحاكاة
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
        </Button>
        <Button size="lg" variant="secondary" onClick={onShowRights}>
          تعرف على حقوقك
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-right">
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-4 group-hover:bg-orange-100 transition-colors">
            <MessageSquareWarning size={20} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2 text-lg">كشف التنمر</h3>
          <p className="text-slate-500 text-sm">تعلم الفرق بين ضغط العمل الطبيعي وبين التنمر والاستغلال الوظيفي.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 mb-4 group-hover:bg-brand-100 transition-colors">
            <ShieldAlert size={20} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2 text-lg">ردود أفعال مدروسة</h3>
          <p className="text-slate-500 text-sm">تدرب على الردود الدبلوماسية والحازمة لإيقاف المتنمر عند حده دون خسارة مهنيتك.</p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-100 transition-colors">
            <BrainCircuit size={20} />
          </div>
          <h3 className="font-bold text-slate-900 mb-2 text-lg">ذكاء عاطفي</h3>
          <p className="text-slate-500 text-sm">عزز مناعتك النفسية وتعلم كيف لا تأخذ الأمور السامة على محمل شخصي.</p>
        </div>
      </div>
      
    </div>
  );
};