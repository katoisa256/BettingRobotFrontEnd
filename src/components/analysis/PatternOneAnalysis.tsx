import React from 'react';
import { PatternMatch } from '../../types';
import { format } from 'date-fns';
import { TrendingUp, Clock, Target } from 'lucide-react';

interface PatternOneAnalysisProps {
  patterns: PatternMatch[];
}

const PatternOneAnalysis: React.FC<PatternOneAnalysisProps> = ({ patterns }) => {
  const groupByPattern = () => {
    return patterns.reduce((acc, pattern) => {
      acc[pattern.pattern] = (acc[pattern.pattern] || []).concat(pattern);
      return acc;
    }, {} as Record<string, PatternMatch[]>);
  };

  const patternGroups = groupByPattern();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold">Pattern One: Similar Odds Analysis</h2>
      </div>

      <p className="text-gray-600 mb-6">
        This pattern identifies matches where two odds are similar while one differs,
        indicating potential value betting opportunities.
      </p>

      {Object.entries(patternGroups).map(([patternType, matches]) => {
        const successRate = (matches.filter(m => m.match.matchResult === 'HOME_WIN').length / matches.length * 100).toFixed(1);
        
        return (
          <div key={patternType} className="mb-8 last:mb-0">
            <div className="border-b pb-2 mb-4">
              <h3 className="text-lg font-semibold capitalize">{patternType.replace(/_/g, ' ')}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{successRate}%</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Sample Size</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">{matches.length}</p>
              </div>
            </div>

            <div className="space-y-2">
              {matches.slice(0, 3).map((pattern, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      {pattern.match.homeTeam} vs {pattern.match.awayTeam}
                    </span>
                    <span className="text-sm text-gray-600">
                      {format(new Date(pattern.match.kickoff), 'MMM d, HH:mm')}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
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
                  <div className="mt-2 text-sm text-gray-600">
                    Result: <span className="font-medium">{pattern.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PatternOneAnalysis;