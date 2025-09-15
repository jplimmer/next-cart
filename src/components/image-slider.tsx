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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ImageSlider({
  imageurl,
}: {
  imageurl: {
    id: string | number;
    url: string;
  }[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

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

  function ValidatedImage({ url, alt }: { url: string; alt: string }) {
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
        <div className="flex items-center justify-center w-[180px] h-[135px] bg-gray-200 text-gray-800 text-base font-semibold">
          {(txt && String(txt)) || 'No image'}
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
      <Image
        src={url}
        alt={alt}
        width={180}
        height={135}
        onError={() => setIsBroken(true)}
      />
    );
  }

  return (
    <div className="relative h-[230px] w-full max-w-7xl mx-auto mt-5 lg:mt-6">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="w-full max-w-7xl h-48 max-h-[500px] z-10"
      >
        <CarouselContent>
          {imageurl.map((item, idx) => (
            <CarouselItem key={idx}>
              <Card className="bg-gray-400">
                <CardContent className="flex items-center justify-center w-[360px] h-[185px] p-6">
                  <ValidatedImage url={item.url} alt={`Slide ${idx + 1}`} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="absolute inset-[-10] z-20 flex items-center justify-between px-3 pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronLeft className="size-32" strokeWidth={0.5} />
        </Button>

        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronRight className="size-32 ml-5" strokeWidth={0.5} />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
