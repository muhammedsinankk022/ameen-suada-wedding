import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollJourney(reducedMotion: boolean = false) {
  useEffect(() => {
    if (reducedMotion) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    const sceneIds = [
      "scene-1",
      "scene-2",
      "scene-3",
      "scene-4",
      "scene-5",
      "scene-6",
      "scene-7",
      "scene-8",
      "scene-9",
      "scene-10",
    ];

    const triggers: ScrollTrigger[] = [];

    sceneIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const card = el.querySelector(".group");
      const title = el.querySelector("h2");
      const caption = el.querySelector("p.italic") || el.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 25%",
          scrub: 1,
        },
      });

      if (title) {
        tl.fromTo(
          title,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }

      if (caption) {
        tl.fromTo(
          caption,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { scale: 0.94, opacity: 0.6 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (tl.scrollTrigger) {
        triggers.push(tl.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  const jumpToScene = (sceneId: string) => {
    const el = document.getElementById(sceneId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { jumpToScene };
}
