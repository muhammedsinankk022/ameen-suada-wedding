import React from "react";

interface BismillahCalligraphyProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BismillahCalligraphy: React.FC<BismillahCalligraphyProps> = ({
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl lg:text-5xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Decorative top gold ornament */}
      <div className="flex items-center justify-center gap-2 mb-1.5 opacity-80">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
        <span className="text-[#C9A66B] text-xs">✤</span>
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
      </div>

      {/* Traditional Arabic Calligraphy text */}
      <h2
        className={`font-['Amiri'] font-bold text-[#C9A66B] tracking-wide leading-relaxed select-none ${sizeClasses[size]}`}
        style={{
          textShadow: "0 2px 8px rgba(201, 166, 107, 0.4)",
          direction: "rtl",
        }}
        aria-label="Bismillahir Rahmanir Raheem"
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </h2>

      {/* Delicate floral divider with heart */}
      <div className="flex items-center justify-center gap-2 mt-1 opacity-75">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
        <span className="text-[#A65368] text-[10px]">❦</span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent" />
      </div>
    </div>
  );
};
