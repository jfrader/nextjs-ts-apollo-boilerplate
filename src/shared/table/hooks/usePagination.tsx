import { useCallback, useMemo, useState } from 'react';
import { IQueryPageInfo, IQueryPaginationInput } from '../../types/apollo-hooks.interface';
import { IDataTablePaginationProps } from '../components/DataTable';

const ROWS_PER_PAGE_OPTIONS = [1, 10, 20, 30, 50, 100];

export interface IUsePaginationProps {
  pageInfo: IQueryPageInfo;
  pageSize?: number;
  totalCount?: number;
}

export type IUsePagination = [IQueryPaginationInput, IDataTablePaginationProps];

export const usePagination = ({
  pageInfo = {},
  pageSize = ROWS_PER_PAGE_OPTIONS[0],
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

  const onChangeRowsPerPage = (e) => {
    setPage(0);
    setRowsPerPage(e.target.value);
    setPagination({ first: e.target.value });
  };

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
    [backIconButtonProps, nextIconButtonProps, onChangePage, page, rowsPerPage, totalCount]
  );

  return [paginationState, paginationProps];
};
