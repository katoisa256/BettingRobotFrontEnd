import React, { useEffect, useState } from 'react';
import { fetchUpcomingMatches } from '../services/api';
import { Match } from '../types';
import MatchesGrid from '../components/MatchesGrid';
import LeagueFilter from '../components/LeagueFilter';
import { RefreshCw, Clock } from 'lucide-react';

const UpcomingMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchUpcomingMatches();
      setMatches(data);
    } catch (error) {
      console.error('Error fetching upcoming matches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      setFilteredMatches(matches.filter(match => match.league === selectedLeague));
    } else {
      setFilteredMatches(matches);
    }
  }, [matches, selectedLeague]);

  const handleLeagueChange = (league: string | null) => {
    setSelectedLeague(league);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Upcoming Matches</h1>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      
      <LeagueFilter 
        matches={matches} 
        selectedLeague={selectedLeague} 
        onLeagueChange={handleLeagueChange} 
      />
      
      <MatchesGrid matches={filteredMatches} loading={loading} />
    </div>
  );
};

export default UpcomingMatches;