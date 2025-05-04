
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import N8nIcon from '../icons/N8nIcon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProjectDetailsProps {
  title: string;
  description: string[];
  results?: {
    title: string;
    items: string[];
  };
}

const ProjectDetails = ({ title, description, results }: ProjectDetailsProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <div className="p-8 md:p-12">
      <div className="flex items-center space-x-2 mb-6">
        <div className="bg-tech-blue/20 p-3 rounded-full">
          <N8nIcon className="h-6 w-6 text-tech-blue" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="text-gray-300 space-y-4">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        
        {results && (
          <div className="bg-tech-blue/10 border border-tech-blue/20 rounded-lg p-4 my-6">
            <h3 className="font-bold text-tech-blue mb-2">{results.title}</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-200">
              {results.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        <Collapsible 
          open={isDetailsOpen} 
          onOpenChange={setIsDetailsOpen}
          className="mt-6"
        >
          <CollapsibleTrigger className="flex items-center w-full bg-tech-blue/10 hover:bg-tech-blue/20 px-4 py-2 rounded-lg transition-colors">
            <span className="flex-1 text-left font-medium text-tech-blue">
              {isDetailsOpen ? 'Show Less Details' : 'Show More Details'}
            </span>
            {isDetailsOpen ? (
              <ChevronUp className="h-5 w-5 text-tech-blue" />
            ) : (
              <ChevronDown className="h-5 w-5 text-tech-blue" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Project Overview</h3>
              <p className="text-gray-300">
                This innovative system automates my email processing, dramatically reducing the time spent on email management. 
                As an MVP (Minimum Viable Product), this project demonstrates the viability of using AI to streamline daily 
                communication tasks while maintaining personal oversight.
              </p>
              <p className="text-gray-300 mt-2">
                The system processes 50 emails in just 3-4 minutes, using AI for email categorization and draft response generation. 
                It implements a Human in the Middle approach, ensuring quality control and maintaining the personal touch in all communications.
              </p>
              <p className="text-gray-300 mt-2">
                During MVP testing, the system achieved a 93% reduction in time spent on email management, 
                processing 600 emails in just 48 minutes - a task that would have typically taken 8 hours.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Multi-Department Support</h3>
              <p className="text-gray-300">
                The system provides customized workflows for different organizational levels (e.g., General Manager, 
                Directors, IT Team), ensuring that emails are handled appropriately according to departmental needs.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Integration with Existing Systems</h3>
              <p className="text-gray-300">
                The solution seamlessly works with Gmail for easy adoption, requiring minimal changes to existing 
                email workflows while providing substantial efficiency improvements.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Future Development</h3>
              <p className="text-gray-300">
                Future developments and enhancements could include:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-200 mt-2">
                <li>Integration with other email providers beyond Gmail</li>
                <li>Expanded AI capabilities for more nuanced email categorization and response generation</li>
                <li>Implementation of learning algorithms to improve accuracy over time based on user feedback</li>
                <li>Scaling the system to handle larger email volumes for enterprise-level use</li>
                <li>Addition of analytics features to provide insights into email patterns and productivity metrics</li>
              </ul>
              <p className="text-gray-300 mt-2">
                This MVP sets a strong foundation for further innovation in AI-driven productivity tools, 
                with the potential to revolutionize how professionals manage their daily communications.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ProjectDetails;
