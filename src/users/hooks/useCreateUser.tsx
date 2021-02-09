import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/notifications/hooks/useNotification';
import { RequestHookResponse } from '../../shared/apollo/types/apollo-hooks.interface';

type ICreateUser = RequestHookResponse<{
  createUser: (input: { email: string; password: string }) => void;
}>;

const LOGIN_MUTATION = gql`
  mutation CreateUser($input: CreateUserInputDTO!) {
    createUser(input: $input) {
      success
      message
      node {
        id
        email
      }
    }
  }
`;

export const useLogin = (): ICreateUser => {
  const { apolloError, success } = useNotification();
  const [createUser, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onError: apolloError,
    onCompleted: (data) => success(data.createUser.message),
  });

  return {
    error,
    data: data && data.createUser.node,
    loading,
    createUser: useCallback(({ email, password }) => createUser({ variables: { input: { email, password } } }), [
      createUser,
    ]),
  };
};
