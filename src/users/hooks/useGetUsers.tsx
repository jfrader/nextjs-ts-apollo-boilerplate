import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { PaginatedQueryHookResponse } from '../../shared/types/apollo-hooks.interface';
import { extractNodes } from '../../shared/utils/pagination';

type IGetUsers = PaginatedQueryHookResponse;

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
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

export const useGetUsers = (): IGetUsers => {
  const { error, data, loading } = useQuery(GET_USERS_QUERY);

  const { pageInfo, edges } = useMemo(() => (data && data.users ? data.users : { pageInfo: {}, edges: [] }), [data]);

  return {
    error,
    data: useMemo(() => extractNodes(edges), [edges]),
    loading,
    pageInfo,
  };
};
