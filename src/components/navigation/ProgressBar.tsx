import React, { useEffect, useState } from "react";

export const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#F5DDE0]/30">
      <div
        className="h-full bg-gradient-to-r from-[#C9A66B] via-[#E5CF9F] to-[#A65368] transition-all duration-150 shadow-[0_0_8px_rgba(201,166,107,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
