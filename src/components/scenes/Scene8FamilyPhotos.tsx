import React, { useState } from "react";
import { Camera } from "lucide-react";
import { BackgroundMonogram } from "../common/BackgroundMonogram";

interface Scene8FamilyPhotosProps {
  onTransitionToGuestGallery: () => void;
}

export const Scene8FamilyPhotos: React.FC<Scene8FamilyPhotosProps> = ({
  onTransitionToGuestGallery,
}) => {
  const [flash, setFlash] = useState(false);

  const triggerCameraFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <section
      id="scene-8"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-[#FFF8F1] overflow-hidden"
    >
      {/* Camera Flash Overlay */}
      {flash && (
        <div className="fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-500 opacity-90 animate-out fade-out" />
      )}

      {/* Background Monogram */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-20">
        <BackgroundMonogram size="sm" subtle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="font-['Cinzel'] text-xs tracking-[0.3em] uppercase text-[#C9A66B] font-bold mb-1">
          Cherished Portraits
        </span>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B342E] tracking-wider mb-2">
          Family Photographs
        </h2>

        {/* Caption */}
        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-xl text-[#A65368] max-w-lg mb-6 leading-relaxed">
          "Every smile. Every dua. Every memory."
        </p>

        {/* Illustrated Family Portrait Album Frame */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_20px_60px_rgba(201,166,107,0.25)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="/assets/images/scene_family_photo.jpg"
              alt="Family Photo Album - Faceless Kerala Muslim couple and family portraits"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

            {/* Camera flash button trigger */}
            <div className="absolute top-4 right-4">
              <button
                onClick={triggerCameraFlash}
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C9A66B] text-[#4B342E] flex items-center gap-1.5 text-xs font-['Cinzel'] shadow-md hover:bg-white transition-all transform hover:scale-105"
              >
                <Camera className="w-3.5 h-3.5 text-[#A65368]" />
                <span>Snap Memory</span>
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-left text-white drop-shadow-md">
              <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                The Blessed Gathering
              </span>
              <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                Surrounded by parents, siblings, elders, and loved ones sharing endless prayers and radiant warmth.
              </p>
            </div>
          </div>
        </div>

        {/* Transition cue to guest gallery */}
        <div className="mt-8">
          <button
            onClick={onTransitionToGuestGallery}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-[#C9A66B]/60 text-[#4B342E] text-xs font-['Cinzel'] font-semibold tracking-wider hover:bg-[#FAF0F2] hover:border-[#A65368] transition-all transform hover:scale-105 shadow-xs"
          >
            <span>Explore Guest Memories & Uploads</span>
            <span className="text-[#A65368]">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
