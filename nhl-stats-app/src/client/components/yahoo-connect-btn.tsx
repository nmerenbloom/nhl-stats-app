import { getYahooSignUrl } from '../api-call';
import {
  // connectYahooAction,
  toggleSpinnerAction,
} from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';

export const YahooConnectButton = () => {
  const { state, dispatch } = useCustomContext();

  return (
    <div>
      {!state?.yahooConnection?.isFulllyConnected ? (
        <button
          onClick={async () => {
            dispatch(toggleSpinnerAction(true));
            await getYahooSignUrl();
            // redirects to Yahoo Sign in Page
          }}
          className='btn purp my-1'
        >
          Connect to Yahoo
        </button>
      ) : null}
    </div>
  );
};
