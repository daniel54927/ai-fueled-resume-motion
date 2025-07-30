
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
      name: "CompTIA Security+ Certification",
      issuer: "CompTIA",
      issuedDate: "May 2023",
      imageUrl: "https://images.credly.com/size/680x680/images/74790a75-8451-400a-8536-92d792c5184a/CompTIA_Security_2Bce.png",
      credlyUrl: "https://www.credly.com/badges/f3bb9acb-6243-43a8-a74f-df26e8ec74cd"
    },
    {
      name: "CompTIA Network+ Certification",
      issuer: "CompTIA",
      issuedDate: "Jan 2023",
      imageUrl: "https://images.credly.com/images/c70ba73e-3c8a-46fa-9d60-4a9af94ad662/blob",
      credlyUrl: "https://www.credly.com/badges/cc94d4ef-1051-42ee-94c3-42a193ffd875"
    },
    {
      name: "CompTIA A+ Certification",
      issuer: "CompTIA",
      issuedDate: "Dec 2022",
      imageUrl: "https://images.credly.com/images/f6d62c5d-1e1d-4de6-92ee-8dc8c80b1c7b/blob",
      credlyUrl: "https://www.credly.com/badges/e750d210-34d4-4dba-b6b0-fa0c71e1d708"
    },
    {
      name: "CompTIA IT Fundamentals ITF+",
      issuer: "CompTIA",
      issuedDate: "Apr 2024",
      imageUrl: "https://images.credly.com/images/631eab71-1765-43ee-9db5-7a5062302a13/fdaf9fc61fe24ba78178b46809f84478.PNG.png",
      credlyUrl: "https://www.credly.com/badges/e750d210-34d4-4dba-b6b0-fa0c71e1d708"
    },
    {
      name: "CompTIA PenTest+",
      issuer: "CompTIA",
      issuedDate: "Nov 2024",
      imageUrl: "https://images.credly.com/images/8881885c-9234-4ee6-bf4b-d526ebc8e98a/tempfile20221205-50-dxl8g6.png",
      credlyUrl: "https://www.credly.com/badges/d9e9c6f2-fbc2-4b73-9c16-9748ba46a819/public_url"
    },
    {
      name: "CompTIA CySA+ Cybersecurity Analyst",
      issuer: "CompTIA",
      issuedDate: "Oct 2024",
      imageUrl: "https://images.credly.com/size/680x680/images/9b75a8c1-8b52-4e3e-9b7e-15e95e43cc2c/CompTIA_CySA_2Bce.png",
      credlyUrl: "https://www.credly.com/badges/cf60abc3-3b0f-456a-b366-1621309ff0ce/public_url"
    },
    {
      name: "Python Programming",
      issuer: "Python Institute",
      issuedDate: "Jul 2024",
      imageUrl: "https://images.credly.com/size/680x680/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
      credlyUrl: "https://www.credly.com/badges/341a8367-6436-44f6-b892-d66aeabd1be9"
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
