
import React from 'react';
import { Mail, Bot, ArrowRight } from 'lucide-react';
import N8nIcon from '../icons/N8nIcon';
import { Link } from 'react-router-dom';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TechnologyItem {
  icon: React.ReactNode;
  name: string;
}

interface ProjectFeaturesProps {
  features: FeatureItem[];
  technologies: TechnologyItem[];
  impactText: string;
}

const ProjectFeatures = ({ features, technologies, impactText }: ProjectFeaturesProps) => {
  return (
    <div className="p-8 md:p-12 border-t border-tech-blue/20 bg-tech-dark/90">
      <h3 className="text-xl font-bold text-white mb-4">Features</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              {feature.icon}
              <h4 className="font-semibold text-white">{feature.title}</h4>
            </div>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
        <div className="flex flex-wrap gap-4">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-tech-dark/70 border border-tech-blue/30 rounded-full px-4 py-2 flex items-center space-x-2">
              {tech.icon}
              <span className="text-gray-200 text-sm">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Impact</h3>
        <p className="text-gray-300">{impactText}</p>
        
        <div className="mt-6">
          <Link to="/#contact" className="inline-flex items-center text-tech-blue hover:text-tech-blue/90 font-medium">
            <span>Contact me to learn more</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectFeatures;
