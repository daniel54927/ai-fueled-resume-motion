
import N8nIcon from '../icons/N8nIcon';


interface ProjectDetailsProps {
  title: string;
  description: string[];
  results?: {
    title: string;
    items: string[];
  };
}

const ProjectDetails = ({ title, description, results }: ProjectDetailsProps) => {


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
        
      </div>
    </div>
  );
};

export default ProjectDetails;

