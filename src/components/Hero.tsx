
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Briefcase, Cpu, Shield, Compass } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const animateText = () => {
      const headingElement = headingRef.current;
      if (!headingElement) return;
      
      headingElement.classList.add('animate-fade-in');
    };
    
    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !mouseMoved) return;
      
      const el = containerRef.current;
      const rect = el.getBoundingClientRect();
      
      // Calculate relative position
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      
      // Calculate as percentage from center
      const centerX = relX - rect.width / 2;
      const centerY = relY - rect.height / 2;
      
      // Apply parallax effect to children
      const children = Array.from(el.children);
      children.forEach((child, index) => {
        const depth = index % 3 === 0 ? 0.03 : index % 3 === 1 ? 0.02 : 0.01;
        const moveX = centerX * depth * -1;
        const moveY = centerY * depth * -1;
        
        // Apply transform to create parallax
        (child as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    const handleMouseEnter = () => {
      setMouseMoved(true);
    };
    
    const handleMouseLeave = () => {
      // Reset transforms when mouse leaves
      if (!containerRef.current) return;
      
      const children = Array.from(containerRef.current.children);
      children.forEach((child) => {
        (child as HTMLElement).style.transform = '';
      });
    };
    
    animateText();
    
    // Add mouse move listeners for parallax effect
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [mouseMoved]);
  
  return (
    <section className="relative min-h-screen flex items-center py-24">
      <div 
        ref={containerRef} 
        className="section-container flex flex-col items-center justify-center text-center parallax"
      >
        <span className="py-1 px-4 bg-tech-blue/20 text-tech-blue dark:text-white rounded-full text-sm mb-6 animate-fade-in goo-border">
          IT Systems Administrator & Cybersecurity Specialist
        </span>
        
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-6 opacity-0 text-white heading-goo">
          Daniel <span className="tech-gradient-text">C. Brown</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-4 animate-fade-in gooey-element" style={{ animationDelay: '0.2s' }}>
          15+ years of experience across AI automation, cybersecurity, and infrastructure management.
        </p>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-tech-blue mb-8 animate-fade-in font-medium" style={{ animationDelay: '0.3s' }}>
          AI Projects Coming Soon!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20 animate-hover-goo">
            <Briefcase className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Systems Administration</span>
          </div>
          
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20 animate-hover-goo">
            <Cpu className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">AI Automation</span>
          </div>
          
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20 animate-hover-goo">
            <Shield className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Cybersecurity</span>
          </div>

          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20 animate-hover-goo">
            <Compass className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Digital Adventure</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#contact" 
            className="bg-tech-blue hover:bg-tech-blue/90 text-white px-8 py-3 rounded-md shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 font-medium goo-border"
          >
            Get in Touch
          </a>
          <a 
            href="#about" 
            className="bg-tech-dark/80 text-white backdrop-blur-sm hover:bg-tech-dark/90 border border-tech-blue/10 px-8 py-3 rounded-md shadow-md transition-all hover:shadow-lg hover:-translate-y-1 font-medium"
          >
            Explore My Journey
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll Down"
      >
        <div className="p-2 rounded-full bg-tech-blue/20 border border-tech-blue/30">
          <ChevronDown className="h-8 w-8 text-tech-blue" />
        </div>
      </a>
    </section>
  );
};

export default Hero;
