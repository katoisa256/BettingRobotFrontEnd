import React, { useEffect, useState } from 'react';
import { Brain, RefreshCw, TrendingUp, Zap } from 'lucide-react';
import { 
  fetchWeeklyOddsAnalysis, 
  fetchLeaguePerformance, 
  fetchOddsPatterns,
  fetchWeeklyInsights
} from '../services/api';
import { 
  OddsAnalysis, 
  LeaguePerformance, 
  OddsPattern,
  WeeklyInsight
} from '../types';
import WeeklyOddsChart from '../components/analysis/WeeklyOddsChart';
import AverageOddsChart from '../components/analysis/AverageOddsChart';
import LeaguePerformanceChart from '../components/analysis/LeaguePerformanceChart';
import PatternCard from '../components/analysis/PatternCard';
import WeeklyInsightCard from '../components/analysis/WeeklyInsightCard';

const AIAnalysis: React.FC = () => {
  const [weeklyOdds, setWeeklyOdds] = useState<OddsAnalysis[]>([]);
  const [leaguePerformance, setLeaguePerformance] = useState<LeaguePerformance[]>([]);
  const [oddsPatterns, setOddsPatterns] = useState<OddsPattern[]>([]);
  const [weeklyInsights, setWeeklyInsights] = useState<WeeklyInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const [oddsData, leagueData, patternsData, insightsData] = await Promise.all([
        fetchWeeklyOddsAnalysis(),
        fetchLeaguePerformance(),
        fetchOddsPatterns(),
        fetchWeeklyInsights()
      ]);
      
      setWeeklyOdds(oddsData);
      setLeaguePerformance(leagueData);
      setOddsPatterns(patternsData);
      setWeeklyInsights(insightsData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching analysis data:', error);
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

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Our advanced AI algorithms analyze thousands of matches to identify patterns, trends, and profitable betting opportunities. 
          The system continuously learns from new data to improve prediction accuracy and identify value bets.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <WeeklyOddsChart data={weeklyOdds} />
        <AverageOddsChart data={weeklyOdds} />
      </div>
      
      <div className="mb-6">
        <LeaguePerformanceChart data={leaguePerformance} />
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Identified Betting Patterns</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oddsPatterns.map((pattern, index) => (
            <PatternCard key={index} pattern={pattern} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Weekly Betting Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeklyInsights.slice(0, 4).map((insight, index) => (
            <WeeklyInsightCard key={index} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;