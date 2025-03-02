import React from 'react';
import { format, parseISO } from 'date-fns';
import { Match } from '../types';
import { Trophy } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const isCompleted = match.isCompleted;
  const hasResult = match.homeScore !== undefined && match.awayScore !== undefined;
  
  const formatKickoff = (kickoffTime: string) => {
    try {
      return format(parseISO(kickoffTime), 'MMM d, yyyy h:mm a');
    } catch (error) {
      return kickoffTime;
    }
  };
  
  const getResultClass = (team: 'home' | 'away' | 'draw') => {
    if (!match.matchResult) return '';
    
    if (team === 'home' && match.matchResult === 'HOME_WIN') return 'bg-green-100 border-green-500';
    if (team === 'away' && match.matchResult === 'AWAY_WIN') return 'bg-green-100 border-green-500';
    if (team === 'draw' && match.matchResult === 'DRAW') return 'bg-green-100 border-green-500';
    
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-50 p-3 border-b">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">{match.league}</span>
          {isCompleted && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
              Completed
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">{match.homeTeam}</div>
          {hasResult && (
            <div className="flex items-center gap-2 font-bold">
              <span className={match.matchResult === 'HOME_WIN' ? 'text-green-600' : ''}>{match.homeScore}</span>
              <span>-</span>
              <span className={match.matchResult === 'AWAY_WIN' ? 'text-green-600' : ''}>{match.awayScore}</span>
            </div>
          )}
          <div className="text-lg font-semibold text-right">{match.awayTeam}</div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className={`border rounded p-3 text-center ${getResultClass('home')}`}>
            <div className="text-sm text-gray-600 mb-1">Home</div>
            <div className="text-lg font-bold text-blue-600">{match.homeOdds}</div>
          </div>
          <div className={`border rounded p-3 text-center ${getResultClass('draw')}`}>
            <div className="text-sm text-gray-600 mb-1">Draw</div>
            <div className="text-lg font-bold text-blue-600">{match.drawOdds}</div>
          </div>
          <div className={`border rounded p-3 text-center ${getResultClass('away')}`}>
            <div className="text-sm text-gray-600 mb-1">Away</div>
            <div className="text-lg font-bold text-blue-600">{match.awayOdds}</div>
          </div>
        </div>
        
        {match.matchResult && (
          <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-md mb-4">
            <Trophy className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              {match.matchResult === 'HOME_WIN' 
                ? `${match.homeTeam} Win` 
                : match.matchResult === 'AWAY_WIN' 
                  ? `${match.awayTeam} Win` 
                  : 'Draw'}
            </span>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          Kickoff: {formatKickoff(match.kickoff)}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;