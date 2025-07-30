import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';

interface ProgressPreviewProps {
  liveLogbookUrl: string;
  onPreviewClick: () => void;
}

const ProgressPreview = ({ liveLogbookUrl, onPreviewClick }: ProgressPreviewProps) => {
  // Extract the sheet ID from the URL for the preview embed
  const getPreviewUrl = (url: string) => {
    const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match) {
      const sheetId = match[1];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/edit?usp=sharing&rm=minimal&single=true&gid=0&headers=false&chrome=false`;
    }
    return url;
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-tech-blue" />
          Progress Tracker
        </h4>
        <span className="text-xs text-gray-400">Live Updates</span>
      </div>
      
      <div 
        className="relative bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02] shadow-lg group"
        onClick={onPreviewClick}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
          <div className="bg-tech-blue text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <span className="font-medium">View Full Sheet</span>
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
        
        <iframe
          src={getPreviewUrl(liveLogbookUrl)}
          width="100%"
          height="300"
          frameBorder="0"
          className="pointer-events-none"
          title="Progress Tracker Preview"
        />
      </div>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        Last synced: {currentDate}
      </div>
    </div>
  );
};

export default ProgressPreview;