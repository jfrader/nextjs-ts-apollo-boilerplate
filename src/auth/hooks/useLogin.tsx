import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useNotification } from '../../shared/notifications/hooks/useNotification';
import { RequestHookResponse } from '../../shared/apollo/types/hooks.interface';
import { useAuth } from './useAuth';
import { ME_QUERY } from './useMe';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';

type IUseLogin = RequestHookResponse<{
  login: (input: { email: string; password: string }) => void;
}>;

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInputDTO!) {
    login(input: $input) {
      success
      message
    }
  }
`;

export const useLogin = (): IUseLogin => {
  const { apolloError, info } = useNotification();
  const { push } = useRouter();
  const { setLogged } = useAuth();
  const [me] = useLazyQuery(ME_QUERY);

  const [login, { error, data, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      me();
      setLogged(true);
      info(data.login.message);
      push('/');
    },
    onError: apolloError,
  });

  return {
    serverErrors: useServerErrors(error),
    data: data && data.login,
    loading,
    login: useCallback(({ email, password }) => login({ variables: { input: { email, password } } }), [login]),
  };
};
