import axios from 'axios';
import { PlayerStats } from '../types/player-stats';
import { DataFilters } from '../types/data-filter';

// export const getSkaterStats = async (): Promise<PlayerStats[]> => {
//   try {
//     const allSkatersRes = await axios.get(`${getDomain()}/all-skaters`);
//     return allSkatersRes.data;
//   } catch (error: any) {
//     console.log('Error fetching player stats');
//     console.error(error);
//     return [];
//   }
// };
export const getSkaterStats = async (
  f: DataFilters
): Promise<PlayerStats[]> => {
  try {
    const allSkatersRes = await axios.post(`${getDomain()}/skaters-query`, {
      ...f,
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
