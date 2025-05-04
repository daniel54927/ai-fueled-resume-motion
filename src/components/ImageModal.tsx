
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.25, 0.5));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/90">
        <div className="absolute right-4 top-4 z-50 flex space-x-2">
          <button 
            onClick={handleZoomIn}
            className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button 
            onClick={onClose}
            className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center justify-center w-full h-full overflow-auto">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="max-w-full max-h-[85vh] object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
