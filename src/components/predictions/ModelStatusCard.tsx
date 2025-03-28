import React, { useState } from 'react';
import { Brain, RefreshCw, CheckCircle } from 'lucide-react';
import { trainModel } from '../../services/api';

const ModelStatusCard: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [lastTrained, setLastTrained] = useState<Date | null>(null);

  const handleTrainModel = async () => {
    try {
      setIsTraining(true);
      await trainModel();
      setLastTrained(new Date());
    } catch (error) {
      console.error('Error training model:', error);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Model Status</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Model Active</span>
        </div>

        {lastTrained && (
          <div className="text-sm text-gray-600">
            Last trained: {lastTrained.toLocaleString()}
          </div>
        )}

        <button
          onClick={handleTrainModel}
          disabled={isTraining}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
        >
          {isTraining ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Training...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Retrain Model
            </>
          )}
        </button>

        <p className="text-sm text-gray-600">
          Training the model with new data helps improve prediction accuracy.
        </p>
      </div>
    </div>
  );
};

export default ModelStatusCard;