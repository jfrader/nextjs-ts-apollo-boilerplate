import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { usePaginatedQuery } from '../../shared/apollo/hooks/usePaginatedQuery';
import { IQueryPaginationInput, PaginatedQueryHookResponse } from '../../shared/apollo/types/apollo-hooks.interface';

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
  const { error, data, pageInfo, loading, refetch } = usePaginatedQuery<IUserEntity>(GET_USERS_QUERY, {
    variables: { paging },
  });

  return {
    refetch: useCallback(({ paging }: IGetUserProps) => refetch({ paging }), [refetch]),
    error,
    data,
    loading,
    pageInfo,
  };
};
