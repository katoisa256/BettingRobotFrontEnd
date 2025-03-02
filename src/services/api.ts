import axios from 'axios';
import { Match, ApiResponse, OddsAnalysis, LeaguePerformance, OddsPattern, WeeklyInsight } from '../types';

// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://bettingrobotbackend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const health = axios.create({ 
    baseURL: 'https://bettingrobotbackend.onrender.com',
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const fetchAllMatches = async (): Promise<Match[]> => {
  const response = await api.get<Match[]>('/matches');
  return response.data;
};

export const fetchMatchById = async (id: string): Promise<Match> => {
  const response = await api.get<Match>(`/matches/${id}`);
  return response.data;
};

export const fetchUpcomingMatches = async (): Promise<Match[]> => {
  const response = await api.get<Match[]>('/matches/filter/upcoming');
  return response.data;
};

export const fetchTodaysMatches = async (): Promise<Match[]> => {
  const response = await api.get<Match[]>('/matches/filter/today');
  return response.data;
};

export const fetchCompletedMatches = async (): Promise<Match[]> => {
  const response = await api.get<Match[]>('/matches/filter/completed');
  return response.data;
};

export const triggerOddsScraping = async (): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>('/matches/scrape');
  return response.data;
};

export const triggerTodaysMatchesScraping = async (): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>('/matches/scrape/today');
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await health.get<{ status: string }>('/health');
  return response.data;
};

// Mock API calls for AI analysis - replace with actual endpoints when available
export const fetchWeeklyOddsAnalysis = async (): Promise<OddsAnalysis[]> => {
  // This would be an actual API call in production
  // For now, return mock data
  return [
    { date: '2025-01-01', homeWinRate: 0.45, drawRate: 0.25, awayWinRate: 0.30, averageHomeOdds: 2.1, averageDrawOdds: 3.2, averageAwayOdds: 3.5, totalMatches: 42 },
    { date: '2025-01-08', homeWinRate: 0.48, drawRate: 0.22, awayWinRate: 0.30, averageHomeOdds: 2.0, averageDrawOdds: 3.3, averageAwayOdds: 3.6, totalMatches: 38 },
    { date: '2025-01-15', homeWinRate: 0.42, drawRate: 0.28, awayWinRate: 0.30, averageHomeOdds: 2.2, averageDrawOdds: 3.1, averageAwayOdds: 3.4, totalMatches: 45 },
    { date: '2025-01-22', homeWinRate: 0.44, drawRate: 0.26, awayWinRate: 0.30, averageHomeOdds: 2.1, averageDrawOdds: 3.2, averageAwayOdds: 3.5, totalMatches: 40 },
    { date: '2025-01-29', homeWinRate: 0.46, drawRate: 0.24, awayWinRate: 0.30, averageHomeOdds: 2.0, averageDrawOdds: 3.3, averageAwayOdds: 3.6, totalMatches: 43 },
    { date: '2025-02-05', homeWinRate: 0.43, drawRate: 0.27, awayWinRate: 0.30, averageHomeOdds: 2.2, averageDrawOdds: 3.1, averageAwayOdds: 3.4, totalMatches: 39 },
    { date: '2025-02-12', homeWinRate: 0.47, drawRate: 0.23, awayWinRate: 0.30, averageHomeOdds: 2.1, averageDrawOdds: 3.2, averageAwayOdds: 3.5, totalMatches: 44 },
    { date: '2025-02-19', homeWinRate: 0.45, drawRate: 0.25, awayWinRate: 0.30, averageHomeOdds: 2.0, averageDrawOdds: 3.3, averageAwayOdds: 3.6, totalMatches: 41 },
  ];
};

export const fetchLeaguePerformance = async (): Promise<LeaguePerformance[]> => {
  // Mock data
  return [
    { league: 'Premier League', homeWinRate: 0.48, drawRate: 0.24, awayWinRate: 0.28, totalMatches: 120 },
    { league: 'La Liga', homeWinRate: 0.46, drawRate: 0.26, awayWinRate: 0.28, totalMatches: 110 },
    { league: 'Bundesliga', homeWinRate: 0.44, drawRate: 0.22, awayWinRate: 0.34, totalMatches: 90 },
    { league: 'Serie A', homeWinRate: 0.42, drawRate: 0.30, awayWinRate: 0.28, totalMatches: 100 },
    { league: 'Ligue 1', homeWinRate: 0.45, drawRate: 0.28, awayWinRate: 0.27, totalMatches: 95 },
  ];
};

export const fetchOddsPatterns = async (): Promise<OddsPattern[]> => {
  // Mock data
  return [
    { pattern: 'Home favorite (odds < 1.5)', occurrences: 78, successRate: 0.72, averageOdds: 1.35, profitMargin: 0.08 },
    { pattern: 'Away underdog (odds > 4.0)', occurrences: 45, successRate: 0.18, averageOdds: 5.20, profitMargin: -0.02 },
    { pattern: 'Even match (all odds 2.5-3.5)', occurrences: 62, successRate: 0.33, averageOdds: 3.10, profitMargin: 0.03 },
    { pattern: 'Draw likely (draw odds < 3.0)', occurrences: 53, successRate: 0.42, averageOdds: 2.75, profitMargin: 0.12 },
    { pattern: 'Home team after loss', occurrences: 41, successRate: 0.56, averageOdds: 2.15, profitMargin: 0.18 },
  ];
};

export const fetchWeeklyInsights = async (): Promise<WeeklyInsight[]> => {
  // Mock data
  return [
    { week: 'Week 1', topPattern: 'Home favorites in Premier League', profitability: 0.12, confidence: 0.85, recommendation: 'Back home favorites in Premier League matches' },
    { week: 'Week 2', topPattern: 'Draws in Serie A', profitability: 0.18, confidence: 0.78, recommendation: 'Look for draw opportunities in Serie A matches' },
    { week: 'Week 3', topPattern: 'Away wins in Bundesliga', profitability: 0.15, confidence: 0.72, recommendation: 'Consider away teams in Bundesliga, especially underdogs' },
    { week: 'Week 4', topPattern: 'Low scoring in Ligue 1', profitability: 0.09, confidence: 0.81, recommendation: 'Under 2.5 goals markets in Ligue 1 show value' },
    { week: 'Week 5', topPattern: 'Home teams after European matches', profitability: -0.05, confidence: 0.68, recommendation: 'Avoid backing home teams after midweek European fixtures' },
    { week: 'Week 6', topPattern: 'Favorites in cup competitions', profitability: 0.07, confidence: 0.75, recommendation: 'Selective backing of favorites in cup matches' },
    { week: 'Week 7', topPattern: 'Derby matches tend to draw', profitability: 0.14, confidence: 0.82, recommendation: 'Look for draw value in local derby matches' },
    { week: 'Week 8', topPattern: 'Away teams in bad weather', profitability: 0.11, confidence: 0.77, recommendation: 'Consider away teams when weather conditions are poor' },
  ];
};