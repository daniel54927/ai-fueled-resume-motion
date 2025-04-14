
import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import GooBackground from '../components/GooBackground';
import ScrollProgress from '../components/ScrollProgress';

const Index = () => {
  useEffect(() => {
    document.title = "Daniel C. Brown - IT Systems Administrator & Cybersecurity Specialist";
  }, []);

  return (
    <div className="min-h-screen bg-background goo-world">
      <ScrollProgress />
      <GooBackground />
      <Header />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      
      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-tech-blue/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
          </p>
        </div>
      </footer>
      
      {/* World of Goo inspired decorative blobs that follow scrolling */}
      <div className="gooey-blob-fixed w-64 h-64 -top-32 -left-20 animate-float-goo" style={{ animationDelay: '0s' }}></div>
      <div className="gooey-blob-fixed w-96 h-96 top-1/4 -right-48 animate-float-goo" style={{ animationDelay: '1s' }}></div>
      <div className="gooey-blob-fixed w-80 h-80 bottom-1/4 -left-40 animate-float-goo" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default Index;
