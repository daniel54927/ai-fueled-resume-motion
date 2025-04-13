
import { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';

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
          entry.target.querySelectorAll('.experience-item').forEach((el, i) => {
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
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-tech-blue/20 transform md:translate-x-px"></div>
          
          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`experience-item relative opacity-0 flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-tech-blue rounded-full transform -translate-x-1.5 md:-translate-x-2 mt-1.5"></div>
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <div className="flex items-center text-sm text-tech-blue">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="font-medium text-lg">{exp.company}</h4>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
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

export default Experience;
