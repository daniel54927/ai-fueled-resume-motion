
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import ParticleBackground from '../components/ParticleBackground';
import ScrollProgress from '../components/ScrollProgress';

const Index = () => {
  useEffect(() => {
    document.title = "Daniel C. Brown - IT Systems Administrator & Cybersecurity Specialist";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
