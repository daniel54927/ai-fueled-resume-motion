
import React from 'react';

interface ProjectsHeaderProps {
  title: string;
  subtitle: string;
  badgeText: string;
}

const ProjectsHeader = ({ title, subtitle, badgeText }: ProjectsHeaderProps) => {
  return (
    <div className="mb-16 text-center">
      <span className="py-1 px-4 bg-tech-blue/20 text-tech-blue rounded-full text-sm mb-6 inline-block animate-fade-in font-medium">
        {badgeText}
      </span>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default ProjectsHeader;
