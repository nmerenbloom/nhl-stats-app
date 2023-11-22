import { StatCategories } from '../../types/constants';
import { useCustomContext } from '../state-management/app-context';

export const SortOrderDropdown = () => {
  const { state, dispatch } = useCustomContext();

  return (
    <div className='dropdown'>
      <button
        className='btn btn-secondary dropdown-toggle'
        type='button'
        id='dropdownMenuButton1'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        Dropdown button
      </button>
      <div className='dropdown-menu p-2 text-muted'>
        <div className='d-flex flex-column'>
          <ul className='list-group'>
            {state.dataFilters.sortOrder.map((c) => {
              return <li className='list-group-item'>{c}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
