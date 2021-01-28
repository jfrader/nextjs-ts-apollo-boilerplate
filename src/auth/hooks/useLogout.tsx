import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useNotification } from '../../shared/hooks/useNotification';
import { RequestHookResponse } from '../../shared/types/mutation-hook.interface';
import { useAuth } from './useAuth';
import { ME_QUERY } from './useMe';

interface IUseLogout {
  logout: () => void;
}

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const useLogout = (): RequestHookResponse<IUseLogout> => {
  const { apolloError, apolloSuccess } = useNotification();
  const { push } = useRouter();
  const { setLogged } = useAuth();
  const [me] = useLazyQuery(ME_QUERY);

  const [logout, { error, data, loading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: (data) => {
      me();
      setLogged(false);
      apolloSuccess(data.logout.message);
      push('/login');
    },
    onError: apolloError,
  });

  return {
    error,
    data,
    loading,
    logout,
  };
};
