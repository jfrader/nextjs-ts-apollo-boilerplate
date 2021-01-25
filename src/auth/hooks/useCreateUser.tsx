import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/hooks/useNotification';
import { RequestHookResponse } from '../../shared/types/mutation-hook.interface';

interface ICreateUser {
  createUser: (i: { email: string; password: string }) => void;
}

const LOGIN_MUTATION = gql`
  mutation CreateUser($input: CreateUserInputDTO!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

export const useLogin = (): RequestHookResponse<ICreateUser> => {
  const { apolloError, apolloSuccess } = useNotification();
  const [createUser, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onError: apolloError,
    onCompleted: apolloSuccess('Logged in successfully'),
  });

  return {
    error,
    data,
    loading,
    createUser: useCallback(({ email, password }) => createUser({ variables: { input: { email, password } } }), [
      createUser,
    ]),
  };
};
