import { getYahooSignUrl } from '../api-call';
import {
  // connectYahooAction,
  toggleSpinnerAction,
} from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';

export const YahooConnectButton = () => {
  const { state, dispatch } = useCustomContext();

  const isYahooConnected = state?.yahooConnection?.isFulllyConnected;
  const leagueData = state?.yahooConnection?.yahooResponseData?.LK;
  const leagueFound = leagueData?.leagueFound ?? false;

  return (
    <div className='d-flex justify-content-between'>
      {!isYahooConnected ? <div></div> : null}
      <div>
        {isYahooConnected ? (
          <div className='d-flex flex-column'>
            <p>
              Hello,{' '}
              <b className='purp-text'>
                {state?.yahooConnection?.yahooResponseData?.userInfo?.email ??
                  'Email Not Found'}
              </b>
            </p>
            <p className='fw-light'>
              {leagueFound
                ? leagueData?.leaguesArr[0].leagueName
                : 'No League Found'}
            </p>
          </div>
        ) : (
          <button
            onClick={async () => {
              dispatch(toggleSpinnerAction(true));
              await getYahooSignUrl();
              // redirects to Yahoo Sign in Page
            }}
            className='btn purp my-1'
          >
            Connect to Yahoo!
          </button>
        )}
      </div>
      {isYahooConnected && !state.appError ? (
        <b className='purp-text'>Connected to Yahoo!</b>
      ) : null}
      {/* {state.appError ? (
        <p className='red-text w-50'>{state.appError?.errorMessage}</p>
      ) : null} */}
    </div>
  );
};
