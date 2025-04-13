
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const createParticles = () => {
      particles.current = [];
      const particleCount = Math.min(window.innerWidth / 10, 100); // Responsive particle count
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.fillStyle = `rgba(155, 135, 245, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect particles within proximity
        const mouseDistance = Math.hypot(
          particle.x - mousePosition.current.x,
          particle.y - mousePosition.current.y
        );
        
        // React to mouse
        if (mouseDistance < 100) {
          const angle = Math.atan2(
            mousePosition.current.y - particle.y,
            mousePosition.current.x - particle.x
          );
          
          // Slight attraction toward mouse
          particle.x += Math.cos(angle) * 0.2;
          particle.y += Math.sin(angle) * 0.2;
        }
        
        // Draw connections between nearby particles
        for (let j = index + 1; j < particles.current.length; j++) {
          const otherParticle = particles.current[j];
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${0.15 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    
    // Setup
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground;
