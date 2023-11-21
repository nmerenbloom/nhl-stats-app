import { PlayerStats } from '../../types/player-stats';
import { getSkaterStats } from '../api-call';

// type ActionNames<T> = {
//   [P in keyof T as `set${Capitalize<string & P>}Action`]: any;
// };
// type ActionsObj = ActionNames<AppState>;

export enum ActionTypes {
  FETCH_PLAYER_STATS,
  TOGGLE_LOADING_SPINNER,
  PAGINATE,
}

export type AppAction =
  | { type: ActionTypes.PAGINATE; payload: number }
  | { type: ActionTypes.TOGGLE_LOADING_SPINNER; payload: boolean }
  | { type: ActionTypes.FETCH_PLAYER_STATS; payload: PlayerStats[] };

export const paginateAction = (n: number): AppAction => {
  return { type: ActionTypes.PAGINATE, payload: n };
};

export const toggleSpinnerAction = (input: boolean): AppAction => {
  return { type: ActionTypes.TOGGLE_LOADING_SPINNER, payload: input };
};

export const fetchPlayersAction = async (): Promise<AppAction> => {
  const res = await getSkaterStats();
  return {
    type: ActionTypes.FETCH_PLAYER_STATS,
    payload: res.slice(0, 200),
  };
};
