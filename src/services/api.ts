import axios from 'axios';
import { Match, ApiResponse } from '../types';

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