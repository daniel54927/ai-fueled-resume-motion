
import React from 'react';
import ProjectDetails from './ProjectDetails';
import StickyImageGallery from './StickyImageGallery';
import ProjectFeatures from './ProjectFeatures';
import { Mail, Bot, Mic } from 'lucide-react';
import N8nIcon from '../icons/N8nIcon';

interface ProjectCardProps {
  title: string;
  description: string[];
  results: {
    title: string;
    items: string[];
  };
  images: Array<{
    src: string;
    alt: string;
  }>;
  features: Array<{
    title: string;
    description: string;
    icon: 'mail' | 'bot' | 'mic';
  }>;
  technologies: string[];
  impactText: string;
  liveLogbookUrl?: string;
  onImageClick: (src: string, alt: string) => void;
}

const ProjectCard = ({
  title,
  description,
  results,
  images,
  features,
  technologies,
  impactText,
  liveLogbookUrl,
  onImageClick
}: ProjectCardProps) => {
  
  // Map feature icons to components
  const featureItems = features.map(feature => ({
    title: feature.title,
    description: feature.description,
    icon: feature.icon === 'mail' 
      ? <Mail className="h-5 w-5 text-tech-blue" /> 
      : feature.icon === 'mic'
      ? <Mic className="h-5 w-5 text-tech-blue" />
      : <Bot className="h-5 w-5 text-tech-blue" />
  }));
  
  // Map technology icons
  const techItems = technologies.map(tech => {
    let icon;
    if (tech.includes('n8n')) {
      icon = <N8nIcon className="h-4 w-4 text-tech-blue" />;
    } else if (tech.includes('OpenAI')) {
      icon = <Bot className="h-4 w-4 text-tech-blue" />;
    } else {
      icon = <Mail className="h-4 w-4 text-tech-blue" />;
    }
    
    return {
      name: tech,
      icon
    };
  });

  return (
    <div className="bg-tech-dark/80 border border-tech-blue/20 rounded-xl overflow-hidden shadow-lg mb-24 animate-on-scroll opacity-0">
      <div className="md:grid md:grid-cols-2 gap-0">
        <ProjectDetails 
          title={title}
          description={description}
          results={results}
        />
        
        <StickyImageGallery 
          images={images}
          liveLogbookUrl={liveLogbookUrl}
          onImageClick={onImageClick}
        />
      </div>
      
      <ProjectFeatures 
        features={featureItems}
        technologies={techItems}
        impactText={impactText}
        liveLogbookUrl={liveLogbookUrl}
      />
    </div>
  );
};

export default ProjectCard;
