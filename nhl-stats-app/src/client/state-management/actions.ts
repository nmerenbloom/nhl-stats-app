import { type } from 'os';
import { DataFilters, SavedQuery } from '../../types/data-filter';
import { PlayerStats } from '../../types/player-stats';
import { AppState } from '../../types/state';
import {
  YahooConnection,
  YahooResponseData,
} from '../../types/yahoo-connection';
import {
  getSkaterStats,
  getInitYahooData,
  getYahooSignUrl,
  getResumeSessionYahooData,
} from '../api-call';
import { integrateYahooData } from './state-helpers/yahoo-data-helpers';
import { AppError } from '../../types/app-error';

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
  SET_APP_ERROR,
  SAVE_QUERY,
  SELECT_SAVED_QUERY,
  EDIT_SAVED_QUERY,
  DELETE_SAVED_QUERY,
}

export type AppAction =
  | { type: ActionTypes.PAGINATE; payload: number }
  | { type: ActionTypes.SET_APP_ERROR; payload: AppError }
  | { type: ActionTypes.TOGGLE_LOADING_SPINNER; payload: boolean }
  | { type: ActionTypes.FETCH_PLAYER_STATS; payload: PlayerStats[] }
  | { type: ActionTypes.EDIT_DATA_FILTERS; payload: DataFilters }
  | {
      type: ActionTypes.CONNECT_TO_YAHOO;
      payload: { yc: YahooConnection; error?: any };
    }
  | { type: ActionTypes.SAVE_QUERY; payload: SavedQuery }
  | { type: ActionTypes.SELECT_SAVED_QUERY; payload: number }
  | { type: ActionTypes.DELETE_SAVED_QUERY; payload: number }
  | {
      type: ActionTypes.EDIT_SAVED_QUERY;
      payload: { query: SavedQuery; index: number };
    };

export const editSavedQueryAction = (newlyNamedSavedQueryAndIndex: {
  query: SavedQuery;
  index: number;
}): AppAction => {
  return {
    type: ActionTypes.EDIT_SAVED_QUERY,
    payload: { ...newlyNamedSavedQueryAndIndex },
  };
};
export const selectSavedQueryAction = (index: number): AppAction => {
  return { type: ActionTypes.SELECT_SAVED_QUERY, payload: index };
};
export const deleteSavedQueryAction = (index: number): AppAction => {
  return { type: ActionTypes.DELETE_SAVED_QUERY, payload: index };
};
export const saveQueryAction = (state: AppState, d: DataFilters): AppAction => {
  // console.log(JSON.stringify(d.numericFilters));
  return {
    type: ActionTypes.SAVE_QUERY,
    payload: {
      df: { ...d },
      name: `Query ${state.savedQueries.savedQueries.length}`,
      isEdit: false,
    },
  };
};

export const connectToYahooAction = async (
  state: AppState
): Promise<AppAction> => {
  const yahooData = await getInitYahooData();
  console.log(yahooData);

  const queryParameters = new URLSearchParams(window.location.search);
  const session = queryParameters.get('code');
  window.history.replaceState({}, document.title, `/?session=${session}`);

  const isYahooDataType = (input: any): input is YahooResponseData => {
    return input.userInfo !== undefined;
  };

  if (!isYahooDataType(yahooData)) {
    console.log(yahooData.errorMessage);
    return {
      type: ActionTypes.SET_APP_ERROR,
      payload: yahooData,
    };
  } else {
    return {
      type: ActionTypes.CONNECT_TO_YAHOO,
      payload: {
        yc: {
          hasCode: true,
          isFulllyConnected: yahooData !== undefined,
          yahooResponseData: yahooData,
        },
      },
    };
  }
};

export const resumeYahooSessionAction = async (
  state: AppState
): Promise<AppAction> => {
  const yahooData = await getResumeSessionYahooData();
  console.log(yahooData);
  const isYahooDataType = (input: any): input is YahooResponseData => {
    return input.userInfo !== undefined;
  };

  if (!isYahooDataType(yahooData)) {
    console.log(yahooData.errorMessage);
    return {
      type: ActionTypes.SET_APP_ERROR,
      payload: yahooData,
    };
  } else {
    return {
      type: ActionTypes.CONNECT_TO_YAHOO,
      payload: {
        yc: {
          hasCode: true,
          isFulllyConnected: yahooData !== undefined,
          yahooResponseData: yahooData,
        },
      },
    };
  }
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

  if (Array.isArray(res)) {
    const sliced = res?.slice(0, 200);
    return {
      type: ActionTypes.FETCH_PLAYER_STATS,
      payload: sliced,
    };
  } else {
    return {
      type: ActionTypes.SET_APP_ERROR,
      payload: res,
    };
  }
};
