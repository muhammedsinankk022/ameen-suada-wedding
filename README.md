# Suada & Ameen — Cinematic Islamic Wedding Website 🌸✨

A luxury, mobile-first, scroll-driven Islamic wedding invitation web application for **Suada and Ameen**. Built with React, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Supabase.

---

## 💍 Confirmed Wedding Details

- **Bride**: Suada  
  *Display Line*: `D/o Maraparambil Mustafa`
- **Groom**: Ameen  
  *Display Line*: `S/o Mr. Umer Korakkalikkuth & Mrs. Fathimath Suhara`
- **Event**: Nikah Ceremony
- **Date**: Sunday, 08 November 2026
- **Time**: 10:00 AM IST (`Asia/Kolkata`)
- **Venue**: Shubham Auditorium, Elamkulam
- **Official Google Maps Link**: [Open Shubham Auditorium](https://maps.app.goo.gl/yPGhBjin3nAw1gLw9)
- **Website Creator**: Muhammad Sinan KK
- **WhatsApp Contact**: [+91 9645956291](https://wa.me/919645956291)
- **Footer Credit**: *"Crafted with love by Muhammad Sinan KK"*

---

## 🎨 Visual Identity & Strict Cultural Art Direction

- **Luxury Palette**:
  - Blush pink: `#F5DDE0`
  - Warm ivory: `#FFF8F1`
  - Antique gold: `#C9A66B`
  - Dusty rose: `#A65368`
  - Deep brown: `#4B342E`
  - Champagne: `#EAD6BD`
- **Faceless Kerala Muslim Cartoon Illustrations**:
  - Strictly **no visible human faces, eyes, noses, or mouths**.
  - Expressive silhouettes, traditional attire (cream/ivory sherwani and prayer cap for the groom; blush-rose bridal lehenga with flowing sheer veil for the bride; traditional mundu, kasavu, and white kurtas for elders).
- **Decorations**: Ornate scalloped Islamic arches, floating rose petals, glowing antique brass lanterns with candlelight flicker, golden Bismillah Arabic calligraphy, and a persistent `S ♥ A` monogram watermark.

---

## 📜 The 10 Cinematic Scroll Scenes

1. **Scene 1 — The Opening (S ♥ A)**: Warm ivory background, golden Arabic Bismillah calligraphy, glowing `S ♥ A` monogram, "Two families. One beautiful beginning.", and "Enter the Wedding Story" interactive button with sound prompt and petal burst.
2. **Scene 2 — Entering the Mosque**: Kerala Islamic mosque courtyard at `10:00 AM`, morning sunlight, faceless arriving guests respectfully greeting and shaking hands.
3. **Scene 3 — The Nikah Gathering**: Solemn mosque hall with groom in cream sherwani, bride's wali (guardian), imam, and elders raising hands in dua and solemnisation.
4. **Scene 4 — Family Blessings**: Camera moves through gathering as relatives offer congratulations, embraces, and heartfelt duas.
5. **Scene 5 — The Bride & Groom**: Revealed together under an ornate arch; bride in embroidered blush-rose gown with flowing veil beside groom in ivory sherwani.
6. **Scene 6 — The Ring Ceremony**: Close-up of bride's henna-adorned hand and groom's clasped hand with wedding rings amidst rose petals (configurable toggle in `wedding.config.ts`).
7. **Scene 7 — Entering Shubham Auditorium**: Decorated grand reception entrance with blush silk drapes, fresh roses, and lanterns + direct "View Location" Google Maps link.
8. **Scene 8 — Family Photographs**: Group portrait album layout with interactive camera flash shutter effect.
9. **Scene 9 — Guest Memories**: Working interactive photo sharing hub with multi-file uploads, progress indicator, fullscreen lightbox with zoom, single/batch photo downloads, and admin moderation PIN.
10. **Scene 10 — Save the Date Invitation (Grand Finale)**: Authentic layout matching the supplied reference invitation image with Bismillah calligraphy, couple name typography, confirmed family details, live Asia/Kolkata countdown timer, Open in Maps, Add to Calendar (.ics & Google Calendar), Share Invitation (Web Share API + clipboard fallback), audio player toggle card, and creator credit.

---

## 🛠️ Quick Start & Development

### 1. Prerequisites
- Node.js (v18+)
- pnpm / npm / yarn

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Run Development Server
```bash
pnpm dev
# or
npm run dev
```

### 4. Build for Production
```bash
pnpm build
# or
npm run build
```

---

## ☁️ Persistent Supabase Backend Setup

To enable persistent cloud storage across all devices:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** and paste the contents of `supabase/schema.sql`. Run the query.
3. In Supabase Dashboard, retrieve your **Project URL** and **Anon Public Key** from `Project Settings -> API`.
4. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. Rebuild or restart the dev server. Guest uploads will now sync to Supabase Storage bucket `guest-photos` and database table `guest_memories`!
*(Note: If no Supabase credentials are provided, the application uses an intelligent persistent local store fallback with pre-seeded gallery images, ensuring zero broken states).*

### Admin Moderation PIN
- Default PIN: `8112` (editable in `src/config/wedding.config.ts`).
- Administrators can click the trash icon in any photo's full-screen view to securely delete images.

---

## 🎵 Music & Audio Design

- **Peaceful Islamic Soundscape**: Synthesizes an ambient acoustic oud/strings harmonic progression in D Dorian modal tuning using the Web Audio API.
- **Autoplay Compliance**: Music is OFF by default. It starts seamlessly when the guest taps "Enter the Wedding Story" or toggles the music player switch.
- **Custom Audio Support**: To use an external audio file or licensed nasheed, specify `audio.defaultTrackUrl` in `src/config/wedding.config.ts` or place an `audio.mp3` in `public/assets/audio/`.

---

## 🚀 Deployment (Vercel / Netlify)

1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. If using Supabase, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project's Environment Variables.
4. Deploy! The application will build with `pnpm build` and output to `dist/`.
