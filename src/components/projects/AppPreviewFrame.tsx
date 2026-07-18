import React from 'react';

interface AppPreviewFrameProps {
  children: React.ReactNode;
  caption: string;
  size?: 'lg' | 'sm';
}

const AppPreviewFrame = ({ children, caption, size = 'sm' }: AppPreviewFrameProps) => {
  return (
    <div className="flex flex-col">
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black/40">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-black/60 border-b border-white/10">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className={size === 'lg' ? 'min-h-[280px]' : 'min-h-[180px]'}>
          {children}
        </div>
      </div>
      <p className="text-xs text-gray-400 italic mt-2 px-1">{caption}</p>
    </div>
  );
};

export default AppPreviewFrame;
