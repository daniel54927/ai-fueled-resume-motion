
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

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
      isScrolled ? 'py-2 bg-white/80 dark:bg-tech-dark/90 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10">
            <svg 
              viewBox="0 0 40 40" 
              className="w-full h-full"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 11.716 28.284 5 20 5ZM20 9C22.209 9 24 10.791 24 13C24 15.209 22.209 17 20 17C17.791 17 16 15.209 16 13C16 10.791 17.791 9 20 9ZM12 27C12 22.582 15.582 19 20 19C24.418 19 28 22.582 28 27H12Z" 
                className="fill-tech-dark dark:fill-white"
              />
              <path 
                d="M30 14C30 12.343 28.657 11 27 11C25.343 11 24 12.343 24 14C24 15.657 25.343 17 27 17C28.657 17 30 15.657 30 14Z" 
                className="fill-tech-purple dark:fill-tech-blue"
              />
              <path 
                d="M13 11C11.343 11 10 12.343 10 14C10 15.657 11.343 17 13 17C14.657 17 16 15.657 16 14C16 12.343 14.657 11 13 11Z" 
                className="fill-tech-purple dark:fill-tech-blue"
              />
            </svg>
          </div>
          <span className="font-bold text-xl font-mono text-tech-dark dark:text-white">DeepFrog</span>
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
          <ThemeToggle />
          <a 
            href="#contact" 
            className="bg-tech-blue text-white dark:bg-tech-purple dark:text-white px-4 py-2 rounded-md hover:bg-tech-blue/80 dark:hover:bg-tech-purple/80 transition-colors font-medium"
          >
            Get in Touch
          </a>
        </nav>
        
        {/* Mobile Nav Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button 
            className="p-2 rounded-md focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="text-foreground" /> : <Menu className="text-foreground" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-tech-dark/95 backdrop-blur-md absolute top-full left-0 right-0 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-foreground hover:text-tech-blue dark:hover:text-tech-purple transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="block w-full text-center bg-tech-blue text-white dark:bg-tech-purple dark:text-white px-4 py-2 rounded-md hover:bg-tech-blue/80 dark:hover:bg-tech-purple/80 transition-colors font-medium"
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
