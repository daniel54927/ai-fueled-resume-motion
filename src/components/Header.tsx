
import { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];
  
  // World of Goo style bubble logo effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mouseMoved) return;
    
    const bubbleLogo = e.currentTarget;
    const rect = bubbleLogo.getBoundingClientRect();
    
    // Calculate mouse position relative to logo center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    
    // Create a bulging effect based on mouse position
    const maxMove = 3;
    const moveX = (distX / rect.width) * maxMove;
    const moveY = (distY / rect.height) * maxMove;
    
    // Apply transform
    bubbleLogo.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  };
  
  const handleMouseEnter = () => {
    setMouseMoved(true);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseMoved(false);
    e.currentTarget.style.transform = '';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-tech-dark/80 backdrop-blur-md shadow-md border-b border-tech-blue/10' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div 
            className="flex items-center justify-center w-12 h-12 bg-tech-dark/50 rounded-full border border-tech-blue/30 p-2 animate-pulse-soft goo-border"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <BrainCircuit className="w-full h-full text-tech-blue" />
          </div>
          <span className="font-bold text-xl font-mono text-white">DeepFrog</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="nav-link font-medium"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-tech-blue/90 text-white px-4 py-2 rounded-md hover:bg-tech-blue transition-colors font-medium goo-border"
          >
            Get in Touch
          </a>
        </nav>
        
        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center">
          <button 
            className="p-2 rounded-md focus:outline-none goo-border" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tech-dark/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg animate-fade-in border-t border-tech-blue/20">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-tech-blue transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="block w-full text-center bg-tech-blue/90 text-white px-4 py-2 rounded-md hover:bg-tech-blue transition-colors font-medium goo-border"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
