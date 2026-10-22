// Type definitions for Suada & Ameen Wedding Web Application

export interface GuestPhoto {
  id: string;
  url: string;
  storagePath?: string;
  caption?: string;
  uploaderName?: string;
  createdAt: string;
  isModerated?: boolean;
}

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export interface AudioState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  hasInteracted: boolean;
}

export interface SceneMeta {
  id: string;
  title: string;
  subtitle?: string;
  time?: string;
  number: number;
}
