
import { useEffect, useRef, useState } from 'react';
import AnimatedCard from './AnimatedCard';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Info, Database, Code, Shield, Server, Award, Brain, MoveRight } from 'lucide-react';

interface SkillCategory {
  name: string;
  skills: Array<{
    name: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  icon: React.ReactNode;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      name: "AI & Automation",
      icon: <Brain className="w-5 h-5 text-tech-blue" />,
      skills: [
        {
          name: "LLMs",
          description: "Working with large language models to create intelligent AI systems that can understand and generate human-like text"
        },
        {
          name: "n8n",
          description: "Building automated workflows to connect various systems and automate business processes"
        },
        {
          name: "Scripting",
          description: "Creating custom scripts to automate repetitive tasks and improve efficiency"
        },
        {
          name: "Process Optimization",
          description: "Analyzing and improving business processes to enhance productivity and reduce costs"
        },
        {
          name: "Relational & Vector Databases",
          description: "Designing and implementing database systems to store and retrieve structured and unstructured data efficiently"
        }
      ]
    },
    {
      name: "Cybersecurity",
      icon: <Shield className="w-5 h-5 text-tech-purple" />,
      skills: [
        {
          name: "NIST Framework",
          description: "Implementing the National Institute of Standards and Technology cybersecurity framework for improved security posture"
        },
        {
          name: "ISO 27001",
          description: "Working with information security management systems to protect sensitive information"
        },
        {
          name: "SIEM Tools",
          description: "Using Security Information and Event Management tools to identify and respond to security threats"
        },
        {
          name: "CarbonBlack MDR",
          description: "Utilizing CarbonBlack for managed detection and response to protect against advanced threats"
        },
        {
          name: "Vulnerability Scanning",
          description: "Conducting regular scans to identify and remediate security vulnerabilities"
        },
        {
          name: "Endpoint Protection",
          description: "Implementing solutions to secure individual devices from cyber threats"
        }
      ]
    },
    {
      name: "Systems Administration",
      icon: <Server className="w-5 h-5 text-tech-blue" />,
      skills: [
        {
          name: "Windows Server",
          description: "Managing and maintaining Windows Server environments to support business operations"
        },
        {
          name: "Linux (Ubuntu)",
          description: "Administering Ubuntu Linux systems for various server applications and services"
        },
        {
          name: "Patching",
          description: "Keeping systems updated with security patches to protect against known vulnerabilities"
        },
        {
          name: "ITIL",
          description: "Following Information Technology Infrastructure Library practices for effective IT service management"
        },
        {
          name: "Technical Support",
          description: "Providing expert technical assistance to users to resolve issues and maintain productivity"
        },
        {
          name: "Self-Service Portal",
          description: "Developing and maintaining portals that allow users to resolve common issues without direct support"
        }
      ]
    },
    {
      name: "Network & Infrastructure",
      icon: <Code className="w-5 h-5 text-tech-purple" />,
      skills: [
        {
          name: "TCP/IP",
          description: "Working with the core protocols that enable internet and network communications"
        },
        {
          name: "DNS",
          description: "Configuring and maintaining Domain Name System services to translate domain names to IP addresses"
        },
        {
          name: "DHCP",
          description: "Setting up and managing Dynamic Host Configuration Protocol to automatically assign IP addresses"
        },
        {
          name: "VLAN Segmentation",
          description: "Implementing virtual LANs to improve network performance and security"
        },
        {
          name: "Secure Connectivity",
          description: "Establishing secure communication channels between systems and networks"
        },
        {
          name: "Firewalls",
          description: "Configuring and maintaining firewall rules to protect networks from unauthorized access"
        }
      ]
    },
    {
      name: "Virtualization & Management",
      icon: <Database className="w-5 h-5 text-tech-blue" />,
      skills: [
        {
          name: "VMware",
          description: "Creating and managing virtual machines to optimize hardware resources and improve flexibility"
        },
        {
          name: "vCenter",
          description: "Using VMware vCenter to centrally manage virtualized environments"
        },
        {
          name: "Endpoint Central",
          description: "Implementing solutions for centralized management of endpoints across the enterprise"
        },
        {
          name: "Lifecycle Management",
          description: "Managing the complete lifecycle of IT assets from acquisition to retirement"
        },
        {
          name: "Software Deployment",
          description: "Automating the installation and configuration of software across multiple systems"
        }
      ]
    },
    {
      name: "Certifications",
      icon: <Award className="w-5 h-5 text-tech-purple" />,
      skills: [
        {
          name: "CompTIA Security+",
          description: "Certified professional with validated security knowledge and skills"
        },
        {
          name: "CompTIA Network+",
          description: "Certified networking professional with expertise in designing, configuring, managing, and troubleshooting networks"
        },
        {
          name: "Network Administration",
          description: "Specialized training in managing and maintaining network infrastructure"
        },
        {
          name: "A+ Certified Professional",
          description: "Certified IT professional with demonstrated competency in hardware and software troubleshooting"
        }
      ]
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
    <section id="skills" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-tech-dark dark:to-tech-dark">
      <div className="section-container">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies. 
            <span className="ml-2 text-tech-blue flex items-center justify-center mt-2">
              <Info className="w-4 h-4 mr-1" /> <span className="text-sm">Hover over any skill for more details</span>
            </span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card opacity-0">
              <AnimatedCard className="h-full p-6 dark:bg-tech-dark/50">
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-2 tech-gradient-text">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <HoverCard key={i} openDelay={100} closeDelay={150}>
                      <HoverCardTrigger>
                        <span
                          className={`px-3 py-1 bg-tech-blue/10 text-tech-blue dark:bg-tech-blue/30 dark:text-white rounded-full text-sm font-medium flex items-center cursor-pointer
                            transition-all duration-200 group hover:bg-tech-blue hover:text-white hover:shadow-md
                            ${hoveredSkill === `${category.name}-${skill.name}` ? 'bg-tech-blue text-white scale-105 shadow-md' : ''}`}
                          onMouseEnter={() => setHoveredSkill(`${category.name}-${skill.name}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          {skill.name}
                          <MoveRight className={`w-3 h-3 ml-1 transition-all duration-300 opacity-0 -mr-2 group-hover:opacity-100 group-hover:mr-0`} />
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent side="top" className="p-4 w-72 shadow-lg border-tech-blue/20 dark:bg-tech-dark/90">
                        <h4 className="font-medium text-tech-blue mb-2">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">My Approach to Technology</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white dark:bg-tech-dark/50 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-tech-blue/30 hover:transform hover:scale-[1.02]">
              <h4 className="text-lg font-medium mb-3 text-tech-blue dark:text-tech-blue">Security-First Mindset</h4>
              <p className="text-muted-foreground">
                I approach all technological solutions with security as a foundation, not an afterthought.
              </p>
            </div>
            
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white dark:bg-tech-dark/50 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-tech-purple/30 hover:transform hover:scale-[1.02]">
              <h4 className="text-lg font-medium mb-3 text-tech-purple dark:text-tech-purple">Automation & Efficiency</h4>
              <p className="text-muted-foreground">
                I continuously look for opportunities to automate processes and improve operational efficiency.
              </p>
            </div>
            
            <div className="p-6 rounded-lg shadow-sm border border-gray-100 bg-white dark:bg-tech-dark/50 dark:border-gray-700 transition-all duration-300 hover:shadow-md hover:border-tech-blue/30 hover:transform hover:scale-[1.02]">
              <h4 className="text-lg font-medium mb-3 text-tech-blue dark:text-tech-blue">User-Centered Design</h4>
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
