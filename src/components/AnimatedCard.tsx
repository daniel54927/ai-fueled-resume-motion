
import { ReactNode, useRef, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
}

const AnimatedCard = ({ children, className }: AnimatedCardProps) => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (x - centerX) / centerX * 5; // Max 5 degrees
      const tiltY = (centerY - y) / centerY * 5; // Max 5 degrees
      
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease'
      });
    }
  };
  
  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };
  
  return (
    <div
      ref={cardRef}
      className={`tech-card overflow-hidden ${className}`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
