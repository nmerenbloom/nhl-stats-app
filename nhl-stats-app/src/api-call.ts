import axios from 'axios';
import { PLAYER_STATS_URL } from './types/constants';
import { PlayerStats } from './types/player-stats';

// export const getSkaterStats = async (): Promise<PlayerStats[]> => {
//   try {
//     const playStatsResponse = await axios.get('/ahoy');
//     return playStatsResponse.data;
//   } catch (error) {
//     console.log('Error fetching player stats');
//     return [];
//   }
// };

export const getSkaterStats = async (): Promise<PlayerStats[]> => {
  try {
    const testStringRes = await axios.get('https://helloworld-hyjndipoca-uc.a.run.app/')
    // console.log(testStringRes)
    return testStringRes.data;
  } catch (error) {
    console.log('Error fetching player stats');
    return [];
  }
};

export const getSkaterStatsNoCors = async (): Promise<PlayerStats[]> => {
  try {
    const testStringRes = await axios.get('https://helloworldNoCors-hyjndipoca-uc.a.run.app/')
    // console.log(testStringRes)
    return testStringRes.data;
  } catch (error) {
    console.log('Error fetching player stats');
    return [];
  }
};

