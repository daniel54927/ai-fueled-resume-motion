
import { useEffect, useRef } from 'react';
import { Cpu, Lock, Server, Network } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Add animation classes when section comes into view
          entry.target.querySelectorAll('.stagger-animation > *').forEach((el, i) => {
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
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-tech-dark dark:to-tech-dark">
      <div className="section-container">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-underline">About Me</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Passionate about leveraging technology to drive efficiency, security, and innovation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center stagger-animation">
          <div>
            <h3 className="text-2xl font-semibold mb-4">My Passion for Technology</h3>
            <p className="mb-6 text-muted-foreground">
              I build production AI automation that takes real work off people's plates, backed by 15+ years running the infrastructure it has to run on.
            </p>
            <p className="mb-6 text-muted-foreground">
              Most recently at American Place Casino I designed and deployed an autonomous voice AI agent that handles overnight IT helpdesk calls end to end, plus n8n + LLM agent pipelines that standardize repeatable work across the property. I serve on APC's internal AI Taskforce.
            </p>
            <p className="text-muted-foreground">
              I pair AI-native engineering with a deep systems foundation — VMware, Windows/SQL, networking, and security operations — to ship automation that's reliable in 24/7 environments. Open to 100% remote, work-from-anywhere AI roles.
            </p>
          </div>

          
          <div className="grid grid-cols-2 gap-6">
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Cpu className="h-10 w-10 text-tech-blue mb-4" />
              <h4 className="text-xl font-semibold mb-2">AI Automation</h4>
              <p className="text-sm text-muted-foreground">
                Building intelligent systems using LLMs and n8n for enhanced efficiency and reduced manual workload.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Lock className="h-10 w-10 text-tech-purple mb-4" />
              <h4 className="text-xl font-semibold mb-2">Cybersecurity</h4>
              <p className="text-sm text-muted-foreground">
                Protecting systems with advanced monitoring, threat detection, and incident response.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Server className="h-10 w-10 text-tech-blue mb-4" />
              <h4 className="text-xl font-semibold mb-2">Systems Admin</h4>
              <p className="text-sm text-muted-foreground">
                Managing complex IT infrastructure with a focus on reliability and performance.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Network className="h-10 w-10 text-tech-purple mb-4" />
              <h4 className="text-xl font-semibold mb-2">Network Admin</h4>
              <p className="text-sm text-muted-foreground">
                Designing and maintaining secure network infrastructure across diverse environments.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
