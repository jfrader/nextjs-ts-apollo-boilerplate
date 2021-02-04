import React from 'react';
import { TableCell } from '@material-ui/core';
import { IDataTableColumn } from './DataTable';

interface IDataTableHeaderCellProps {
  column: IDataTableColumn;
}

export const DataTableHeaderCell = ({ column }: IDataTableHeaderCellProps): React.ReactElement => {
  const title = (column && column.title) || (column && column.accessor) || '';
  const align = (column && column.align) || undefined;
  return <TableCell align={align}>{title}</TableCell>;
};
