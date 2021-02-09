import { useCallback, useMemo, useState } from 'react';
import { IQueryPageInfo, IQueryPaginationInput } from '../../apollo/types/apollo-hooks.interface';
import { IDataTablePaginationProps } from '../components/DataTable';

const ROWS_PER_PAGE_OPTIONS = [1, 10, 20, 30, 50, 100];

export interface IUsePaginationProps {
  pageInfo: IQueryPageInfo;
  pageSize?: number;
  totalCount?: number;
}

export type IUsePagination = [IQueryPaginationInput, IDataTablePaginationProps];

export const usePagination = ({
  pageSize = ROWS_PER_PAGE_OPTIONS[0],
  pageInfo = {},
  totalCount = -1,
}: IUsePaginationProps): IUsePagination => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pageSize);
  const [paginationState, setPagination] = useState<IQueryPaginationInput>({ first: rowsPerPage });

  const next = useCallback(
    (page: number) => {
      setPage(page);
      setPagination({ first: rowsPerPage, after: pageInfo.endCursor });
    },
    [pageInfo.endCursor, rowsPerPage]
  );

  const previous = useCallback(
    (page: number) => {
      setPage(page);
      setPagination({ last: rowsPerPage, before: pageInfo.startCursor });
    },
    [pageInfo.startCursor, rowsPerPage]
  );

  const onChangePage = useCallback(
    (_e, newPage) => {
      if (newPage > page) {
        return next(newPage);
      }
      return previous(newPage);
    },
    [next, page, previous]
  );

  const onChangeRowsPerPage = useCallback((e) => {
    const newOption = e.target.value;
    setPage(0);
    setRowsPerPage(newOption);
    setPagination({ first: newOption });
  }, []);

  const backIconButtonProps = useMemo(() => ({ disabled: !pageInfo.hasPreviousPage }), [pageInfo.hasPreviousPage]);
  const nextIconButtonProps = useMemo(() => ({ disabled: !pageInfo.hasNextPage }), [pageInfo.hasNextPage]);

  const paginationProps = useMemo(
    () => ({
      backIconButtonProps,
      nextIconButtonProps,
      page,
      count: totalCount,
      rowsPerPage,
      onChangePage,
      onChangeRowsPerPage,
      rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
    }),
    [backIconButtonProps, nextIconButtonProps, onChangePage, onChangeRowsPerPage, page, rowsPerPage, totalCount]
  );

  return [paginationState, paginationProps];
};
