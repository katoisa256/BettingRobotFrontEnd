import React from 'react';
import { WeeklyInsight } from '../../types';
import { Lightbulb, TrendingUp, BarChart } from 'lucide-react';

interface WeeklyInsightCardProps {
  insight: WeeklyInsight;
}

const WeeklyInsightCard: React.FC<WeeklyInsightCardProps> = ({ insight }) => {
  const isProfitable = insight.profitability > 0;
  const confidenceColor = insight.confidence > 0.8 ? 'text-green-600' : insight.confidence > 0.7 ? 'text-yellow-600' : 'text-red-600';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 text-white p-3">
        <h3 className="font-semibold">{insight.week}</h3>
      </div>
      
      <div className="p-4">
        <div className="flex items-start mb-4">
          <div className="p-2 rounded-full bg-blue-100 mr-3 mt-1">
            <Lightbulb className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Top Pattern</p>
            <p className="font-semibold">{insight.topPattern}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${isProfitable ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
              <TrendingUp className={`h-4 w-4 ${isProfitable ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Profitability</p>
              <p className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                {(insight.profitability * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-gray-100 mr-3">
              <BarChart className={`h-4 w-4 ${confidenceColor}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Confidence</p>
              <p className={`font-semibold ${confidenceColor}`}>
                {(insight.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Recommendation:</span> {insight.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyInsightCard;