import React, { useEffect, useState } from 'react';
import { Calendar, Activity, Loader2 } from 'lucide-react';

interface DailyUpdate {
  date: string;
  status: string;
  task: string;
  description: string;
}

interface DailyUpdatesProps {
  sheetUrl?: string;
}

const DailyUpdates = ({ sheetUrl }: DailyUpdatesProps) => {
  const [updates, setUpdates] = useState<DailyUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default CSV URL - can be overridden via props
  const csvUrl = sheetUrl || "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnojjeq_IuMzBA_bjgZxAKQN_-Ui3Y_JFAQvgImaCrWmzi60RNXPKevsvyy1OduImho6jwlQl7hilC/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await fetch(csvUrl);
        const data = await response.text();
        
        const rows = data.split('\n').slice(1); // Skip header
        const parsedUpdates = rows
          .slice(0, 5) // Get latest 5 updates
          .map(row => {
            const columns = row.split(',').map(item => item.trim().replace(/"/g, ''));
            return {
              date: columns[0] || '',
              status: columns[1] || '',
              task: columns[2] || '',
              description: columns[3] || ''
            };
          })
          .filter(update => update.date && update.task); // Filter out empty rows

        setUpdates(parsedUpdates);
        setError(false);
      } catch (err) {
        console.error('Failed to fetch daily updates:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, [csvUrl]);

  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus.includes('complete') || normalizedStatus.includes('done')) {
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
    if (normalizedStatus.includes('progress') || normalizedStatus.includes('working')) {
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
    if (normalizedStatus.includes('testing') || normalizedStatus.includes('review')) {
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
    return 'bg-tech-blue/20 text-tech-blue border-tech-blue/30';
  };

  if (loading) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-tech-blue" />
            Daily Build Updates
          </h4>
          <div className="flex items-center text-xs text-tech-blue">
            <Activity className="h-3 w-3 mr-1 animate-pulse" />
            Live
          </div>
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-tech-dark/60 border border-tech-blue/10 rounded-lg p-4 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-tech-blue/20 rounded w-24"></div>
                <div className="h-4 bg-tech-blue/20 rounded w-16"></div>
              </div>
              <div className="h-4 bg-tech-blue/20 rounded w-full mb-2"></div>
              <div className="h-3 bg-tech-blue/20 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || updates.length === 0) {
    return (
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-tech-blue" />
            Daily Build Updates
          </h4>
        </div>
        <div className="bg-tech-dark/60 border border-tech-blue/10 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">Updates temporarily unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-tech-blue" />
          Daily Build Updates
        </h4>
        <div className="flex items-center text-xs text-tech-blue">
          <Activity className="h-3 w-3 mr-1 animate-pulse" />
          Live
        </div>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {updates.map((update, index) => (
          <div 
            key={index}
            className="bg-tech-dark/60 border border-tech-blue/10 rounded-lg p-4 hover:border-tech-blue/30 transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 font-medium">{update.date}</span>
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(update.status)}`}>
                {update.status}
              </span>
            </div>
            <h5 className="text-sm font-semibold text-white mb-1 leading-tight">
              {update.task}
            </h5>
            {update.description && (
              <p className="text-xs text-gray-300 leading-relaxed">
                {update.description}
              </p>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-400 text-center">
        Latest updates from development log
      </div>
    </div>
  );
};

export default DailyUpdates;