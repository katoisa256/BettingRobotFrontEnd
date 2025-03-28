import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

const TimeBasedInsights: React.FC = () => {
  const timeSlots = [
    { time: '6am - 12pm', winRate: 68, matches: 245 },
    { time: '12pm - 6pm', winRate: 72, matches: 312 },
    { time: '6pm - 12am', winRate: 65, matches: 278 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Time-Based Performance</h2>
      </div>

      <div className="space-y-4">
        {timeSlots.map((slot, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">{slot.time}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Success Rate</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{slot.winRate}%</p>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Sample Size</div>
                <p className="text-xl font-bold text-purple-600">{slot.matches}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        Based on historical match data and prediction accuracy.
      </div>
    </div>
  );
};

export default TimeBasedInsights;