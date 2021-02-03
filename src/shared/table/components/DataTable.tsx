/* eslint-disable react/jsx-key */
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { TableInstance } from 'react-table';

interface DataTableProps {
  children?: React.ReactNode;
}

type IDataTableProps = TableInstance & DataTableProps;

export const DataTable = ({ getTableProps, headerGroups, rows, prepareRow }: IDataTableProps): React.ReactElement => {
  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
