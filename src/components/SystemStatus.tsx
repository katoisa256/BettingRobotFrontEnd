import React, { useEffect, useState } from 'react';
import { checkHealth } from '../services/api';
import { CheckCircle, XCircle } from 'lucide-react';

const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  const checkStatus = async () => {
    try {
      setStatus('checking');
      const health = await checkHealth();
      console.log(health)
      setStatus(health.status === 'ok' ? 'online' : 'offline');
    } catch (error) {
      setStatus('offline');
    }
  };
  
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center">
        {status === 'checking' && (
          <div className="animate-pulse flex items-center">
            <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Checking...</span>
          </div>
        )}
        
        {status === 'online' && (
          <div className="flex items-center">
            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
            <span className="text-xs text-gray-600">System Online</span>
          </div>
        )}
        
        {status === 'offline' && (
          <div className="flex items-center">
            <XCircle className="h-3 w-3 text-red-500 mr-2" />
            <span className="text-xs text-gray-600">System Offline</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemStatus;