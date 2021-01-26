import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/hooks/useNotification';
import { RequestHookResponse } from '../../shared/types/mutation-hook.interface';
import { ME_QUERY } from './useAuth';

interface IUseLogin {
  login: (i: { email: string; password: string }) => void;
}

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInputDTO!) {
    login(input: $input) {
      accessToken
    }
  }
`;

export const useLogin = (onCompleted: () => unknown): RequestHookResponse<IUseLogin> => {
  const { apolloError } = useNotification();

  const [me] = useLazyQuery(ME_QUERY);

  const [login, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      me();
      onCompleted && onCompleted();
    },
    onError: apolloError,
  });

  return {
    error,
    data,
    loading,
    login: useCallback(({ email, password }) => login({ variables: { input: { email, password } } }), [login]),
  };
};
