
import { useEffect, useRef } from 'react';
import { ChevronDown, Briefcase, Cpu, Shield, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <span className="py-1 px-4 bg-tech-blue/20 text-tech-blue dark:text-white rounded-full text-sm mb-6 animate-fade-in font-medium">
          IT Systems Administrator & Cybersecurity Specialist
        </span>
        
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-bold mb-6 opacity-0 text-white">
          Daniel <span className="tech-gradient-text">C. Brown</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          15+ years of experience across AI automation, cybersecurity, and infrastructure management.
        </p>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-tech-blue mb-8 animate-fade-in font-medium" style={{ animationDelay: '0.3s' }}>
          AI Projects Now Available!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20">
            <Briefcase className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Systems Administration</span>
          </div>
          
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20">
            <Cpu className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">AI Automation</span>
          </div>
          
          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20">
            <Shield className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Cybersecurity</span>
          </div>

          <div className="flex items-center gap-2 bg-tech-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-tech-blue/20">
            <Compass className="h-4 w-4 text-tech-blue" />
            <span className="text-white font-medium">Digital Adventure</span>
          </div>
        </div>
        
        <div className="flex gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#contact" 
            className="bg-tech-blue hover:bg-tech-blue/90 text-white px-8 py-3 rounded-md shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 font-medium"
          >
            Get in Touch
          </a>
          <Link 
            to="/projects" 
            className="bg-tech-dark/80 text-white backdrop-blur-sm hover:bg-tech-dark/90 border border-white/10 px-8 py-3 rounded-md shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 font-medium"
          >
            View AI Projects
          </Link>
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
