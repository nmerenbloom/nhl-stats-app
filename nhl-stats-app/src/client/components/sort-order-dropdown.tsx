import { useCustomContext } from '../state-management/app-context';
import { editFiltersAction } from '../state-management/actions';
import { Reorder, useDragControls } from 'framer-motion';
import { ReorderIcon } from './drag-icon';
import { StatCategories } from '../../types/constants';

export const SortOrderDropdown = () => {
  const { state, dispatch } = useCustomContext();

  const controls = useDragControls();

  const dropDownValues = state.dataFilters.sortOrder;

  return (
    <div className='dropdown'>
      <button
        className='btn btn-outline-light dropdown-toggle'
        type='button'
        id='dropdownMenuButton1'
        data-bs-toggle='dropdown'
        data-bs-auto-close='outside'
        aria-expanded='false'
      >
        Edit Sort Order
      </button>
      <div className='dropdown-menu p-2 text-muted'>
        <div className='d-flex flex-column'>
          <Reorder.Group
            className='m-0 ps-4'
            as='ol'
            axis='y'
            values={dropDownValues}
            onReorder={(newSortOrder) => {
              dispatch(
                editFiltersAction({
                  ...state.dataFilters,
                  sortOrder: newSortOrder,
                })
              );
            }}
          >
            {dropDownValues.map((item) => (
              <Reorder.Item
                className='rounded-2 fs-5 border my-2 me-1 custom-list-item'
                key={item}
                value={item}
              >
                <div className='d-flex justify-content-between align-items-center px-1'>
                  {item.toUpperCase()}
                  <ReorderIcon dragControls={controls}></ReorderIcon>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};
