
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      isScrolled ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <span className="font-bold text-xl font-mono tech-gradient-text">DCB</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-tech-blue text-white px-4 py-2 rounded-md hover:bg-tech-blue/80 transition-colors"
          >
            Get in Touch
          </a>
        </nav>
        
        {/* Mobile Nav Button */}
        <button 
          className="md:hidden p-2 rounded-md focus:outline-none" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-tech-dark hover:text-tech-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="block w-full text-center bg-tech-blue text-white px-4 py-2 rounded-md hover:bg-tech-blue/80 transition-colors"
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
