
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({ isOpen, onClose, imageSrc, imageAlt }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/90">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-center w-full h-full">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="max-w-full max-h-[85vh] object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
