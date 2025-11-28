import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCcw, ChevronRight, Trophy, Star, CheckCircle2, AlertTriangle, XCircle, TrendingUp, AlertOctagon, ThumbsUp, Printer, Share2 } from 'lucide-react';
import { Message, QuizScenario, QuizOption } from '../types';
import { generateGameScenario, GAME_THEMES } from '../services/aiService';
import { Button } from './Button';

interface ChatProps {
  onBack: () => void;
}

const TOTAL_QUESTIONS = 25;
const MAX_SCORE_PER_THEME = 50; // 5 questions * 10 points
const TOTAL_MAX_SCORE = 250;

export const Chat: React.FC<ChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentScenario, setCurrentScenario] = useState<QuizScenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<QuizOption | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  
  // Track decision quality stats
  const [decisionStats, setDecisionStats] = useState({
    positive: 0, // Score >= 7
    neutral: 0,  // Score 4-6
    negative: 0  // Score <= 3
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentScenario, showFeedback]);

  // Start game on mount
  useEffect(() => {
    loadNextQuestion(0);
  }, []);

  const loadNextQuestion = async (index: number) => {
    if (index >= TOTAL_QUESTIONS) {
      finishGame();
      return;
    }

    setLoading(true);
    setShowFeedback(null);
    setCurrentScenario(null);

    // Cycle through the 5 themes
    const themeIndex = index % GAME_THEMES.length;
    const theme = GAME_THEMES[themeIndex];

    // Extract previous scenarios to prevent repetition
    const previousScenarios = messages
      .filter(m => m.role === 'model')
      .map(m => m.content);

    try {
      const scenario = await generateGameScenario(index, theme, previousScenarios);
      
      setCurrentScenario(scenario);
      
      // Add scenario to chat history for visibility
      setMessages(prev => [
        ...prev, 
        {
          id: `q-${index}`,
          role: 'model',
          content: scenario.scenario_text,
          timestamp: Date.now()
        }
      ]);
      
      setQIndex(index);
    } catch (error) {
      console.error("Error loading question", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: QuizOption) => {
    if (!currentScenario) return;

    // Add user choice to history
    setMessages(prev => [
      ...prev,
      {
        id: `a-${qIndex}`,
        role: 'user',
        content: option.text,
        timestamp: Date.now()
      }
    ]);

    // Update Scores
    const newScores = { ...scores };
    const currentTheme = currentScenario.theme;
    newScores[currentTheme] = (newScores[currentTheme] || 0) + option.score;
    setScores(newScores);
    setTotalScore(prev => prev + option.score);

    // Update Decision Stats
    setDecisionStats(prev => ({
        positive: prev.positive + (option.score >= 7 ? 1 : 0),
        neutral: prev.neutral + (option.score >= 4 && option.score < 7 ? 1 : 0),
        negative: prev.negative + (option.score <= 3 ? 1 : 0)
    }));

    // Show Feedback
    setShowFeedback(option);
  };

  const handleNext = () => {
    // Add feedback to history before moving on (optional, keeps chat clean)
    if (showFeedback) {
        setMessages(prev => [
            ...prev,
            {
                id: `f-${qIndex}`,
                role: 'system',
                content: showFeedback.feedback,
                timestamp: Date.now()
            }
        ]);
    }
    loadNextQuestion(qIndex + 1);
  };

  const finishGame = () => {
    setGameFinished(true);
    setCurrentScenario(null);
    setShowFeedback(null);
  };

  const handleRestart = () => {
    setMessages([]);
    setScores({});
    setTotalScore(0);
    setQIndex(0);
    setDecisionStats({ positive: 0, neutral: 0, negative: 0 });
    setGameFinished(false);
    loadNextQuestion(0);
  };

  const handlePrint = () => {
    window.print();
  };

  // Render Functions
  const renderProgressBar = () => (
    <div className="w-full bg-slate-100 h-2 mt-0">
      <div 
        className="bg-brand-500 h-full transition-all duration-500 ease-out"
        style={{ width: `${((qIndex) / TOTAL_QUESTIONS) * 100}%` }}
      />
    </div>
  );

  if (gameFinished) {
    const successRate = Math.round((totalScore / TOTAL_MAX_SCORE) * 100);
    const today = new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
        <div className="max-w-4xl mx-auto w-full my-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 animate-slide-up print:shadow-none print:border-none print:m-0 print:max-w-none">
          
          {/* Header Report */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-display">تقرير تحليل الأداء</h1>
                <p className="text-indigo-100 text-lg">لعبة التعامل مع التنمر في بيئة العمل</p>
             </div>
          </div>

          {/* Date & Actions */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-slate-500 text-sm font-medium">
                تاريخ التقرير: <span className="text-slate-800 font-bold">{today}</span>
             </div>
             <div className="flex gap-2 print:hidden">
                <button onClick={handlePrint} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition-colors" title="طباعة التقرير">
                    <Printer size={20} />
                </button>
                <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-full transition-colors" title="مشاركة">
                    <Share2 size={20} />
                </button>
             </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-slate-50/50">
             {/* Total Score */}
             <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-indigo-500">
                <div className="text-slate-500 text-sm mb-2">إجمالي النقاط</div>
                <div className="text-3xl font-bold text-indigo-600">{totalScore}</div>
                <div className="text-xs text-slate-400 mt-1">من أصل {TOTAL_MAX_SCORE}</div>
             </div>

             {/* Positive Decisions */}
             <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-emerald-500">
                <div className="text-slate-500 text-sm mb-2">قرارات إيجابية</div>
                <div className="text-3xl font-bold text-emerald-600">{decisionStats.positive}</div>
                <div className="text-xs text-slate-400 mt-1">تصرفات سليمة</div>
             </div>

             {/* Negative Decisions */}
             <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-rose-500">
                <div className="text-slate-500 text-sm mb-2">قرارات سلبية</div>
                <div className="text-3xl font-bold text-rose-600">{decisionStats.negative}</div>
                <div className="text-xs text-slate-400 mt-1">تحتاج مراجعة</div>
             </div>

             {/* Success Rate */}
             <div className="bg-white p-6 rounded-xl shadow-sm border-r-4 border-purple-500">
                <div className="text-slate-500 text-sm mb-2">المعدل العام</div>
                <div className="text-3xl font-bold text-purple-600">{successRate}%</div>
                <div className="text-xs text-slate-400 mt-1">نسبة النجاح</div>
             </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-indigo-100 inline-block">
                📊 تحليل الأداء حسب نوع التنمر
            </h2>

            <div className="grid gap-4">
                {GAME_THEMES.map((theme, idx) => {
                    const score = scores[theme] || 0;
                    const percent = Math.round((score / MAX_SCORE_PER_THEME) * 100);
                    
                    let statusColor = "bg-slate-200";
                    let textColor = "text-slate-600";
                    let feedbackText = "";

                    if (percent >= 80) {
                        statusColor = "bg-emerald-500";
                        textColor = "text-emerald-600";
                        feedbackText = "أداء ممتاز! لديك وعي عالٍ في هذا الجانب.";
                    } else if (percent >= 50) {
                        statusColor = "bg-amber-500";
                        textColor = "text-amber-600";
                        feedbackText = "أداء جيد، ولكن انتبه لبعض التفاصيل الدقيقة.";
                    } else {
                        statusColor = "bg-rose-500";
                        textColor = "text-rose-600";
                        feedbackText = "يحتاج إلى تطوير. ننصح بمراجعة المواد التدريبية.";
                    }

                    return (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-lg text-slate-800">{theme}</span>
                                    <span className={`font-bold text-xl ${textColor}`}>{percent}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                                    <div className={`h-full ${statusColor}`} style={{ width: `${percent}%` }}></div>
                                </div>
                                <p className="text-sm text-slate-500">{feedbackText}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recommendations */}
            <div className="mt-8 bg-indigo-50/50 rounded-xl p-6 border border-indigo-100">
                <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center gap-2">
                    <Star className="fill-indigo-500 text-indigo-500" size={20}/>
                    التوصيات والملاحظات
                </h3>
                <ul className="space-y-3">
                    {successRate > 80 ? (
                        <li className="bg-white p-3 rounded-lg border-r-4 border-emerald-400 text-slate-700 shadow-sm text-sm">
                            🌟 مستواك متقدم جداً! يمكنك مساعدة زملائك في فهم كيفية التعامل مع هذه المواقف.
                        </li>
                    ) : successRate > 50 ? (
                        <li className="bg-white p-3 rounded-lg border-r-4 border-amber-400 text-slate-700 shadow-sm text-sm">
                            📚 لديك أساس جيد، لكنك تميل أحياناً للانفعال أو التردد. ركز على الثبات الانفعالي.
                        </li>
                    ) : (
                        <li className="bg-white p-3 rounded-lg border-r-4 border-rose-400 text-slate-700 shadow-sm text-sm">
                            🎓 ننصحك بشدة بمراجعة قسم "حقوقك" و "القوانين" لفهم الحماية القانونية المتاحة لك بشكل أفضل.
                        </li>
                    )}
                    <li className="bg-white p-3 rounded-lg border-r-4 border-indigo-400 text-slate-700 shadow-sm text-sm">
                        🔄 تذكر: التوثيق الكتابي هو سلاحك الأقوى في مواجهة التنمر الوظيفي المستمر.
                    </li>
                </ul>
            </div>

            {/* Footer Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center print:hidden">
                <Button onClick={handleRestart} className="bg-indigo-600 hover:bg-indigo-700">
                    <RefreshCcw size={18} className="ml-2" />
                    إعادة المحاكاة
                </Button>
                <Button variant="secondary" onClick={onBack}>
                    العودة للرئيسية
                </Button>
            </div>

          </div>
          
          <div className="bg-slate-800 text-slate-400 text-center py-4 text-xs">
            © 2025 بيئة عمل آمنة - تقرير تم إنشاؤه آلياً
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white max-w-4xl mx-auto shadow-2xl sm:rounded-2xl sm:my-4 sm:h-[calc(100vh-100px)] overflow-hidden border border-slate-100 animate-slide-up font-sans relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-sm z-10 sticky top-0">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 text-sm font-bold">
          <ChevronRight size={18} /> خروج
        </button>
        <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
             السؤال {qIndex + 1} من {TOTAL_QUESTIONS}
            </span>
            <div className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full mt-1">
                {currentScenario?.theme || 'جاري التحميل...'}
            </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">{totalScore}</span>
            <Star size={16} className="text-yellow-400" fill="currentColor"/>
        </div>
      </div>
      
      {renderProgressBar()}

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar bg-slate-50/50">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex w-full mb-4 animate-slide-up ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
             {msg.role === 'system' ? (
                 <div className="w-full bg-blue-50/80 border border-blue-100 text-blue-900 p-4 rounded-xl text-sm leading-relaxed flex items-start gap-3">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-blue-600" />
                    {msg.content}
                 </div>
             ) : (
                <div
                className={`max-w-[85%] px-5 py-4 shadow-sm leading-relaxed text-[15px] ${
                    msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-2xl rounded-br-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-none'
                }`}
                >
                {msg.content}
                </div>
             )}
          </div>
        ))}
        
        {loading && (
           <div className="flex w-full justify-start mb-4 animate-slide-up">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-2">
               <span className="text-sm text-slate-400">جاري إعداد الموقف...</span>
               <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
               </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Interaction Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-100 relative z-20">
        
        {/* Scenario Options */}
        {!loading && currentScenario && !showFeedback && (
            <div className="grid grid-cols-1 gap-3 animate-slide-up">
                {currentScenario.options?.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(option)}
                        className="text-right p-4 rounded-xl border-2 border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all duration-200 group relative overflow-hidden"
                    >
                        <div className="flex items-start gap-3 relative z-10">
                            <span className="bg-slate-100 text-slate-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 group-hover:bg-brand-200 group-hover:text-brand-800 transition-colors">
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-slate-700 font-medium group-hover:text-slate-900">{option.text}</span>
                        </div>
                    </button>
                ))}
            </div>
        )}

        {/* Feedback Display */}
        {showFeedback && (
            <div className="animate-slide-up">
                <div className={`p-5 rounded-xl border mb-4 ${
                    showFeedback.score >= 7 ? 'bg-green-50 border-green-200' :
                    showFeedback.score >= 4 ? 'bg-yellow-50 border-yellow-200' :
                    'bg-red-50 border-red-200'
                }`}>
                    <div className="flex items-center justify-between mb-2">
                         <span className={`font-bold text-sm ${
                            showFeedback.score >= 7 ? 'text-green-700' :
                            showFeedback.score >= 4 ? 'text-yellow-700' :
                            'text-red-700'
                         }`}>
                            {showFeedback.score >= 7 ? 'تصرف ممتاز!' : showFeedback.score >= 4 ? 'تصرف مقبول' : 'تصرف خاطئ'}
                         </span>
                         <span className="font-black text-lg text-slate-900">{showFeedback.score}/10</span>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">
                        {showFeedback.feedback}
                    </p>
                </div>
                <Button onClick={handleNext} className="w-full">
                    الموقف التالي
                    <ArrowLeft size={18} className="mr-2" />
                </Button>
            </div>
        )}

      </div>
    </div>
  );
};