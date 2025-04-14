
import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import NeuralBackground from '../components/NeuralBackground';
import ScrollProgress from '../components/ScrollProgress';

const Index = () => {
  useEffect(() => {
    document.title = "Daniel C. Brown - IT Systems Administrator & Cybersecurity Specialist";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <NeuralBackground />
      <Header />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
