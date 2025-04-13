
import { useState, useEffect } from 'react';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      const progress = (scrollPosition / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', updateScrollProgress);
    
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 z-50 h-1 bg-tech-purple/20 w-full">
      <div 
        className="h-full bg-tech-blue"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
