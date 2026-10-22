import React from "react";
import { WEDDING_CONFIG } from "../../config/wedding.config";
import { BackgroundMonogram } from "../common/BackgroundMonogram";

export const Scene6RingCeremony: React.FC = () => {
  // Respect configurable toggle
  if (!WEDDING_CONFIG.features.enableRingCeremony) {
    return null;
  }

  return (
    <section
      id="scene-6"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-[#FFF8F1] overflow-hidden"
    >
      {/* Background Monogram */}
      <div className="absolute top-12 left-10 pointer-events-none opacity-20">
        <BackgroundMonogram size="sm" subtle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="font-['Cinzel'] text-xs tracking-[0.3em] uppercase text-[#C9A66B] font-bold mb-1">
          Cherished Tokens
        </span>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B342E] tracking-wider mb-2">
          The Ring Ceremony
        </h2>

        {/* Caption */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl text-[#A65368] max-w-lg mb-8 leading-relaxed">
          "A little symbol of love. A beautiful memory to cherish."
        </p>

        {/* Illustrated Rings Card */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_16px_50px_rgba(201,166,107,0.2)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="/assets/images/scene_rings.jpg"
              alt="The Wedding Rings - Clasped hands with bridal mehndi and antique gold rings"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-left text-white drop-shadow-md">
              <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                Symbols of Love
              </span>
              <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                Delicate henna adornment and antique gold bands resting softly amidst fragrant rose petals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
