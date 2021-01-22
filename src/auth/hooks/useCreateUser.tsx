import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { MutationHookResponse } from '../../shared/types/mutation-hook.interface';

interface ICreateUser {
  createUser: (i: { email: string; password: string }) => void;
}

export const useLogin = (): MutationHookResponse & ICreateUser => {
  const [createUser, { error, data, loading }] = useMutation(gql`
    mutation CreateUser($input: CreateUserInputDTO!) {
      createUser(input: $input) {
        id
        email
      }
    }
  `);

  return {
    error,
    data,
    loading,
    createUser: useCallback(({ email, password }) => createUser({ variables: { input: { email, password } } }), [
      createUser,
    ]),
  };
};
