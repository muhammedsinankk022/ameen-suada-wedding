import React, { useEffect, useState } from "react";
import { WEDDING_CONFIG } from "../../config/wedding.config";
import type { CountdownState } from "../../types";

export const CountdownTimer: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const targetTime = new Date(WEDDING_CONFIG.event.targetDateIso).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: countdown.days },
    { label: "HOURS", value: countdown.hours },
    { label: "MINS", value: countdown.minutes },
    { label: "SECS", value: countdown.seconds },
  ];

  if (countdown.isPast) {
    return (
      <div className={`text-center py-4 px-6 rounded-2xl bg-white/70 backdrop-blur-md border border-[#C9A66B]/40 ${className}`}>
        <p className="font-['Cinzel'] text-sm tracking-widest text-[#A65368] font-bold">
          TODAY IS THE BLESSED DAY
        </p>
        <p className="font-['Montserrat'] text-xs text-[#4B342E] mt-1">
          Barakallahu lakuma wa baraka alaykuma wa jama'a baynakuma fee khayr
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white/75 backdrop-blur-md border border-[#EAD6BD]/70 shadow-[0_4px_16px_rgba(201,166,107,0.12)] min-w-[64px]"
          >
            <span className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-[#A65368] tracking-tight tabular-nums">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="font-['Montserrat'] text-[9px] sm:text-[10px] font-semibold tracking-widest text-[#6B524B]/80 mt-0.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
