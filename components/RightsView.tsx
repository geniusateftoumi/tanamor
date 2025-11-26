import React from 'react';
import { ChevronRight, HeartHandshake, Lock, UserCheck, Gavel, FileBadge, Ear } from 'lucide-react';

interface RightsViewProps {
  onBack: () => void;
}

export const RightsView: React.FC<RightsViewProps> = ({ onBack }) => {
  const rights = [
    {
      title: "الحق في السلامة النفسية",
      description: "لا يجوز تعريض الموظف لأي ضغط نفسي متعمد أو إهانات تمس كرامته أو تقلل من قدره أمام الآخرين، ويعد ذلك انتهاكاً لجوهر عقد العمل.",
      icon: <HeartHandshake className="text-rose-500" size={28} />,
      color: "bg-rose-50 border-rose-100"
    },
    {
      title: "الحق في الشكوى السرية",
      description: "من حق الموظف رفع تظلم ضد المتنمر (سواء كان مديراً أو زميلاً) مع ضمان سرية المعلومات وحماية الموظف من أي تشهير.",
      icon: <Lock className="text-slate-600" size={28} />,
      color: "bg-slate-50 border-slate-100"
    },
    {
      title: "الحماية من الإجراءات الانتقامية",
      description: "يمنع النظام صاحب العمل من اتخاذ أي إجراء عقابي (نقل، خصم، فصل) ضد الموظف لمجرد أنه تقدم بشكوى رسمية حول بيئة العمل.",
      icon: <ShieldCheck className="text-emerald-600" size={28} />,
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "الحق في الوصف الوظيفي الواضح",
      description: "من أشكال التنمر تكليف الموظف بمهام مستحيلة أو تافهة. من حقك التمسك بمهامك المحددة في العقد والوصف الوظيفي.",
      icon: <FileBadge className="text-blue-600" size={28} />,
      color: "bg-blue-50 border-blue-100"
    },
    {
      title: "الحق في جلسة استماع عادلة",
      description: "عند نشوب نزاع، يجب أن يحظى الموظف بفرصة كاملة للدفاع عن نفسه وسماع أقواله قبل اتخاذ أي قرار إداري ضده.",
      icon: <Ear className="text-amber-600" size={28} />,
      color: "bg-amber-50 border-amber-100"
    },
    {
      title: "الحق في بيئة خالية من التمييز",
      description: "التنمر القائم على النوع، العرق، أو الحالة الاجتماعية هو جريمة مزدوجة. لك الحق في معاملة متساوية تماماً مع أقرانك.",
      icon: <UserCheck className="text-indigo-600" size={28} />,
      color: "bg-indigo-50 border-indigo-100"
    }
  ];

  // ShieldCheck is imported but redefined locally to avoid conflict if not careful, 
  // but simpler to reuse from lucide-react import
  function ShieldCheck({ size, className }: { size: number, className?: string }) {
      return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
      )
  }

  return (
    <div className="flex flex-col h-full animate-slide-up w-full max-w-4xl mx-auto">
      {/* Header Area */}
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
         <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">حقوقك ضد التنمر</h2>
            <p className="text-slate-500">اعرف ما لك وما عليك لتعمل بثقة وأمان</p>
         </div>
         <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-5 py-2.5 rounded-full border border-slate-200 shadow-sm hover:shadow"
         >
            <ChevronRight size={18} />
            <span className="font-medium">العودة للرئيسية</span>
         </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        {rights.map((right, idx) => (
          <div 
            key={idx} 
            className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${right.color}`}
          >
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                {right.icon}
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">{right.title}</h3>
            <p className="text-slate-700 leading-relaxed text-sm opacity-90">
              {right.description}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action Box */}
      <div className="bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
            <Gavel className="mx-auto mb-4 text-brand-400" size={32} />
            <h3 className="text-2xl font-bold mb-2">هل تشعر أن حقوقك تنتهك؟</h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-6">
                لا تتردد في توثيق كل الحوادث (التاريخ، الوقت، الشهود) واستخدام قنوات التبليغ الرسمية في منشأتك.
            </p>
        </div>
      </div>
    </div>
  );
};