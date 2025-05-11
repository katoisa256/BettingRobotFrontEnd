import axios from 'axios';
import { Match, ApiResponse, OddsAnalysis, LeaguePerformance, OddsPattern, WeeklyInsight, PatternAnalysis, PredictionResult } from '../types';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

const health = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});


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

export const analyzePatterns = async (): Promise<PatternAnalysis> => {
  const response = await api.get<PatternAnalysis>('/analysis/patterns');
  return response.data;
};

export const trainModel = async (): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>('/analysis/train');
  return response.data;
};

export const predictMatch = async (match: Match): Promise<PredictionResult> => {
  const response = await api.post<PredictionResult>('/analysis/predict', match);
  return response.data;
};

// Mock API calls for visualization data
export const fetchWeeklyOddsAnalysis = async (): Promise<OddsAnalysis[]> => {
  // This would be an actual API call in production
  return [
    { date: '2025-01-01', homeWinRate: 0.45, drawRate: 0.25, awayWinRate: 0.30, averageHomeOdds: 2.1, averageDrawOdds: 3.2, averageAwayOdds: 3.5, totalMatches: 42 },
  ];
};

export const fetchLeaguePerformance = async (): Promise<LeaguePerformance[]> => {
  // Mock data
  return [
    { league: 'Premier League', homeWinRate: 0.48, drawRate: 0.24, awayWinRate: 0.28, totalMatches: 120 },
  ];
};

export const fetchOddsPatterns = async (): Promise<OddsPattern[]> => {
  // Mock data
  return [
    { pattern: 'Home favorite (odds < 1.5)', occurrences: 78, successRate: 0.72, averageOdds: 1.35, profitMargin: 0.08 },
  ];
};

export const fetchWeeklyInsights = async (): Promise<WeeklyInsight[]> => {
  // Mock data
  return [
    { week: 'Week 1', topPattern: 'Home favorites in Premier League', profitability: 0.12, confidence: 0.85, recommendation: 'Back home favorites in Premier League matches' },
  ];
};