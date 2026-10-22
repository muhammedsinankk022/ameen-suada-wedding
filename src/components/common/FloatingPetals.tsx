import React, { useEffect, useRef } from "react";

interface FloatingPetalsProps {
  petalCount?: number;
  sparkleCount?: number;
  className?: string;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  petalCount = 35,
  sparkleCount = 40,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Color palette for rose petals: blush pink, dusty rose, soft ivory
    const petalColors = [
      "rgba(245, 221, 224, 0.75)",
      "rgba(224, 169, 180, 0.65)",
      "rgba(166, 83, 104, 0.55)",
      "rgba(255, 248, 241, 0.8)",
      "rgba(234, 214, 189, 0.6)",
    ];

    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 0.9 + 0.4,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.6 + 0.35,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
    }));

    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.8,
      maxOpacity: Math.random() * 0.7 + 0.3,
      pulseSpeed: Math.random() * 0.04 + 0.01,
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(p.wobble), 1);

      ctx.beginPath();
      // Draw smooth organic teardrop / petal shape
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(
        p.size * 0.75,
        -p.size * 0.7,
        p.size * 0.75,
        p.size * 0.6,
        0,
        p.size
      );
      ctx.bezierCurveTo(
        -p.size * 0.75,
        p.size * 0.6,
        -p.size * 0.75,
        -p.size * 0.7,
        0,
        -p.size
      );

      ctx.fillStyle = p.color;
      ctx.shadowColor = "rgba(201, 166, 107, 0.25)";
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 207, 159, ${s.opacity})`;
      ctx.shadowColor = "rgba(201, 166, 107, 0.8)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render sparkles
      for (const s of sparkles) {
        s.y -= s.speedY;
        s.opacity += Math.sin(Date.now() * 0.002 * s.pulseSpeed) * 0.02;
        if (s.opacity > s.maxOpacity) s.opacity = s.maxOpacity;
        if (s.opacity < 0.1) s.opacity = 0.1;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        drawSparkle(s);
      }

      // Render falling petals
      for (const p of petals) {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.75 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [petalCount, sparkleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-20 ${className}`}
      aria-hidden="true"
    />
  );
};
