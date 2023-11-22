import { useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import CustomContext from './state-management/app-context';
import { initialState, reducer } from './state-management/reducer';
import { PlayerGrid } from './components/player-grid';
import { LoadingSpinner } from './components/loading-spinner';
import {
  fetchPlayersAction,
  toggleSpinnerAction,
} from './state-management/actions';
import { PAGE_SIZE } from '../types/constants';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFetchPlayersBtnClick = async () => {
    dispatch(toggleSpinnerAction(true));
    dispatch(await fetchPlayersAction(state));
  };

  const stateManagementProviderValues = { state, dispatch };

  return (
    <CustomContext.Provider value={stateManagementProviderValues}>
      <div className='container d-flex flex-column align-items-center justify-content-center'>
        <h1 className='text-center my-4'>NHL Player Stats</h1>
        {state?.playerStats?.allPlayers?.length === 0 ? (
          <button
            onClick={() => onFetchPlayersBtnClick()}
            className='btn btn-primary w-25'
          >
            Fetch Player Stats!
          </button>
        ) : (
          <PlayerGrid></PlayerGrid>
        )}
        <div> {state?.isLoading ? <LoadingSpinner /> : null}</div>
      </div>
    </CustomContext.Provider>
  );
};
