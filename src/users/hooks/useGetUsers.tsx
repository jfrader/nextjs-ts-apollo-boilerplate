import { gql, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';
import { IQueryPaginationInput, PaginatedQueryHookResponse } from '../../shared/types/apollo-hooks.interface';
import { extractPaginatedResponse } from '../../shared/utils/pagination';

export interface IUserEntity {
  id: string;
  email: string;
  role: string;
}

export interface IGetUserProps {
  paging?: IQueryPaginationInput;
}

type IGetUsers = PaginatedQueryHookResponse<IUserEntity>;

const GET_USERS_QUERY = gql`
  query GetUsers($paging: CursorPaging) {
    users(paging: $paging) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          email
          role
        }
      }
    }
  }
`;

export const useGetUsers = ({ paging }: IGetUserProps = { paging: { first: 1 } }): IGetUsers => {
  const { error, data, loading, refetch } = useQuery(GET_USERS_QUERY, { variables: { paging } });

  const { pageInfo, edges } = useMemo(() => extractPaginatedResponse<IUserEntity>(data, 'users'), [data]);

  return {
    refetch: useCallback(({ paging }: IGetUserProps) => refetch({ paging }), [refetch]),
    error,
    data: edges,
    loading,
    pageInfo,
  };
};
