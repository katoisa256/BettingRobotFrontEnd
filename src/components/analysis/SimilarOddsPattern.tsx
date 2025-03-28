import React from 'react';
import { PatternMatch } from '../../types';
import { format } from 'date-fns';
import { Target, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface SimilarOddsPatternProps {
  patterns: PatternMatch[];
}

const SimilarOddsPattern: React.FC<SimilarOddsPatternProps> = ({ patterns }) => {
  const timeSlots = {
    morning: '6am - 12pm',
    afternoon: '12pm - 6pm',
    evening: '6pm - 12am'
  };

  const getTimeSlotStats = (slot: string) => {
    const slotMatches = patterns.filter(p => p.timeSlot === slot);
    const wins = slotMatches.filter(p => p.result === 'HOME_WIN').length;
    return {
      total: slotMatches.length,
      winRate: slotMatches.length > 0 ? (wins / slotMatches.length * 100).toFixed(1) : '0.0'
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold">Pattern One: Similar Odds Analysis</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Pattern Description</h3>
        </div>
        <p className="text-blue-800">
          This pattern identifies matches where two odds are similar while one differs.
          For example: Home (1.00), Draw (2.30), Away (2.30)
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Time-Based Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(timeSlots).map(([slot, time]) => {
            const stats = getTimeSlotStats(slot);
            return (
              <div key={slot} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 capitalize">{time}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Matches</p>
                    <p className="text-xl font-bold text-purple-600">{stats.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Win Rate</p>
                    <p className="text-xl font-bold text-blue-600">{stats.winRate}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Pattern Matches</h3>
        <div className="space-y-4">
          {patterns.slice(0, 5).map((pattern, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {pattern.match.homeTeam} vs {pattern.match.awayTeam}
                </span>
                <span className="text-sm text-gray-600">
                  {format(new Date(pattern.match.kickoff), 'MMM d, HH:mm')}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center mb-2">
                <div className="bg-white p-2 rounded">
                  <div className="text-sm text-gray-600">Home</div>
                  <div className="font-bold text-blue-600">{pattern.match.homeOdds}</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <div className="text-sm text-gray-600">Draw</div>
                  <div className="font-bold text-blue-600">{pattern.match.drawOdds}</div>
                </div>
                <div className="bg-white p-2 rounded">
                  <div className="text-sm text-gray-600">Away</div>
                  <div className="font-bold text-blue-600">{pattern.match.awayOdds}</div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Time Slot: <span className="font-medium capitalize">{pattern.timeSlot}</span>
                </span>
                <span className="text-gray-600">
                  Result: <span className="font-medium">{pattern.result}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarOddsPattern;