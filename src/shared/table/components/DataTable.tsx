import React, { useCallback } from 'react';
import {
  Toolbar,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableCell,
  Typography,
  Box,
  TableFooter,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { DataTableAccessor } from '../hooks/useAccessor';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableRowCell } from './DataTableRowCell';
import { useTranslation } from '../../../i18next';

export type IDataTableAccessorProps<E> = { row?: IDataTableRow<E> } & Partial<Record<string, unknown>>;

export interface IDataTableColumn<E> {
  accessor: DataTableAccessor;
  accessorProps?: IDataTableAccessorProps<E>;
  key?: string;
  title?: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export type IDataTableRow<E = Record<string, unknown>> = (Record<string, unknown> | E) & { id: string };

export interface IDataTablePaginationProps {
  count: number;
  backIconButtonProps?: Partial<{ disabled: boolean }>;
  nextIconButtonProps?: Partial<{ disabled: boolean }>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
}

export enum EDataTableSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IDataTableSortingProps<SF> {
  sortBy: SF;
  sortDirection: EDataTableSortDirection | null;
  onChangeSort: (key: string) => void;
}

export interface IDataTableProps<E = Record<string, unknown>, SF = string> {
  loading?: boolean;
  title?: React.ReactNode;
  rows?: IDataTableRow<E>[];
  columns: IDataTableColumn<E>[];
  children?: React.ReactNode;
  component?: React.FC;
  pagination?: IDataTablePaginationProps;
  sorting?: IDataTableSortingProps<SF>;
}

const getColumnKey = (column: IDataTableColumn<unknown>, index: number) =>
  typeof column.title === 'string' ? column.title : column.key || index;

export function DataTable<E = Record<string, unknown>, SF = string>({
  rows = [],
  columns = [],
  component = Paper,
  children,
  pagination,
  sorting,
  loading,
  title = null,
}: IDataTableProps<E, SF>): React.ReactElement {
  const { t } = useTranslation('common');

  const RenderColumnHeader = useCallback(
    (column: IDataTableColumn<E>, i) => {
      const key = getColumnKey(column, i);
      return <DataTableHeaderCell sorting={sorting} key={key} column={column} />;
    },
    [sorting]
  );

  const RenderRow = useCallback(
    (row: IDataTableRow) => {
      return (
        <TableRow key={row.id}>
          {columns.map((column: IDataTableColumn<E>, i) => {
            const cellKey = row.id + getColumnKey(column, i);
            return <DataTableRowCell key={cellKey} column={column} row={row} />;
          })}
        </TableRow>
      );
    },
    [columns]
  );

  const RenderSkeleton = useCallback(
    (colLength, size = 10) =>
      Array.from(new Array(size)).map((_a, i) => (
        <TableRow key={i}>
          <TableCell colSpan={colLength}>
            <Skeleton height={24} width="100%" />
          </TableCell>
        </TableRow>
      )),
    []
  );

  const getLabelDisplayedRows = useCallback(
    ({ from, to, count }) =>
      `${from}-${to} ${t('LITERAL_OF')} ${count !== -1 ? count : t('LITERAL_MORE_THAN') + ' ' + to}`,
    [t]
  );

  return (
    <TableContainer component={component}>
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
        <Box flexGrow={1} />
        <Box>{loading ? <CircularProgress /> : children}</Box>
      </Toolbar>
      <Table size="small">
        <TableHead>
          <TableRow>{columns.map(RenderColumnHeader)}</TableRow>
        </TableHead>
        <TableBody>{loading ? RenderSkeleton(columns.length, pagination?.rowsPerPage) : rows.map(RenderRow)}</TableBody>
        <TableFooter hidden={!pagination}>
          {pagination && (
            <TableRow>
              <TablePagination
                labelRowsPerPage={t('LITERAL_ROWS_PER_PAGE')}
                labelDisplayedRows={getLabelDisplayedRows}
                {...pagination}
              />
            </TableRow>
          )}
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
