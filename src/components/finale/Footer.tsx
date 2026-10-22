import React from "react";
import { Heart, MessageCircle } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10 px-4 text-center bg-gradient-to-b from-transparent via-[#F5DDE0]/30 to-[#F5DDE0]/70 border-t border-[#EAD6BD]/50 mt-16">
      <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Monogram emblem */}
        <div className="flex items-center gap-2 text-[#C9A66B]">
          <span className="w-8 h-[1px] bg-[#C9A66B]/40" />
          <span className="font-['Cinzel'] text-xs font-semibold tracking-widest text-[#4B342E]">
            AMEEN & SUADA
          </span>
          <span className="w-8 h-[1px] bg-[#C9A66B]/40" />
        </div>

        <p className="font-['Amiri'] text-sm text-[#4B342E]/80">
          جَزَاكُمُ اللَّهُ خَيْرًا
        </p>

        {/* Creator WhatsApp Contact Button */}
        <a
          href={WEDDING_CONFIG.creator.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#C9A66B]/40 text-[#4B342E] shadow-sm hover:border-[#A65368] hover:bg-white transition-all transform hover:scale-105 text-xs font-['Montserrat'] font-medium"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Contact Creator on WhatsApp</span>
        </a>

        {/* Tasteful Creator Credit */}
        <p className="font-['Montserrat'] text-[11px] text-[#6B524B] tracking-wide flex items-center justify-center gap-1.5 pt-2">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#A65368] fill-current animate-pulse" />
          <span>by</span>
          <span className="font-semibold text-[#4B342E]">{WEDDING_CONFIG.creator.name}</span>
        </p>

        <p className="text-[10px] text-[#6B524B]/60 font-['Montserrat']">
          Sunday, 8 November 2026 • Shubham Auditorium, Elamkulam
        </p>
      </div>
    </footer>
  );
};
