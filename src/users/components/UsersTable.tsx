import React, { useEffect } from 'react';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { usePagination } from '../../shared/table/hooks/usePagination';
import { IQueryPageInfo, QueryRefetchFunction } from '../../shared/apollo/types/apollo-hooks.interface';
import { IUserEntity } from '../hooks/useGetUsers';
import { useSorting } from '../../shared/table/hooks/useSorting';
import { UserSortFields } from '../types/user.interface';

interface IUsersTableProps {
  data?: IUserEntity[];
  pageInfo: IQueryPageInfo;
  refetch: QueryRefetchFunction<UserSortFields>;
  loading: boolean;
}

export const UsersTable = ({ data = [], refetch, pageInfo, loading }: IUsersTableProps): React.ReactElement => {
  const [paging, pagination] = usePagination({ pageInfo });
  const [sorting, sortingProps] = useSorting<UserSortFields>();

  useEffect(() => {
    refetch({ paging, sorting });
  }, [refetch, paging, sorting]);

  const DataTable = useDataTable<IUserEntity>({
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
    pagination,
    loading,
    sorting: sortingProps,
  });

  return <DataTable title="Users" />;
};
