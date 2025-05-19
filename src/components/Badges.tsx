
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AnimatedCard from './AnimatedCard';
import { Award } from 'lucide-react';

interface Badge {
  name: string;
  issuer: string;
  issuedDate: string;
  imageUrl: string;
  credlyUrl: string;
}

const Badges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const badges: Badge[] = [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      issuedDate: "May 2023",
      imageUrl: "/lovable-uploads/16767776-d8a8-492f-b84c-509458e28c76.png", // Updated to use local image
      credlyUrl: "https://www.credly.com/badges/341a8367-6436-44f6-b892-d66aeabd1be9"
    },
    {
      name: "CompTIA Network+",
      issuer: "CompTIA",
      issuedDate: "Jan 2023",
      imageUrl: "/lovable-uploads/16767776-d8a8-492f-b84c-509458e28c76.png", // Using same placeholder for now
      credlyUrl: "https://www.credly.com/badges/cc94d4ef-1051-42ee-94c3-42a193ffd875"
    },
    {
      name: "CompTIA A+",
      issuer: "CompTIA",
      issuedDate: "Dec 2022",
      imageUrl: "/lovable-uploads/16767776-d8a8-492f-b84c-509458e28c76.png", // Using same placeholder for now
      credlyUrl: "https://www.credly.com/badges/e750d210-34d4-4dba-b6b0-fa0c71e1d708"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.badge-item').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 150);
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
    <section id="badges" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-tech-dark dark:to-tech-dark">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Certifications & Badges</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Professional certifications demonstrating my technical expertise and industry knowledge.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <a 
              key={index} 
              href={badge.credlyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="badge-item opacity-0 group"
            >
              <AnimatedCard className="h-full flex flex-col items-center p-6 dark:bg-tech-dark/50 transition-all group-hover:scale-105">
                <div className="mb-6 flex items-center justify-center">
                  <img 
                    src={badge.imageUrl} 
                    alt={badge.name} 
                    className="w-40 h-40 object-contain rounded-full" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{badge.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center mb-2">
                  <Badge variant="outline" className="bg-tech-blue/10 text-tech-blue border-tech-blue/20">
                    {badge.issuer}
                  </Badge>
                  <Badge variant="outline" className="bg-tech-purple/10 text-tech-purple border-tech-purple/20">
                    {badge.issuedDate}
                  </Badge>
                </div>
                <div className="mt-auto pt-4 flex items-center text-tech-blue">
                  <Award className="h-4 w-4 mr-1" />
                  <span className="text-sm">View on Credly</span>
                </div>
              </AnimatedCard>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            <a 
              href="https://www.credly.com/users/daniel-charles-brown" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-tech-blue hover:text-tech-blue/80 inline-flex items-center"
            >
              <Award className="h-4 w-4 mr-1" />
              <span>View all certifications on Credly</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Badges;
