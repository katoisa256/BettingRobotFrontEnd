import React from 'react';
import { PatternMatch } from '../../types';
import { format } from 'date-fns';
import { TrendingUp, Clock, Target, AlertCircle } from 'lucide-react';

interface PatternTwoAnalysisProps {
  patterns: PatternMatch[];
  selectedOdd: number;
}

const PatternTwoAnalysis: React.FC<PatternTwoAnalysisProps> = ({ patterns, selectedOdd }) => {
  const groupByPosition = () => {
    return patterns.reduce((acc, pattern) => {
      if (pattern.pattern.includes('home')) acc.home.push(pattern);
      else if (pattern.pattern.includes('draw')) acc.draw.push(pattern);
      else if (pattern.pattern.includes('away')) acc.away.push(pattern);
      return acc;
    }, { home: [] as PatternMatch[], draw: [] as PatternMatch[], away: [] as PatternMatch[] });
  };

  const positions = groupByPosition();

  const calculateStats = (matches: PatternMatch[]) => {
    const total = matches.length;
    if (total === 0) return { successRate: 0, totalMatches: 0 };
    
    const wins = matches.filter(m => m.match.matchResult === 'HOME_WIN').length;
    return {
      successRate: ((wins / total) * 100).toFixed(1),
      totalMatches: total
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-bold">Pattern Two: Specific Odds Analysis</h2>
      </div>

      <div className="flex items-center gap-2 mb-6 bg-blue-50 p-4 rounded-lg">
        <AlertCircle className="h-5 w-5 text-blue-600" />
        <p className="text-blue-800">
          Analyzing matches with odds of {selectedOdd.toFixed(2)} in different positions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['home', 'draw', 'away'] as const).map(position => {
          const matches = positions[position];
          const stats = calculateStats(matches);
          
          return (
            <div key={position} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold capitalize mb-4">{position} Position</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Success Rate</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{stats.successRate}%</p>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Total Matches</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalMatches}</p>
                </div>

                {matches.slice(0, 2).map((pattern, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">
                        {pattern.match.homeTeam} vs {pattern.match.awayTeam}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(pattern.match.kickoff), 'MMM d, HH:mm')}
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      Result: <span className="text-blue-600">{pattern.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatternTwoAnalysis;