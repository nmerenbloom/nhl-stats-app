import { useState } from 'react';
import { StatCategories } from '../../types/constants';
import { NumericFilterObj } from '../../types/data-filter';
import { editFiltersAction } from '../state-management/actions';
import { useCustomContext } from '../state-management/app-context';

export const NumbericFilterDropdown = () => {
  const { state, dispatch } = useCustomContext();

  const handleValueInput = (
    n: string | number | undefined,
    currNfo: NumericFilterObj,
    indx: number
  ) => {
    let newValue = n;
    if (currNfo.stat === StatCategories.TEAM) {
      newValue = (newValue as string).trim();
      newValue = newValue === '' ? undefined : newValue;
    }

    const newFilter: NumericFilterObj = {
      stat: currNfo.stat,
      operator: currNfo.operator,
      value: newValue,
    };

    let newNfosArr = { ...state }.dataFilters.numericFilters;
    newNfosArr[indx] = newFilter;
    dispatch(
      editFiltersAction({
        ...state.dataFilters,
        numericFilters: newNfosArr,
      })
    );
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
        Numeric Filters
      </button>
      <div className='dropdown-menu p-2' style={{ minWidth: '275px' }}>
        {state.dataFilters.numericFilters.map((nfo, i) => {
          return (
            <div
              key={i}
              className='d-flex flex-row-reverse align-items-center my-1'
            >
              <div className='w-50'>
                <input
                  value={nfo.value ?? ''}
                  onChange={(e) => handleValueInput(e.target.value, nfo, i)}
                  className='form-control'
                  type={nfo.stat === StatCategories.TEAM ? '' : 'number'}
                ></input>
              </div>
              <div
                className='alert w-25 alert-primary text-center mx-1 my-0 py-1 px-2'
                role='alert'
              >
                {nfo.operator}
              </div>
              <div className=''>
                <p className='my-0 text-start'>{nfo.stat.toUpperCase()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
