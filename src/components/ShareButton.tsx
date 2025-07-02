import { useState } from 'react';
import { Share2, Copy, Check, MessageCircle, Facebook, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import type { Product } from '@/types/product';

interface ShareButtonProps {
  product: Product;
  variant?: 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

export const ShareButton = ({ product, variant = 'icon', size = 'sm' }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

  // Generate product URL
  const generateProductUrl = () => {
    const baseUrl = window.location.origin;
    const productParams = new URLSearchParams({
      sku: product.sku,
      price: `${product.minPrice}-${product.maxPrice}`,
      details: product.details || '',
      features: product.features
    });
    return `${baseUrl}?product=${encodeURIComponent(product.sku)}&${productParams.toString()}`;
  };

  // Generate share text
  const generateShareText = () => {
    const price = product.minPrice === product.maxPrice 
      ? `${product.minPrice} AED` 
      : `${product.minPrice}-${product.maxPrice} AED`;
    
    return `Check out this amazing product: ${product.sku}\n\n${product.features}\n\nPrice: ${price}\n\n🚚 Free delivery in UAE\n💎 Premium quality guaranteed\n🎁 Free gifts included\n\nOrder now with cash on delivery!\n\nIntimacy Toy Shop - Dubai`;
  };

  // Copy link to clipboard
  const copyToClipboard = async () => {
    try {
      const url = generateProductUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Product link has been copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const text = generateShareText();
    const url = generateProductUrl();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Share via Facebook
  const shareFacebook = () => {
    const url = generateProductUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // Share via Twitter
  const shareTwitter = () => {
    const text = `Check out ${product.sku} - ${product.features.substring(0, 100)}... from Intimacy Toy Shop Dubai`;
    const url = generateProductUrl();
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Share via Email
  const shareEmail = () => {
    const subject = `Check out this product: ${product.sku} - Intimacy Toy Shop`;
    const body = `${generateShareText()}\n\nView product: ${generateProductUrl()}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  // Use native share API if available
  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.sku} - Intimacy Toy Shop Dubai`,
          text: generateShareText(),
          url: generateProductUrl(),
        });
      } catch (error) {
        // User cancelled or error occurred, fallback to dropdown
        console.log('Native share cancelled or failed');
      }
    }
  };

  const buttonSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'button') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <Share2 className={iconSizes[size]} />
            Share Product
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
          <DropdownMenuItem onClick={copyToClipboard} className="text-white hover:bg-slate-700">
            {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-slate-700" />
          
          <DropdownMenuItem onClick={shareWhatsApp} className="text-white hover:bg-slate-700">
            <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
            Share on WhatsApp
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={shareFacebook} className="text-white hover:bg-slate-700">
            <Facebook className="w-4 h-4 mr-2 text-blue-400" />
            Share on Facebook
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={shareTwitter} className="text-white hover:bg-slate-700">
            <Twitter className="w-4 h-4 mr-2 text-sky-400" />
            Share on Twitter
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={shareEmail} className="text-white hover:bg-slate-700">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            Share via Email
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${buttonSizes[size]} bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:text-white transition-all duration-300 rounded-full`}
          onClick={(e) => {
            e.stopPropagation();
            // Try native share first on mobile
            if (navigator.share && window.innerWidth < 768) {
              nativeShare();
            }
          }}
        >
          <Share2 className={iconSizes[size]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
        <DropdownMenuItem onClick={copyToClipboard} className="text-white hover:bg-slate-700">
          {copied ? <Check className="w-4 h-4 mr-2 text-green-400" /> : <Copy className="w-4 h-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-slate-700" />
        
        <DropdownMenuItem onClick={shareWhatsApp} className="text-white hover:bg-slate-700">
          <MessageCircle className="w-4 h-4 mr-2 text-green-400" />
          Share on WhatsApp
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareFacebook} className="text-white hover:bg-slate-700">
          <Facebook className="w-4 h-4 mr-2 text-blue-400" />
          Share on Facebook
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareTwitter} className="text-white hover:bg-slate-700">
          <Twitter className="w-4 h-4 mr-2 text-sky-400" />
          Share on Twitter
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={shareEmail} className="text-white hover:bg-slate-700">
          <Mail className="w-4 h-4 mr-2 text-gray-400" />
          Share via Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};