import { gql, useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';
import { QueryHookResponse } from '../../shared/apollo/types/hooks.interface';
import { IUserEntity } from '../types/user.interface';

export interface IUserByIDProps {
  id: string;
}

type IUserByID = QueryHookResponse<IUserEntity, IUserByIDProps, { getUser(p: IUserByIDProps): void }>;

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      role
      created
      updated
    }
  }
`;

export const useUserByID = ({ id }: IUserByIDProps = { id: undefined }): IUserByID => {
  const [getUser, { error, data, loading, refetch }] = useLazyQuery(GET_USER_QUERY, {
    variables: { id },
  });

  return {
    refetch: useCallback(
      ({ id }: IUserByIDProps) => {
        refetch({ id });
      },
      [refetch]
    ),
    serverErrors: useServerErrors(error),
    data: data && data.user,
    loading,
    getUser: useCallback(({ id }: IUserByIDProps) => getUser({ variables: { id } }), [getUser]),
  };
};
