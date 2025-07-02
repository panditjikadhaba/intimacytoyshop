import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { getVideoUrl, getProductImages } from '@/utils/mediaUtils';
import type { Product } from '@/types/product';

interface MediaCarouselProps {
  product: Product;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
  isModal?: boolean; // New prop to identify modal usage
}

export const MediaCarousel = ({ 
  product, 
  autoPlay = false, 
  showControls = true,
  className = "",
  isModal = false // Default to false for homepage
}: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const videoUrl = getVideoUrl(product.sku);
  const images = getProductImages(product.sku);
  
  // Create media array with video first (if available), then images
  const mediaItems = [];
  if (videoUrl) {
    mediaItems.push({ type: 'video', url: videoUrl });
  }
  images.forEach(img => {
    mediaItems.push({ type: 'image', url: img });
  });

  const totalItems = mediaItems.length;

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (autoPlay && videoRef.current && currentIndex === 0 && videoUrl) {
      const timer = setTimeout(() => {
        videoRef.current?.play().catch(() => {
          // Autoplay failed, which is normal
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, currentIndex, videoUrl]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleVideoPlay = () => setIsVideoPlaying(true);
  const handleVideoPause = () => setIsVideoPlaying(false);
  const handleVideoLoad = () => setIsVideoLoaded(true);

  // Touch handlers for swipe functionality
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && totalItems > 1) {
      nextSlide();
    }
    if (isRightSwipe && totalItems > 1) {
      prevSlide();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && totalItems > 1) {
        prevSlide();
      } else if (e.key === 'ArrowRight' && totalItems > 1) {
        nextSlide();
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [totalItems]);

  if (totalItems === 0) {
    return (
      <div className={`bg-white/5 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20 ${className}`}>
        <div className="text-center text-purple-300">
          <div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 opacity-50 bg-purple-300 rounded" />
          <p className="text-xs md:text-sm opacity-50">Media coming soon</p>
        </div>
      </div>
    );
  }

  const currentMedia = mediaItems[currentIndex];

  return (
    <div className={`relative group ${className}`}>
      <div 
        ref={carouselRef}
        className="relative w-full h-full bg-black rounded-lg overflow-hidden focus:outline-none"
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {currentMedia.type === 'video' ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className={`w-full h-full ${isModal ? 'object-contain' : 'object-cover'}`}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onLoadedData={handleVideoLoad}
              preload="metadata"
              muted
              loop
              playsInline
            >
              <source src={currentMedia.url} type="video/mp4" />
            </video>
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={toggleVideoPlay}
                className={`bg-black/50 backdrop-blur-sm rounded-full p-3 transition-opacity duration-300 ${
                  isVideoPlaying && isVideoLoaded ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                {isVideoPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
              src={currentMedia.url}
              alt={`${product.sku} - Image ${currentIndex + (videoUrl ? 0 : 1)}`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              style={{ 
                width: 'auto', 
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        )}

        {/* Navigation Arrows - Always visible on mobile for images */}
        {showControls && totalItems > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-70 active:scale-95"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 opacity-70 active:scale-95"
              aria-label="Next media"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Media Counter */}
        {totalItems > 1 && (
          <div className="absolute bottom-2 right-2">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white text-xs font-medium">
                {currentIndex + 1} / {totalItems}
              </span>
            </div>
          </div>
        )}

        {/* Swipe Indicator for Mobile */}
        {totalItems > 1 && (
          <div className="absolute bottom-2 left-2 md:hidden">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white text-xs">
                👈 Swipe 👉
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showControls && totalItems > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
          {mediaItems.map((media, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index 
                  ? 'border-purple-400 ring-2 ring-purple-400/50' 
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              {media.type === 'video' ? (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <div className="w-4 h-4 text-white bg-white rounded" />
                </div>
              ) : (
                <img
                  src={media.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};