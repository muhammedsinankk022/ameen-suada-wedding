import React from "react";
import { BackgroundMonogram } from "../common/BackgroundMonogram";
import { BrassLantern } from "../common/BrassLantern";

export const Scene4FamilyBlessings: React.FC = () => {
  return (
    <section
      id="scene-4"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-[#FFF8F1] overflow-hidden"
    >
      {/* Hanging Lantern Accent */}
      <div className="absolute top-0 right-10 z-10 hidden md:block">
        <BrassLantern size="md" chainLength={45} />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Subtle monogram */}
        <div className="mb-2">
          <BackgroundMonogram size="sm" subtle />
        </div>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B342E] tracking-wider mb-2">
          Family Blessings & Duas
        </h2>

        {/* Scene Caption */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl text-[#A65368] max-w-lg mb-8 leading-relaxed">
          "Surrounded by family, strengthened by faith, and blessed with duas."
        </p>

        {/* Illustrated Family Blessings Card */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_16px_50px_rgba(201,166,107,0.2)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="./assets/images/scene_blessings_v2.jpg"
              alt="Family Blessings - Elders and relatives offering duas and congratulations"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 text-left text-white drop-shadow-md">
              <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                Warmth & Togetherness
              </span>
              <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                Beloved elders and relatives offer heartfelt prayers, joyful congratulations, and warm embraces to both families.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
