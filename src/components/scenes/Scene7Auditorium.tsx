import React from "react";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";
import { BackgroundMonogram } from "../common/BackgroundMonogram";

export const Scene7Auditorium: React.FC = () => {
  return (
    <section
      id="scene-7"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-[#FFF8F1] via-[#FAF0F2] to-[#FFF8F1] overflow-hidden"
    >
      {/* Background Monogram */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 pointer-events-none opacity-20">
        <BackgroundMonogram size="md" subtle />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="font-['Cinzel'] text-xs tracking-[0.3em] uppercase text-[#C9A66B] font-bold mb-1">
          The Grand Venue
        </span>

        {/* Scene Title */}
        <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B342E] tracking-wider mb-2">
          Entering Shubham Auditorium
        </h2>

        {/* Venue Information Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-['Cinzel'] text-[#4B342E] mb-6">
          <span className="font-bold text-[#A65368]">
            {WEDDING_CONFIG.event.venueName}
          </span>
          <span className="text-[#C9A66B]">•</span>
          <span>{WEDDING_CONFIG.event.venueCity}</span>
          <span className="text-[#C9A66B]">•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#C9A66B]" />
            {WEDDING_CONFIG.event.dateFormatted}
          </span>
          <span className="text-[#C9A66B]">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C9A66B]" />
            {WEDDING_CONFIG.event.timeFormatted}
          </span>
        </div>

        {/* Illustrated Venue Entrance Card */}
        <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-[#C9A66B]/50 shadow-[0_20px_60px_rgba(201,166,107,0.25)] group bg-[#FAF0F2]">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src="./assets/images/scene_auditorium.jpg"
              alt="Shubham Auditorium Elamkulam - Decorated Wedding Hall Entrance with Blush Flowers & Lanterns"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left text-white drop-shadow-md">
              <div>
                <span className="font-['Cinzel'] text-[10px] sm:text-xs tracking-widest uppercase text-[#E5CF9F] font-semibold block">
                  Celebration Hall Entrance
                </span>
                <p className="font-['Montserrat'] text-xs sm:text-sm text-white/95">
                  Shubham Auditorium, Elamkulam — draped in blush silks, fragrant roses, and warm lantern light.
                </p>
              </div>

              {/* View Location Button */}
              <a
                href={WEDDING_CONFIG.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#A65368] text-white text-xs font-['Cinzel'] font-semibold tracking-wider hover:bg-[#8E4356] transition-all transform hover:scale-105 shrink-0 shadow-md"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>View Location</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
