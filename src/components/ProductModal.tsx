import { X, ShoppingCart, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { MediaCarousel } from '@/components/MediaCarousel';
import { ShareButton } from '@/components/ShareButton';
import type { Product } from '@/types/product';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const getCategoryColor = (features: string) => {
    const f = features.toLowerCase();
    if (f.includes('dildo')) return 'from-pink-500 to-rose-500';
    if (f.includes('vibrat')) return 'from-purple-500 to-violet-500';
    if (f.includes('masturbat')) return 'from-blue-500 to-indigo-500';
    if (f.includes('spray') || f.includes('cream')) return 'from-green-500 to-emerald-500';
    if (f.includes('doll')) return 'from-amber-500 to-orange-500';
    return 'from-gray-500 to-slate-500';
  };

  const handleBuyNow = () => {
    const message = `Hi! I'd like to purchase ${product.sku} - ${product.features}. Price: ${product.minPrice === product.maxPrice ? `$${product.minPrice} USD` : `$${product.minPrice}-${product.maxPrice} USD`}`;
    const whatsappUrl = `https://wa.me/918377976329?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      // Enter fullscreen
      if (fullscreenContainerRef.current) {
        try {
          if (fullscreenContainerRef.current.requestFullscreen) {
            await fullscreenContainerRef.current.requestFullscreen();
          } else if ((fullscreenContainerRef.current as any).webkitRequestFullscreen) {
            await (fullscreenContainerRef.current as any).webkitRequestFullscreen();
          } else if ((fullscreenContainerRef.current as any).msRequestFullscreen) {
            await (fullscreenContainerRef.current as any).msRequestFullscreen();
          }
          setIsFullscreen(true);
        } catch (error) {
          console.log('Fullscreen request failed:', error);
        }
      }
    } else {
      // Exit fullscreen
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
        setIsFullscreen(false);
      } catch (error) {
        console.log('Exit fullscreen failed:', error);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-t-3xl md:rounded-3xl w-full md:max-w-6xl max-h-[95vh] md:max-h-[90vh] overflow-y-auto border border-purple-400/30">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-slate-900 to-purple-900 p-4 md:p-6 border-b border-purple-400/20">
          <div className="flex justify-between items-start">
            <div className={`inline-block px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium text-white bg-gradient-to-r ${getCategoryColor(product.features)}`}>
              {product.sku}
            </div>
            <div className="flex items-center gap-2">
              <ShareButton product={product} variant="button" size="md" />
              <button
                onClick={onClose}
                className="text-purple-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Media Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-purple-300 text-sm uppercase tracking-wide">Product Media</h3>
              <button
                onClick={toggleFullscreen}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-white" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
            
            <div 
              ref={fullscreenContainerRef}
              className={`relative ${
                isFullscreen 
                  ? 'fixed inset-0 z-[70] bg-black flex items-center justify-center p-4' 
                  : 'w-full aspect-video max-h-[60vh] rounded-xl overflow-hidden'
              }`}
            >
              <MediaCarousel 
                product={product}
                autoPlay={true}
                showControls={true}
                isModal={true}
                className={isFullscreen ? 'w-full h-full max-w-4xl max-h-full' : 'w-full h-full'}
              />
              
              {/* Fullscreen Exit Instructions */}
              {isFullscreen && (
                <div className="absolute top-4 left-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-sm">Press ESC or click minimize to exit fullscreen</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Product Details */}
            {product.details && (
              <div>
                <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Specifications</h3>
                <div className="text-white text-base md:text-lg font-mono bg-white/5 rounded-lg p-3 md:p-4">
                  {product.details}
                </div>
              </div>
            )}

            {/* Features */}
            <div>
              <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Features</h3>
              <div className="text-white text-base md:text-xl leading-relaxed bg-white/5 rounded-lg p-3 md:p-4">
                {product.features}
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-purple-300 text-sm uppercase tracking-wide mb-2">Price</h3>
              <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {product.minPrice === product.maxPrice 
                  ? `$${product.minPrice} USD`
                  : `$${product.maxPrice} USD`
                }
              </div>
            </div>

            {/* Quality Assurance */}
            <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-400/30">
              <h4 className="text-green-300 font-medium mb-2">Quality Guarantee</h4>
              <p className="text-green-100 text-sm">
                Premium laboratory-grade silicone • Edible-grade materials • Health & safety assured
              </p>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl p-4 border border-blue-400/30">
              <h4 className="text-blue-300 font-medium mb-2">Free Delivery in UAE</h4>
              <p className="text-blue-100 text-sm">
                2-3 days delivery • Cash on delivery available • Anonymous packaging for privacy
              </p>
            </div>


            {/* Free Gifts */}
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 border border-purple-400/30 text-center">
              <h4 className="text-purple-300 font-medium mb-2">🎁 Free Gifts Included</h4>
              <p className="text-purple-100 text-sm">
                Every order includes surprise gifts + sterilizing liquid for cleaning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};