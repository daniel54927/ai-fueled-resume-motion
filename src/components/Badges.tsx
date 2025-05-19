
import { useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AnimatedCard from './AnimatedCard';
import { Award } from 'lucide-react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

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
      imageUrl: "/lovable-uploads/e18349bc-6d34-46d0-b667-7bd803cf97c3.png",
      credlyUrl: "https://www.credly.com/badges/cc94d4ef-1051-42ee-94c3-42a193ffd875"
    },
    {
      name: "CompTIA A+ Certification",
      issuer: "CompTIA",
      issuedDate: "Dec 2022",
      imageUrl: "https://images.credly.com/size/680x680/images/63482325-a0d6-4f64-ae75-f5f33922c7d0/CompTIA_A_2Bce.png",
      credlyUrl: "https://www.credly.com/badges/e750d210-34d4-4dba-b6b0-fa0c71e1d708"
    },
    {
      name: "CompTIA IT Fundamentals ITF+",
      issuer: "Quickstart Inc.",
      issuedDate: "Apr 2024",
      imageUrl: "/lovable-uploads/a3fbcbb2-0909-400a-8cfc-3c3b05de2e31.png",
      credlyUrl: "https://www.credly.com/badges/e750d210-34d4-4dba-b6b0-fa0c71e1d708"
    },
    {
      name: "CompTIA Network+ (Exam N10-008)",
      issuer: "Quickstart Inc.",
      issuedDate: "May 2024",
      imageUrl: "/lovable-uploads/d49012d6-fd2c-464f-9007-68ac6419e178.png",
      credlyUrl: "https://www.credly.com/badges/cc94d4ef-1051-42ee-94c3-42a193ffd875"
    },
    {
      name: "Security Fundamentals",
      issuer: "Quickstart Inc.",
      issuedDate: "Jun 2024",
      imageUrl: "/lovable-uploads/eed89495-3883-48ba-b738-937457170cea.png",
      credlyUrl: "https://www.credly.com/badges/341a8367-6436-44f6-b892-d66aeabd1be9"
    },
    {
      name: "Python for All",
      issuer: "Quickstart Inc.",
      issuedDate: "Jul 2024",
      imageUrl: "/lovable-uploads/5f4d3841-fbc9-4444-a488-d319fb2defc0.png",
      credlyUrl: "https://www.credly.com/badges/341a8367-6436-44f6-b892-d66aeabd1be9"
    },
    {
      name: "CompTIA Network+ ce Certification",
      issuer: "CompTIA",
      issuedDate: "Sep 2024",
      imageUrl: "/lovable-uploads/742d1579-0b20-4b26-8e6d-3613c94deaf4.png",
      credlyUrl: "https://www.credly.com/badges/cc94d4ef-1051-42ee-94c3-42a193ffd875"
    },
    {
      name: "CompTIA CySA+ Cybersecurity Analyst",
      issuer: "Quickstart Inc.",
      issuedDate: "Oct 2024",
      imageUrl: "/lovable-uploads/4a91e35e-26b7-4999-84a4-e6cb34e1ce30.png",
      credlyUrl: "https://www.credly.com/badges/07f2a028-b61a-44ac-816f-1dc619d4e29f"
    },
    {
      name: "CompTIA PenTest+ (Exam PT0-002)",
      issuer: "Quickstart Inc.",
      issuedDate: "Nov 2024",
      imageUrl: "/lovable-uploads/c111cc34-bcd7-4a2a-af23-2395772ca87d.png",
      credlyUrl: "https://www.credly.com/badges/07f2a028-b61a-44ac-816f-1dc619d4e29f"
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
                      <div className="mb-6 flex items-center justify-center w-40 h-40 rounded-full overflow-hidden border-2 border-tech-purple/30">
                        <img 
                          src={badge.imageUrl} 
                          alt={badge.name} 
                          className="w-full h-full object-cover" 
                        />
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
