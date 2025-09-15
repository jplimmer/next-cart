'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { IsImageUrl } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ImageSlider({
  slug,
  imageurl,
}: {
  slug: string;
  imageurl: {
    id: string;
    url: string;
  }[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on('select', updateCarouselState);

    return () => {
      carouselApi.off('select', updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  function ValidatedImage({
    url,
    alt,
    onClick,
  }: {
    url: string;
    alt: string;
    onClick: () => void;
  }) {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isBroken, setIsBroken] = useState(false);

    useEffect(() => {
      const checkImage = async () => {
        const result = await IsImageUrl(url);
        setIsValid(typeof result === 'string' ? true : null);
      };
      checkImage();
    }, [url]);

    const display = (txt?: string | number) => {
      return (
        <div className="relative w-full h-full aspect-[4/3] bg-gray-100 flex flex-col items-center justify-center">
          <ImageOff className="w-6 h-6 text-gray-400 mb-1" />
          <div className="text-gray-500 text-sm font-medium">
            {(txt && String(txt)) || 'No image'}
          </div>
        </div>
      );
    };

    if (isBroken || isValid === false) {
      return display();
    }

    if (isValid === null) {
      return display();
    }

    return (
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={url}
          alt={alt}
          fill
          className="object-contain cursor-pointer"
          onError={() => setIsBroken(true)}
          onClick={onClick}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md aspect-[4/3] mx-auto overflow-hidden">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="w-full h-full"
      >
        <CarouselContent>
          {imageurl.map((item, idx) => (
            <CarouselItem key={idx}>
              <Card className="bg-gray-400 p-2 sm:p-4 h-full">
                <CardContent className="flex items-center justify-center w-full h-full p-4 min-w-0">
                  <div className="relative w-full h-full">
                    <ValidatedImage
                      url={item.url}
                      alt={`Slide ${idx + 1}`}
                      onClick={() => {
                        const query = new URLSearchParams({
                          index: idx.toString(),
                          id: item.id,
                        });
                        router.push(`products/${slug}?${query.toString()}`);
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-2 pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto p-2 rounded-full  bg-transparent shadow-none hover:bg-transparent"
          aria-label="Previous slide"
        >
          <ChevronLeft className="size-24 sm:w-8 sm:h-8" />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto p-2 rounded-full bg-transparent shadow-none hover:bg-transparent"
          aria-label="Next slide"
        >
          <ChevronRight className="size-24 sm:w-8 sm:h-8" />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full mx-1 transition-colors ${
              currentIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
