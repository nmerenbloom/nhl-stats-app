import { PAGE_SIZE } from '../../types/constants';
import { useCustomContext } from '../state-management/app-context';
import { Pagination } from './pagination';

export const PlayerGrid = () => {
  const { state, dispatch } = useCustomContext();

  const indexStart = state.pagination.currPage * PAGE_SIZE - PAGE_SIZE;
  const indexEnd = state.pagination.currPage * PAGE_SIZE;

  const playserSlice = state?.playerStats?.allPlayers?.slice(
    indexStart,
    indexEnd
  );

  return (
    <div className='container'>
      <table className=' table table-striped'>
        <thead>
          <th>index+1</th>
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
          {playserSlice.map((p) => {
            const row = (
              <tr key={p.id}>
                <td>{p.id + 1}</td>
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
