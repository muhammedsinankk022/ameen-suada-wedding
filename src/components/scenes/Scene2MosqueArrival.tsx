import React from "react";
import { Clock } from "lucide-react";
import { BackgroundMonogram } from "../common/BackgroundMonogram";

export const Scene2MosqueArrival: React.FC = () => {
  return (
    <section
      id="scene-2"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-[#FFF8F1] overflow-hidden"
    >
      {/* Subtle Background Monogram */}
      <div className="absolute top-8 right-8 pointer-events-none opacity-20">
        <BackgroundMonogram size="sm" subtle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Prominent Time Marker */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FAF0F2] border border-[#C9A66B]/50 shadow-xs mb-4">
          <Clock className="w-4 h-4 text-[#C9A66B]" />
          <span className="font-['Cinzel'] text-sm sm:text-base font-bold tracking-widest text-[#4B342E]">
            10:00 AM
          </span>
        </div>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-xl sm:text-3xl font-bold text-[#4B342E] tracking-wider mb-2">
          Entering the Mosque
        </h2>

        {/* Scene Caption */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl text-[#A65368] max-w-lg mb-8 leading-relaxed">
          "A blessed morning. A gathering of families. A new chapter begins."
        </p>

        {/* Illustrated Kerala Mosque Cinematic Card */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_16px_50px_rgba(201,166,107,0.2)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="./assets/images/scene_mosque.jpg"
              alt="Mosque Arrival - Faceless Kerala Muslim guests greeting each other"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Subtle soft morning light gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 text-left text-white drop-shadow-md">
              <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                Kerala Mosque Courtyard
              </span>
              <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                Families arrive in traditional Kerala Muslim attire, exchanging heartfelt greetings and salam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
