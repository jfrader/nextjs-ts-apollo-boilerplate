import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/hooks/useNotification';
import { RequestHookResponse } from '../../shared/types/mutation-hook.interface';

interface ICreateUserProps {
  createUser: (i: { email: string; password: string }) => void;
}

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

export const useLogin = (): RequestHookResponse<ICreateUserProps> => {
  const { apolloError, apolloSuccess } = useNotification();
  const [createUser, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onError: apolloError,
    onCompleted: (data) => apolloSuccess(data.createUser.message),
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
