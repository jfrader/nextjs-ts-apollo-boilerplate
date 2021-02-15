import React, { useMemo } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { IUserEntity } from '../hooks/useGetUsers';
import { UserSortFields } from '../types/user.interface';
import {
  IDataTableAccessorProps,
  IDataTablePaginationProps,
  IDataTableRow,
  IDataTableSortingProps,
} from '../../shared/table/components/DataTable';
import { IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';

interface IUsersTableProps {
  data?: IUserEntity[];
  pagination?: IDataTablePaginationProps;
  sorting?: IDataTableSortingProps<UserSortFields>;
  loading?: boolean;
  children?: React.ReactNode;
}

const RenderActions = ({
  row,
  onClickEdit,
}: IDataTableAccessorProps<IUserEntity> & { onClickEdit?: (r: IDataTableRow<IUserEntity>) => void }) => (
  <>
    <IconButton size="small" onClick={() => onClickEdit(row)}>
      <EditIcon />
    </IconButton>
  </>
);

export const UsersTable = ({
  data = [],
  pagination,
  sorting,
  loading,
  children,
}: IUsersTableProps): React.ReactElement => {
  const router = useRouter();

  const columns = useMemo(
    () => [
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
      {
        title: 'Actions',
        accessor: RenderActions,
        accessorProps: { onClickEdit: (row: IUserEntity) => router.push(`/users/edit/${row.id}`) },
      },
    ],
    [router]
  );

  const DataTable = useDataTable<IUserEntity, UserSortFields>({
    columns,
    rows: data,
    loading,
    pagination,
    sorting,
  });

  return <DataTable title="Users">{children}</DataTable>;
};
