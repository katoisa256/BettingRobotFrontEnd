import React from 'react';
import { format } from 'date-fns';
import { Brain, Clock, TrendingUp } from 'lucide-react';
import { Match, PredictionResult } from '../../types';

interface MatchPredictionCardProps {
  match: Match;
  prediction?: PredictionResult;
  onPredict: () => void;
  isPredicting: boolean;
}

const MatchPredictionCard: React.FC<MatchPredictionCardProps> = ({
  match,
  prediction,
  onPredict,
  isPredicting
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const formatPrediction = (pred: string) => {
    switch (pred) {
      case 'HOME_WIN': return `${match.homeTeam} Win`;
      case 'AWAY_WIN': return `${match.awayTeam} Win`;
      case 'DRAW': return 'Draw';
      default: return pred;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">
            {format(new Date(match.kickoff), 'MMM d, HH:mm')}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-600">{match.league}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <p className="font-medium mb-2">{match.homeTeam}</p>
          <p className="text-lg font-bold text-blue-600">{match.homeOdds}</p>
        </div>
        <div>
          <p className="font-medium mb-2">Draw</p>
          <p className="text-lg font-bold text-blue-600">{match.drawOdds}</p>
        </div>
        <div>
          <p className="font-medium mb-2">{match.awayTeam}</p>
          <p className="text-lg font-bold text-blue-600">{match.awayOdds}</p>
        </div>
      </div>

      {prediction ? (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">AI Prediction</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-5 w-5 ${getConfidenceColor(prediction.confidence)}`} />
              <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                {(prediction.confidence * 100).toFixed(1)}% Confidence
              </span>
            </div>
          </div>
          <p className="text-lg font-semibold text-indigo-600">
            {formatPrediction(prediction.prediction)}
          </p>
        </div>
      ) : (
        <button
          onClick={onPredict}
          disabled={isPredicting}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {isPredicting ? (
            <>
              <Brain className="h-4 w-4 animate-pulse" />
              Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Get Prediction
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default MatchPredictionCard;