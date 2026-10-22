import React, { useState } from "react";
import { MapPin, Calendar, Share2, Check, Download } from "lucide-react";
import { WEDDING_CONFIG } from "../../config/wedding.config";

export const ActionButtons: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Download .ics Calendar File
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ameen & Suada Wedding//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:ameen-suada-nikah-20261108@wedding",
      "DTSTAMP:20261023T000000Z",
      // 8 Nov 2026 10:00 AM IST = 2026-11-08 04:30:00 UTC
      "DTSTART:20261108T043000Z",
      "DTEND:20261108T083000Z",
      "SUMMARY:Nikah Ceremony: Ameen & Suada",
      `DESCRIPTION:Nikah Ceremony of Ameen (S/o Mr. Umer Korakkalikkuth & Mrs. Fathimath Suhara) and Suada (D/o Maraparambil Mustafa).\\n\\nVenue: Shubham Auditorium, Elamkulam`,
      `LOCATION:Shubham Auditorium, Elamkulam, Kerala`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ameen-suada-wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowCalendarModal(false);
  };

  // Google Calendar Web Link
  const googleCalendarUrl = () => {
    const title = encodeURIComponent("Nikah Ceremony: Ameen & Suada");
    const details = encodeURIComponent(
      "With the blessings of Allah, you are joyfully invited to the Nikah Ceremony of Ameen & Suada.\n\nS/o Mr. Umer Korakkalikkuth & Mrs. Fathimath Suhara\nD/o Maraparambil Mustafa\n\nVenue: Shubham Auditorium, Elamkulam"
    );
    const location = encodeURIComponent("Shubham Auditorium, Elamkulam, Kerala");
    const dates = "20261108T043000Z/20261108T083000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Share action (Native Web Share with copy-to-clipboard fallback)
  const handleShare = async () => {
    const shareData = {
      title: "Ameen & Suada — Nikah Ceremony Invitation",
      text: "You are cordially invited to the Nikah Ceremony of Ameen & Suada on Sunday, 8 November 2026 at Shubham Auditorium, Elamkulam.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback prompt
      window.prompt("Copy this wedding invitation link:", window.location.href);
    }
  };

  return (
    <>
      <div className={`w-full max-w-md mx-auto grid grid-cols-3 gap-2 sm:gap-3 ${className}`}>
        {/* Open in Maps */}
        <a
          href={WEDDING_CONFIG.event.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-2xl bg-[#A65368] text-white font-['Cinzel'] text-[11px] sm:text-xs font-semibold tracking-wider shadow-[0_4px_14px_rgba(166,83,104,0.35)] hover:bg-[#8E4356] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Open in Maps</span>
        </a>

        {/* Add to Calendar */}
        <button
          onClick={() => setShowCalendarModal(true)}
          type="button"
          className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-2xl bg-white/90 text-[#4B342E] border border-[#EAD6BD] font-['Cinzel'] text-[11px] sm:text-xs font-semibold tracking-wider shadow-[0_4px_14px_rgba(201,166,107,0.15)] hover:bg-white hover:border-[#C9A66B] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
          <span className="truncate">Add to Calendar</span>
        </button>

        {/* Share Invitation */}
        <button
          onClick={handleShare}
          type="button"
          className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-2xl bg-[#A65368] text-white font-['Cinzel'] text-[11px] sm:text-xs font-semibold tracking-wider shadow-[0_4px_14px_rgba(166,83,104,0.35)] hover:bg-[#8E4356] transition-all transform hover:scale-[1.02] active:scale-[0.98] text-center"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 shrink-0 text-emerald-300" />
              <span className="truncate">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Share Invitation</span>
            </>
          )}
        </button>
      </div>

      {/* Calendar Selection Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#FFF8F1] rounded-3xl p-6 border border-[#C9A66B]/50 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-['Cinzel'] text-base font-bold text-[#4B342E] text-center">
              Add to Your Calendar
            </h3>
            <p className="font-['Montserrat'] text-xs text-[#6B524B] text-center mt-1">
              Sunday, 8 November 2026 • 10:00 AM IST
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowCalendarModal(false)}
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#C9A66B]/40 hover:border-[#A65368] text-[#4B342E] flex items-center justify-between font-['Cinzel'] text-xs font-semibold tracking-wide transition-all shadow-xs"
              >
                <span>Google Calendar (Online)</span>
                <Calendar className="w-4 h-4 text-[#C9A66B]" />
              </a>

              <button
                onClick={handleDownloadIcs}
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-[#A65368] text-white flex items-center justify-between font-['Cinzel'] text-xs font-semibold tracking-wide transition-all shadow-sm hover:bg-[#8E4356]"
              >
                <span>Apple / Outlook / Phone (.ics file)</span>
                <Download className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowCalendarModal(false)}
              className="w-full mt-4 py-2 text-xs text-[#6B524B] hover:text-[#4B342E] font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
