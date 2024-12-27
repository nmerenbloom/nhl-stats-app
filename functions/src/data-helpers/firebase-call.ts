import axios from 'axios';
import { FIREBASE_TOKEN_OBJ_PROPS, FirebaseTokenObj } from '../types/firebase';
import { refreshAccessTokenFromYahoo } from './yahoo-call';

const FIREBASE_RT_DATABSE_URL =
  'https://functions-example-f0714-default-rtdb.firebaseio.com/tokens.json';

const yahooConsumerKey =
  'dj0yJmk9NjVFb2ttZ25WOThNJmQ9WVdrOVpHSmtjMXBLU2pjbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTA3';
const yahooConsumerSecret = '760c036befb96a9db85a72b3e525b215eb342cb5';

export const storeToken = async (
  token: string,
  refresh_token: string,
  email: string,
  session_code: string,
  league_key: string
): Promise<{ name: string }> => {
  const body: FirebaseTokenObj = {
    user: email,
    session: session_code,
    t: token,
    refresh_token: refresh_token,
    league_key: league_key,
    timeStamp: Date.now(),
  };
  // console.log(body);
  const rez = await axios.post(FIREBASE_RT_DATABSE_URL, body);
  return rez.data;
};

export const getToken = async (
  session_code: string
): Promise<FirebaseTokenObj | undefined> => {
  console.log(`getting sessionCode ${session_code}`);
  const rez = await axios.get(FIREBASE_RT_DATABSE_URL);
  const rawData = rez.data;

  let existingFirebaseTokenObj: FirebaseTokenObj | undefined = undefined;
  let existingFirebaseTokenObjKey: string = '';

  for (const key in rawData) {
    //iterate over object of firebase objects
    if (rawData[key].session === session_code) {
      existingFirebaseTokenObj = rawData[key];
      existingFirebaseTokenObjKey = key;
    }
  }

  if (!existingFirebaseTokenObj) {
    // check if object was found
    throw new Error('Could not find session info. Recconect to Yahoo.');
  }

  FIREBASE_TOKEN_OBJ_PROPS.forEach((prop) => {
    const currVal = existingFirebaseTokenObj![prop];
    if (currVal === undefined || currVal === null) {
      const e = new Error(`'${prop}' missing for session ${session_code}`);
      e.name = 'E1';
      throw e;
    }
  });

  if (isYahooAccessTokenExpired(existingFirebaseTokenObj)) {
    console.log(`session ${session_code} expired- refreshing now!`);
    //get a new token
    const newTokenInfo = await refreshAccessTokenFromYahoo(
      existingFirebaseTokenObj.refresh_token,
      yahooConsumerKey,
      yahooConsumerSecret
    );
    if (newTokenInfo.error) {
      throw new Error(`${newTokenInfo.error}`);
    }
    const { user, session, league_key } = existingFirebaseTokenObj;

    await storeToken(
      newTokenInfo.access_token,
      newTokenInfo.refresh_token,
      user,
      session,
      league_key
    );

    const newFirebaseTokenObj: FirebaseTokenObj = {
      user: user,
      session: session,
      t: newTokenInfo.access_token,
      refresh_token: newTokenInfo.refresh_token,
      league_key,
      timeStamp: Date.now(),
    };

    //delete the firebase obj holding the old token
    const url = `https://functions-example-f0714-default-rtdb.firebaseio.com/tokens/${existingFirebaseTokenObjKey}.json`;
    await axios.delete(url);

    return newFirebaseTokenObj;
    // return the new token to be used in Yahoo API calls;
  }
  return existingFirebaseTokenObj;
};

export const cleanTokens = async () => {
  const rez = await axios.get(FIREBASE_RT_DATABSE_URL);
  const rawData = rez.data;
  let entries = [];
  for (const key in rawData) {
    entries.push({ key: key, firebaseTokenObj: rawData[key] });
  }

  const expiredTokens = entries.filter((o) => {
    const now = Date.now();
    const diff = now - o.firebaseTokenObj.timeStamp;
    return diff >= 3600000;
  });

  expiredTokens.forEach(async (o) => {
    // console.log(o.key);
    const url = `https://functions-example-f0714-default-rtdb.firebaseio.com/tokens/${o.key}.json`;
    await axios.delete(url);
  });
  return 'done';
};

const isYahooAccessTokenExpired = (fto: FirebaseTokenObj): boolean => {
  const now = Date.now();
  const diff = now - fto.timeStamp;
  return diff >= 3600000;
};
