
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
            <h3 className="text-2xl font-semibold mb-4">AI automation that survives production</h3>
            <p className="mb-6 text-muted-foreground">
              Most people building "AI agents" have a demo. I have production. At a 24/7 regulated casino, I designed and deployed an autonomous voice AI agent that verifies callers against Active Directory, triages true emergencies from routine requests, routes critical incidents to on-call staff, and auto-creates tickets for everything else — cutting non-emergency after-hours calls by roughly 90%.
            </p>
            <p className="mb-6 text-muted-foreground">
              That reliability isn't luck. It's built on 15+ years running the infrastructure automation has to live on — VMware, Windows and SQL Server, networking, and security operations — so the systems I ship hold up under real users, real load, and real audits, not just the happy path.
            </p>
            <p className="text-muted-foreground">
              I build n8n and LLM agent pipelines that standardize repeatable work, and I serve on my company's internal AI Taskforce. If you need someone who can take an AI idea from prototype to something that runs reliably in production, that's exactly what I do — open to 100% remote roles and contracts, worldwide.
            </p>
          </div>

          
          <div className="grid grid-cols-2 gap-6">
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Cpu className="h-10 w-10 text-tech-blue mb-4" />
              <h4 className="text-xl font-semibold mb-2">AI Agents & Automation</h4>
              <p className="text-sm text-muted-foreground">
                Autonomous agents and n8n/LLM pipelines that remove repetitive work.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Network className="h-10 w-10 text-tech-purple mb-4" />
              <h4 className="text-xl font-semibold mb-2">Workflow Orchestration</h4>
              <p className="text-sm text-muted-foreground">
                Connect tools, APIs, and AI services into reliable end-to-end automation.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Server className="h-10 w-10 text-tech-blue mb-4" />
              <h4 className="text-xl font-semibold mb-2">Production Reliability</h4>
              <p className="text-sm text-muted-foreground">
                15+ years of infrastructure so what I build survives real load and audits.
              </p>
            </AnimatedCard>
            
            <AnimatedCard className="p-6 dark:bg-tech-dark/50">
              <Lock className="h-10 w-10 text-tech-purple mb-4" />
              <h4 className="text-xl font-semibold mb-2">Security & Compliance</h4>
              <p className="text-sm text-muted-foreground">
                Automation designed for regulated, 24/7 environments.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
