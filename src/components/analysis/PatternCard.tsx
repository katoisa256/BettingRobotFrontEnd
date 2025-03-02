import React from 'react';
import { TrendingUp, TrendingDown, Percent, DollarSign } from 'lucide-react';
import { OddsPattern } from '../../types';

interface PatternCardProps {
  pattern: OddsPattern;
}

const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const isProfitable = pattern.profitMargin > 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold mb-3">{pattern.pattern}</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 mr-3">
            <Percent className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Success Rate</p>
            <p className="font-semibold">{(pattern.successRate * 100).toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-purple-100 mr-3">
            <span className="text-purple-600 font-bold text-sm">x</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Odds</p>
            <p className="font-semibold">{pattern.averageOdds.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-gray-100 mr-3">
            <span className="text-gray-600 font-bold text-sm">#</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">Occurrences</p>
            <p className="font-semibold">{pattern.occurrences}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${isProfitable ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
            {isProfitable ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">Profit Margin</p>
            <p className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {(pattern.profitMargin * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternCard;