import React, { useState } from 'react';
import { ChevronRight, HeartHandshake, Lock, UserCheck, Gavel, FileBadge, Ear, Share2, ShieldCheck, X, BookOpen, AlertCircle } from 'lucide-react';

interface RightsViewProps {
  onBack: () => void;
}

interface RightItem {
  title: string;
  description: string;
  detailedExplanation: string;
  legalContext: string;
  icon: React.ReactNode;
  color: string;
  iconColor: string;
}

export const RightsView: React.FC<RightsViewProps> = ({ onBack }) => {
  const [selectedRight, setSelectedRight] = useState<RightItem | null>(null);

  const handleShareRight = async (title: string, description: string) => {
    const shareData = {
      title: title,
      text: `${title}\n\n${description}\n\nتعرف على المزيد في تطبيق بيئة عمل آمنة.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`);
        alert('تم نسخ النص بنجاح!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const rights: RightItem[] = [
    {
      title: "الحق في السلامة النفسية",
      description: "لا يجوز تعريض الموظف لأي ضغط نفسي متعمد أو إهانات تمس كرامته.",
      detailedExplanation: "السلامة النفسية في بيئة العمل تعني أن يشعر الموظف بالأمان للتعبير عن نفسه دون خوف من العواقب السلبية على صورته الذاتية أو وضعه أو مسيرته المهنية. يشمل ذلك الحماية من الإهانات العلنية، والضغط غير المبرر، والبيئة السامة التي تؤدي إلى الاحتراق الوظيفي.",
      legalContext: "تُلزم أنظمة العمل صاحب العمل باتخاذ التدابير اللازمة لحماية الموظف من الإيذاء، وتعتبر أي تصرفات مخلة بالآداب أو السلوك الحسن تجاه الموظف مخالفة جسيمة قد تمنح الموظف حق ترك العمل مع التعويض.",
      icon: <HeartHandshake size={28} />,
      color: "bg-rose-50 border-rose-100 hover:border-rose-200",
      iconColor: "text-rose-500"
    },
    {
      title: "الحق في الشكوى السرية",
      description: "من حق الموظف رفع تظلم ضد المتنمر مع ضمان سرية المعلومات.",
      detailedExplanation: "يجب أن توفر المنشأة قنوات آمنة وسرية للإبلاغ عن المخالفات والتنمر. السرية تضمن عدم تعرض الموظف للإحراج أو الضغط من قبل زملائه أو مدرائه أثناء فترة التحقيق.",
      legalContext: "تكفل اللوائح التنظيمية للعمل حق العامل في التظلم، وتلزم إدارات الموارد البشرية بالتعامل مع الشكاوى بسرية تامة وموضوعية، ويعتبر إفشاء أسرار التحقيق مخالفة إدارية.",
      icon: <Lock size={28} />,
      color: "bg-slate-50 border-slate-100 hover:border-slate-200",
      iconColor: "text-slate-600"
    },
    {
      title: "الحماية من الإجراءات الانتقامية",
      description: "يمنع النظام اتخاذ أي إجراء عقابي ضد الموظف لمجرد تقديم شكوى.",
      detailedExplanation: "الانتقام الوظيفي هو أي إجراء سلبي يُتخذ ضد الموظف بسبب ممارسته لحق مشروع (مثل الشكوى). يشمل ذلك النقل التعسفي، تقليل المهام، الحرمان من الترقية، أو التقييم السيء غير المبرر.",
      legalContext: "يعتبر الفصل أو العقاب بسبب تقديم شكوى مشروعة 'فصلاً تعسفياً' أو إجراءً باطلاً بموجب القانون، ويستوجب تعويض الموظف وإلغاء العقوبة.",
      icon: <ShieldCheck size={28} />,
      color: "bg-emerald-50 border-emerald-100 hover:border-emerald-200",
      iconColor: "text-emerald-600"
    },
    {
      title: "الحق في الوصف الوظيفي الواضح",
      description: "من حقك التمسك بمهامك المحددة في العقد والوصف الوظيفي.",
      detailedExplanation: "التنمر قد يأتي بصورة تكليف الموظف بمهام أقل من مستواه (للإذلال) أو أعلى من طاقته (لتعجيزه). الوصف الوظيفي هو المرجع الأساسي الذي يحميك من هذه الممارسات.",
      legalContext: "لا يجوز لصاحب العمل تكليف العامل بعمل يختلف اختلافاً جوهرياً عن العمل المتفق عليه بغير موافقته الكتابية، إلا في حالات الضرورة القصوى والمؤقتة.",
      icon: <FileBadge size={28} />,
      color: "bg-blue-50 border-blue-100 hover:border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "الحق في جلسة استماع عادلة",
      description: "يجب أن يحظى الموظف بفرصة كاملة للدفاع عن نفسه قبل أي عقوبة.",
      detailedExplanation: "قبل اتخاذ أي إجراء تأديبي، يجب مواجهة الموظف بالمخالفة المنسوبة إليه، وتمكينه من شرح وجهة نظره، وتقديم أدلته. لا عقوبة بدون تحقيق.",
      legalContext: "لا يجوز توقيع جزاء على العامل إلا بعد إبلاغه كتابة بما نُسب إليه وسماع أقواله وتحقيق دفاعه وإثبات ذلك في محضر يودع في ملفه الخاص.",
      icon: <Ear size={28} />,
      color: "bg-amber-50 border-amber-100 hover:border-amber-200",
      iconColor: "text-amber-600"
    },
    {
      title: "الحق في بيئة خالية من التمييز",
      description: "لك الحق في معاملة متساوية تماماً مع أقرانك دون محاباة.",
      detailedExplanation: "يجب أن تكون الفرص الوظيفية والتدريب والترقيات مبنية على الكفاءة والجدارة فقط، وليس على العلاقات الشخصية أو العوامل الديموغرافية.",
      legalContext: "يحظر التمييز في الأجور أو المزايا بين العمال الذين يؤدون عملاً ذا قيمة متساوية، وتلتزم المنشأة بوضع سياسات تمنع التمييز بكافة أشكاله.",
      icon: <UserCheck size={28} />,
      color: "bg-indigo-50 border-indigo-100 hover:border-indigo-200",
      iconColor: "text-indigo-600"
    }
  ];

  return (
    <div className="flex flex-col h-full animate-slide-up w-full max-w-4xl mx-auto relative">
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
            onClick={() => setSelectedRight(right)}
            className={`relative p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group flex flex-col ${right.color}`}
          >
            {/* Share Button placed at Top Left (End side in RTL) */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleShareRight(right.title, right.description);
                }}
                className="absolute top-5 left-5 p-2 bg-white/60 hover:bg-white text-slate-400 hover:text-brand-600 rounded-full transition-all duration-200 shadow-sm border border-transparent hover:border-slate-100 z-10"
                title="مشاركة هذا الحق"
            >
                <Share2 size={18} />
            </button>

            <div className={`bg-white w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${right.iconColor}`}>
                {right.icon}
            </div>
            
            <h3 className="font-bold text-xl text-slate-900 mb-3 pr-2 group-hover:text-brand-700 transition-colors">{right.title}</h3>
            
            <p className="text-slate-700 leading-relaxed text-sm opacity-90 mb-6 flex-1">
              {right.description}
            </p>
            
            {/* Footer with Read More */}
            <div className="flex items-center justify-end border-t border-slate-900/5 pt-4 mt-auto">
                <div className="flex items-center text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity text-slate-700">
                    <span>اقرأ التفاصيل القانونية</span>
                    <ChevronRight size={14} className="rotate-180 mr-1" />
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Box */}
      <div className="bg-slate-900 rounded-3xl p-8 text-center text-white relative overflow-hidden mb-8">
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

      {/* Detail Modal */}
      {selectedRight && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedRight(null)}
          ></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className={`p-6 border-b border-slate-100 flex items-start justify-between ${selectedRight.color.split(' ')[0]}`}>
               <div className="flex items-center gap-4">
                 <div className={`p-3 bg-white rounded-xl shadow-sm ${selectedRight.iconColor}`}>
                    {selectedRight.icon}
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">{selectedRight.title}</h3>
               </div>
               <button 
                 onClick={() => setSelectedRight(null)}
                 className="p-2 bg-white/50 hover:bg-white rounded-full text-slate-500 hover:text-slate-900 transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
               <div className="mb-6">
                 <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3">
                    <BookOpen size={18} className="text-brand-600" />
                    التفاصيل والشرح
                 </h4>
                 <p className="text-slate-600 leading-loose text-sm">
                   {selectedRight.detailedExplanation}
                 </p>
               </div>

               <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                 <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-3 text-sm">
                    <AlertCircle size={16} />
                    السند النظامي والقانوني
                 </h4>
                 <p className="text-amber-900/80 leading-relaxed text-sm italic">
                   "{selectedRight.legalContext}"
                 </p>
               </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <button
                    onClick={() => handleShareRight(selectedRight.title, selectedRight.detailedExplanation)}
                    className="px-4 py-2 text-slate-600 hover:text-brand-600 font-medium text-sm flex items-center gap-2 transition-colors"
                >
                    <Share2 size={16} />
                    مشاركة
                </button>
                <button 
                  onClick={() => setSelectedRight(null)}
                  className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  فهمت
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};