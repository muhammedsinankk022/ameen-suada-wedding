import React from "react";

interface BrassLanternProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  chainLength?: number;
}

export const BrassLantern: React.FC<BrassLanternProps> = ({
  className = "",
  size = "md",
  chainLength = 40,
}) => {
  const sizeMap = {
    sm: { w: 44, h: 72 },
    md: { w: 58, h: 96 },
    lg: { w: 76, h: 126 },
  };

  const { w, h } = sizeMap[size];

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none pointer-events-none animate-float-gentle ${className}`}
      style={{ filter: "drop-shadow(0 8px 16px rgba(201, 166, 107, 0.4))" }}
    >
      {/* Hanging Chain */}
      <div
        className="w-[1.5px] bg-gradient-to-b from-[#A65368] via-[#C9A66B] to-[#E5CF9F]"
        style={{ height: `${chainLength}px` }}
      />

      {/* Hanging Ring */}
      <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#C9A66B] -mt-1.5 mb-0.5" />

      {/* SVG Lantern Body */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 60 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          <linearGradient id="goldBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="35%" stopColor="#C9A66B" />
            <stop offset="70%" stopColor="#9F7E42" />
            <stop offset="100%" stopColor="#E5CF9F" />
          </linearGradient>

          <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF7D6" stopOpacity="1" />
            <stop offset="45%" stopColor="#FFC857" stopOpacity="0.8" />
            <stop offset="85%" stopColor="#E2843B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E2843B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dome Cap */}
        <path
          d="M30 4 C20 12, 12 18, 12 24 L48 24 C48 18, 40 12, 30 4 Z"
          fill="url(#goldBrass)"
          stroke="#7D5C26"
          strokeWidth="1"
        />

        {/* Small Crescent / Finial atop lantern */}
        <circle cx="30" cy="4" r="2.5" fill="#E5CF9F" />
        <path
          d="M29 1 C30.5 1, 31.5 2, 31.5 3.5 C31.5 5, 30.5 6, 29 6 C29.8 5.2 29.8 2 29 1 Z"
          fill="#FFF2D6"
        />

        {/* Crown ridge */}
        <rect
          x="10"
          y="23"
          width="40"
          height="4"
          rx="1"
          fill="url(#goldBrass)"
          stroke="#7D5C26"
          strokeWidth="0.8"
        />

        {/* Glass Glow Area */}
        <rect
          x="14"
          y="27"
          width="32"
          height="45"
          rx="3"
          fill="url(#lanternGlow)"
          className="animate-lantern-flicker origin-center"
        />

        {/* Inner Candle Flame */}
        <ellipse
          cx="30"
          cy="48"
          rx="4.5"
          ry="9"
          fill="#FFF9E6"
          className="animate-lantern-flicker"
        />
        <circle cx="30" cy="48" r="2.5" fill="#FFFFFF" />

        {/* Filigree Arch Cuts & Frames */}
        <path
          d="M15 27 L15 72 M45 27 L45 72 M30 27 L30 72"
          stroke="url(#goldBrass)"
          strokeWidth="1.5"
        />
        <path
          d="M15 45 Q30 38 45 45 M15 58 Q30 51 45 58"
          stroke="url(#goldBrass)"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.8"
        />

        {/* Base Rim */}
        <rect
          x="12"
          y="71"
          width="36"
          height="4"
          rx="1"
          fill="url(#goldBrass)"
          stroke="#7D5C26"
          strokeWidth="0.8"
        />

        {/* Bottom Pedestal */}
        <path
          d="M16 75 L22 84 L38 84 L44 75 Z"
          fill="url(#goldBrass)"
          stroke="#7D5C26"
          strokeWidth="1"
        />

        {/* Bottom Finial teardrop */}
        <circle cx="30" cy="88" r="3" fill="url(#goldBrass)" />
      </svg>
    </div>
  );
};
