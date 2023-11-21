import { PlayerStats } from '../../types/player-stats';

export interface FetchPlayerStatsAction {
  type: ActionTypes.FETCH_PLAYER_STATS;
  payload: PlayerStats[];
}

export interface ToggleLoadingSpinnerAction {
  type: ActionTypes.TOGGLE_LOADING_SPINNER;
  payload: boolean;
}

export interface PaginateAction {
  type: ActionTypes.PAGINATE;
  payload: number;
}

export type Action =
  | FetchPlayerStatsAction
  | ToggleLoadingSpinnerAction
  | PaginateAction;

export enum ActionTypes {
  FETCH_PLAYER_STATS,
  TOGGLE_LOADING_SPINNER,
  PAGINATE,
}
