import { useCustomContext } from '../state-management/app-context';
import { editFiltersAction } from '../state-management/actions';
import { Reorder, useDragControls } from 'framer-motion';
import { ReorderIcon } from './drag-icon';
import { StatCategories } from '../../types/constants';

export const SortOrderDropdown = () => {
  const { state, dispatch } = useCustomContext();

  const controls = useDragControls();

  const dropDownValues = state.dataFilters.sortOrder;

  const handlePlacesPastDecimalChange = (n: string, idx: number) => {
    let newNumber = parseInt(n);
    if (n === undefined || n === null) {
      newNumber = 0;
    }
    if (parseInt(n) > 3) {
      newNumber = 3;
    }

    const curr = state.dataFilters.sortOrder;
    curr[idx].digitsPastDecimalPoint = newNumber;

    dispatch(editFiltersAction({ ...state.dataFilters, sortOrder: curr }));
  };

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
        Sorting/Rounding
      </button>
      <div className='dropdown-menu p-2 text-muted' style={{ width: '325px' }}>
        <div className='d-flex justify-content-between align-items-center mx-3 px-1 '>
          <b>
            <u>Category</u>
          </b>
          <b>
            <u>Places Past Decimal</u>
          </b>
        </div>

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
            {dropDownValues.map((item, i) => (
              <Reorder.Item
                className='rounded-2 fs-5 border my-2 me-1 custom-list-item'
                key={item.stat}
                value={item}
              >
                <div className='d-flex justify-content-between'>
                  {/* <div className='d-flex flex-row-reverse align-items-center px-1'> */}
                  {/* {item.stat?.toUpperCase() ?? 'ERR'} */}

                  <div className='d-flex align-items-center'>
                    <div className='ms-1'>
                      {item.stat?.toUpperCase() ?? 'ERR'}
                    </div>
                  </div>

                  <div className='d-flex flex-row-reverse flex-grow align-items-center px-1'>
                    <div className='mx-2 '>
                      <ReorderIcon dragControls={controls}></ReorderIcon>{' '}
                    </div>

                    <input
                      className='form-control w-75 mx-2'
                      type='number'
                      value={item.digitsPastDecimalPoint}
                      min={0}
                      max={3}
                      name=''
                      id=''
                      onChange={(e) => {
                        handlePlacesPastDecimalChange(e.target.value, i);
                      }}
                      // onKeyDown={(e) => e.preventDefault()}
                      onClick={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                    />
                  </div>

                  {/* <ReorderIcon dragControls={controls}></ReorderIcon> */}
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
};
