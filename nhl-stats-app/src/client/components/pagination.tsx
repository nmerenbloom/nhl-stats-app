import { useCustomContext } from '../state-management/app-context';

export const Pagination = () => {
  const { state, dispatch } = useCustomContext();

  const pages = state?.pagination?.totalPages ?? 1;
  let pagesArr = [];
  for (let i = 0; i <= pages; i++) {
    pagesArr[i] = i + 1;
  }
  return (
    <div className='d-flex justify-content-center'>
      {pagesArr.map((n) => {
        return (
          <p
            className={`${
              state?.pagination?.currPage === n ? 'selected-page' : ''
            } mx-2 text-primary text-underline-hover`}
          >
            {n}
          </p>
        );
      })}
    </div>
  );
};
