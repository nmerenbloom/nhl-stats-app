import axios from 'axios';
import { PlayerStats } from '../types/player-stats';

export const getSkaterStats = async (): Promise<PlayerStats[]> => {
  try {
    const testStringRes = await axios.get(
      'https://helloworld-hyjndipoca-uc.a.run.app/'
    );
    return testStringRes.data;
  } catch (error: any) {
    console.log('Error fetching player stats');
    console.error(error);
    return [];
  }
};
