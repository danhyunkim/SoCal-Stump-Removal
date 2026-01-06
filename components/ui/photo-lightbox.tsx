"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Photo {
  id: string;
  url: string;
  alt_text: string | null;
}

interface PhotoLightboxProps {
  photos: Photo[];
  initialIndex?: number;
}

export function PhotoLightbox({ photos, initialIndex = 0 }: PhotoLightboxProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setOpen(false);
  };

  if (photos.length === 0) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid gap-4">
        {/* Main Photo */}
        <div
          className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
          onClick={() => {
            setCurrentIndex(0);
            setOpen(true);
          }}
        >
          <Image
            src={photos[0].url}
            alt={photos[0].alt_text || "Business photo"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Thumbnail Grid */}
        {photos.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {photos.slice(1, 5).map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setOpen(true);
                }}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt_text || "Business photo"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-7xl w-full p-0 bg-black/95"
          onKeyDown={handleKeyDown}
        >
          <div className="relative h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Previous Button */}
            {photos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-10 text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
            )}

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center p-12">
              <div className="relative max-w-full max-h-full">
                <Image
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].alt_text || "Business photo"}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh]"
                  priority
                />
              </div>
            </div>

            {/* Next Button */}
            {photos.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-10 text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            )}

            {/* Counter */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {currentIndex + 1} / {photos.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
