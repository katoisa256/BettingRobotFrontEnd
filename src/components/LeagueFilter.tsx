import React from 'react';
import { Match } from '../types';

interface LeagueFilterProps {
  matches: Match[];
  selectedLeague: string | null;
  onLeagueChange: (league: string | null) => void;
}

const LeagueFilter: React.FC<LeagueFilterProps> = ({ matches, selectedLeague, onLeagueChange }) => {
  const leagues = Array.from(new Set(matches.map(match => match.league))).sort();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
      <div className="flex items-center gap-2 whitespace-nowrap">
      <span className="text-sm font-medium text-gray-700">Filter by League:</span>
      <button
        onClick={() => onLeagueChange(null)}
        className={`px-3 py-1 text-sm rounded-full ${
        selectedLeague === null 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      
      {leagues.map(league => (
        <button
        key={league}
        onClick={() => onLeagueChange(league)}
        className={`px-3 py-1 text-sm rounded-full ${
          selectedLeague === league 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}
        >
        {league}
        </button>
      ))}
      </div>
    </div>
  );
};

export default LeagueFilter;