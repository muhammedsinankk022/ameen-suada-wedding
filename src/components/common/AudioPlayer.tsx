import React from "react";
import { Music, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";

interface AudioPlayerCardProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export const AudioPlayerCard: React.FC<AudioPlayerCardProps> = ({
  isPlaying,
  onToggle,
  className = "",
}) => {
  return (
    <div
      className={`w-full max-w-md mx-auto p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-[#EAD6BD]/60 shadow-[0_8px_24px_rgba(201,166,107,0.12)] flex items-center justify-between gap-4 transition-all hover:bg-white/90 ${className}`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            isPlaying
              ? "bg-[#A65368] text-white shadow-md shadow-[#A65368]/30"
              : "bg-[#F5DDE0] text-[#A65368]"
          }`}
        >
          <Music className={`w-5 h-5 ${isPlaying ? "animate-pulse" : ""}`} />
        </div>
        <div className="text-left">
          <p className="font-['Cinzel'] text-xs md:text-sm font-semibold tracking-wider text-[#4B342E]">
            <span className="text-[#A65368] font-bold">Romantic</span> Nasheed / Instrumental
          </p>
          <p className="font-['Montserrat'] text-[11px] text-[#6B524B]/80 mt-0.5">
            {WEDDING_CONFIG.audio.subtitle}
          </p>
        </div>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={onToggle}
        type="button"
        role="switch"
        aria-checked={isPlaying}
        aria-label="Toggle Islamic wedding music"
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C9A66B]/50 ${
          isPlaying ? "bg-[#A65368]" : "bg-[#EAD6BD]/80"
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
            isPlaying ? "translate-x-6 text-[#A65368]" : "translate-x-0 text-[#6B524B]"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          )}
        </div>
      </button>
    </div>
  );
};

interface FloatingAudioButtonProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggle: () => void;
  onMuteToggle: () => void;
}

export const FloatingAudioButton: React.FC<FloatingAudioButtonProps> = ({
  isPlaying,
  isMuted,
  onToggle,
  onMuteToggle,
}) => {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex items-center gap-2">
      {isPlaying && (
        <button
          onClick={onMuteToggle}
          type="button"
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#C9A66B]/40 text-[#4B342E] shadow-lg flex items-center justify-center hover:bg-white transition-all transform hover:scale-105"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#A65368]" />}
        </button>
      )}

      <button
        onClick={onToggle}
        type="button"
        aria-label={isPlaying ? "Pause music" : "Play peaceful wedding music"}
        className={`px-3.5 py-2.5 rounded-full backdrop-blur-md border border-[#C9A66B]/50 shadow-xl flex items-center gap-2 transition-all transform hover:scale-105 ${
          isPlaying
            ? "bg-[#A65368] text-white"
            : "bg-[#FFF8F1]/95 text-[#4B342E] hover:bg-[#FFF8F1]"
        }`}
      >
        <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
        <span className="font-['Cinzel'] text-xs font-semibold tracking-wider">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
      </button>
    </div>
  );
};
