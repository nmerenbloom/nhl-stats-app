import { DataFilters } from './data-filter';
import { PaginationData } from './pagination';
import { PlayerStats } from './player-stats';

export interface AppState {
  playerStats: { allPlayers: PlayerStats[] };
  isLoading: boolean;
  pagination: PaginationData;
  showGoToolTip: boolean;
  dataFilters: DataFilters;
}
