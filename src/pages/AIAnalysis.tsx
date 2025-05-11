// Update time frame ..
// Update UI based on odds and also the odds selction tool.
import React, { useEffect, useState } from 'react';
import { Brain, RefreshCw, AlertTriangle } from 'lucide-react';
import { analyzePatterns } from '../services/api';
import { PatternAnalysis } from '../types';
import OddsSelector from '../components/analysis/OddsSelector';
import SimilarOddsPattern from '../components/analysis/SimilarOddsPattern';
import SpecificOddsPattern from '../components/analysis/SpecificOddsPattern';

const AIAnalysis: React.FC = () => {
  const [patternAnalysis, setPatternAnalysis] = useState<PatternAnalysis | null>(null);
  const [selectedOdd, setSelectedOdd] = useState<number>(1.00);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [usingSampleData, setUsingSampleData] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const patternsData = await analyzePatterns();
      setPatternAnalysis(patternsData);
      setLastUpdated(new Date());
      setUsingSampleData(true); // Set to true when using mock data
    } catch (error) {
      console.error('Error fetching analysis data:', error);
      // Use sample data as fallback
      setPatternAnalysis({
        patternOneResults: generateSamplePatternOneData(),
        patternTwoResults: generateSamplePatternTwoData()
      });
      setUsingSampleData(true);
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-bold text-gray-900">AI Betting Analysis</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {usingSampleData && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            <p className="text-yellow-700">
              Currently displaying sample data for demonstration purposes.
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <OddsSelector selectedOdd={selectedOdd} onOddChange={setSelectedOdd} />
      </div>

      {patternAnalysis && (
        <div className="space-y-8">
          <SimilarOddsPattern patterns={patternAnalysis.patternOneResults} />
          <SpecificOddsPattern 
            patterns={patternAnalysis.patternTwoResults}
            selectedOdd={selectedOdd}
          />
        </div>
      )}
    </div>
  );
};

// Sample data generation functions
const generateSamplePatternOneData = () => {
  const timeSlots = ['morning', 'afternoon', 'evening'];
  const teams = [
    ['Arsenal', 'Chelsea'], 
    ['Liverpool', 'Man City'],
    ['Man United', 'Tottenham'],
    ['Newcastle', 'Brighton']
  ];
  
  return teams.flatMap(([home, away]) => ([
    {
      match: {
        id: Math.random().toString(),
        homeTeam: home,
        awayTeam: away,
        homeOdds: '1.00',
        drawOdds: '2.30',
        awayOdds: '2.30',
        kickoff: new Date().toISOString(),
        league: 'Premier League',
        matchResult: 'HOME_WIN' as const
      },
      pattern: 'similar_draw_away',
      timeSlot: timeSlots[Math.floor(Math.random() * timeSlots.length)],
      result: 'HOME_WIN'
    }
  ]));
};

const generateSamplePatternTwoData = () => {
  const timeSlots = ['morning', 'afternoon', 'evening'];
  const teams = [
    ['Barcelona', 'Real Madrid'],
    ['Bayern', 'Dortmund'],
    ['PSG', 'Lyon'],
    ['Inter', 'Milan']
  ];
  
  return teams.flatMap(([home, away]) => ([
    {
      match: {
        id: Math.random().toString(),
        homeTeam: home,
        awayTeam: away,
        homeOdds: '1.00',
        drawOdds: '3.50',
        awayOdds: '4.20',
        kickoff: new Date().toISOString(),
        league: 'Various Leagues',
        matchResult: 'HOME_WIN' as const
      },
      pattern: 'target_odd_home',
      timeSlot: timeSlots[Math.floor(Math.random() * timeSlots.length)],
      result: 'HOME_WIN'
    }
  ]));
};

export default AIAnalysis;