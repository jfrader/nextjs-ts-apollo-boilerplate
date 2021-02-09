import React, { useEffect } from 'react';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { usePagination } from '../../shared/table/hooks/usePagination';
import { IQueryPageInfo, QueryFetchMoreFunction } from '../../shared/apollo/types/apollo-hooks.interface';
import { IUserEntity } from '../hooks/useGetUsers';

interface IUsersTableProps {
  data: IUserEntity[];
  pageInfo: IQueryPageInfo;
  refetch: QueryFetchMoreFunction;
}

export const UsersTable = ({ data = [], refetch, pageInfo }: IUsersTableProps): React.ReactElement => {
  const [paging, pagination] = usePagination({ pageInfo });

  useEffect(() => {
    refetch({ paging });
  }, [refetch, paging]);

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
    pagination,
  });

  return <DataTable />;
};
