import { DataFilters, SavedQuery } from './data-filter';
import { PaginationData } from './pagination';
import { PlayerStats } from './player-stats';
import { YahooConnection } from './yahoo-connection';

export interface AppState {
  playerStats: { allPlayers: PlayerStats[] };
  isLoading: boolean;
  pagination: PaginationData;
  showGoToolTip: boolean;
  dataFilters: DataFilters;
  yahooConnection: YahooConnection;
  appError?: { errorMessage: string };
  savedQueries: { selectedIndex?: number; savedQueries: SavedQuery[] };
}
