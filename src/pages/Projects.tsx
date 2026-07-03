
import { useEffect, useRef, useState } from 'react';
import ScrollProgress from '../components/ScrollProgress';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import ImageModal from '../components/ImageModal';
import ProjectsHeader from '../components/projects/ProjectsHeader';
import ProjectCard from '../components/projects/ProjectCard';

const Projects = () => {
  useEffect(() => {
    document.title = "AI Projects - Daniel C. Brown";
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in');
            }, i * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const openImageModal = (src: string, alt: string) => setModalImage({ src, alt });
  const closeImageModal = () => setModalImage(null);

  const voiceAgentProject = {
    title: "Production Voice AI Agent for American Place Casino",
    description: [
      "Designed and deployed from scratch an autonomous voice AI agent that fields overnight IT helpdesk calls end to end: verifies callers against Active Directory (hangs up on failed auth), triages true emergencies vs. routine requests, routes critical incidents to on-call staff, and auto-creates tickets for the rest.",
      "Reduced non-emergency after-hours calls by roughly 90%."
    ],
    features: [
      { icon: 'phone' as const, title: 'AD-Verified Callers', description: 'Authenticates against Active Directory; hangs up on failed auth.' },
      { icon: 'bot' as const, title: 'Autonomous Triage', description: 'Distinguishes true emergencies from routine requests in real time.' },
      { icon: 'activity' as const, title: 'Routes & Ticketing', description: 'Escalates critical incidents to on-call staff, auto-creates tickets for the rest.' },
    ],
    technologies: ['Voice AI', 'LLMs', 'Active Directory', 'ServiceDesk Plus', 'n8n'],
    impactText: "Handles overnight IT helpdesk calls end to end and cut non-emergency after-hours calls by roughly 90%, freeing on-call staff for real incidents.",
    ctaNote: 'Live demo available on request',
  };

  const pokeCheckProject = {
    title: "PokeCheck, Type 1 Diabetes Glucose Monitoring",
    description: [
      "A records-only glucose-monitoring app I built for my family's Type 1 Diabetes management. Deliberate safety boundary: it records and summarizes readings. It never calculates insulin doses.",
      "Admin-provisioned authentication. The clinical summary was adopted by our physician."
    ],
    features: [
      { icon: 'activity' as const, title: 'Records-Only by Design', description: 'Logs and summarizes readings; never calculates insulin doses.' },
      { icon: 'bot' as const, title: 'Clinical Summary', description: 'Physician-adopted summary format used in real T1D care.' },
      { icon: 'mail' as const, title: 'Admin-Provisioned Auth', description: 'Access is admin-controlled. No open sign-ups.' },
    ],
    technologies: ['React', 'TypeScript', 'Postgres', 'Auth'],
    impactText: "A safe, family-facing T1D companion whose clinical summary was adopted by our physician. Proof that AI-adjacent tooling can add value while respecting hard clinical safety boundaries.",
    externalUrl: 'https://pokecheck.deepfrog.app',
    externalLabel: 'View live app',
    externalNote: 'login-gated, access on request',
  };

  const hermesProject = {
    title: "Hermes + Honcho, Multi-Agent Fleet",
    description: [
      "A personal multi-agent system on my own VPS (Docker): multiple Hermes agents across different machines share one centralized memory (\"brain\", via Honcho) and a common skill set, each doing real work on its local machine.",
      "Per-user memory isolation; role-based permissions are the next phase. A distributed-systems proof of multi-tenant memory isolation, shared skills, and per-desktop deployment."
    ],
    features: [
      { icon: 'network' as const, title: 'Distributed Agents', description: 'Multiple Hermes agents across machines, each acting on its local host.' },
      { icon: 'bot' as const, title: 'Shared Brain (Honcho)', description: 'Centralized memory with per-user isolation across the fleet.' },
      { icon: 'activity' as const, title: 'Common Skill Set', description: 'Agents share a reusable skill library; role-based permissions next.' },
    ],
    technologies: ['Docker', 'VPS', 'Hermes', 'Honcho', 'Python', 'Vector DB'],
    impactText: "A working proof of multi-tenant memory isolation, shared skills, and per-desktop deployment for a personal AI fleet.",
  };

  const dashboardProject = {
    title: "deepfrog Project Dashboard",
    description: [
      "A private dashboard I built to track 56+ active projects — a Next.js app self-hosted on my VPS behind Caddy, with a vector-database \"brain\" for semantic search across project history."
    ],
    features: [
      { icon: 'dashboard' as const, title: '56+ Projects Tracked', description: 'One pane of glass across every active initiative.' },
      { icon: 'bot' as const, title: 'Semantic Search', description: 'Vector-database brain surfaces past decisions and context on demand.' },
      { icon: 'network' as const, title: 'Self-Hosted', description: 'Next.js app on my own VPS, fronted by Caddy.' },
    ],
    technologies: ['Next.js', 'Caddy', 'VPS', 'Vector DB'],
    impactText: "A personal command center that keeps a large, parallel project portfolio coherent and searchable.",
    externalUrl: 'https://projects.deepfrog.app',
    externalLabel: 'Visit dashboard',
    externalNote: 'login-gated',
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <ParticleBackground />
      <Header />

      <main>
        <section className="pt-20 pb-8 text-white">
          <div className="section-container">
            <ProjectsHeader
              title="Live AI Projects"
              subtitle="Production AI automation and the systems behind it — everything here is running right now, not slideware."
              badgeText="AI Automation Projects"
            />
          </div>
        </section>

        <section ref={sectionRef} className="pb-12 md:pb-24">
          <div className="section-container">
            <ProjectCard {...voiceAgentProject} onImageClick={openImageModal} />
            <ProjectCard {...pokeCheckProject} onImageClick={openImageModal} />
            <ProjectCard {...hermesProject} onImageClick={openImageModal} />
            <ProjectCard {...dashboardProject} onImageClick={openImageModal} />
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gray-50 dark:bg-tech-dark/50 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel C. Brown. All rights reserved.
          </p>
        </div>
      </footer>

      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={closeImageModal}
          imageSrc={modalImage.src}
          imageAlt={modalImage.alt}
        />
      )}
    </div>
  );
};

export default Projects;
