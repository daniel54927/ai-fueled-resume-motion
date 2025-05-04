
import { useEffect, useRef, useState } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import ImageModal from '../components/ImageModal';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
  useEffect(() => {
    document.title = "AI Projects - Daniel C. Brown";
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{src: string, alt: string} | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
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
  
  // Track scroll position for sticky sidebar
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openImageModal = (src: string, alt: string) => {
    setModalImage({ src, alt });
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  // Project data
  const emailProject = {
    title: "AI-Powered Email Management System",
    description: [
      "This innovative system automates email processing, dramatically reducing the time spent on email management. As an MVP, it demonstrates the viability of using AI to streamline daily communication tasks while maintaining personal oversight.",
      "The system processes 50 emails in just 3-4 minutes, using AI for email categorization and draft response generation. It implements a Human in the Middle approach, ensuring quality control and maintaining the personal touch in all communications."
    ],
    results: {
      title: "Key Results from MVP Testing",
      items: [
        "Processed 600 emails over a 3-day period",
        "Reduced email handling time from 8 hours to just 48 minutes",
        "Saved over 7 hours of email processing time",
        "Achieved a 93% reduction in time spent on email management"
      ]
    },
    images: [
      {
        src: "/lovable-uploads/901cfb17-9e52-4fc5-8460-e7ecc46dc873.png",
        alt: "AI Email Management System Overview"
      },
      {
        src: "/lovable-uploads/80a006f4-1811-4306-8abf-d487bd689894.png",
        alt: "Director's Email Draft Writer"
      },
      {
        src: "/lovable-uploads/499df142-5a73-4224-95be-4af68f15fa75.png",
        alt: "Director's Workflow"
      }
    ],
    features: [
      {
        icon: "mail" as const,
        title: "Rapid Processing",
        description: "Handles 50 emails in just 3-4 minutes"
      },
      {
        icon: "bot" as const,
        title: "AI-Driven Categorization",
        description: "Automatically sorts emails based on content and sender"
      },
      {
        icon: "bot" as const,
        title: "Intelligent Draft Generation",
        description: "Uses AI to create contextually appropriate email responses"
      }
    ],
    technologies: [
      "n8n Workflow Automation",
      "OpenAI",
      "Gmail API"
    ],
    impactText: "The AI-Powered Email Management System MVP has demonstrated significant potential in streamlining email management processes. By reducing email handling time by 93%, it allows for greater focus on high-value tasks and strategic thinking, significantly boosting overall productivity."
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />
      
      <main>
        <section className="py-20 text-white">
          <div className="section-container">
            <ProjectsHeader 
              title="My AI Projects"
              subtitle="Leveraging artificial intelligence and automation to solve real-world problems and improve efficiency."
              badgeText="AI & Automation Projects"
            />
          </div>
        </section>

        <section ref={sectionRef} className="py-12 md:py-24">
          <div className="section-container">
            <ProjectCard 
              {...emailProject}
              onImageClick={openImageModal}
            />
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

      {/* Image Modal */}
      {modalImage && (
        <ImageModal 
          isOpen={!!modalImage} 
          onClose={closeImageModal} 
          imageSrc={modalImage.src} 
          imageAlt={modalImage.alt}
        />
      )}
    </div>
  );
};

export default Projects;
