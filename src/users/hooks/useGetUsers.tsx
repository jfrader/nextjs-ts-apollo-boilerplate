import { gql, useQuery } from '@apollo/client';
import { PaginatedQueryHookResponse } from '../../shared/types/apollo-hooks.interface';
import { extractNodes } from '../../shared/utils/pagination';

type IGetUsers = PaginatedQueryHookResponse;

const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
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
  return {
    error,
    data: data && data.users ? extractNodes(data.users.edges) : [],
    loading,
  };
};
