import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { MutationHookResponse } from '../../shared/types/mutation-hook.interface';

interface IUseLogin {
  login: (i: { email: string; password: string }) => void;
}

export const useLogin = (): MutationHookResponse & IUseLogin => {
  const [login, { error, data, loading }] = useMutation(gql`
    mutation Login($input: LoginInputDTO!) {
      login(input: $input) {
        accessToken
      }
    }
  `);

  return {
    error,
    data,
    loading,
    login: useCallback(({ email, password }) => login({ variables: { input: { email, password } } }), [login]),
  };
};
