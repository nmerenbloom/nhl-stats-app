import axios from 'axios';
import { PlayerStats } from '../types/player-stats';
import { DataFilters, NumericFilterObj } from '../types/data-filter';
import { AppError } from '../types/app-error';
import { YahooResponseData } from '../types/yahoo-connection';

// export const sendTest = async () => {
//   try {
//     const x = await axios.get(`${getDomain()}/test`);
//     console.log(x);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getYahooSignUrl = async () => {
  try {
    const x = await axios.get(`${getDomain()}/signin`);
    console.log(x.data);
    window.location.href = x.data;
    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get('code');
    console.log(code);
  } catch (error) {
    console.log(error);
  }
};

export const getInitYahooData = async (): Promise<
  YahooResponseData | AppError
> => {
  try {
    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get('code');
    // console.log(code);
    const x = await axios.post(`${getDomain()}/init-yahoo`, { code: code });
    // console.log(x.data);
    return x.data;
  } catch (error) {
    console.log(error);
    return { errorMessage: 'Error Initializing Yahoo! Connection' };
  }
};

export const getResumeSessionYahooData = async (): Promise<
  YahooResponseData | AppError
> => {
  try {
    const queryParameters = new URLSearchParams(window.location.search);
    const session = queryParameters.get('session');
    const x = await axios.post(`${getDomain()}/resume-session`, {
      session: session,
    });

    return x.data;
  } catch (error) {
    console.log(error);
    return { errorMessage: 'Error Resuming Yahoo! Connection' };
  }
};

export const getSkaterStats = async (
  f: DataFilters
): Promise<PlayerStats[] | AppError> => {
  try {
    const queryParameters = new URLSearchParams(window.location.search);
    const session = queryParameters.get('session');
    const allSkatersRes = await axios.post(`${getDomain()}/skaters-query`, {
      ...f,
      numericFilters: f.numericFilters.filter((n) => n.value !== undefined),
      session: session,
    });
    return allSkatersRes.data;
  } catch (error: any) {
    console.log('Error fetching player stats');
    console.error(error);
    return [];
  }
};

const getDomain = (): string => {
  const env = process.env.NODE_ENV;
  console.log(env);
  switch (env) {
    case 'development':
      return 'http://127.0.0.1:5001/functions-example-f0714/us-central1/api';
    case 'production':
      return 'https://us-central1-functions-example-f0714.cloudfunctions.net/api';
    default:
      return '';
  }
};
