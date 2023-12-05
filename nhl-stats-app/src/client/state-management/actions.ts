import { type } from 'os';
import { DataFilters } from '../../types/data-filter';
import { PlayerStats } from '../../types/player-stats';
import { AppState } from '../../types/state';
import { YahooConnection } from '../../types/yahoo-connection';
import {
  getSkaterStats,
  getYahooFantasyData,
  getYahooSignUrl,
} from '../api-call';

// type ActionNames<T> = {
//   [P in keyof T as `set${Capitalize<string & P>}Action`]: any;
// };
// type ActionsObj = ActionNames<AppState>;

export enum ActionTypes {
  FETCH_PLAYER_STATS,
  TOGGLE_LOADING_SPINNER,
  PAGINATE,
  EDIT_DATA_FILTERS,
  CONNECT_TO_YAHOO,
}

export type AppAction =
  | { type: ActionTypes.PAGINATE; payload: number }
  | { type: ActionTypes.TOGGLE_LOADING_SPINNER; payload: boolean }
  | { type: ActionTypes.FETCH_PLAYER_STATS; payload: PlayerStats[] }
  | { type: ActionTypes.EDIT_DATA_FILTERS; payload: DataFilters }
  | { type: ActionTypes.CONNECT_TO_YAHOO; payload: YahooConnection };

export const getYahooFantasyDataAction = async (): Promise<AppAction> => {
  // await getYahooSignUrl();
  const yahooData = await getYahooFantasyData();

  return {
    type: ActionTypes.CONNECT_TO_YAHOO,
    payload: {
      hasCode: true,
      isFulllyConnected: true,
      email: yahooData?.name ?? 'idk',
    },
  };
};

export const editFiltersAction = (d: DataFilters): AppAction => {
  return { type: ActionTypes.EDIT_DATA_FILTERS, payload: d };
};

export const paginateAction = (n: number): AppAction => {
  return { type: ActionTypes.PAGINATE, payload: n };
};

export const toggleSpinnerAction = (input: boolean): AppAction => {
  return { type: ActionTypes.TOGGLE_LOADING_SPINNER, payload: input };
};

export const fetchPlayersAction = async (
  state: AppState
): Promise<AppAction> => {
  const res = await getSkaterStats(state.dataFilters);
  return {
    type: ActionTypes.FETCH_PLAYER_STATS,
    payload: res.slice(0, 200),
  };
};
