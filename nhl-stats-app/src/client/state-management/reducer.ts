import { PAGE_SIZE } from '../../types/constants';
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
      };
    case ActionTypes.PAGINATE:
      return {
        ...state,
        pagination: { ...state.pagination, currPage: action.payload },
      };
    case ActionTypes.TOGGLE_LOADING_SPINNER:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export const initialState: AppState = {
  isLoading: false,
  playerStats: { allPlayers: [] },
  pagination: { currPage: 1, totalPages: 1 },
};
