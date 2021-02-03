import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { DataTable } from '../../shared/table/components/DataTable';

interface IUsersTableProps {
  data: Record<string, unknown>[];
}

export const UsersTable = ({ data }: IUsersTableProps): React.ReactElement => {
  const columns = useMemo(
    () => [
      {
        accessor: 'id',
        Header: 'ID',
      },
      {
        accessor: 'email',
        Header: 'Email',
      },
      {
        accessor: 'role',
        Header: 'Role',
      },
    ],
    []
  );

  const TableProps = useTable({ columns, data });

  return <DataTable {...TableProps} />;
};
