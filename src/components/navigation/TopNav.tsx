import React, { useState } from "react";
import { Menu, X, MapPin, Camera, Volume2, VolumeX, Eye } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";

interface TopNavProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onJumpToScene: (sceneId: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  isPlaying,
  onToggleMusic,
  reducedMotion,
  onToggleReducedMotion,
  onJumpToScene,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const scenes = [
    { id: "scene-1", title: "1. The Opening (A ♥ S)" },
    { id: "scene-2", title: "2. Entering the Mosque" },
    { id: "scene-3", title: "3. The Nikah Gathering" },
    { id: "scene-4", title: "4. Family Blessings" },
    { id: "scene-5", title: "5. The Bride & Groom" },
    { id: "scene-6", title: "6. The Ring Ceremony" },
    { id: "scene-7", title: "7. Shubham Auditorium" },
    { id: "scene-8", title: "8. Family Album" },
    { id: "scene-9", title: "9. Guest Memories & Uploads" },
    { id: "scene-10", title: "10. Save the Date Invitation" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onJumpToScene(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 flex items-center justify-between pointer-events-none">
        {/* Top-left Menu button (exact aesthetic from reference image) */}
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Open wedding story chapters"
          className="pointer-events-auto w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-md border border-[#EAD6BD] text-[#4B342E] shadow-sm flex items-center justify-center hover:bg-white hover:border-[#C9A66B] transition-all transform hover:scale-105 active:scale-95"
        >
          <Menu className="w-5 h-5 text-[#4B342E]" />
        </button>

        {/* Center Golden Crescent Moon & Star */}
        <div className="flex flex-col items-center select-none pointer-events-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-[#EAD6BD]/40 text-[#C9A66B] shadow-xs">
            <span className="text-sm">🌙</span>
            <span className="font-['Cinzel'] text-xs font-semibold tracking-wider text-[#4B342E]">
              A <span className="text-[#A65368]">♥</span> S
            </span>
          </div>
        </div>

        {/* Top-right Quick Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={onToggleMusic}
            type="button"
            aria-label={isPlaying ? "Mute music" : "Play music"}
            className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md border border-[#EAD6BD] text-[#4B342E] shadow-sm flex items-center justify-center hover:bg-white hover:border-[#C9A66B] transition-all"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-[#A65368] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#6B524B]/70" />
            )}
          </button>
        </div>
      </header>

      {/* Slide-out Chapters Navigation Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#4B342E]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-xs md:max-w-sm bg-[#FFF8F1] h-full shadow-2xl flex flex-col z-10 border-r border-[#C9A66B]/30 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAD6BD]">
              <div>
                <p className="font-['Amiri'] text-lg text-[#C9A66B]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <h3 className="font-['Cinzel'] text-sm font-bold text-[#4B342E] tracking-wider">
                  Wedding Story Chapters
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-[#F5DDE0] text-[#4B342E] flex items-center justify-center hover:bg-[#A65368] hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter Links */}
            <div className="mt-5 space-y-1.5 flex-1">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => handleNavClick(scene.id)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-[#F5DDE0]/70 text-[#4B342E] font-['Cinzel'] text-xs font-medium tracking-wide flex items-center justify-between group transition-all"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    {scene.title}
                  </span>
                  <span className="text-[#C9A66B] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Action Shortcuts */}
            <div className="pt-4 border-t border-[#EAD6BD] space-y-2">
              <a
                href={WEDDING_CONFIG.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-[#A65368] text-white flex items-center justify-center gap-2 text-xs font-['Cinzel'] tracking-wider shadow-sm hover:bg-[#8D3F53] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Venue Directions</span>
              </a>

              <button
                onClick={() => handleNavClick("scene-9")}
                className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#C9A66B]/50 text-[#4B342E] flex items-center justify-center gap-2 text-xs font-['Cinzel'] tracking-wider hover:bg-[#FFF8F1] transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-[#A65368]" />
                <span>Upload Guest Photos</span>
              </button>

              {/* Reduced Motion Toggle */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#6B524B]">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#C9A66B]" />
                  Reduced Motion
                </span>
                <button
                  onClick={onToggleReducedMotion}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                    reducedMotion ? "bg-[#A65368]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                      reducedMotion ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
