// ============================================================================
// AMEEN & SUADA — OFFICIAL WEDDING CONFIGURATION
// Central source of truth for all confirmed wedding details, links, & settings
// ============================================================================

export interface WeddingConfig {
  couple: {
    title: string;
    monogram: string;
    firstInitial: string;
    secondInitial: string;
  };
  groom: {
    name: string;
    father: string;
    mother: string;
    familyLine: string;
  };
  bride: {
    name: string;
    father: string;
    familyLine: string;
  };
  event: {
    title: string;
    dateFormatted: string;
    dayFormatted: string;
    dayNumber: string;
    monthYear: string;
    timeFormatted: string;
    timezone: string;
    venueName: string;
    venueCity: string;
    venueAddress: string;
    googleMapsUrl: string;
    // ISO String for 8 Nov 2026, 10:00:00 AM IST (UTC+05:30) -> 2026-11-08T04:30:00Z
    targetDateIso: string;
  };
  creator: {
    name: string;
    credit: string;
    phone: string;
    whatsappUrl: string;
  };
  features: {
    enableRingCeremony: boolean;
    enableAudioAutoplayPrompt: boolean;
    adminModerationPin: string;
    maxUploadPhotosCount: number;
    maxUploadFileSizeMb: number;
  };
  supabase: {
    url: string;
    anonKey: string;
    storageBucket: string;
    tableName: string;
  };
  audio: {
    title: string;
    subtitle: string;
    defaultTrackUrl: string;
  };
}

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    title: "Ameen & Suada",
    monogram: "A ♥ S",
    firstInitial: "A",
    secondInitial: "S",
  },
  groom: {
    name: "Ameen",
    father: "Umer Korakkalikkuth",
    mother: "Fathimath Suhara",
    familyLine: "S/o Mr. Umer Korakkalikkuth & Mrs. Fathimath Suhara",
  },
  bride: {
    name: "Suada",
    father: "Maraparambil Mustafa",
    familyLine: "D/o Maraparambil Mustafa",
  },
  event: {
    title: "Nikah Ceremony",
    dateFormatted: "08 NOVEMBER 2026",
    dayFormatted: "SUNDAY",
    dayNumber: "08",
    monthYear: "NOVEMBER 2026",
    timeFormatted: "10:00 AM IST",
    timezone: "Asia/Kolkata",
    venueName: "Shubham Auditorium",
    venueCity: "Elamkulam",
    venueAddress: "Shubham Auditorium, Elamkulam, Kerala, India",
    googleMapsUrl: "https://maps.app.goo.gl/yPGhBjin3nAw1gLw9",
    targetDateIso: "2026-11-08T10:00:00+05:30",
  },
  creator: {
    name: "Muhammad Sinan KK",
    credit: "Crafted with love by Muhammad Sinan KK",
    phone: "9645956291",
    whatsappUrl: "https://wa.me/919645956291",
  },
  features: {
    enableRingCeremony: true,
    enableAudioAutoplayPrompt: true,
    adminModerationPin: "8112", // 08/11/26 wedding code
    maxUploadPhotosCount: 10,
    maxUploadFileSizeMb: 15,
  },
  supabase: {
    // Configurable via env variables with safe fallbacks
    url: import.meta.env.VITE_SUPABASE_URL || "",
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
    storageBucket: "guest-photos",
    tableName: "guest_memories",
  },
  audio: {
    title: "Romantic Nasheed / Instrumental",
    subtitle: "A beautiful nasheed to set the mood",
    // Can point to an external or local mp3. If empty, the custom Web Audio ambient synth engine generates peaceful oud/string tones!
    defaultTrackUrl: "",
  },
};
