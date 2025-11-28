import React from 'react';
import { ChevronRight, User, Award, Clock, Settings, LogOut, BarChart3, CheckCircle2, Lock, PlayCircle, BookOpen, Zap, Trophy, Calendar, Target, Check, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface ProfileViewProps {
  onBack: () => void;
}

// Sub-component for the confetti/firework effect
const CelebrationParticles = () => {
  // Generate particles with random directions (css variables handled via style)
  const particles = [
    { tx: '20px', ty: '-30px', color: 'bg-green-400', delay: '0ms' },
    { tx: '-20px', ty: '-30px', color: 'bg-blue-400', delay: '100ms' },
    { tx: '30px', ty: '0px', color: 'bg-yellow-400', delay: '50ms' },
    { tx: '-30px', ty: '0px', color: 'bg-red-400', delay: '150ms' },
    { tx: '15px', ty: '25px', color: 'bg-purple-400', delay: '200ms' },
    { tx: '-15px', ty: '25px', color: 'bg-orange-400', delay: '250ms' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full opacity-0 animate-firework ${p.color}`}
          style={{
            '--tx': p.tx,
            '--ty': p.ty,
            animationDelay: p.delay
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export const ProfileView: React.FC<ProfileViewProps> = ({ onBack }) => {
  const trainingModules = [
    {
      id: 1,
      title: "أساسيات بيئة العمل الآمنة",
      description: "مفاهيم التنمر الوظيفي وكيفية اكتشافه مبكراً",
      progress: 100,
      status: 'completed',
      duration: '30 دقيقة'
    },
    {
      id: 2,
      title: "فنون الرد الدبلوماسي",
      description: "كيف تضع حدوداً دون خسارة مهنيتك أو هدوئك",
      progress: 45,
      status: 'in-progress',
      duration: '45 دقيقة'
    },
    {
      id: 3,
      title: "الحقوق والإجراءات القانونية",
      description: "طرق التوثيق ورفع الشكاوى الرسمية بشكل صحيح",
      progress: 0,
      status: 'locked',
      duration: '60 دقيقة'
    }
  ];

  const simulationHistory = [
    { id: 1, title: 'التعامل مع المدير المتسلط', date: '10 مارس 2024', score: 85, feedback: 'ممتاز' },
    { id: 2, title: 'الرد على الشائعات', date: '12 مارس 2024', score: 62, feedback: 'جيد' },
    { id: 3, title: 'تجاهل الاستفزاز اللفظي', date: '15 مارس 2024', score: 94, feedback: 'رائع' },
    { id: 4, title: 'الإبلاغ عن مخالفة أخلاقية', date: '18 مارس 2024', score: 88, feedback: 'متميز' },
    { id: 5, title: 'إدارة الغضب أثناء الاجتماع', date: '20 مارس 2024', score: 50, feedback: 'يحتاج تدريب' },
  ];

  // Calculate Overall Progress
  const totalModules = trainingModules.length;
  const overallProgress = Math.round(trainingModules.reduce((acc, curr) => acc + curr.progress, 0) / totalModules);

  return (
    <div className="flex flex-col h-full animate-slide-up w-full max-w-4xl mx-auto">
      {/* Header Area */}
      <div className="mb-8 flex items-center justify-between">
         <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-2">الملف الشخصي</h2>
            <p className="text-slate-500">متابعة تطورك المهني وإعدادات الحساب</p>
         </div>
         <button 
            onClick={onBack} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow"
         >
            <ChevronRight size={18} />
            <span>عودة</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar / User Card */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center sticky top-24">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 ring-4 ring-slate-50 relative">
              <User size={40} />
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-1">موظف طموح</h3>
            <p className="text-sm text-slate-500 mb-6">عضو منذ 2024</p>
            
            {/* Level Progress */}
            <div className="mb-6 bg-slate-50 p-4 rounded-2xl text-right">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Target size={14} className="text-brand-600"/> المستوى 3
                </span>
                <span className="text-brand-600 font-bold">1250 XP</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-1">
                <div className="bg-gradient-to-r from-brand-400 to-brand-600 h-full rounded-full" style={{ width: '62%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400">750 نقطة للوصول للمستوى التالي</p>
            </div>

            {/* Overall Course Progress */}
            <div className="mb-8 pt-6 border-t border-slate-100 text-right">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700">إنجاز المسار التدريبي</span>
                <span className="text-2xl font-bold text-slate-900">{overallProgress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="bg-slate-900 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button className="w-full py-2 px-4 rounded-xl bg-slate-50 text-slate-700 font-medium text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                <Settings size={16} />
                تعديل البيانات
              </button>
              <button className="w-full py-2 px-4 rounded-xl text-rose-600 font-medium text-sm hover:bg-rose-50 transition-colors flex items-center justify-center gap-2">
                <LogOut size={16} />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-brand-200 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                  <Award size={20} />
                </div>
                <span className="text-sm text-slate-500 font-medium">المحاكاة المكتملة</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">3</p>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Clock size={20} />
                </div>
                <span className="text-sm text-slate-500 font-medium">ساعات التدريب</span>
              </div>
              <p className="text-3xl font-bold text-slate-900">1.5</p>
            </div>
          </div>

          {/* Training Path Section - Enhanced Stepper */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex items-center justify-between mb-8">
              <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <BookOpen size={20} className="text-brand-500" />
                مسار التدريب
              </h4>
              <span className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1 rounded-full">
                 {trainingModules.filter(m => m.status === 'completed').length} / {trainingModules.length} محطات
              </span>
            </div>

            <div className="relative pr-4">
              {trainingModules.map((module, index) => {
                const isLast = index === trainingModules.length - 1;
                const isCompleted = module.status === 'completed';
                const isInProgress = module.status === 'in-progress';
                const isLocked = module.status === 'locked';

                return (
                  <div key={module.id} className="relative mb-8 last:mb-0">
                    {/* Connecting Line */}
                    {!isLast && (
                      <div className={`absolute top-10 bottom-[-32px] right-[19px] w-0.5 z-0 ${
                        isCompleted ? 'bg-green-200' : 'bg-slate-100'
                      }`}></div>
                    )}

                    <div className="flex gap-6 relative z-10">
                      {/* Icon Indicator */}
                      <div className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-500 border-green-100 text-white shadow-md shadow-green-100 animate-pop-in' 
                          : isInProgress 
                            ? 'bg-white border-brand-100 text-brand-600 ring-4 ring-brand-50' 
                            : 'bg-slate-100 border-slate-50 text-slate-400'
                      }`}>
                        {/* Celebration effect only for completed items */}
                        {isCompleted && <CelebrationParticles />}
                        
                        {isCompleted && <Check size={18} strokeWidth={3} className="relative z-10" />}
                        {isInProgress && <PlayCircle size={20} className="fill-brand-50" />}
                        {isLocked && <Lock size={16} />}
                      </div>

                      {/* Content Card */}
                      <div className={`flex-1 p-5 rounded-2xl border transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-50/30 border-green-100' 
                          : isInProgress 
                            ? 'bg-white border-brand-200 shadow-md ring-1 ring-brand-100' 
                            : 'bg-slate-50 border-slate-100 opacity-80 grayscale-[0.5]'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h5 className={`font-bold text-base ${isLocked ? 'text-slate-500' : 'text-slate-900'}`}>
                            {module.title}
                          </h5>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                             isCompleted ? 'bg-green-100 text-green-700' : 
                             isInProgress ? 'bg-brand-100 text-brand-700' : 
                             'bg-slate-200 text-slate-500'
                          }`}>
                            {module.duration}
                          </span>
                        </div>
                        
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                          {module.description}
                        </p>
                        
                        {/* Progress or Status Action */}
                        {!isLocked && (
                          <div className="space-y-3">
                            <div className="flex justify-between text-xs font-bold mb-1">
                              <span className={isCompleted ? "text-green-600" : "text-brand-600"}>
                                {isCompleted ? 'مكتمل' : 'قيد التقدم'}
                              </span>
                              <span>{module.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-700 ${
                                  isCompleted ? 'bg-green-500' : 'bg-brand-500'
                                }`}
                                style={{ width: `${module.progress}%` }}
                              ></div>
                            </div>
                            
                            {isInProgress && (
                                <button className="w-full mt-2 py-2 text-sm font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group">
                                    <span>متابعة الدرس</span>
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
                                </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simulation History & Progress */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                أداء المحاكاة الأخيرة
              </h4>
            </div>
            
            <div className="space-y-4">
              {simulationHistory.map((sim) => (
                <div key={sim.id} className="border border-slate-50 bg-slate-50/50 rounded-xl p-4 hover:border-slate-200 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-slate-800 text-sm">{sim.title}</h5>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar size={12} />
                      {sim.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white rounded-full h-2 border border-slate-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          sim.score >= 90 ? 'bg-green-500' : 
                          sim.score >= 70 ? 'bg-brand-500' : 
                          'bg-amber-500'
                        }`} 
                        style={{ width: `${sim.score}%` }}
                      ></div>
                    </div>
                    <span className={`text-xs font-bold w-8 text-left ${
                       sim.score >= 90 ? 'text-green-600' : 
                       sim.score >= 70 ? 'text-brand-600' : 
                       'text-amber-600'
                    }`}>
                      {sim.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Progress Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <BarChart3 size={20} className="text-purple-500" />
                تحليل المهارات
              </h4>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">التحكم في الانفعالات</span>
                  <span className="font-bold text-slate-900">75%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-400 to-brand-600 w-[75%] rounded-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-800 font-bold flex items-center gap-2">
                    التواصل الحازم
                    <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> التركيز الحالي
                    </span>
                  </span>
                  <span className="font-bold text-brand-600">65%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(251,146,60,0.4)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">معرفة القوانين</span>
                  <span className="font-bold text-slate-900">60%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 w-[60%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm mb-4">أكمل المزيد من سيناريوهات المحاكاة لرفع مستوى مهاراتك</p>
              <Button size="sm" onClick={onBack} variant="secondary" className="w-full sm:w-auto">
                العودة للتدريب
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};