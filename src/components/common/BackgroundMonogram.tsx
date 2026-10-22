import React from "react";

interface BackgroundMonogramProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "hero";
  subtle?: boolean;
}

export const BackgroundMonogram: React.FC<BackgroundMonogramProps> = ({
  className = "",
  size = "md",
  subtle = true,
}) => {
  const sizeClasses = {
    sm: "w-16 h-16 text-lg",
    md: "w-28 h-28 text-2xl",
    lg: "w-44 h-44 text-4xl",
    hero: "w-64 h-64 md:w-80 md:h-80 text-5xl md:text-6xl",
  };

  const opacityClass = subtle
    ? "opacity-20 hover:opacity-30 transition-opacity"
    : "opacity-90";

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${sizeClasses[size]} ${opacityClass} ${className}`}
      aria-hidden="true"
    >
      {/* Outer ornamental circle with floral points */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-[spin_120s_linear_infinite]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="#C9A66B"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          stroke="#C9A66B"
          strokeWidth="0.8"
        />
        {/* 8 Ornamental gold petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 100 100)`}>
            <circle cx="100" cy="12" r="3" fill="#C9A66B" />
            <path
              d="M96 16 C96 22 100 26 100 26 C100 26 104 22 104 16 Z"
              fill="#E5CF9F"
            />
          </g>
        ))}
      </svg>

      {/* Center Initials: A ♥ S */}
      <div className="flex items-center justify-center gap-1.5 font-['Cinzel'] tracking-wider text-[#C9A66B] drop-shadow-sm font-semibold z-10">
        <span>A</span>
        <span className="text-[#A65368] text-[0.7em] animate-pulse">♥</span>
        <span>S</span>
      </div>
    </div>
  );
};
