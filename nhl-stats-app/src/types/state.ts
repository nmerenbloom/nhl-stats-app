import { PlayerStats } from './player-stats';

export interface AppState {
  playerStats: { allPlayers: PlayerStats[]; onGrid: PlayerStats[] };
  isLoading: boolean;
  pagination: { currPage: number; totalPages: number };
}
