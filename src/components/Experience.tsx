
import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { cn } from '@/lib/utils';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  location: string;
  period: string;
  highlights: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      company: "American Place Casino",
      position: "IT Systems Administrator/Cybersecurity Specialist",
      location: "Waukegan, IL",
      period: "2024 - Present",
      highlights: [
        "Leading a pilot project for a local AI agent using LLMs, n8n, and relational/vector databases to support compliance and risk reduction",
        "Launched a Self-Service Portal that reduced software deployment time and cut support tickets across 287 endpoints",
        "Monitor and respond to real-time threats using CarbonBlack MDR and incident response protocols, resolving 150–200 alerts monthly",
        "Maintain secure infrastructure across hybrid systems, supporting endpoint management and user education"
      ]
    },
    {
      id: 2,
      company: "InglesFazBem.com.br",
      position: "Technical Lead",
      location: "Recife, Brazil",
      period: "2015 - 2023",
      highlights: [
        "Led the technical operations and platform management for an online English learning start-up",
        "Architected and managed technical infrastructure using open-source tools (WordPress, Moodle, MySQL, H5P)",
        "Oversaw website development initiatives, managed digital content deployment, and ensured system reliability",
        "Developed and supervised the customer technical support function"
      ]
    },
    {
      id: 3,
      company: "ELCOMA Eletrônicos Ltda./VAGALUME WiFi",
      position: "R&D Dept. Assistant Manager",
      location: "Recife, Brazil",
      period: "2014 - 2015",
      highlights: [
        "Supported the R&D Manager by identifying bottlenecks in the manufacturing cycle and recommending process improvements",
        "Implemented streamlined procedures for product assembly and component inventory tracking",
        "Developed and maintained essential documentation to standardize workflows and support consistent production quality"
      ]
    },
    {
      id: 4,
      company: "UNIAESO BARROS MELO UNIVERSITY",
      position: "Senior Support Analyst",
      location: "Olinda, Brazil",
      period: "2007 - 2012",
      highlights: [
        "Oversaw routine updates and preventative maintenance for university hardware and software systems",
        "Ensured operational readiness for 8 computer labs (approx. 240 workstations) and AV equipment across 225 classrooms",
        "Served on the Mediation and Problem Solving Team, collaborating with Pernambuco Court of Law"
      ]
    },
    {
      id: 5,
      company: "KEMIRA CHEMICALS Inc",
      position: "Service Desk Manager",
      location: "Kennesaw, GA",
      period: "2003 - 2006",
      highlights: [
        "Delivered technical support to 500+ end-users across 12 states, managing ~130 tickets weekly",
        "Maintained an average resolution time of 10-30 minutes per incident",
        "Developed formal support procedures, enhancing workflow consistency and productivity"
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Stagger the animation of experience items
          const animationInterval = setInterval(() => {
            setAnimatedItems(prev => {
              const nextItem = experiences.find(exp => !prev.includes(exp.id))?.id;
              if (nextItem) {
                return [...prev, nextItem];
              }
              clearInterval(animationInterval);
              return prev;
            });
          }, 200);
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
  }, [experiences]);

  const toggleExpand = (id: number) => {
    setExpandedItem(prevId => prevId === id ? null : id);
  };
  
  return (
    <section id="experience" ref={sectionRef} className="py-24">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Work Experience</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A journey through my professional career, showcasing key roles and achievements.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-tech-blue/20 transform md:translate-x-px 
            before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:rounded-full before:bg-tech-blue
            after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:rounded-full after:bg-tech-blue">
          </div>
          
          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={cn(
                  "experience-item relative flex flex-col md:flex-row transition-all duration-700",
                  animatedItems.includes(exp.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Timeline dot with pulse effect */}
                <div 
                  className={cn(
                    "absolute left-0 md:left-1/2 w-4 h-4 bg-tech-blue rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5",
                    "before:absolute before:w-full before:h-full before:rounded-full before:bg-tech-blue before:animate-ping before:opacity-75"
                  )}
                ></div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Collapsible 
                    open={expandedItem === exp.id}
                    onOpenChange={() => toggleExpand(exp.id)}
                    className={cn(
                      "bg-white rounded-lg shadow-md border border-gray-100 transition-all duration-300 overflow-hidden",
                      expandedItem === exp.id ? "shadow-xl transform scale-[1.02]" : "hover:shadow-lg"
                    )}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold mb-2 md:mb-0">{exp.position}</h3>
                        <div className="flex items-center text-sm text-tech-blue w-full md:w-auto">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate max-w-full">{exp.period}</span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-lg">{exp.company}</h4>
                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                      </div>
                      
                      <CollapsibleTrigger className="w-full flex justify-between items-center pt-2 text-tech-blue hover:text-tech-purple transition-colors">
                        <span className="text-sm font-medium">{expandedItem === exp.id ? 'Hide details' : 'Show details'}</span>
                        {expandedItem === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="pt-4 space-y-2">
                        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                          {exp.highlights.map((highlight, i) => (
                            <li 
                              key={i} 
                              className={cn(
                                "transition-all duration-300 delay-75",
                                expandedItem === exp.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                              )}
                              style={{ transitionDelay: `${i * 75}ms` }}
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </div>
                
                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

