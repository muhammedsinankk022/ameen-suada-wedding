import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { WEDDING_CONFIG } from "../config/wedding.config";
import type { GuestPhoto } from "../types";

// Pre-seeded initial sample photographs
const INITIAL_SAMPLE_PHOTOS: GuestPhoto[] = [
  {
    id: "sample-1",
    url: "/assets/images/scene_auditorium.jpg",
    caption: "The magnificent wedding hall at Shubham Auditorium",
    uploaderName: "Family",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    url: "/assets/images/scene_rings.jpg",
    caption: "Sacred rings & beautiful memories",
    uploaderName: "Family",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-3",
    url: "/assets/images/scene_mosque.jpg",
    caption: "Blessed morning arrival at the mosque",
    uploaderName: "Family",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-4",
    url: "/assets/images/scene_family_photo.jpg",
    caption: "Our beloved family gathering",
    uploaderName: "Family",
    createdAt: new Date().toISOString(),
  },
];

export function useGuestPhotos() {
  const [photos, setPhotos] = useState<GuestPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Initialize Supabase client if configured
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    if (WEDDING_CONFIG.supabase.url && WEDDING_CONFIG.supabase.anonKey) {
      try {
        const client = createClient(
          WEDDING_CONFIG.supabase.url,
          WEDDING_CONFIG.supabase.anonKey
        );
        setSupabase(client);
      } catch (err) {
        console.warn("Supabase init error, using local persistent fallback:", err);
      }
    }
  }, []);

  // Fetch photos
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    // If Supabase is active, fetch from database
    if (supabase) {
      try {
        const { data, error: dbErr } = await supabase
          .from(WEDDING_CONFIG.supabase.tableName)
          .select("*")
          .order("created_at", { ascending: false });

        if (dbErr) throw dbErr;

        if (data && data.length > 0) {
          const mapped: GuestPhoto[] = data.map((item: any) => ({
            id: item.id,
            url: item.photo_url,
            storagePath: item.storage_path,
            caption: item.caption,
            uploaderName: item.uploader_name,
            createdAt: item.created_at,
          }));
          setPhotos(mapped);
          setLoading(false);
          return;
        }
      } catch (err: any) {
        console.warn("Supabase fetch failed, falling back to local cache:", err.message);
      }
    }

    // Local persistent storage fallback
    try {
      const cached = localStorage.getItem("suada_ameen_guest_photos");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {
      // ignore
    }

    // Default seeded photos
    setPhotos(INITIAL_SAMPLE_PHOTOS);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Upload Photo Function
  const uploadPhoto = async (
    file: File,
    caption: string = "",
    uploaderName: string = "Guest"
  ): Promise<boolean> => {
    // Validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (JPG, PNG, WEBP).");
      return false;
    }

    const maxBytes = WEDDING_CONFIG.features.maxUploadFileSizeMb * 1024 * 1024;
    if (file.size > maxBytes) {
      setError(
        `File is too large. Maximum size is ${WEDDING_CONFIG.features.maxUploadFileSizeMb}MB.`
      );
      return false;
    }

    setUploading(true);
    setUploadProgress(15);
    setError(null);

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `memories/${fileName}`;

    // If Supabase is connected
    if (supabase) {
      try {
        setUploadProgress(40);
        // Upload to storage bucket
        const { error: uploadError } = await supabase.storage
          .from(WEDDING_CONFIG.supabase.storageBucket)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        setUploadProgress(75);
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(WEDDING_CONFIG.supabase.storageBucket)
          .getPublicUrl(filePath);

        const photoUrl = urlData.publicUrl;

        // Save metadata to database table
        const { error: dbError } = await supabase
          .from(WEDDING_CONFIG.supabase.tableName)
          .insert([
            {
              photo_url: photoUrl,
              storage_path: filePath,
              caption: caption.trim() || null,
              uploader_name: uploaderName.trim() || "Guest",
              created_at: new Date().toISOString(),
            },
          ])
          .select();

        if (dbError) throw dbError;

        setUploadProgress(100);
        await fetchPhotos();
        setUploading(false);
        return true;
      } catch (err: any) {
        console.warn("Supabase upload failed, saving to local store:", err.message);
      }
    }

    // Local / offline fallback: convert file to Base64 and store in persistent state
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setUploadProgress(80);
      const newPhoto: GuestPhoto = {
        id: `local-${Date.now()}`,
        url: base64,
        caption: caption.trim() || undefined,
        uploaderName: uploaderName.trim() || "Guest",
        createdAt: new Date().toISOString(),
      };

      const updated = [newPhoto, ...photos];
      setPhotos(updated);
      try {
        localStorage.setItem(
          "suada_ameen_guest_photos",
          JSON.stringify(updated.slice(0, 30))
        );
      } catch {
        // quota exceeded fallback
      }

      setUploadProgress(100);
      setUploading(false);
      return true;
    } catch {
      setError("Failed to process image. Please try again.");
      setUploading(false);
      return false;
    }
  };

  // Admin delete moderation
  const deletePhoto = async (
    photoId: string,
    adminPin: string
  ): Promise<boolean> => {
    if (adminPin !== WEDDING_CONFIG.features.adminModerationPin) {
      setError("Incorrect Admin Moderation PIN.");
      return false;
    }

    const photo = photos.find((p) => p.id === photoId);
    if (!photo) return false;

    // Delete in Supabase if exists
    if (supabase) {
      try {
        if (photo.storagePath) {
          await supabase.storage
            .from(WEDDING_CONFIG.supabase.storageBucket)
            .remove([photo.storagePath]);
        }
        await supabase
          .from(WEDDING_CONFIG.supabase.tableName)
          .delete()
          .eq("id", photoId);
      } catch (err) {
        console.warn("Supabase deletion error:", err);
      }
    }

    // Delete from state and local storage
    const updated = photos.filter((p) => p.id !== photoId);
    setPhotos(updated);
    try {
      localStorage.setItem("suada_ameen_guest_photos", JSON.stringify(updated));
    } catch {}

    return true;
  };

  return {
    photos,
    loading,
    uploading,
    uploadProgress,
    error,
    uploadPhoto,
    deletePhoto,
    refreshPhotos: fetchPhotos,
  };
}
