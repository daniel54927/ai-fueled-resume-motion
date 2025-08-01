
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AnimatedCard from './AnimatedCard';
import CredlyEmbed from './CredlyEmbed';
import { Award } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface BadgeData {
  name: string;
  issuer: string;
  issuedDate: string;
  imageUrl?: string;
  credlyUrl: string;
  embedId?: string;
}

const Badges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const badges: BadgeData[] = [
    {
      name: "CompTIA Security+ ce Certification",
      issuer: "CompTIA",
      issuedDate: "Oct 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/80d8a06a-c384-42bf-ad36-db81bce5adce/blob",
      credlyUrl: "https://www.credly.com/badges/73de6044-de25-4f04-9074-5d7a922b422c/public_url"
    },
    {
      name: "CompTIA Network+ ce Certification",
      issuer: "CompTIA",
      issuedDate: "Sep 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/c70ba73e-3c8a-46fa-9d60-4a9af94ad662/blob",
      credlyUrl: "https://www.credly.com/badges/9a5ce4a7-a184-4b1b-a6ae-2caef64b2281/public_url"
    },
    {
      name: "CompTIA PenTest+ (Exam PT0-002)",
      issuer: "Quickstart Inc.",
      issuedDate: "Oct 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/8881885c-9234-4ee6-bf4b-d526ebc8e98a/tempfile20221205-50-dxl8g6.png",
      credlyUrl: "https://www.credly.com/badges/d9e9c6f2-fbc2-4b73-9c16-9748ba46a819/public_url"
    },
    {
      name: "CompTIA CySA+ Cybersecurity Analyst (CS0-002)",
      issuer: "Quickstart Inc.",
      issuedDate: "Oct 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/5d6e2c5c-82b8-4a8e-8b71-7371ada873c0/tempfile20211108-65-lek5f3.png",
      credlyUrl: "https://www.credly.com/badges/cf60abc3-3b0f-456a-b366-1621309ff0ce/public_url"
    },
    {
      name: "Python for All",
      issuer: "Quickstart Inc.",
      issuedDate: "Jul 2024",
      imageUrl: "https://images.credly.com/size/340x340/images/0252ceb2-35ba-43bb-892d-7c7742c7d724/image.png",
      credlyUrl: "https://www.credly.com/badges/19c10610-55dc-495e-b001-10d3ba96bcc5/public_url"
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
        
        <div className="relative px-4 sm:px-8 md:px-12 lg:px-16 mb-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {badges.map((badge, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <a 
                    href={badge.credlyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="badge-item opacity-0 group block h-full"
                  >
                    <AnimatedCard className="h-full flex flex-col items-center p-6 dark:bg-tech-dark/50 transition-all group-hover:scale-105">
                      <div className="relative mb-6 w-40 h-40">
                        <div className="w-full h-full flex items-center justify-center border-transparent">
                          {badge.embedId ? (
                            <CredlyEmbed badgeId={badge.embedId} width="120" height="180" />
                          ) : (
                            <img 
                              src={badge.imageUrl} 
                              alt={badge.name} 
                              className="max-w-full max-h-full object-contain" 
                              style={{ width: "100%", height: "100%" }}
                            />
                          )}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-center line-clamp-2">{badge.name}</h3>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden sm:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
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
