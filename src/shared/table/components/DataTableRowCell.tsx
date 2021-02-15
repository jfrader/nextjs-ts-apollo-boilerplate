import { TableCell, TableCellProps } from '@material-ui/core';
import React from 'react';
import { useAccessor } from '../hooks/useAccessor';
import { IDataTableColumn, IDataTableRow } from './DataTable';

interface IDataTableRowCellProps {
  column: IDataTableColumn<unknown>;
  row: IDataTableRow;
  CellProps?: TableCellProps;
}
export const DataTableRowCell = ({ column, row, CellProps = {} }: IDataTableRowCellProps): React.ReactElement => {
  const align = column.align || undefined;
  const cell = useAccessor(column.accessor, row, column.accessorProps);
  return (
    <TableCell {...CellProps} align={align}>
      {cell}
    </TableCell>
  );
};
