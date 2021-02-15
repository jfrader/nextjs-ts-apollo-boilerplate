import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/notifications/hooks/useNotification';
import { RequestHookResponse } from '../../shared/apollo/types/hooks.interface';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';

type ICreateUser = RequestHookResponse<{
  createUser: (input: { email: string; password: string; role: string }) => void;
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

export const useCreateUser = (onSuccess?: (...p: unknown[]) => void): ICreateUser => {
  const { apolloError, success } = useNotification();
  const [createUser, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onError: apolloError,
    onCompleted: (data) => {
      onSuccess(data.createUser);
      success(data.createUser.message);
    },
  });

  return {
    serverErrors: useServerErrors(error),
    data: data && data.createUser.node,
    loading,
    createUser: useCallback((input) => createUser({ variables: { input } }), [createUser]),
  };
};
