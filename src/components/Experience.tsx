
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
      id: 0,
      company: "American Place Casino",
      position: "IT Systems Engineer",
      location: "Waukegan, IL",
      period: "Dec 2025 - Present",
      highlights: [
        "Designed and shipped a production voice AI agent from scratch that fields overnight IT helpdesk calls end to end: it verifies callers against Active Directory, triages emergencies from routine requests, escalates critical incidents to on-call staff, and auto-creates tickets for the rest, cutting non-emergency after-hours calls by roughly 90%.",
        "Build and run n8n and LLM agent pipelines (ServiceDesk Plus to Motion orchestration) that standardize repeatable work across the property and remove manual handoffs.",
        "Serve on the internal AI Taskforce, guiding where automation and LLM agents get applied across the business.",
        "Lead a 56 plus server VMware ESXi estate, Windows and SQL Server, networking, and firewalls, with documented, rollback safe change control and tested disaster recovery.",
        "Run security operations: migrated managed detection and response from Carbon Black to SentinelOne and triage 150 to 200 alerts per month against ITIL and CIS Controls."
      ]
    },
    {
      id: 1,
      company: "American Place Casino",
      position: "IT Systems Administrator / Cybersecurity Specialist",
      location: "Waukegan, IL",
      period: "2024 - 2025",
      highlights: [
        "Prototyped the company's first local AI agent (LLMs, n8n, relational and vector databases) for compliance and risk reduction, the groundwork that became today's production automation.",
        "Launched a self service portal that cut software deployment time and reduced support tickets across 287 endpoints.",
        "Monitored and responded to real time threats with SentinelOne MDR (migrated from Carbon Black), resolving 150 to 200 alerts monthly under defined incident response protocols.",
        "Hardened and maintained secure infrastructure across hybrid systems, owning endpoint management and user security education."
      ]
    },

    {
      id: 2,
      company: "InglesFazBem.com.br",
      position: "Technical Lead",
      location: "Recife, Brazil",
      period: "2015 - 2023",
      highlights: [
        "Owned all technology for an online first English learning startup for 8 years, working fully remotely as its technical lead.",
        "Architected and operated the learning platform on open source tools (WordPress, Moodle, MySQL, H5P), keeping it reliable for a distributed, online student base.",
        "Streamlined and automated content deployment and site operations so a small team could keep shipping without added headcount.",
        "Built and supervised the customer technical support function end to end."
      ]
    },
    {
      id: 3,
      company: "ELCOMA Eletronicos Ltda./VAGALUME WiFi",
      position: "R&D Dept. Assistant Manager",
      location: "Recife, Brazil",
      period: "2014 - 2015",
      highlights: [
        "Drove process improvements that reduced bottlenecks across the manufacturing cycle and improved consistency.",
        "Standardized product assembly and component inventory tracking with streamlined, repeatable procedures.",
        "Authored the documentation and workflow standards that held production quality steady as the team scaled."
      ]
    },
    {
      id: 4,
      company: "UNIAESO BARROS MELO UNIVERSITY",
      position: "Senior Support Analyst",
      location: "Olinda, Brazil",
      period: "2007 - 2012",
      highlights: [
        "Kept 8 computer labs (about 240 workstations) and AV systems across 225 classrooms operational through proactive maintenance and standardized updates.",
        "Sustained high uptime for a large, always on academic environment serving thousands of students and faculty.",
        "Served on the Mediation and Problem Solving Team, partnering with the Pernambuco Court of Law on escalations."
      ]
    },
    {
      id: 5,
      company: "KEMIRA CHEMICALS Inc",
      position: "Service Desk Manager",
      location: "Kennesaw, GA",
      period: "2003 - 2006",
      highlights: [
        "Ran a service desk supporting 500 plus users across 12 states, a distributed, remote first support model years before it was standard.",
        "Handled roughly 130 tickets per week at a 10 to 30 minute average resolution time.",
        "Built the formal support procedures that lifted workflow consistency and team productivity."
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

