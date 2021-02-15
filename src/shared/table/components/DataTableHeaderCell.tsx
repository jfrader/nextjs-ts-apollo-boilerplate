import React from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { IDataTableColumn, IDataTableSortingProps } from './DataTable';

interface IDataTableHeaderCellProps {
  column: IDataTableColumn<unknown>;
  sorting: IDataTableSortingProps<unknown>;
}

export const DataTableHeaderCell = ({ column, sorting }: IDataTableHeaderCellProps): React.ReactElement => {
  const title = (column && column.title) || (column && column.accessor) || '';
  const align = (column && column.align) || undefined;
  const key = column && column.key;
  const isSorted = key === sorting.sortBy;
  return (
    <TableCell align={align} sortDirection={isSorted ? sorting.sortDirection : false}>
      {sorting && key ? (
        <TableSortLabel
          active={isSorted}
          hideSortIcon={isSorted}
          direction={isSorted ? sorting.sortDirection : 'asc'}
          onClick={() => sorting.onChangeSort(key)}
        >
          {title}
        </TableSortLabel>
      ) : (
        <span>{title}</span>
      )}
    </TableCell>
  );
};
