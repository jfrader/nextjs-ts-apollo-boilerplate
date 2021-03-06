import { gql } from '@apollo/client';
import { useCallback } from 'react';
import { usePaginatedQuery } from '../../shared/apollo/hooks/usePaginatedQuery';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';
import {
  IQueryPaginationInput,
  IQuerySortInput,
  PaginatedQueryHookResponse,
} from '../../shared/apollo/types/hooks.interface';
import { IUserEntity, UserSortFields } from '../types/user.interface';

export interface IGetUsersProps<SF> {
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

const DEFAULT_PAGING = { first: 20 };
const DEFAULT_SORTING = [];

const DEFAULT_VARIABLES = {
  paging: DEFAULT_PAGING,
  sorting: DEFAULT_SORTING,
};

export const useGetUsers = ({ paging, sorting }: IGetUsersProps<UserSortFields> = DEFAULT_VARIABLES): IGetUsers => {
  const { error, data, pageInfo, loading, refetch } = usePaginatedQuery<IUserEntity>('users', GET_USERS_QUERY, {
    variables: { paging, sorting },
  });

  return {
    refetch: useCallback(
      ({ paging, sorting }: IGetUsersProps<UserSortFields> = DEFAULT_VARIABLES) => {
        refetch({ paging, sorting });
      },
      [refetch]
    ),
    serverErrors: useServerErrors(error),
    data,
    loading,
    pageInfo,
  };
};
