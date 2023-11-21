import { PlayerStats } from '../../types/player-stats';
import { useCustomContext } from '../state-management/app-context';
import { Pagination } from './pagination';

export const PlayerGrid = () => {
  const { state, dispatch } = useCustomContext();

  // const playserSlice = state?.playerStats ?? [];

  return (
    <div className='container'>
      <table className=' table table-striped'>
        <thead>
          <th>Player</th>
          <th>GP</th>
          <th>Goals</th>
          <th>Assists</th>
          <th>Points</th>
          <th>SOG</th>
          <th>Hits</th>
          <th>Blocks</th>
        </thead>
        <tbody>
          {state?.playerStats?.allPlayers?.slice(0, 26).map((p) => {
            const row = (
              <tr>
                <td>{p.player}</td>
                <td>{p.gp}</td>
                <td>{p.goals}</td>
                <td>{p.assists}</td>
                <td>{p.points}</td>
                <td>{p.shots}</td>
                <td>{p.hits}</td>
                <td>{p.blocks}</td>
              </tr>
            );
            return row;
          })}
        </tbody>
      </table>
      <Pagination></Pagination>
    </div>
  );
};
