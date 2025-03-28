import React, { useState } from 'react';
import { Brain, RefreshCw } from 'lucide-react';
import { trainModel } from '../../services/api';

const ModelTrainingCard: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleTrainModel = async () => {
    try {
      setIsTraining(true);
      setMessage(null);
      const response = await trainModel();
      setMessage(response.message || 'Model training completed successfully');
    } catch (error) {
      setMessage('Failed to train model. Please try again.');
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-6 w-6 text-purple-600" />
        <h3 className="text-xl font-semibold">Model Training</h3>
      </div>

      <p className="text-gray-600 mb-6">
        Train the neural network model with the latest match data to improve prediction accuracy.
        This process analyzes historical patterns and outcomes to enhance future predictions.
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={handleTrainModel}
          disabled={isTraining}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
        >
          {isTraining ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Brain className="h-4 w-4" />
          )}
          {isTraining ? 'Training...' : 'Train Model'}
        </button>

        {message && (
          <p className={`text-sm ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ModelTrainingCard;