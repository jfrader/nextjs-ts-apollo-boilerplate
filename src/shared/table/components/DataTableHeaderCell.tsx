import React from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';
import { IDataTableColumn, IDataTableSortingProps } from './DataTable';

interface IDataTableHeaderCellProps {
  column: IDataTableColumn;
  sorting: IDataTableSortingProps;
}

export const DataTableHeaderCell = ({ column, sorting }: IDataTableHeaderCellProps): React.ReactElement => {
  const title = (column && column.title) || (column && column.accessor) || '';
  const align = (column && column.align) || undefined;
  const key = column && column.key;
  return (
    <TableCell align={align} sortDirection={key === sorting.sortBy ? sorting.sortDirection : false}>
      {sorting && key ? (
        <TableSortLabel
          active={key === sorting.sortBy}
          direction={sorting.sortDirection || undefined}
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
