import { useEffect, useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import CustomContext from './state-management/app-context';
import { initialState, reducer } from './state-management/reducer';
import { PlayerGrid } from './components/player-grid';
import { LoadingSpinner } from './components/loading-spinner';
import {
  connectToYahooAction,
  toggleSpinnerAction,
} from './state-management/actions';
import { Banner } from './components/banner';
import { SavedQueries } from './components/saved-queries';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stateManagementProviderValues = { state, dispatch };

  useEffect(() => {
    const checkForCode = async () => {
      const queryParameters = new URLSearchParams(window.location.search);
      const code = queryParameters.get('code');
      if (code && !state.yahooConnection?.isFulllyConnected) {
        dispatch(toggleSpinnerAction(true));
        dispatch(await connectToYahooAction(state));
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
      <div className='bg-light'>
        <Banner />
        <div className='d-flex p-4 m-4 '>
          <div className='p-3 w-25 '>
            <h2 className='text-center my-4 align-self-center'>
              Saved Queries
            </h2>
            <hr className='mx-4' />
            <SavedQueries />
          </div>
          <div className='p-3 border border-secondary w-75 bg-white rounded'>
            <h2 className='text-center my-4 align-self-center'>
              NHL Player Stats
            </h2>
            <hr className='mx-4' />
            <h5 className='red-text'>{state?.appError?.errorMessage ?? ''}</h5>
            <PlayerGrid />
          </div>
        </div>
        <div> {state?.isLoading ? <LoadingSpinner /> : null}</div>
      </div>
    </CustomContext.Provider>
  );
};
