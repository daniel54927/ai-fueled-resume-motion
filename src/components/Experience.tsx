
import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Collapsible, CollapsibleContent } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from '@/lib/utils';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./ui/hover-card";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

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
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  
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
          {/* Timeline line with animated gradient effect */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tech-blue via-tech-purple to-tech-blue transform md:translate-x-px 
            before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-3 before:h-3 before:rounded-full before:bg-tech-blue before:animate-pulse
            after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-3 after:h-3 after:rounded-full after:bg-tech-purple after:animate-pulse">
            {/* Animated glow effect */}
            <div className="absolute w-full h-[30%] top-0 animate-slide-down bg-gradient-to-b from-tech-blue/0 via-tech-blue/30 to-tech-blue/0 opacity-50" 
                style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}></div>
          </div>
          
          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={cn(
                  "experience-item relative flex flex-col md:flex-row transition-all duration-700 group",
                  animatedItems.includes(exp.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Interactive timeline dot */}
                <div 
                  className={cn(
                    "absolute left-0 md:left-1/2 w-5 h-5 rounded-full transform -translate-x-2 md:-translate-x-2.5 mt-1.5 transition-all duration-300",
                    hoveredDot === exp.id ? 
                      "bg-tech-purple scale-125 shadow-[0_0_10px_rgba(155,135,245,0.7)]" : 
                      "bg-tech-blue shadow-[0_0_5px_rgba(0,149,255,0.5)]",
                    "z-10"
                  )}
                  onMouseEnter={() => setHoveredDot(exp.id)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white animate-pulse"></span>
                </div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} z-20`}>
                  <div 
                    className={cn(
                      "bg-white dark:bg-tech-dark/90 rounded-lg shadow-md border border-gray-100 dark:border-gray-800/30 transition-all duration-300 overflow-hidden",
                      "hover:shadow-xl hover:transform hover:scale-[1.02] group-hover:border-tech-blue/30"
                    )}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold mb-2 md:mb-0 group-hover:text-tech-blue transition-colors">{exp.position}</h3>
                        <div className="flex items-center text-sm text-tech-blue w-full md:w-auto">
                          <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                          <span className="truncate max-w-full">{exp.period}</span>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-lg flex items-center">
                          {exp.company}
                          {index < 2 && <ExternalLink className="w-3.5 h-3.5 ml-1 text-tech-blue opacity-70" />}
                        </h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {exp.location}
                        </p>
                      </div>

                      {/* Always visible key achievements */}
                      <div className="my-3 border-t dark:border-gray-700/30 pt-3">
                        <p className="text-sm font-medium text-tech-blue mb-2">Key Achievements:</p>
                        <ul className="text-sm space-y-2">
                          {exp.highlights.slice(0, 2).map((highlight, i) => (
                            <li 
                              key={i} 
                              className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-tech-blue/20 before:border before:border-tech-blue/40"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Show more highlights if available */}
                      {exp.highlights.length > 2 && (
                        <Accordion type="single" collapsible className="w-full mt-2 border-t dark:border-gray-700/30 pt-2">
                          <AccordionItem value="more-highlights" className="border-none">
                            <AccordionTrigger className="py-2 text-sm text-tech-blue hover:text-tech-purple transition-colors hover:no-underline">
                              Show more achievements
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-3 text-sm">
                                {exp.highlights.slice(2).map((highlight, i) => (
                                  <li 
                                    key={i} 
                                    className="pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:rounded-full before:bg-tech-blue/20 before:border before:border-tech-blue/40"
                                  >
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      )}
                      
                      {/* Quick action buttons */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs h-7">
                              Skills Used
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent side={index % 2 === 0 ? "right" : "left"} className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">Skills Applied at {exp.company}</h4>
                              <div className="flex flex-wrap gap-1">
                                {getSkillsForRole(exp.id).map((skill, i) => (
                                  <div key={i} className="px-2 py-1 bg-tech-blue/10 dark:bg-tech-blue/20 text-tech-blue text-xs rounded-full">
                                    {skill}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <Button variant="outline" size="sm" className="text-xs h-7">
                              Role Impact
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent side={index % 2 === 0 ? "right" : "left"} className="w-80">
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold">Impact at {exp.company}</h4>
                              <p className="text-xs">{getRoleImpact(exp.id)}</p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </div>
                  </div>
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

// Helper functions to provide additional context
function getSkillsForRole(roleId: number): string[] {
  switch (roleId) {
    case 1: // American Place Casino
      return ["CarbonBlack MDR", "AI Agents", "LLMs", "Compliance", "Endpoint Management", "Risk Reduction"];
    case 2: // InglesFazBem
      return ["WordPress", "Moodle", "MySQL", "Technical Leadership", "Platform Management"];
    case 3: // ELCOMA
      return ["Process Improvement", "Documentation", "Inventory Management", "Manufacturing"];
    case 4: // UNIAESO
      return ["Infrastructure Management", "Preventative Maintenance", "IT Support", "Problem Solving"];
    case 5: // KEMIRA
      return ["Technical Support", "Incident Resolution", "Service Desk", "Process Development"];
    default:
      return [];
  }
}

function getRoleImpact(roleId: number): string {
  switch (roleId) {
    case 1: // American Place Casino
      return "Implemented self-service portal that significantly reduced support tickets and improved security posture through proactive threat monitoring.";
    case 2: // InglesFazBem
      return "Led technical operations that enabled the company to deliver online English education to thousands of students across Brazil.";
    case 3: // ELCOMA
      return "Streamlined manufacturing processes and improved documentation standards, reducing assembly time and improving quality control.";
    case 4: // UNIAESO
      return "Maintained critical IT infrastructure for a university, ensuring 240+ workstations and classroom equipment remained operational for students.";
    case 5: // KEMIRA
      return "Managed high-volume support operations across 12 states, maintaining quick resolution times and improving support procedures.";
    default:
      return "";
  }
}

export default Experience;
