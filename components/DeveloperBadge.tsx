import React from 'react';
import { Star } from 'lucide-react';

interface DeveloperBadgeProps {
  className?: string;
}

export const DeveloperBadge: React.FC<DeveloperBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`relative group cursor-default select-none transform hover:scale-105 transition-transform duration-300 ${className}`}>
      <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative bg-[#5594d8] text-white px-8 py-3 rounded-lg shadow-lg border-b-4 border-[#3e7ab9] flex flex-col items-center min-w-[220px]">
        <div className="flex items-center gap-3 mb-1">
          <Star size={12} fill="white" className="text-white animate-pulse" />
          <span className="font-display font-black text-xl tracking-wider uppercase drop-shadow-sm whitespace-nowrap">ATEF TOUMI</span>
          <Star size={12} fill="white" className="text-white animate-pulse" />
        </div>
        <div className="w-full h-[1px] bg-blue-300/50 mb-1"></div>
        <span className="text-[11px] font-sans font-medium text-blue-50 uppercase tracking-[0.2em]">Telecom Engineer</span>
      </div>
    </div>
  );
};