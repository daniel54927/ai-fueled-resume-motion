
import React from 'react';

interface StickyImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  onImageClick: (src: string, alt: string) => void;
}

const StickyImageGallery = ({ images, onImageClick }: StickyImageGalleryProps) => {
  return (
    <div className="md:sticky md:top-24 md:self-start bg-tech-dark border-l border-tech-blue/10 p-8 h-fit">
      {images.length > 0 && (
        <div className="rounded-lg overflow-hidden mb-6 cursor-pointer transition-transform hover:scale-105" 
          onClick={() => onImageClick(images[0].src, images[0].alt)}>
          <img 
            src={images[0].src} 
            alt={images[0].alt} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1).map((image, index) => (
            <div 
              key={index}
              className="rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
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
  );
};

export default StickyImageGallery;
