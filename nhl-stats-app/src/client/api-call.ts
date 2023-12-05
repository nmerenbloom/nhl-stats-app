import axios from 'axios';
import { PlayerStats } from '../types/player-stats';
import { DataFilters, NumericFilterObj } from '../types/data-filter';

export const getAuth = async () => {
  // try {
  //   const x = await axios.get(`${getDomain()}/auth/yahoo`);
  //   console.log(x);
  // } catch (error) {
  //   console.log(error);
  // }
  const redirectUri = 'https://nhl-stats-client.web.app/';
  window.location.href = `https://api.login.yahoo.com/oauth2/request_auth_fe?client_id=dj0yJmk9WHU1anpzbnlVeXJNJmQ9WVdrOWNHMXhlWFpKTjNFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTI4&response_type=code&redirect_uri=${redirectUri}`;
};

export const getMeta = async () => {
  try {
    const x = await axios.get(`${getDomain()}/meta`);
    console.log(x);
  } catch (error) {
    console.log(error);
  }
};

export const sendTest = async () => {
  try {
    const x = await axios.get(`${getDomain()}/test`);
    console.log(x);
  } catch (error) {
    console.log(error);
  }
};

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

export const getYahooFantasyData = async () => {
  try {
    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get('code');
    // console.log(code);
    const x = await axios.post(`${getDomain()}/dashboard`, { code: code });
    console.log(x.data);
    return x.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSkaterStats = async (
  f: DataFilters
): Promise<PlayerStats[]> => {
  try {
    const allSkatersRes = await axios.post(`${getDomain()}/skaters-query`, {
      ...f,
      numericFilters: f.numericFilters.filter((n) => n.value !== undefined),
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
  switch (env) {
    case 'development':
      return 'http://127.0.0.1:5001/functions-example-f0714/us-central1/api';
    case 'production':
      return 'https://api-hyjndipoca-uc.a.run.app';
    default:
      return '';
  }
};
