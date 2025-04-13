
import { useEffect, useRef } from 'react';
import AnimatedCard from './AnimatedCard';

interface SkillCategory {
  name: string;
  skills: string[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      name: "AI & Automation",
      skills: ["LLMs", "n8n", "Scripting", "Process Optimization", "Relational & Vector Databases"]
    },
    {
      name: "Cybersecurity",
      skills: ["NIST Framework", "ISO 27001", "SIEM Tools", "CarbonBlack MDR", "Vulnerability Scanning", "Endpoint Protection"]
    },
    {
      name: "Systems Administration",
      skills: ["Windows Server", "Linux (Ubuntu)", "Patching", "ITIL", "Technical Support", "Self-Service Portal"]
    },
    {
      name: "Network & Infrastructure",
      skills: ["TCP/IP", "DNS", "DHCP", "VLAN Segmentation", "Secure Connectivity", "Firewalls"]
    },
    {
      name: "Virtualization & Management",
      skills: ["VMware", "vCenter", "Endpoint Central", "Lifecycle Management", "Software Deployment"]
    },
    {
      name: "Certifications",
      skills: ["CompTIA Security+", "CompTIA Network+", "Network Administration", "A+ Certified Professional"]
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-card').forEach((el, i) => {
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
    <section id="skills" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card opacity-0">
              <AnimatedCard className="h-full p-6">
                <h3 className="text-xl font-semibold mb-4 tech-gradient-text">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-tech-blue/10 text-tech-blue rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">My Approach to Technology</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <h4 className="text-lg font-medium mb-3 text-tech-blue">Security-First Mindset</h4>
              <p className="text-muted-foreground">
                I approach all technological solutions with security as a foundation, not an afterthought.
              </p>
            </div>
            
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <h4 className="text-lg font-medium mb-3 text-tech-purple">Automation & Efficiency</h4>
              <p className="text-muted-foreground">
                I continuously look for opportunities to automate processes and improve operational efficiency.
              </p>
            </div>
            
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white">
              <h4 className="text-lg font-medium mb-3 text-tech-blue">User-Centered Design</h4>
              <p className="text-muted-foreground">
                I believe technology should enhance user experience, not complicate it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
