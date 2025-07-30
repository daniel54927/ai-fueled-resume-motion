import React, { useEffect, useState } from 'react';
import { ExternalLink, Calendar, Activity, Loader2 } from 'lucide-react';

interface ProgressPreviewProps {
  liveLogbookUrl: string;
  onPreviewClick: () => void;
}

interface ProgressEntry {
  date: string;
  status: string;
  task: string;
  description: string;
  timeSpent?: string;
  roadblocks?: string;
  wins?: string;
  nextSteps?: string;
}

const ProgressPreview = ({ liveLogbookUrl, onPreviewClick }: ProgressPreviewProps) => {
  const [entries, setEntries] = useState<ProgressEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // CSV endpoint for fetching data
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnojjeq_IuMzBA_bjgZxAKQN_-Ui3Y_JFAQvgImaCrWmzi60RNXPKevsvyy1OduImho6jwlQl7hilC/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        const data = await response.text();
        
        const rows = data.split('\n').filter(row => row.trim());
        if (rows.length > 1) { // Has data beyond headers
          const dataRows = rows.slice(1, 4); // Get first 3 data rows
          const parsedEntries = dataRows.map(row => {
            const columns = row.split(',').map(col => col.trim().replace(/"/g, ''));
            return {
              date: columns[0] || '',
              status: columns[1] || '',
              task: columns[2] || '',
              description: columns[3] || '',
              timeSpent: columns[4] || '',
              roadblocks: columns[5] || '',
              wins: columns[6] || '',
              nextSteps: columns[7] || ''
            };
          }).filter(entry => entry.date && entry.task); // Filter out empty rows

          setEntries(parsedEntries);
        }
        setError(false);
      } catch (err) {
        console.error('Failed to fetch progress data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
            Progress Tracker
          </h4>
          <div className="flex items-center text-xs text-tech-blue">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Loading
          </div>
        </div>
        <div className="bg-tech-dark/60 border border-tech-blue/10 rounded-lg p-4">
          <div className="space-y-3">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex justify-between mb-2">
                  <div className="h-3 bg-tech-blue/20 rounded w-20"></div>
                  <div className="h-3 bg-tech-blue/20 rounded w-16"></div>
                </div>
                <div className="h-4 bg-tech-blue/20 rounded w-full mb-1"></div>
                <div className="h-3 bg-tech-blue/20 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-white flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-tech-blue" />
          Progress Tracker
        </h4>
        <div className="flex items-center text-xs text-tech-blue">
          <Activity className="h-3 w-3 mr-1 animate-pulse" />
          Live Updates
        </div>
      </div>
      
      <div 
        className="bg-tech-dark/60 border border-tech-blue/10 rounded-lg p-4 cursor-pointer transition-all hover:border-tech-blue/30 hover:bg-tech-dark/70 group"
        onClick={onPreviewClick}
      >
        {entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div key={index} className="border-b border-tech-blue/10 last:border-b-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 font-medium">{entry.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(entry.status)}`}>
                    {entry.status}
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-white mb-1 leading-tight">
                  {entry.task}
                </h5>
                {entry.description && (
                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {entry.description}
                  </p>
                )}
                {entry.wins && (
                  <p className="text-xs text-green-400 mt-1">
                    ✓ {entry.wins}
                  </p>
                )}
              </div>
            ))}
            
            <div className="pt-2 border-t border-tech-blue/10">
              <div className="flex items-center justify-center text-tech-blue group-hover:text-blue-400 transition-colors">
                <span className="text-xs font-medium mr-2">View Full Progress Log</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-gray-400 mb-3">
              <Calendar className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <h5 className="text-sm font-semibold text-white mb-2">Live Progress Tracker</h5>
              <p className="text-xs mb-1">Real-time development log and daily updates</p>
              <p className="text-xs opacity-75">Currently being set up - check back soon!</p>
            </div>
            <div className="mt-4 pt-3 border-t border-tech-blue/10">
              <div className="flex items-center justify-center text-tech-blue group-hover:text-blue-400 transition-colors">
                <span className="text-xs font-medium mr-2">View Live Tracker</span>
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-2 text-xs text-gray-400 text-center">
        Last synced: {currentDate}
      </div>
    </div>
  );
};

export default ProgressPreview;