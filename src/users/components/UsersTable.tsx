import React from 'react';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { IUserEntity } from '../hooks/useGetUsers';
import { UserSortFields } from '../types/user.interface';
import { IDataTablePaginationProps, IDataTableSortingProps } from '../../shared/table/components/DataTable';

interface IUsersTableProps {
  data?: IUserEntity[];
  pagination?: IDataTablePaginationProps;
  sorting?: IDataTableSortingProps<UserSortFields>;
  loading?: boolean;
  children?: React.ReactNode;
}

export const UsersTable = ({
  data = [],
  pagination,
  sorting,
  loading,
  children,
}: IUsersTableProps): React.ReactElement => {
  const DataTable = useDataTable<IUserEntity, UserSortFields>({
    columns: [
      {
        accessor: 'id',
        title: 'ID',
        key: 'id',
      },
      {
        accessor: 'email',
        title: 'Email',
        key: 'email',
      },
      {
        accessor: 'role',
        title: 'Role',
      },
    ],
    rows: data,
    loading,
    pagination,
    sorting,
  });

  return <DataTable title="Users">{children}</DataTable>;
};
