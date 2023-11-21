import React, { useEffect, useReducer } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.css';
import { getSkaterStats, getSkaterStatsNoCors } from '../api-call';
import CustomContext from './state-management/app-context';
import { initialState, reducer } from './state-management/reducer';
import { PlayerGrid } from './components/player-grid';
import { LoadingSpinner } from './components/loading-spinner';
import { ActionTypes } from './state-management/actions';
import PyScript, { PyScriptProvider } from 'pyscript-react';

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  // const gsd = async () => {
  //   const res = await getSkaterStats();
  //   if (res) {
  //     dispatch({ type: ActionTypes.SET_PLAYER_STATS, payload: res });
  //   }
  // };
  // gsd();
  // }, []);

  const onFetchPlayersBtnClick = async () => {
    dispatch({ type: ActionTypes.TOGGLE_LOADING_SPINNER, payload: true });
    const res = await getSkaterStats();
    // const res = await getTestString();
    if (res) {
      // console.log(res)
      dispatch({ type: ActionTypes.FETCH_PLAYER_STATS, payload: res });
    } else {
      alert('Error Fetching Players. Try Again');
    }
  };

  const onFetchPlayersBtnClickNoCors = async () => {
    dispatch({ type: ActionTypes.TOGGLE_LOADING_SPINNER, payload: true });
    const res = await getSkaterStatsNoCors();
    // const res = await getTestString();
    if (res) {
      // console.log(res)
      dispatch({ type: ActionTypes.FETCH_PLAYER_STATS, payload: res });
    } else {
      alert('Error Fetching Players. Try Again');
    }
  };

  const stateManagementProviderValues = { state, dispatch };

  return (
    <CustomContext.Provider value={stateManagementProviderValues}>
      <div className='container d-flex flex-column align-items-center justify-content-center'>
        <h1 className='text-center my-4'>NHL Player Stats</h1>
        {state?.playerStats?.allPlayers?.length === 0 ? (
          <button
            onClick={() => onFetchPlayersBtnClickNoCors()}
            className='btn btn-warning w-25'
          >
            Fetch Player Stats! NO CORS
          </button>
        ) : (
          <PlayerGrid></PlayerGrid>
        )}
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
