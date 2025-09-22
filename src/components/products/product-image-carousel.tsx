'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageSliderProps {
  images: string[];
  title: string;
}

export default function ProductImageCarousel({
  images,
  title,
}: ProductImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter valid images
  const validImages = images
    .filter((image: string) => image && typeof image === 'string')
    .map((image: string) => {
      if (image.startsWith('http')) return image;
      if (image.startsWith('//')) return `https:${image}`;
      if (image.startsWith('www.')) return `https://${image}`;
      return null; // Or handle other cases
    })
    .filter(Boolean) as string[];

  // If no valid images, show placeholder
  if (!validImages.length) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
    );
  }

  // If only one image, show it without carousel
  if (validImages.length === 1) {
    return (
      <Image
        src={validImages[0]}
        alt={title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length
    );
  };

  return (
    <div className="relative w-full h-full group">
      {/* Image Display */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={validImages[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Navigation Arrows */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* Navigation Dots */}
      {validImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center z-20 gap-1.5">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 hover:scale-110 border border-white/30 ${
                currentIndex === index
                  ? 'bg-white shadow-md scale-110'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
