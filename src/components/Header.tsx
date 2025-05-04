
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-tech-dark/95 backdrop-blur shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tech-blue to-tech-blue">
            Daniel C. Brown
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'after:w-full text-white' : ''}`}>
            Home
          </Link>
          <Link to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'after:w-full text-white' : ''}`}>
            Projects
          </Link>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#experience" className="nav-link">
            Experience
          </a>
          <a href="#skills" className="nav-link">
            Skills
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center text-white"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-tech-dark/95 backdrop-blur-lg shadow-lg">
            <nav className="flex flex-col py-4">
              <Link to="/" className="px-4 py-3 hover:bg-white/5">
                Home
              </Link>
              <Link to="/projects" className="px-4 py-3 hover:bg-white/5">
                Projects
              </Link>
              <a href="#about" className="px-4 py-3 hover:bg-white/5">
                About
              </a>
              <a href="#experience" className="px-4 py-3 hover:bg-white/5">
                Experience
              </a>
              <a href="#skills" className="px-4 py-3 hover:bg-white/5">
                Skills
              </a>
              <a href="#contact" className="px-4 py-3 hover:bg-white/5">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
