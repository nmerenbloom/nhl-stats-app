import { AppState } from '../../types/state';
import { Action, ActionTypes } from './actions';

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.FETCH_PLAYER_STATS:
      const totalPages = Math.ceil(action.payload.length / 25);
      const indexStart = 0;
      const indexEnd = 25;
      return {
        ...state,
        playerStats: {
          allPlayers: action.payload,
          onGrid: action.payload?.slice(indexStart, indexEnd),
        },
        isLoading: false,
        pagination: { totalPages: totalPages, currPage: 1 },
      };
    case ActionTypes.TOGGLE_LOADING_SPINNER:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const initialState: AppState = {
  isLoading: false,
  playerStats: { allPlayers: [], onGrid: [] },
  pagination: { currPage: 1, totalPages: 1 },
};
