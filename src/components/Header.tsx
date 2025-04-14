
import { useState, useEffect } from 'react';
import { Menu, X, BrainCircuit } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-tech-dark/90 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10">
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
            className="bg-tech-purple text-white px-4 py-2 rounded-md hover:bg-tech-purple/80 transition-colors font-medium"
          >
            Get in Touch
          </a>
        </nav>
        
        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center">
          <button 
            className="p-2 rounded-md focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-tech-dark/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-white hover:text-tech-purple transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="block w-full text-center bg-tech-purple text-white px-4 py-2 rounded-md hover:bg-tech-purple/80 transition-colors font-medium"
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
