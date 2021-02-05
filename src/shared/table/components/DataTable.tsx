import React, { useCallback } from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { DataTableAccessor } from '../hooks/useAccessor';
import { DataTableHeaderCell } from './DataTableHeaderCell';
import { DataTableRowCell } from './DataTableRowCell';

export interface IDataTableColumn {
  accessor: DataTableAccessor;
  key?: string;
  title?: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export type IDataTableRow<E = Record<string, unknown>> = (Record<string, unknown> | E) & { id: string };

export interface IDataTablePaginationProps {
  backIconButtonProps?: Partial<{ disabled: boolean }>;
  count: number;
  labelRowsPerPage?: React.ReactNode;
  nextIconButtonProps?: Partial<{ disabled: boolean }>;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
}

export interface IDataTableProps<E = Record<string, unknown>> {
  rows?: IDataTableRow<E>[];
  columns: IDataTableColumn[];
  children?: React.ReactNode;
  component?: React.FC;
  pagination?: IDataTablePaginationProps;
}

const getColumnKey = (column: IDataTableColumn, index: number) =>
  typeof column.title === 'string' ? column.title : column.key || index;

export const DataTable = ({
  rows = [],
  columns = [],
  component = Paper,
  pagination,
}: IDataTableProps): React.ReactElement => {
  const RenderColumnHeader = useCallback((column: IDataTableColumn, i) => {
    const key = getColumnKey(column, i);
    return <DataTableHeaderCell key={key} column={column} />;
  }, []);

  const RenderRow = useCallback(
    (row: IDataTableRow) => {
      return (
        <TableRow key={row.id}>
          {columns.map((column: IDataTableColumn, i) => {
            const cellKey = row.id + getColumnKey(column, i);
            return <DataTableRowCell key={cellKey} column={column} row={row} />;
          })}
        </TableRow>
      );
    },
    [columns]
  );

  return (
    <TableContainer component={component}>
      <Table size="small">
        <TableHead>
          <TableRow>{columns.map(RenderColumnHeader)}</TableRow>
        </TableHead>
        <TableBody>{rows.map(RenderRow)}</TableBody>
      </Table>
      {pagination && <TablePagination {...pagination} />}
    </TableContainer>
  );
};
