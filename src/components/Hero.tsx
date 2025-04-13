
import { useEffect, useRef } from 'react';
import { ChevronDown, Briefcase, Cpu, Shield } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const animateText = () => {
      const headingElement = headingRef.current;
      if (!headingElement) return;
      
      headingElement.classList.add('animate-fade-in');
    };
    
    animateText();
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center py-24">
      <div className="section-container flex flex-col items-center justify-center text-center">
        <span className="py-1 px-4 bg-tech-purple/10 text-tech-purple rounded-full text-sm mb-6 animate-fade-in">
          IT Systems Administrator & Cybersecurity Specialist
        </span>
        
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-6 opacity-0">
          Daniel <span className="tech-gradient-text">C. Brown</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          15+ years of experience across AI automation, cybersecurity, and infrastructure management.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Briefcase className="h-4 w-4 text-tech-blue" />
            <span>Systems Administration</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Cpu className="h-4 w-4 text-tech-purple" />
            <span>AI Automation</span>
          </div>
          
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            <Shield className="h-4 w-4 text-tech-blue" />
            <span>Cybersecurity</span>
          </div>
        </div>
        
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#contact" 
            className="bg-tech-blue hover:bg-tech-blue/90 text-white px-8 py-3 rounded-md shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
          <a 
            href="#about" 
            className="bg-white/80 backdrop-blur-sm hover:bg-white/90 px-8 py-3 rounded-md shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Learn More
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll Down"
      >
        <ChevronDown className="h-8 w-8 text-tech-blue" />
      </a>
    </section>
  );
};

export default Hero;
