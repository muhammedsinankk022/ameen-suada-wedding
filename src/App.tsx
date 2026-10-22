import { useState } from "react";
import confetti from "canvas-confetti";
import { FloatingPetals } from "./components/common/FloatingPetals";
import { FloatingAudioButton } from "./components/common/AudioPlayer";
import { ProgressBar } from "./components/navigation/ProgressBar";
import { TopNav } from "./components/navigation/TopNav";
import { Scene1Opening } from "./components/scenes/Scene1Opening";
import { Scene2MosqueArrival } from "./components/scenes/Scene2MosqueArrival";
import { Scene3NikahGathering } from "./components/scenes/Scene3NikahGathering";
import { Scene4FamilyBlessings } from "./components/scenes/Scene4FamilyBlessings";
import { Scene5BrideAndGroom } from "./components/scenes/Scene5BrideAndGroom";
import { Scene6RingCeremony } from "./components/scenes/Scene6RingCeremony";
import { Scene7Auditorium } from "./components/scenes/Scene7Auditorium";
import { Scene8FamilyPhotos } from "./components/scenes/Scene8FamilyPhotos";
import { Scene9GuestMemories } from "./components/scenes/Scene9GuestMemories";
import { Scene10InvitationCard } from "./components/scenes/Scene10InvitationCard";
import { useAudioEngine } from "./hooks/useAudioEngine";
import { useScrollJourney } from "./hooks/useScrollJourney";

export function App() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const {
    isPlaying,
    isMuted,
    startMusic,
    toggleMusic,
    toggleMute,
  } = useAudioEngine();

  const { jumpToScene } = useScrollJourney(reducedMotion);

  // When guest clicks "Enter the Wedding Story" in Scene 1
  const handleEnterStory = () => {
    // Start peaceful ambient music upon user gesture
    if (!isPlaying) {
      startMusic();
    }

    // Trigger subtle golden/rose petal burst
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F5DDE0", "#C9A66B", "#FFF8F1", "#A65368"],
    });

    // Smoothly travel to Scene 2 (Mosque Arrival)
    jumpToScene("scene-2");
  };

  return (
    <div className="relative min-h-screen bg-[#FFF8F1] text-[#4B342E] selection:bg-[#F5DDE0] selection:text-[#4B342E] overflow-x-hidden font-['Montserrat']">
      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Floating Canvas Rose Petals & Golden Sparkles */}
      {!reducedMotion && <FloatingPetals petalCount={30} sparkleCount={35} />}

      {/* Top Navigation Bar with Chapters & Controls */}
      <TopNav
        isPlaying={isPlaying}
        onToggleMusic={toggleMusic}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        onJumpToScene={jumpToScene}
      />

      {/* Persistent Floating Audio Toggle Button */}
      <FloatingAudioButton
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggle={toggleMusic}
        onMuteToggle={toggleMute}
      />

      {/* 10 Cinematic Scroll Journey Scenes */}
      <main className="relative w-full">
        {/* Scene 1 — The Opening: S ♥ A */}
        <Scene1Opening onEnterStory={handleEnterStory} />

        {/* Scene 2 — Entering the Mosque (10:00 AM) */}
        <Scene2MosqueArrival />

        {/* Scene 3 — The Nikah Gathering */}
        <Scene3NikahGathering />

        {/* Scene 4 — Family Blessings */}
        <Scene4FamilyBlessings />

        {/* Scene 5 — The Bride & Groom */}
        <Scene5BrideAndGroom />

        {/* Scene 6 — The Ring Ceremony (Configurable) */}
        <Scene6RingCeremony />

        {/* Scene 7 — Entering Shubham Auditorium, Elamkulam */}
        <Scene7Auditorium />

        {/* Scene 8 — Family Photographs & Memory Album */}
        <Scene8FamilyPhotos
          onTransitionToGuestGallery={() => jumpToScene("scene-9")}
        />

        {/* Scene 9 — Guest Memories (Interactive Upload & Gallery) */}
        <Scene9GuestMemories />

        {/* Scene 10 — Final Save the Date Reveal (Grand Finale) */}
        <Scene10InvitationCard
          isPlaying={isPlaying}
          onToggleMusic={toggleMusic}
          onOpenGuestMemories={() => jumpToScene("scene-9")}
        />
      </main>
    </div>
  );
}

export default App;
