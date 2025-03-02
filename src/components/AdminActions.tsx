import React, { useState } from 'react';
import { RefreshCw, Calendar, AlertTriangle } from 'lucide-react';
import { triggerOddsScraping, triggerTodaysMatchesScraping } from '../services/api';

const AdminActions: React.FC = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleScrapeOdds = async () => {
    try {
      setLoading('odds');
      setMessage(null);
      const response = await triggerOddsScraping();
      setMessage({ 
        text: response.message || 'Odds scraping triggered successfully', 
        type: 'success' 
      });
    } catch (error) {
      setMessage({ 
        text: 'Failed to trigger odds scraping', 
        type: 'error' 
      });
    } finally {
      setLoading(null);
    }
  };

  const handleScrapeTodaysMatches = async () => {
    try {
      setLoading('today');
      setMessage(null);
      const response = await triggerTodaysMatchesScraping();
      setMessage({ 
        text: response.message || 'Today\'s matches scraping triggered successfully', 
        type: 'success' 
      });
    } catch (error) {
      setMessage({ 
        text: 'Failed to trigger today\'s matches scraping', 
        type: 'error' 
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleScrapeOdds}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {loading === 'odds' ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Scrape Latest Odds
        </button>
        
        <button
          onClick={handleScrapeTodaysMatches}
          disabled={loading !== null}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400"
        >
          {loading === 'today' ? (
            <Calendar className="w-4 h-4 animate-spin" />
          ) : (
            <Calendar className="w-4 h-4" />
          )}
          Scrape Today's Matches
        </button>
      </div>
      
      {message && (
        <div className={`mt-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-center gap-2">
            {message.type === 'error' && <AlertTriangle className="w-4 h-4" />}
            <p>{message.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminActions;