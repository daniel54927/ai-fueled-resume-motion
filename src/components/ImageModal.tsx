
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  
  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => {
      const newZoom = Math.min(prevZoom + 0.25, 3);
      return newZoom;
    });
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => {
      const newZoom = Math.max(prevZoom - 0.25, 0.5);
      // Reset position if we're zooming back to original size
      if (newZoom <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      isDragging.current = true;
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && zoomLevel > 1) {
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      lastPosition.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const moveImage = (direction: 'left' | 'right' | 'up' | 'down') => {
    const moveAmount = 50;
    setPosition(prev => {
      switch (direction) {
        case 'left':
          return { ...prev, x: prev.x + moveAmount };
        case 'right':
          return { ...prev, x: prev.x - moveAmount };
        case 'up':
          return { ...prev, y: prev.y + moveAmount };
        case 'down':
          return { ...prev, y: prev.y - moveAmount };
        default:
          return prev;
      }
    });
  };

  // Reset position when modal closes
  const handleClose = () => {
    onClose();
    setPosition({ x: 0, y: 0 });
    setZoomLevel(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/90">
        <DialogTitle className="sr-only">Image Viewer</DialogTitle>
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
            onClick={handleClose}
            className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation controls - only shown when zoomed in */}
        {zoomLevel > 1 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 z-50 flex space-x-2">
            <button 
              onClick={() => moveImage('left')}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Move left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={() => moveImage('up')}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors" 
              aria-label="Move up"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <button 
              onClick={() => moveImage('down')}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Move down"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <button 
              onClick={() => moveImage('right')}
              className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
              aria-label="Move right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className="w-full h-full overflow-hidden flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="transition-transform duration-100 flex items-center justify-center"
            style={{
              transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
            }}
          >
            <img 
              src={imageSrc} 
              alt={imageAlt}
              className="max-w-full max-h-[85vh] object-contain select-none" 
              draggable={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
