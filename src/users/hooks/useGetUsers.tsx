import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { usePaginatedQuery } from '../../shared/apollo/hooks/usePaginatedQuery';
import {
  ESortDirection,
  IQueryPaginationInput,
  IQuerySortInput,
  PaginatedQueryHookResponse,
} from '../../shared/apollo/types/apollo-hooks.interface';
import { UserSortFields } from '../types/user.interface';

export interface IUserEntity {
  id: string;
  email: string;
  role: string;
}

export interface IGetUserProps<SF> {
  paging?: IQueryPaginationInput;
  sorting?: IQuerySortInput<SF>;
}

type IGetUsers = PaginatedQueryHookResponse<IUserEntity, UserSortFields>;

const GET_USERS_QUERY = gql`
  query GetUsers($paging: CursorPaging, $sorting: [UserSort!]) {
    users(paging: $paging, sorting: $sorting) {
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

const DEFAULT_PAGING = { first: 1 };
const DEFAULT_SORTING = [{ field: UserSortFields.id, direction: ESortDirection.DESC }];

const DEFAULT_VARIABLES = {
  paging: DEFAULT_PAGING,
  sorting: DEFAULT_SORTING,
};

export const useGetUsers = ({ paging, sorting }: IGetUserProps<UserSortFields> = DEFAULT_VARIABLES): IGetUsers => {
  const { error, data, pageInfo, loading, refetch } = usePaginatedQuery<IUserEntity>(GET_USERS_QUERY, {
    variables: { paging, sorting },
  });

  return {
    refetch: useCallback(
      ({ paging, sorting }: IGetUserProps<UserSortFields> = DEFAULT_VARIABLES) => {
        refetch({ paging, sorting });
      },
      [refetch]
    ),
    error,
    data,
    loading,
    pageInfo,
  };
};
