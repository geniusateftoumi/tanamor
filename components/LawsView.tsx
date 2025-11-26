import React from 'react';
import { ChevronRight, Scale, BookOpen, Shield, FileText, AlertCircle } from 'lucide-react';

interface LawsViewProps {
  onBack: () => void;
}

export const LawsView: React.FC<LawsViewProps> = ({ onBack }) => {
  const laws = [
    {
      title: "المادة الأولى: الحق في الكرامة",
      description: "لكل موظف الحق في أن يعامل بكرامة واحترام. يُحظر أي شكل من أشكال الإيذاء الجسدي أو النفسي أو اللفظي من قبل صاحب العمل أو الزملاء.",
      icon: <Shield className="text-brand-600" size={24} />
    },
    {
      title: "المادة الثانية: حماية السلامة المهنية",
      description: "يلتزم صاحب العمل بتوفير بيئة عمل خالية من المخاطر التي تهدد الصحة الجسدية والنفسية للموظفين، واتخاذ التدابير اللازمة للوقاية منها.",
      icon: <Scale className="text-blue-600" size={24} />
    },
    {
      title: "المادة الثالثة: حظر التمييز",
      description: "يُمنع التمييز بين العمال على أساس العرق، اللون، الجنس، السن، أو الحالة الاجتماعية، بما يضمن تكافؤ الفرص في التوظيف والترقية.",
      icon: <BookOpen className="text-purple-600" size={24} />
    },
    {
      title: "المادة الرابعة: إجراءات التظلم",
      description: "يحق للموظف الذي يتعرض للتنمر أو المضايقة رفع شكوى رسمية للإدارة أو الجهات المختصة دون الخوف من أي إجراءات انتقامية أو فصل تعسفي.",
      icon: <FileText className="text-orange-600" size={24} />
    }
  ];

  return (
    <div className="flex flex-col h-full animate-slide-up w-full max-w-4xl mx-auto">
      {/* Header Area */}
      <div className="mb-8 flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">قوانين ولوائح العمل</h2>
            <p className="text-slate-500">مبادئ عامة لحماية الموظف وضمان بيئة عمل آمنة</p>
         </div>
         <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow"
         >
            <ChevronRight size={18} />
            <span>عودة</span>
         </button>
      </div>

      {/* Grid of Laws */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {laws.map((law, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-brand-50 transition-colors">
                {law.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{law.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {law.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer Box */}
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-4 items-start">
        <AlertCircle className="text-amber-600 flex-shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-amber-800 text-sm mb-1">تنويه قانوني</h4>
          <p className="text-amber-700 text-sm leading-relaxed">
            هذه النصوص هي ملخصات استرشادية تعتمد على المبادئ العامة لقوانين العمل الدولية والمحلية. للحصول على الاستشارات القانونية الدقيقة، يرجى مراجعة نظام العمل المعتمد في بلدك أو استشارة محامٍ مختص.
          </p>
        </div>
      </div>
    </div>
  );
};