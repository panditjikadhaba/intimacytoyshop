import { useState, useRef, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { MediaCarousel } from '@/components/MediaCarousel';
import { ShareButton } from '@/components/ShareButton';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (features: string) => {
    const f = features.toLowerCase();
    if (f.includes('dildo')) return 'from-pink-500 to-rose-500';
    if (f.includes('vibrat')) return 'from-purple-500 to-violet-500';
    if (f.includes('masturbat')) return 'from-blue-500 to-indigo-500';
    if (f.includes('spray') || f.includes('cream')) return 'from-green-500 to-emerald-500';
    if (f.includes('doll')) return 'from-amber-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  // Intersection Observer for autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => setIsHovered(false), 2000); // Keep playing for 2 seconds after touch
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
  };

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 h-full flex flex-col relative">
        
        {/* Share Button - Top Right */}
        <div className="absolute top-3 right-3 z-10" onClick={handleShareClick}>
          <ShareButton product={product} />
        </div>

        {/* Media Section */}
        <div className="mb-4 h-40 md:h-48 rounded-lg overflow-hidden">
          <MediaCarousel 
            product={product}
            autoPlay={isInView || isHovered}
            showControls={false}
            className="w-full h-full"
          />
        </div>

        {/* SKU Badge */}
        <div className={`inline-block px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryColor(product.features)} mb-3 md:mb-4 self-start`}>
          {product.sku}
        </div>

        {/* Product Details */}
        {product.details && (
          <div className="text-purple-300 text-xs md:text-sm mb-2 font-mono">
            {product.details}
          </div>
        )}

        {/* Features */}
        <h3 className="text-white text-sm md:text-lg font-medium mb-3 md:mb-4 line-clamp-3 leading-relaxed flex-grow">
          {product.features}
        </h3>

        {/* Price */}
        <div className="mt-auto">
          <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {product.minPrice === product.maxPrice 
              ? `$${product.minPrice} USD`
              : `$${product.minPrice}-${product.maxPrice} USD`
            }
          </div>
          
          {/* Quick Buy Button - Mobile */}
          <div className="md:hidden">
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-2 rounded-lg text-xs font-medium">
              <ShoppingCart className="w-3 h-3" />
              Get More Info
            </div>
          </div>
        </div>

        {/* Quick Buy Button - Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-4">
            <ShoppingCart className="w-4 h-4" />
            Get More Info
          </div>
        </div>
      </div>
    </div>
  );
};