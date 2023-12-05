import { useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import CustomContext from './state-management/app-context';
import { initialState, reducer } from './state-management/reducer';
import { PlayerGrid } from './components/player-grid';
import { LoadingSpinner } from './components/loading-spinner';
import {
  fetchPlayersAction,
  getYahooFantasyDataAction,
  toggleSpinnerAction,
} from './state-management/actions';
import { PAGE_SIZE } from '../types/constants';
import { getAuth, getMeta, sendTest } from './api-call';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateManagementProviderValues = { state, dispatch };

  useEffect(() => {
    const checkForCode = async () => {
      const queryParameters = new URLSearchParams(window.location.search);
      const code = queryParameters.get('code');
      if (code && !state.yahooConnection?.isFulllyConnected) {
        dispatch(await getYahooFantasyDataAction());
      }
    };

    checkForCode();
  }, []);
  // const name = queryParameters.get('name');
  // const handleAuthClick = () => {
  //   const authRez =
  // }

  return (
    <CustomContext.Provider value={stateManagementProviderValues}>
      <div className='container d-flex py-2 flex-column align-items-center justify-content-center'>
        {/* <div className='d-flex w-50 flex-row-reverse justify-content-between '> */}

        <h1 className='text-center my-4 align-self-center'>NHL Player Stats</h1>
        {/* </div> */}

        {/* <p>{code}</p> */}

        <PlayerGrid></PlayerGrid>
        <div> {state?.isLoading ? <LoadingSpinner /> : null}</div>
      </div>
    </CustomContext.Provider>
  );
};
