import React from 'react';
import { PatternMatch } from '../../types';
import { format } from 'date-fns';
import { Clock, TrendingUp } from 'lucide-react';

interface PatternAnalysisCardProps {
  title: string;
  patterns: PatternMatch[];
}

const PatternAnalysisCard: React.FC<PatternAnalysisCardProps> = ({ title, patterns }) => {
  const calculateSuccessRate = () => {
    const successful = patterns.filter(p => p.match.matchResult === 'HOME_WIN').length;
    return ((successful / patterns.length) * 100).toFixed(1);
  };

  const groupByTimeSlot = () => {
    return patterns.reduce((acc, pattern) => {
      acc[pattern.timeSlot] = (acc[pattern.timeSlot] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  };

  const timeSlotDistribution = groupByTimeSlot();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{calculateSuccessRate()}%</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-purple-600" />
            <span className="font-medium">Total Matches</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{patterns.length}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Time Slot Distribution</h4>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(timeSlotDistribution).map(([slot, count]) => (
            <div key={slot} className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 capitalize">{slot}</p>
              <p className="font-semibold">{count} matches</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Recent Matches</h4>
        <div className="space-y-2">
          {patterns.slice(0, 5).map((pattern, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  {pattern.match.homeTeam} vs {pattern.match.awayTeam}
                </span>
                <span className="text-sm text-gray-600">
                  {format(new Date(pattern.match.kickoff), 'MMM d, HH:mm')}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Pattern: {pattern.pattern} | Result: {pattern.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternAnalysisCard;