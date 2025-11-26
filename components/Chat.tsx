import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Sparkles, RefreshCcw, ChevronRight, Shield, AlertTriangle, MessageSquare, Info } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/aiService';

interface ChatProps {
  onBack: () => void;
}

interface ChatBubbleProps {
  message: Message;
  animationDelay?: string;
}

// Sub-component for individual chat bubbles
const ChatBubble: React.FC<ChatBubbleProps> = ({ message, animationDelay }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div 
        className="flex w-full justify-center my-4 animate-slide-up opacity-0"
        style={{ animationDelay: animationDelay || '0ms', animationFillMode: 'forwards' }}
      >
        <div className="bg-brand-50 border border-brand-100 text-brand-800 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
          <Info size={14} />
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full mb-4 animate-slide-up opacity-0 ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
      style={{ animationDelay: animationDelay || '0ms', animationFillMode: 'forwards' }}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] px-5 py-4 shadow-sm leading-relaxed text-[15px] transition-all duration-200 ${
          isUser
            ? 'bg-slate-800 text-white rounded-2xl rounded-br-none hover:shadow-md'
            : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-bl-none'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export const Chat: React.FC<ChatProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "مرحباً بك في مساحتك الآمنة. أنا مدربك المهني. يمكننا إجراء 'محاكاة' لموقف تنمر تواجهه، أو يمكنني إعطاؤك نصائح حول كيفية التعامل مع شخصية صعبة في العمل. كيف أساعدك اليوم؟",
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const historyContext = messages.slice(-10);
    
    const responseText = await sendMessageToGemini(historyContext, userMsg.content);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleReset = () => {
    setMessages([
        {
          id: Date.now().toString(),
          role: 'system',
          content: 'بدأت جلسة محاكاة جديدة',
          timestamp: Date.now()
        },
        {
          id: 'welcome-new',
          role: 'model',
          content: "مرحباً بك مجدداً. ما هو التحدي الذي تود مناقشته الآن؟",
          timestamp: Date.now() + 1
        }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick Action Chips - Workplace Context
  const suggestions = [
    { label: "مدير متسلط", icon: <AlertTriangle size={14} />, prompt: "لنبدأ محاكاة: أنت مديري الذي يقلل من شأني أمام الفريق. كيف أرد؟" },
    { label: "سرقة أفكار", icon: <Shield size={14} />, prompt: "زميلي سرق فكرتي ونسبها لنفسه في الاجتماع. كيف أتصرف؟" },
    { label: "عزل اجتماعي", icon: <MessageSquare size={14} />, prompt: "أشعر أن فريقي يستبعدني من الغداء والاجتماعات غير الرسمية. ماذا أفعل؟" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-white max-w-4xl mx-auto shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:my-4 sm:h-[calc(100vh-100px)] overflow-hidden border border-slate-100 animate-slide-up font-sans">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm z-10">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-1 text-sm font-bold">
          <ChevronRight size={18} /> خروج
        </button>
        <span className="text-xs font-bold tracking-wider text-brand-700 uppercase bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
          محاكاة مهنية
        </span>
        <button 
            onClick={handleReset} 
            className="text-slate-400 hover:text-slate-800 transition-colors"
            title="جلسة جديدة"
        >
            <RefreshCcw size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide bg-slate-50/50">
        {messages.map((msg, index) => (
          <ChatBubble 
            key={msg.id} 
            message={msg} 
            // Stagger animation only for the first few messages (e.g. on reset) to keep chat snappy later
            animationDelay={index < 3 ? `${index * 0.15}s` : '0ms'}
          />
        ))}
        
        {isTyping && (
          <div className="flex w-full justify-start mb-4 animate-slide-up">
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 shadow-sm flex items-center gap-2">
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-white border-t border-slate-100 relative z-20">
        
        {/* Suggestion Chips */}
        {messages.filter(m => m.role !== 'system').length < 3 && !isTyping && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(s.prompt)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-brand-50 text-slate-600 hover:text-brand-700 border border-slate-200 hover:border-brand-200 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap animate-slide-up opacity-0"
                style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
              >
                {s.icon}
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative flex items-end gap-2 bg-slate-50 rounded-3xl p-2 border border-slate-200 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-50 transition-all duration-200">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            placeholder={isTyping ? "جارٍ كتابة الرد..." : "اشرح الموقف الذي تعرضت له..."}
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-3 max-h-32 text-slate-800 placeholder:text-slate-400 leading-normal text-right px-4 disabled:opacity-50"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <div className="p-1 text-slate-400">
            <Sparkles size={20} />
          </div>
          <button
            onClick={() => handleSend()}
            disabled={(!inputValue.trim() && !isTyping) || isTyping}
            className={`p-3 rounded-full mb-1 transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
              (inputValue.trim() || isTyping)
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isTyping ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowUp size={20} />
            )}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-3 font-medium">
          هذا التطبيق يقدم نصائح توجيهية فقط ولا يغني عن الاستشارة القانونية الرسمية.
        </p>
      </div>
    </div>
  );
};