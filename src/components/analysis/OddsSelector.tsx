import React from 'react';
import { ArrowRight } from 'lucide-react';

interface OddsSelectorProps {
  selectedOdd: number;
  onOddChange: (odd: number) => void;
}

const OddsSelector: React.FC<OddsSelectorProps> = ({ selectedOdd, onOddChange }) => {
  const odds = [1.00, 1.20, 1.40, 1.60, 1.80, 2.00, 2.20, 2.40, 2.60, 2.80, 3.00];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Select Odds for Analysis</h3>
      <div className="flex flex-wrap gap-2">
        {odds.map((odd) => (
          <button
            key={odd}
            onClick={() => onOddChange(odd)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedOdd === odd
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {odd.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OddsSelector;