
import React, { useEffect, useState } from 'react';
import ProgressPreview from './ProgressPreview';

interface StickyImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  liveLogbookUrl?: string;
  onImageClick: (src: string, alt: string) => void;
}

const StickyImageGallery = ({ images, liveLogbookUrl, onImageClick }: StickyImageGalleryProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position to adjust the gallery
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProgressClick = () => {
    if (liveLogbookUrl) {
      window.open(liveLogbookUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="md:sticky md:top-24 md:self-start bg-tech-dark/80 border-l border-tech-blue/10 p-8 h-fit pb-10">
      <div className="transition-all duration-200" style={{ 
        transform: `translateY(${Math.min(scrollPosition * 0.05, 50)}px)` 
      }}>
        {images.length > 0 && (
          <div className="rounded-lg overflow-hidden mb-6 cursor-pointer transition-transform hover:scale-105 shadow-xl" 
            onClick={() => onImageClick(images[0].src, images[0].alt)}>
            <img 
              src={images[0].src} 
              alt={images[0].alt} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {liveLogbookUrl && (
          <ProgressPreview 
            liveLogbookUrl={liveLogbookUrl}
            onPreviewClick={handleProgressClick}
          />
        )}
        
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            {images.slice(1).map((image, index) => (
              <div 
                key={index}
                className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-lg"
                onClick={() => onImageClick(image.src, image.alt)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyImageGallery;
