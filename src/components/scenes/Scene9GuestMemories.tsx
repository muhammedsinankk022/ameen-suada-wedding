import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Shield,
  Trash2,
  Lock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useGuestPhotos } from "../../hooks/useGuestPhotos";
import { WEDDING_CONFIG } from "../../config/wedding.config";
import type { GuestPhoto } from "../../types";

export const Scene9GuestMemories: React.FC = () => {
  const {
    photos,
    loading,
    uploading,
    uploadProgress,
    error,
    uploadPhoto,
    deletePhoto,
  } = useGuestPhotos();

  // Upload modal state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Lightbox state
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Admin moderation modal
  const [moderationPhotoId, setModerationPhotoId] = useState<string | null>(null);
  const [adminPin, setAdminPin] = useState("");
  const [adminError, setAdminError] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(
      0,
      WEDDING_CONFIG.features.maxUploadPhotosCount
    );
    setSelectedFiles(files);

    // Generate previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  // Submit uploads
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      await uploadPhoto(file, caption, uploaderName);
    }

    setUploadSuccess(true);
    setTimeout(() => {
      setIsUploadOpen(false);
      setSelectedFiles([]);
      setPreviews([]);
      setCaption("");
      setUploaderName("");
      setUploadSuccess(false);
    }, 1800);
  };

  // Lightbox download single photo
  const handleDownloadSingle = (photo: GuestPhoto) => {
    const link = document.createElement("a");
    link.href = photo.url;
    link.download = `suada-ameen-memory-${photo.id}.jpg`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Bulk download
  const handleDownloadAll = () => {
    if (photos.length === 0) return;
    photos.forEach((photo, idx) => {
      setTimeout(() => {
        handleDownloadSingle(photo);
      }, idx * 400);
    });
  };

  // Admin delete confirm
  const handleAdminDelete = async () => {
    if (!moderationPhotoId) return;
    const success = await deletePhoto(moderationPhotoId, adminPin);
    if (success) {
      setModerationPhotoId(null);
      setAdminPin("");
      setAdminError("");
      if (activePhotoIndex !== null) setActivePhotoIndex(null);
    } else {
      setAdminError("Incorrect PIN. Please try again.");
    }
  };

  return (
    <section
      id="scene-9"
      className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#FFF8F1] via-[#FAF0F2] to-[#FFF8F1] flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#C9A66B]" />
          <Camera className="w-4 h-4 text-[#C9A66B]" />
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#C9A66B]" />
        </div>

        <h2 className="font-['Cinzel'] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4B342E] tracking-wider">
          Guest Memories
        </h2>

        <p className="font-['Cormorant_Garamond'] italic text-base sm:text-lg text-[#A65368] mt-1">
          Share your special moments with us
        </p>

        <p className="font-['Montserrat'] text-xs sm:text-sm text-[#6B524B] max-w-md mx-auto mt-2 leading-relaxed">
          Upload your candid photos, heartfelt selfies, and cherished memories
          from the blessed union of Ameen & Suada.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#A65368] text-white font-['Cinzel'] text-xs sm:text-sm font-semibold tracking-wider shadow-lg shadow-[#A65368]/25 hover:bg-[#8E4356] transition-all transform hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>Upload Photos</span>
          </button>

          {photos.length > 0 && (
            <button
              onClick={handleDownloadAll}
              type="button"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 border border-[#C9A66B]/50 text-[#4B342E] font-['Cinzel'] text-xs sm:text-sm font-medium tracking-wider shadow-sm hover:bg-white hover:border-[#A65368] transition-all transform hover:scale-105"
            >
              <Download className="w-4 h-4 text-[#C9A66B]" />
              <span>Download All ({photos.length})</span>
            </button>
          )}
        </div>

        {/* Photos Grid */}
        <div className="mt-12 w-full">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#C9A66B] border-t-transparent animate-spin mb-3" />
              <p className="font-['Cinzel'] text-xs tracking-wider text-[#6B524B]">
                Loading precious moments...
              </p>
            </div>
          ) : photos.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white/60 backdrop-blur-md border border-[#EAD6BD]/70 text-center max-w-md mx-auto">
              <Camera className="w-10 h-10 text-[#C9A66B]/60 mx-auto mb-3" />
              <p className="font-['Cinzel'] text-sm font-semibold text-[#4B342E]">
                Be the first to share a memory!
              </p>
              <p className="font-['Montserrat'] text-xs text-[#6B524B] mt-1">
                Tap Upload Photos above to add your pictures to the wedding album.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAF0F2] border border-[#EAD6BD]/60 shadow-xs cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#C9A66B]"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || "Guest memory"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-left">
                    {photo.caption && (
                      <p className="font-['Montserrat'] text-[11px] text-white line-clamp-2 leading-tight">
                        {photo.caption}
                      </p>
                    )}
                    <p className="font-['Cinzel'] text-[9px] text-[#E5CF9F] font-semibold mt-1">
                      {photo.uploaderName || "Guest"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-white/50 backdrop-blur-xs border border-[#EAD6BD]/50 max-w-lg mx-auto flex items-start gap-3 text-left">
          <Shield className="w-4 h-4 text-[#C9A66B] shrink-0 mt-0.5" />
          <p className="font-['Montserrat'] text-[11px] text-[#6B524B] leading-relaxed">
            <span className="font-semibold text-[#4B342E]">Privacy Notice:</span>{" "}
            Photographs shared in this guest gallery are private to the invited
            families and guests of Ameen & Suada. Please share respectful and
            meaningful memories.
          </p>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#FFF8F1] rounded-3xl p-6 sm:p-8 border border-[#C9A66B]/50 shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsUploadOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5DDE0] text-[#4B342E] flex items-center justify-center hover:bg-[#A65368] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <Camera className="w-8 h-8 text-[#A65368] mx-auto mb-2" />
              <h3 className="font-['Cinzel'] text-lg font-bold text-[#4B342E]">
                Add to Guest Memories
              </h3>
              <p className="font-['Montserrat'] text-xs text-[#6B524B] mt-1">
                Upload up to {WEDDING_CONFIG.features.maxUploadPhotosCount} photos
                (max {WEDDING_CONFIG.features.maxUploadFileSizeMb}MB each)
              </p>
            </div>

            {uploadSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2 animate-bounce" />
                <h4 className="font-['Cinzel'] text-base font-bold text-[#4B342E]">
                  Photos Uploaded!
                </h4>
                <p className="font-['Montserrat'] text-xs text-[#6B524B] mt-1">
                  Thank you for contributing to Ameen & Suada's memories.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                {/* Drag / File Select Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-[#C9A66B]/60 rounded-2xl p-6 text-center cursor-pointer hover:bg-white/60 transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="w-8 h-8 text-[#C9A66B] mx-auto mb-2" />
                  <p className="font-['Cinzel'] text-xs font-semibold text-[#4B342E]">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} photo(s) selected`
                      : "Tap to choose photos from device"}
                  </p>
                  <p className="font-['Montserrat'] text-[10px] text-[#6B524B] mt-1">
                    Supports JPG, PNG, WEBP
                  </p>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto py-2">
                    {previews.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded-xl border border-[#C9A66B]/50 shrink-0"
                      />
                    ))}
                  </div>
                )}

                {/* Uploader Name */}
                <div>
                  <label className="block text-left font-['Cinzel'] text-[11px] font-semibold text-[#4B342E] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    placeholder="e.g. Farhan & Family"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EAD6BD] text-xs text-[#4B342E] focus:outline-none focus:border-[#A65368]"
                  />
                </div>

                {/* Optional Caption */}
                <div>
                  <label className="block text-left font-['Cinzel'] text-[11px] font-semibold text-[#4B342E] mb-1">
                    A short note / caption (optional)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Heartiest congratulations to both families!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EAD6BD] text-xs text-[#4B342E] focus:outline-none focus:border-[#A65368]"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 text-red-600 text-[11px]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Progress bar */}
                {uploading && (
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#A65368] h-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading || selectedFiles.length === 0}
                  className="w-full py-3 rounded-2xl bg-[#A65368] text-white font-['Cinzel'] text-xs font-semibold tracking-wider hover:bg-[#8E4356] transition-all disabled:opacity-50"
                >
                  {uploading
                    ? `Uploading... (${uploadProgress}%)`
                    : `Upload ${selectedFiles.length || ""} Photo(s)`}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous */}
          {activePhotoIndex > 0 && (
            <button
              onClick={() => setActivePhotoIndex(activePhotoIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next */}
          {activePhotoIndex < photos.length - 1 && (
            <button
              onClick={() => setActivePhotoIndex(activePhotoIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Photo Content */}
          <div className="max-w-3xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].caption || "Full view"}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 w-full flex items-center justify-between text-white/90 px-2">
              <div className="text-left">
                {photos[activePhotoIndex].caption && (
                  <p className="font-['Montserrat'] text-xs sm:text-sm">
                    {photos[activePhotoIndex].caption}
                  </p>
                )}
                <p className="font-['Cinzel'] text-[11px] text-[#E5CF9F] mt-0.5">
                  Shared by {photos[activePhotoIndex].uploaderName || "Guest"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadSingle(photos[activePhotoIndex])}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-['Cinzel'] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>

                {/* Admin moderation trigger */}
                <button
                  onClick={() =>
                    setModerationPhotoId(photos[activePhotoIndex].id)
                  }
                  title="Admin Moderation"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-red-500/40 text-white flex items-center justify-center transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Moderation PIN Modal */}
      {moderationPhotoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-[#FFF8F1] rounded-3xl p-6 border border-[#C9A66B]/50 shadow-2xl text-center">
            <Lock className="w-8 h-8 text-[#A65368] mx-auto mb-2" />
            <h4 className="font-['Cinzel'] text-sm font-bold text-[#4B342E]">
              Admin Moderation
            </h4>
            <p className="font-['Montserrat'] text-[11px] text-[#6B524B] mt-1">
              Enter admin PIN to delete this photo.
            </p>

            <input
              type="password"
              value={adminPin}
              onChange={(e) => setAdminPin(e.target.value)}
              placeholder="PIN"
              className="w-full mt-4 text-center px-3 py-2 rounded-xl border border-[#EAD6BD] text-sm tracking-widest focus:outline-none focus:border-[#A65368]"
            />

            {adminError && (
              <p className="text-red-500 text-[10px] mt-1.5">{adminError}</p>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => {
                  setModerationPhotoId(null);
                  setAdminPin("");
                  setAdminError("");
                }}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-xs text-[#4B342E]"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminDelete}
                className="flex-1 py-2 rounded-xl bg-red-600 text-xs text-white font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
