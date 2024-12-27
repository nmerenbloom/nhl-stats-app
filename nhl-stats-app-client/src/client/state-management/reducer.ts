import { PAGE_SIZE, StatCategories } from '../../types/constants';
import { NumericFilterObj, SortOrderObj } from '../../types/data-filter';
import { AppState } from '../../types/state';
import { ActionTypes, AppAction } from './actions';

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case ActionTypes.DELETE_SAVED_QUERY:
      let currSavedQueriesArr0 = state.savedQueries.savedQueries;
      currSavedQueriesArr0.splice(action.payload, 1);
      return {
        ...state,
        savedQueries: {
          ...state.savedQueries,
          savedQueries: currSavedQueriesArr0,
        },
      };
    case ActionTypes.EDIT_SAVED_QUERY:
      let currSavedQueriesArr1 = state.savedQueries.savedQueries;
      currSavedQueriesArr1.splice(
        action.payload.index,
        1,
        action.payload.query
      );
      return {
        ...state,
        savedQueries: {
          ...state.savedQueries,
          savedQueries: currSavedQueriesArr1,
        },
      };
    case ActionTypes.SELECT_SAVED_QUERY:
      const dfToSet = { ...state }.savedQueries.savedQueries[action.payload].df;

      return {
        ...state,
        savedQueries: { ...state.savedQueries, selectedIndex: action.payload },
        dataFilters: dfToSet,
        showGoToolTip: true,
      };
    case ActionTypes.SAVE_QUERY:
      const jsonData = JSON.stringify(action.payload);

      const n: AppState = {
        ...state,
        savedQueries: {
          savedQueries: [...state.savedQueries.savedQueries].concat([
            JSON.parse(jsonData),
          ]),
          selectedIndex: state.savedQueries.savedQueries.length,
        },
      };
      return n;
    case ActionTypes.FETCH_PLAYER_STATS:
      const totalPages = Math.ceil(action.payload.length / PAGE_SIZE);
      return {
        ...state,
        playerStats: {
          ...state.playerStats,
          allPlayers: action.payload,
        },
        isLoading: false,
        pagination: { totalPages: totalPages, currPage: 1 },
        showGoToolTip: false,
        appError: undefined,
      };
    case ActionTypes.PAGINATE:
      return {
        ...state,
        pagination: { ...state.pagination, currPage: action.payload },
      };
    case ActionTypes.TOGGLE_LOADING_SPINNER:
      return { ...state, isLoading: action.payload };
    case ActionTypes.EDIT_DATA_FILTERS:
      return {
        ...state,
        dataFilters: action.payload,
        savedQueries: { ...state.savedQueries, selectedIndex: undefined },
        showGoToolTip: true,
      };
    case ActionTypes.CONNECT_TO_YAHOO:
      return {
        ...state,
        yahooConnection: action.payload.yc,
        isLoading: false,

        appError: undefined,
      };
    case ActionTypes.SET_APP_ERROR:
      return {
        ...state,
        appError: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

// INIT STATE
const initNumericFilters: NumericFilterObj[] = Object.values(
  StatCategories
).map((statCat) => {
  return {
    stat: statCat,
    operator: statCat === StatCategories.TEAM ? '=' : '>',
    value: undefined,
  };
});

let initStatsSortOrder = [
  StatCategories.POINTS,
  StatCategories.GOALS,
  StatCategories.ASSISTS,
  StatCategories.SHOTS_ON_GOAL,
  StatCategories.HITS,
  StatCategories.BLOCKS,
  StatCategories.GAMES_PLAYED,
];
const initSortOrder: SortOrderObj[] = initStatsSortOrder.map((statCat) => {
  return { stat: statCat, digitsPastDecimalPoint: 2 };
});

export const initialState: AppState = {
  isLoading: false,
  yahooConnection: {
    hasCode: false,
    isFulllyConnected: false,
    yahooResponseData: undefined,
  },
  playerStats: { allPlayers: [] },
  pagination: { currPage: 1, totalPages: 0 },
  showGoToolTip: false,
  dataFilters: {
    showOnlyAvailableSkaters: false,
    isAverages: false,
    numericFilters: initNumericFilters,
    sortOrder: initSortOrder,
  },
  savedQueries: { savedQueries: [], selectedIndex: undefined },
};
