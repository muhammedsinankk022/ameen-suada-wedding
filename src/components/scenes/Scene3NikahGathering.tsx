import React from "react";
import { BackgroundMonogram } from "../common/BackgroundMonogram";

export const Scene3NikahGathering: React.FC = () => {
  return (
    <section
      id="scene-3"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-[#FFF8F1] via-[#FAF0F2] to-[#FFF8F1] overflow-hidden"
    >
      {/* Background Monogram */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none opacity-15">
        <BackgroundMonogram size="md" subtle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Monogram Badge */}
        <span className="font-['Cinzel'] text-xs tracking-[0.3em] uppercase text-[#C9A66B] font-bold mb-1">
          The Solemn Covenant
        </span>

        {/* Names */}
        <h3 className="font-['Cinzel'] text-lg sm:text-2xl font-semibold text-[#4B342E] tracking-wider mb-2">
          Ameen & Suada
        </h3>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-[#A65368] tracking-wider mb-2">
          The Nikah Gathering
        </h2>

        {/* Scene Caption */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl text-[#4B342E] max-w-xl mb-8 leading-relaxed">
          "With the blessings of Allah, two lives begin a beautiful journey together."
        </p>

        {/* Illustrated Solemnisation Card */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_16px_50px_rgba(201,166,107,0.2)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="./assets/images/scene_nikah.jpg"
              alt="Nikah Ceremony Gathering - Groom, guardian wali, imam, and elders"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-left text-white drop-shadow-md">
              <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                Solemnisation & Consent
              </span>
              <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                The groom, guardian, imam, and elders gather in solemn dignity, raising hands in sincere dua for an eternal union.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
