-- ============================================================================
-- SUADA & AMEEN WEDDING — SUPABASE DATABASE & STORAGE SCHEMA
-- ============================================================================

-- 1. Create table for guest photo memories
CREATE TABLE IF NOT EXISTS public.guest_memories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    photo_url TEXT NOT NULL,
    storage_path TEXT,
    caption TEXT,
    uploader_name TEXT DEFAULT 'Guest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_approved BOOLEAN DEFAULT TRUE
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.guest_memories ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can view approved memories
CREATE POLICY "Public guest memories are viewable by everyone"
ON public.guest_memories FOR SELECT
USING (true);

-- 4. Policy: Anyone can upload a guest photo
CREATE POLICY "Invited guests can insert memories"
ON public.guest_memories FOR INSERT
WITH CHECK (true);

-- 5. Policy: Deletions restricted to authenticated admin
CREATE POLICY "Only admin can delete memories"
ON public.guest_memories FOR DELETE
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 6. Setup Storage Bucket for Guest Photos
-- Run this in your Supabase SQL editor:
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'guest-photos',
    'guest-photos',
    true,
    15728640, -- 15MB maximum
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 15728640,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

-- 7. Storage Policies
CREATE POLICY "Public Access for guest-photos bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'guest-photos');

CREATE POLICY "Public Upload to guest-photos bucket"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'guest-photos' 
    AND (LOWER(storage.extension(name)) = 'jpg' 
         OR LOWER(storage.extension(name)) = 'jpeg' 
         OR LOWER(storage.extension(name)) = 'png' 
         OR LOWER(storage.extension(name)) = 'webp')
);

CREATE POLICY "Admin delete for guest-photos bucket"
ON storage.objects FOR DELETE
USING (bucket_id = 'guest-photos' AND (auth.role() = 'authenticated' OR auth.role() = 'service_role'));
