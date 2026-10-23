import React, { useState, useRef, useEffect } from "react";
import { Calendar, Clock, MapPin, Camera, RefreshCw, X, Maximize2 } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";
import { BismillahCalligraphy } from "../common/BismillahCalligraphy";
import { BrassLantern } from "../common/BrassLantern";
import { BackgroundMonogram } from "../common/BackgroundMonogram";
import { CountdownTimer } from "../finale/CountdownTimer";
import { ActionButtons } from "../finale/ActionButtons";
import { AudioPlayerCard } from "../common/AudioPlayer";
import { Footer } from "../finale/Footer";

interface Scene10InvitationCardProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onOpenGuestMemories: () => void;
}

export const Scene10InvitationCard: React.FC<Scene10InvitationCardProps> = ({
  isPlaying,
  onToggleMusic,
  onOpenGuestMemories,
}) => {
  // Precious moments real image upload state
  const [preciousPhoto, setPreciousPhoto] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("suada_ameen_precious_photo");
      if (saved) {
        setPreciousPhoto(saved);
      }
    } catch {}
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreciousPhoto(result);
      try {
        localStorage.setItem("suada_ameen_precious_photo", result);
      } catch {}
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreciousPhoto(null);
    try {
      localStorage.removeItem("suada_ameen_precious_photo");
    } catch {}
  };

  const displayImageSrc = preciousPhoto || "./assets/images/scene_couple.jpg";

  return (
    <section
      id="scene-10"
      className="relative min-h-screen py-16 px-3 sm:px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF0F2] via-[#FFF8F1] to-[#FAF0F2] overflow-hidden"
    >
      {/* Background subtle monogram watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <BackgroundMonogram size="hero" subtle />
      </div>

      {/* Decorative Hanging Lanterns on top corners */}
      <div className="absolute top-0 left-4 sm:left-12 z-20 hidden sm:block">
        <BrassLantern size="md" chainLength={50} />
      </div>
      <div className="absolute top-0 right-4 sm:right-12 z-20 hidden sm:block">
        <BrassLantern size="lg" chainLength={35} />
      </div>

      {/* Hidden file input for uploading real precious moment image */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* The Master Invitation Card Frame */}
      <div className="relative w-full max-w-[480px] mx-auto rounded-[36px] bg-[#FFF8F1] border-2 border-[#C9A66B]/50 shadow-[0_20px_60px_rgba(201,166,107,0.22)] p-5 sm:p-8 text-center overflow-hidden">
        {/* Ornate Scalloped Arch border inside card */}
        <div className="absolute inset-2 sm:inset-3 border border-[#C9A66B]/35 rounded-[30px] pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#EAD6BD]/60 rounded-[26px] pointer-events-none" />

        {/* Golden Islamic Arch Crest Header */}
        <div className="relative flex flex-col items-center pt-2 sm:pt-4">
          {/* Crescent & Star */}
          <div className="text-xl sm:text-2xl mb-1 text-[#C9A66B] animate-pulse">
            🌙
          </div>

          {/* Bismillah Calligraphy */}
          <BismillahCalligraphy size="md" />

          {/* Invitation Opening */}
          <div className="mt-4 space-y-1">
            <p className="font-['Cinzel'] text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#C9A66B] uppercase">
              With the blessings of Allah
            </p>
            <p className="font-['Cinzel'] text-[10px] sm:text-[11px] tracking-wider text-[#6B524B] uppercase">
              You are joyfully invited to the Nikah Ceremony of
            </p>
          </div>

          {/* Couple Names in Exquisite Flowing Typography: Ameen & Suada */}
          <div className="my-5 relative w-full">
            <h1 className="font-['Alex_Brush'] text-5xl sm:text-6xl text-[#A65368] drop-shadow-xs select-none tracking-wide">
              Ameen
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#C9A66B]" />
              <span className="font-['Cinzel'] text-xl sm:text-2xl text-[#C9A66B] font-light">
                &
              </span>
              <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#C9A66B]" />
            </div>
            <h1 className="font-['Alex_Brush'] text-5xl sm:text-6xl text-[#A65368] drop-shadow-xs select-none tracking-wide">
              Suada
            </h1>
          </div>

          {/* Family Lineage (Groom family first, Bride family second) */}
          <div className="space-y-1 text-center py-2 px-4 rounded-xl bg-[#FAF0F2]/60 border border-[#EAD6BD]/50 w-full max-w-sm">
            <p className="font-['Cinzel'] text-xs font-semibold text-[#4B342E] tracking-wide">
              {WEDDING_CONFIG.groom.familyLine}
            </p>
            <p className="font-['Cinzel'] text-xs font-semibold text-[#4B342E] tracking-wide">
              {WEDDING_CONFIG.bride.familyLine}
            </p>
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 my-4 opacity-75">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
            <span className="text-[#C9A66B] text-xs">❖</span>
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
          </div>

          {/* NIKAH CEREMONY Pill Badge */}
          <div className="inline-flex items-center justify-center px-5 py-1.5 rounded-full border border-[#C9A66B] bg-[#FFF8F1] shadow-xs">
            <span className="font-['Cinzel'] text-xs font-bold tracking-[0.25em] text-[#C9A66B] uppercase">
              Nikah Ceremony
            </span>
          </div>

          {/* Date & Time Block */}
          <div className="mt-5 w-full flex items-center justify-center gap-4 py-3 border-y border-[#EAD6BD]/70">
            {/* Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <div className="text-left">
                <span className="block font-['Cinzel'] text-base sm:text-lg font-bold text-[#A65368] leading-tight">
                  {WEDDING_CONFIG.event.dayNumber}
                </span>
                <span className="block font-['Cinzel'] text-[9px] font-semibold tracking-wider text-[#6B524B]">
                  {WEDDING_CONFIG.event.monthYear}
                </span>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-[#C9A66B]/30" />

            {/* Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A66B] shrink-0" />
              <div className="text-left">
                <span className="block font-['Cinzel'] text-sm sm:text-base font-bold text-[#4B342E] leading-tight">
                  {WEDDING_CONFIG.event.timeFormatted}
                </span>
                <span className="block font-['Cinzel'] text-[9px] font-semibold tracking-wider text-[#6B524B]">
                  {WEDDING_CONFIG.event.dayFormatted}
                </span>
              </div>
            </div>
          </div>

          {/* Venue Block */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#FAF0F2] flex items-center justify-center shrink-0 border border-[#C9A66B]/40">
              <MapPin className="w-3.5 h-3.5 text-[#C9A66B]" />
            </div>
            <div className="text-left">
              <p className="font-['Cinzel'] text-xs sm:text-sm font-bold text-[#4B342E]">
                {WEDDING_CONFIG.event.venueName}
              </p>
              <p className="font-['Montserrat'] text-[11px] text-[#6B524B]">
                {WEDDING_CONFIG.event.venueCity}
              </p>
            </div>
          </div>

          {/* Live Countdown */}
          <div className="mt-6 w-full">
            <p className="font-['Cinzel'] text-[10px] tracking-widest text-[#C9A66B] uppercase mb-2">
              Countdown to the Blessed Nikah
            </p>
            <CountdownTimer />
          </div>

          {/* Precious Moments Interactive Photo Card (Real Image Uploadable & Viewable) */}
          <div className="mt-6 w-full">
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="w-full rounded-2xl overflow-hidden border-2 border-[#C9A66B]/60 shadow-md relative group cursor-pointer bg-[#FAF0F2]"
            >
              <img
                src={displayImageSrc}
                alt="Ameen & Suada Precious Moment"
                className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 text-left">
                <p className="font-['Cormorant_Garamond'] italic text-white text-xs sm:text-sm drop-shadow-md">
                  "Your presence and duas will make this occasion even more special."
                </p>
                {preciousPhoto && (
                  <span className="font-['Cinzel'] text-[9px] tracking-widest uppercase text-[#E5CF9F] mt-1 font-semibold">
                    ✦ Precious Moment Photo
                  </span>
                )}
              </div>

              {/* Fullscreen icon indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xs text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Interactive Upload & Customize Controls */}
            <div className="mt-2.5 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#A65368] text-white text-xs font-['Cinzel'] font-semibold shadow-xs hover:bg-[#8E4356] transition-all transform hover:scale-105"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{preciousPhoto ? "Change Precious Photo" : "Upload Your Precious Photo"}</span>
              </button>

              {preciousPhoto && (
                <button
                  type="button"
                  onClick={handleResetPhoto}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-white border border-[#C9A66B]/50 text-[#6B524B] text-[11px] font-['Cinzel'] hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-3 h-3 text-[#A65368]" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Final Dua / Blessing */}
          <div className="mt-4 px-3 py-2">
            <p className="font-['Cormorant_Garamond'] italic text-sm text-[#4B342E] leading-relaxed">
              "May Allah bless this union with love, mercy, peace, and barakah.
              Ameen."
            </p>
          </div>

          {/* Action Buttons Bar (Open in Maps, Add to Calendar, Share Invitation) */}
          <div className="mt-6 w-full">
            <ActionButtons />
          </div>

          {/* Audio Player Card (Matching reference design) */}
          <div className="mt-5 w-full">
            <AudioPlayerCard isPlaying={isPlaying} onToggle={onToggleMusic} />
          </div>

          {/* Guest Memories Quick Ribbon */}
          <div className="mt-6 w-full pt-5 border-t border-[#EAD6BD]/60">
            <div className="flex items-center justify-between mb-3">
              <div className="text-left">
                <p className="font-['Cinzel'] text-xs font-bold text-[#4B342E]">
                  Guest Memories
                </p>
                <p className="font-['Montserrat'] text-[10px] text-[#6B524B]">
                  Share your special moments with us
                </p>
              </div>
              <button
                onClick={onOpenGuestMemories}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A65368] text-white text-[11px] font-['Cinzel'] shadow-xs hover:bg-[#8E4356] transition-colors"
              >
                <Camera className="w-3 h-3" />
                <span>Upload Photos</span>
              </button>
            </div>

            {/* 4 Photo preview strip matching reference image */}
            <div
              onClick={onOpenGuestMemories}
              className="grid grid-cols-4 gap-2 cursor-pointer group"
            >
              <img
                src="./assets/images/scene_auditorium.jpg"
                alt="Auditorium"
                className="aspect-square object-cover rounded-xl border border-[#C9A66B]/40 group-hover:opacity-90 transition-opacity"
              />
              <img
                src="./assets/images/scene_rings.jpg"
                alt="Rings"
                className="aspect-square object-cover rounded-xl border border-[#C9A66B]/40 group-hover:opacity-90 transition-opacity"
              />
              <img
                src="./assets/images/scene_mosque_v2.jpg"
                alt="Mosque"
                className="aspect-square object-cover rounded-xl border border-[#C9A66B]/40 group-hover:opacity-90 transition-opacity"
              />
              <img
                src="./assets/images/scene_family_photo_v2.jpg"
                alt="Family"
                className="aspect-square object-cover rounded-xl border border-[#C9A66B]/40 group-hover:opacity-90 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Precious Moment Photo */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full flex flex-col items-center"
          >
            <img
              src={displayImageSrc}
              alt="Ameen & Suada Precious Moment Fullscreen"
              className="max-h-[80vh] w-auto object-contain rounded-2xl border border-white/20 shadow-2xl"
            />
            <p className="mt-3 font-['Cinzel'] text-xs text-[#E5CF9F] tracking-widest text-center">
              Ameen & Suada — Sunday, 8 November 2026
            </p>
          </div>
        </div>
      )}

      {/* Tasteful Footer with Muhammad Sinan KK WhatsApp Contact */}
      <Footer />
    </section>
  );
};
