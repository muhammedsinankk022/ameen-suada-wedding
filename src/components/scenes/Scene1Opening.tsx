import React from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { BismillahCalligraphy } from "../common/BismillahCalligraphy";
import { BackgroundMonogram } from "../common/BackgroundMonogram";
import { BrassLantern } from "../common/BrassLantern";

interface Scene1OpeningProps {
  onEnterStory: () => void;
}

export const Scene1Opening: React.FC<Scene1OpeningProps> = ({ onEnterStory }) => {
  return (
    <section
      id="scene-1"
      className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-4 bg-gradient-to-b from-[#FFF8F1] via-[#FAF0F2] to-[#FFF8F1] text-center overflow-hidden"
    >
      {/* Hanging Brass Lanterns */}
      <div className="absolute top-0 left-6 sm:left-16 z-10">
        <BrassLantern size="md" chainLength={50} />
      </div>
      <div className="absolute top-0 right-6 sm:right-16 z-10">
        <BrassLantern size="lg" chainLength={30} />
      </div>

      {/* Top Header: Bismillah */}
      <div className="pt-8 sm:pt-12 z-20">
        <BismillahCalligraphy size="lg" />
      </div>

      {/* Central Majestic Initials Reveal: S ♥ A */}
      <div className="relative my-auto flex flex-col items-center justify-center z-20 max-w-lg px-4">
        {/* Subtle background monogram aura */}
        <div className="absolute -inset-10 flex items-center justify-center pointer-events-none opacity-40">
          <BackgroundMonogram size="hero" subtle={false} />
        </div>

        {/* Revealed Initials in antique gold with glow: A ♥ S */}
        <div className="relative flex items-center justify-center gap-3 font-['Cinzel'] text-6xl sm:text-7xl lg:text-8xl font-bold tracking-widest text-[#C9A66B] drop-shadow-[0_4px_24px_rgba(201,166,107,0.4)] animate-soft-glow">
          <span>A</span>
          <span className="text-[#A65368] text-[0.65em] animate-pulse">♥</span>
          <span>S</span>
        </div>

        <h1 className="font-['Cinzel'] text-sm sm:text-base tracking-[0.3em] uppercase text-[#4B342E] font-semibold mt-4">
          Ameen & Suada
        </h1>

        {/* Story subtitle */}
        <p className="font-['Cormorant_Garamond'] italic text-lg sm:text-2xl text-[#A65368] mt-3 font-medium">
          Two families. One beautiful beginning.
        </p>

        <p className="font-['Montserrat'] text-xs text-[#6B524B] mt-2 max-w-xs leading-relaxed">
          Sunday, 8 November 2026 • Shubham Auditorium, Elamkulam
        </p>

        {/* "Enter the Wedding Story" Button */}
        <div className="mt-8">
          <button
            onClick={onEnterStory}
            type="button"
            className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#A65368] via-[#8E4356] to-[#A65368] text-white font-['Cinzel'] text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-[0_8px_30px_rgba(166,83,104,0.35)] hover:shadow-[0_12px_40px_rgba(166,83,104,0.5)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#E5CF9F] group-hover:rotate-12 transition-transform" />
            <span>Enter the Wedding Story</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>

          <p className="font-['Montserrat'] text-[11px] text-[#A65368] font-medium mt-2.5 flex items-center justify-center gap-1.5">
            <span>🎵 Tap anywhere to start with peaceful music</span>
          </p>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="pb-4 z-20 flex flex-col items-center text-[#6B524B] opacity-75">
        <p className="font-['Montserrat'] text-[10px] tracking-widest uppercase mb-1">
          Scroll to explore the journey
        </p>
        <div className="w-5 h-8 rounded-full border border-[#C9A66B] flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-[#A65368] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
