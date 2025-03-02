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