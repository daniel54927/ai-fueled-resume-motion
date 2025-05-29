
import { useEffect, useRef } from 'react';

interface CredlyEmbedProps {
  badgeId: string;
  width?: string;
  height?: string;
}

const CredlyEmbed = ({ badgeId, width = "150", height = "270" }: CredlyEmbedProps) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Credly embed script if it hasn't been loaded already
    if (!document.querySelector('script[src*="credly.com/assets/utilities/embed.js"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//cdn.credly.com/assets/utilities/embed.js';
      document.head.appendChild(script);
    }

    // Initialize the embed after the script loads
    const timer = setTimeout(() => {
      if (window.credlyEmbed && embedRef.current) {
        window.credlyEmbed.init();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={embedRef}
      data-iframe-width={width}
      data-iframe-height={height}
      data-share-badge-id={badgeId}
      data-share-badge-host="https://www.credly.com"
      className="credly-embed"
    />
  );
};

export default CredlyEmbed;
