export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeOdds: string;
  drawOdds: string;
  awayOdds: string;
  kickoff: string;
  league: string;
  isProcessed?: boolean;
  homeScore?: number;
  awayScore?: number;
  matchResult?: 'HOME_WIN' | 'AWAY_WIN' | 'DRAW' | null;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface OddsAnalysis {
  date: string;
  homeWinRate: number;
  drawRate: number;
  awayWinRate: number;
  averageHomeOdds: number;
  averageDrawOdds: number;
  averageAwayOdds: number;
  totalMatches: number;
}

export interface LeaguePerformance {
  league: string;
  homeWinRate: number;
  drawRate: number;
  awayWinRate: number;
  totalMatches: number;
}

export interface OddsPattern {
  pattern: string;
  occurrences: number;
  successRate: number;
  averageOdds: number;
  profitMargin: number;
}

export interface WeeklyInsight {
  week: string;
  topPattern: string;
  profitability: number;
  confidence: number;
  recommendation: string;
}

export interface PatternMatch {
  match: Match;
  pattern: string;
  timeSlot: string;
  result: string;
}

export interface PredictionResult {
  prediction: string;
  confidence: number;
}

export interface PatternAnalysis {
  patternOneResults: PatternMatch[];
  patternTwoResults: PatternMatch[];
}