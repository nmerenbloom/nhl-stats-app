import { PAGE_SIZE, StatCategories } from '../../types/constants';
import { NumericFilterObj } from '../../types/data-filter';
import { AppState } from '../../types/state';
import { ActionTypes, AppAction } from './actions';

export const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
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
      };
    case ActionTypes.PAGINATE:
      return {
        ...state,
        pagination: { ...state.pagination, currPage: action.payload },
      };
    case ActionTypes.TOGGLE_LOADING_SPINNER:
      return { ...state, isLoading: action.payload };
    case ActionTypes.EDIT_DATA_FILTERS:
      // console.log(action.payload);
      return {
        ...state,
        dataFilters: action.payload,
        showGoToolTip: true,
      };

    default:
      return state;
  }
};

// const initCategories = Object.values(StatCategories);
const initNumericFilters: NumericFilterObj[] = Object.values(
  StatCategories
).map((statCat) => {
  return {
    stat: statCat,
    operator: statCat === StatCategories.TEAM ? '=' : '>',
    value: undefined,
  };
});
export const initialState: AppState = {
  isLoading: false,
  playerStats: { allPlayers: [] },
  pagination: { currPage: 1, totalPages: 0 },
  showGoToolTip: false,
  dataFilters: {
    isAverages: false,
    numericFilters: initNumericFilters,
    sortOrder: Object.values(StatCategories),
  },
};
