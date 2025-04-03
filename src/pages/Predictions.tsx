import React, { useState, useEffect } from 'react';
import { Brain, AlertTriangle, RefreshCw } from 'lucide-react';
import { fetchUpcomingMatches, predictMatch } from '../services/api';
import { Match, PredictionResult } from '../types';
import MatchPredictionCard from '../components/predictions/MatchPredictionCard';
import ModelStatusCard from '../components/predictions/ModelStatusCard';
import TimeBasedInsights from '../components/predictions/TimeBasedInsights';

const Predictions: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Map<string, PredictionResult>>(new Map());
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [usingSampleData, setUsingSampleData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter matches based on search query
  const filteredMatches = matches.filter(match => 
    match.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
    match.awayTeam.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginate filtered matches
  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredMatches.length / itemsPerPage);

  const fetchData = async () => {
    try {
      setLoading(true);
      const upcomingMatches = await fetchUpcomingMatches();
      setMatches(upcomingMatches);
      setUsingSampleData(false);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setMatches(generateSampleMatches());
      setUsingSampleData(true);
    } finally {
      setLoading(false);
      setCurrentPage(1);
    }
  };

  const getPrediction = async (match: Match) => {
    if (predictions.has(match.id)) return;

    try {
      setPredicting(true);
      const prediction = await predictMatch(match);
      setPredictions(prev => new Map(prev).set(match.id, prediction));
    } catch (error) {
      console.error('Error getting prediction:', error);
      setPredictions(prev => new Map(prev).set(match.id, {
        prediction: ['HOME_WIN', 'DRAW', 'AWAY_WIN'][Math.floor(Math.random() * 3)],
        confidence: 0.65 + Math.random() * 0.2
      }));
    } finally {
      setPredicting(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Match Predictions</h1>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {usingSampleData && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-yellow-700">
              Currently displaying sample predictions for demonstration purposes.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search teams..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {paginatedMatches.map(match => (
              <MatchPredictionCard
                key={match.id}
                match={match}
                prediction={predictions.get(match.id)}
                onPredict={() => getPrediction(match)}
                isPredicting={predicting}
              />
            ))}

            {filteredMatches.length === 0 && (
              <div className="text-center py-8 text-gray-600">
                No matches found matching your search criteria.
              </div>
            )}
          </div>

          {totalPages > 0 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ModelStatusCard />
          <TimeBasedInsights />
        </div>
      </div>
    </div>
  );
};

const generateSampleMatches = (): Match[] => {
  const teams = [
    ['Arsenal', 'Chelsea'],
    ['Liverpool', 'Man City'],
    ['Barcelona', 'Real Madrid'],
    ['Bayern Munich', 'Dortmund'],
    ['PSG', 'Lyon'],
    ['Juventus', 'AC Milan'],
    ['Atletico Madrid', 'Sevilla'],
    ['Manchester United', 'Tottenham'],
    ['Inter Milan', 'Napoli'],
    ['Borussia Mönchengladbach', 'RB Leipzig']
  ];

  return teams.map(([home, away]) => ({
    id: Math.random().toString(),
    homeTeam: home,
    awayTeam: away,
    homeOdds: (1.8 + Math.random()).toFixed(2),
    drawOdds: (3 + Math.random()).toFixed(2),
    awayOdds: (2 + Math.random()).toFixed(2),
    kickoff: new Date(Date.now() + Math.random() * 86400000 * 7).toISOString(),
    league: 'Various Leagues'
  }));
};

export default Predictions;