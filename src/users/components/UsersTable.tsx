import React from 'react';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { IUserEntity } from '../hooks/useGetUsers';

interface IUsersTableProps {
  data: IUserEntity[];
  fetchMore(p: { limit: number; offset: number }): void;
}

export const UsersTable = ({ data = [] }: IUsersTableProps): React.ReactElement => {
  const DataTable = useDataTable<IUserEntity>({
    columns: [
      {
        accessor: 'id',
        title: 'ID',
      },
      {
        accessor: 'email',
        title: 'Email',
      },
      {
        accessor: 'role',
        title: 'Role',
      },
    ],
    rows: data,
  });

  return <DataTable />;
};
