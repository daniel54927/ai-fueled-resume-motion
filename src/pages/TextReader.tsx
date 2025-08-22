import React, { useEffect } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import TextReaderComponent from '../components/TextReader';

const TextReaderPage = () => {
  useEffect(() => {
    document.title = "Personal Text Reader - Daniel C. Brown";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />
      
      <main className="pt-20 pb-12">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Personal Text Reader
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                An accessibility tool for ADHD and dyslexia support. Convert any text to speech 
                for better focus and comprehension when traditional reading becomes challenging.
              </p>
            </div>
            
            <TextReaderComponent />
          </div>
        </section>
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

export default TextReaderPage;