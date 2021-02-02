/* eslint-disable react/jsx-key */
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';

interface IUsersTableProps {
  data: Record<string, unknown>[];
}

export const UsersTable = ({ data }: IUsersTableProps): React.ReactElement => {
  const columns = useMemo(
    () => [
      {
        Header: 'email',
        accessor: 'email',
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
