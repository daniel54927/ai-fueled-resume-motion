
import React from 'react';
import ProjectDetails from './ProjectDetails';
import ProjectFeatures from './ProjectFeatures';
import { Mail, Bot, Mic, Phone, Activity, Network, LayoutDashboard, ExternalLink, Cpu, Server, Ticket, Database, Lock, Brain } from 'lucide-react';
import { SiReact, SiTypescript, SiPostgresql, SiDocker, SiPython, SiNextdotjs } from 'react-icons/si';
import N8nIcon from '../icons/N8nIcon';

type FeatureIcon = 'mail' | 'bot' | 'mic' | 'phone' | 'activity' | 'network' | 'dashboard' | 'lock';

interface ProjectCardProps {
  title: string;
  description: string[];
  results?: {
    title: string;
    items: string[];
  };
  images?: Array<{
    src: string;
    alt: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    icon: FeatureIcon;
  }>;
  technologies: string[];
  impactText: string;
  liveLogbookUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
  externalNote?: string;
  ctaNote?: string;
  logoUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  onImageClick?: (src: string, alt: string) => void;
}

const renderFeatureIcon = (icon: FeatureIcon) => {
  const cls = "h-5 w-5 text-tech-blue";
  switch (icon) {
    case 'mail': return <Mail className={cls} />;
    case 'mic': return <Mic className={cls} />;
    case 'phone': return <Phone className={cls} />;
    case 'activity': return <Activity className={cls} />;
    case 'network': return <Network className={cls} />;
    case 'dashboard': return <LayoutDashboard className={cls} />;
    case 'lock': return <Lock className={cls} />;
    case 'bot':
    default: return <Bot className={cls} />;
  }
};

const ProjectCard = ({
  title,
  description,
  results,
  images,
  features,
  technologies,
  impactText,
  liveLogbookUrl,
  externalUrl,
  externalLabel,
  externalNote,
  ctaNote,
  logoUrl,
  videoUrl,
  posterUrl,
  onImageClick,
}: ProjectCardProps) => {
  const featureItems = features.map(feature => ({
    title: feature.title,
    description: feature.description,
    icon: renderFeatureIcon(feature.icon),
  }));

  const techItems = technologies.map(tech => {
    const t = tech.toLowerCase();
    const iconCls = "h-4 w-4 text-tech-blue";
    let icon;
    if (t.includes('n8n')) icon = <N8nIcon className={iconCls} />;
    else if (t.includes('react')) icon = <SiReact className={iconCls} />;
    else if (t.includes('typescript')) icon = <SiTypescript className={iconCls} />;
    else if (t.includes('postgres')) icon = <SiPostgresql className={iconCls} />;
    else if (t.includes('docker')) icon = <SiDocker className={iconCls} />;
    else if (t.includes('python')) icon = <SiPython className={iconCls} />;
    else if (t.includes('next')) icon = <SiNextdotjs className={iconCls} />;
    else if (t.includes('caddy')) icon = <Server className={iconCls} />;
    else if (t.includes('voice')) icon = <Mic className={iconCls} />;
    else if (t.includes('llm') || t.includes('gpt') || t.includes('claude')) icon = <Bot className={iconCls} />;
    else if (t.includes('active directory')) icon = <Network className={iconCls} />;
    else if (t.includes('servicedesk') || t.includes('service desk')) icon = <Ticket className={iconCls} />;
    else if (t.includes('vps')) icon = <Server className={iconCls} />;
    else if (t.includes('vector') || t.includes('database') || t.includes(' db') || t.endsWith('db')) icon = <Database className={iconCls} />;
    else if (t.includes('auth')) icon = <Lock className={iconCls} />;
    else if (t.includes('honcho')) icon = <Brain className={iconCls} />;
    else if (t.includes('hermes')) icon = <Bot className={iconCls} />;
    else icon = <Cpu className={iconCls} />;
    return { name: tech, icon };
  });

  const hasImages = images && images.length > 0;

  return (
    <div className="bg-tech-dark/80 border border-tech-blue/20 rounded-xl overflow-hidden shadow-lg mb-24 animate-on-scroll opacity-0">
      <div className={hasImages ? "md:grid md:grid-cols-2 gap-0" : ""}>
        <ProjectDetails
          title={title}
          description={description}
          results={results}
          logoUrl={logoUrl}
        />

        {hasImages && (
          <div className="md:sticky md:top-24 md:self-start bg-tech-dark/80 border-l border-tech-blue/10 p-8 h-fit pb-10">
            <div
              className="rounded-lg overflow-hidden mb-6 cursor-pointer transition-transform hover:scale-105 shadow-xl"
              onClick={() => onImageClick?.(images![0].src, images![0].alt)}
            >
              <img
                src={images![0].src}
                alt={images![0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-tech-blue hover:text-tech-blue/90 font-medium"
              >
                <span>Open live app</span>
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>

      <ProjectFeatures
        features={featureItems}
        technologies={techItems}
        impactText={impactText}
        liveLogbookUrl={liveLogbookUrl}
        externalUrl={externalUrl}
        externalLabel={externalLabel}
        externalNote={externalNote}
        ctaNote={ctaNote}
      />
    </div>
  );
};

export default ProjectCard;
