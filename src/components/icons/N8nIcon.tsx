
import React from 'react';

const N8nIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      width="24" 
      height="24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M7 12h4a1 1 0 0 0 1-1V7" />
      <path d="M17 12h-4a1 1 0 0 0-1 1v4" />
      <path d="M14 9l3-3" />
      <path d="M10 15l-3 3" />
    </svg>
  );
};

export default N8nIcon;
