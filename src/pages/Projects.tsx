
import { useEffect, useRef } from 'react';
import { Mail, Bot, ArrowRight } from 'lucide-react';
import N8nIcon from '../components/icons/N8nIcon';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';

const Projects = () => {
  useEffect(() => {
    document.title = "AI Projects - Daniel C. Brown";
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />
      
      <main>
        <section className="py-20 text-white">
          <div className="section-container">
            <div className="mb-16 text-center">
              <span className="py-1 px-4 bg-tech-blue/20 text-tech-blue rounded-full text-sm mb-6 inline-block animate-fade-in font-medium">
                AI & Automation Projects
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                My <span className="tech-gradient-text">AI Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                Leveraging artificial intelligence and automation to solve real-world problems and improve efficiency.
              </p>
            </div>
          </div>
        </section>

        <section ref={sectionRef} className="py-12 md:py-24">
          <div className="section-container">
            <div className="bg-tech-dark/80 border border-tech-blue/20 rounded-xl overflow-hidden shadow-lg mb-24 animate-on-scroll opacity-0">
              <div className="md:grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="bg-tech-blue/20 p-3 rounded-full">
                      <N8nIcon className="h-6 w-6 text-tech-blue" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">AI-Powered Email Management System</h2>
                  </div>
                  
                  <div className="text-gray-300 space-y-4">
                    <p>
                      This innovative system automates email processing, dramatically reducing the time spent on email management. 
                      As an MVP, it demonstrates the viability of using AI to streamline daily communication tasks while maintaining personal oversight.
                    </p>
                    <p>
                      The system processes 50 emails in just 3-4 minutes, using AI for email categorization and draft response generation. 
                      It implements a Human in the Middle approach, ensuring quality control and maintaining the personal touch in all communications.
                    </p>
                    <div className="bg-tech-blue/10 border border-tech-blue/20 rounded-lg p-4 my-6">
                      <h3 className="font-bold text-tech-blue mb-2">Key Results from MVP Testing</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-200">
                        <li>Processed 600 emails over a 3-day period</li>
                        <li>Reduced email handling time from 8 hours to just 48 minutes</li>
                        <li>Saved over 7 hours of email processing time</li>
                        <li>Achieved a 93% reduction in time spent on email management</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-tech-dark border-l border-tech-blue/10 p-8">
                  <div className="rounded-lg overflow-hidden mb-6">
                    <img 
                      src="/lovable-uploads/901cfb17-9e52-4fc5-8460-e7ecc46dc873.png" 
                      alt="AI Email Management System Overview" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src="/lovable-uploads/80a006f4-1811-4306-8abf-d487bd689894.png" 
                        alt="Director's Email Draft Writer" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src="/lovable-uploads/499df142-5a73-4224-95be-4af68f15fa75.png" 
                        alt="Director's Workflow" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12 border-t border-tech-blue/20 bg-tech-dark/90">
                <h3 className="text-xl font-bold text-white mb-4">Features</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-tech-blue" />
                      <h4 className="font-semibold text-white">Rapid Processing</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Handles 50 emails in just 3-4 minutes</p>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-tech-blue" />
                      <h4 className="font-semibold text-white">AI-Driven Categorization</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Automatically sorts emails based on content and sender</p>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-5 w-5 text-tech-blue" />
                      <h4 className="font-semibold text-white">Intelligent Draft Generation</h4>
                    </div>
                    <p className="text-gray-300 text-sm">Uses AI to create contextually appropriate email responses</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-tech-dark/70 border border-tech-blue/30 rounded-full px-4 py-2 flex items-center space-x-2">
                      <N8nIcon className="h-4 w-4 text-tech-blue" />
                      <span className="text-gray-200 text-sm">n8n Workflow Automation</span>
                    </div>
                    <div className="bg-tech-dark/70 border border-tech-blue/30 rounded-full px-4 py-2 flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-tech-blue" />
                      <span className="text-gray-200 text-sm">OpenAI</span>
                    </div>
                    <div className="bg-tech-dark/70 border border-tech-blue/30 rounded-full px-4 py-2 flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-tech-blue" />
                      <span className="text-gray-200 text-sm">Gmail API</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-white mb-4">Impact</h3>
                  <p className="text-gray-300">
                    The AI-Powered Email Management System MVP has demonstrated significant potential in streamlining email management processes. 
                    By reducing email handling time by 93%, it allows for greater focus on high-value tasks and strategic thinking, 
                    significantly boosting overall productivity.
                  </p>
                  
                  <div className="mt-6">
                    <a href="#contact" className="inline-flex items-center text-tech-blue hover:text-tech-blue/90 font-medium">
                      <span>Contact me to learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
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

export default Projects;
