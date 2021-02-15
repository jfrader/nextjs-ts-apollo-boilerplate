import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useNotification } from '../../shared/notifications/hooks/useNotification';
import { MutationHookResponse } from '../../shared/apollo/types/hooks.interface';
import { useAuth } from './useAuth';
import { ME_QUERY } from './useMe';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';

type IUseLogout = MutationHookResponse<{
  logout: () => void;
}>;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export const useLogout = (): IUseLogout => {
  const { apolloError, info } = useNotification();
  const { push } = useRouter();
  const { setLogged } = useAuth();
  const [me] = useLazyQuery(ME_QUERY);

  const [logout, { error, data, loading }] = useMutation(LOGOUT_MUTATION, {
    onCompleted: (data) => {
      info(data.logout.message);
      setLogged(false);
      me();
      push('/login');
    },
    onError: apolloError,
  });

  return {
    serverErrors: useServerErrors(error),
    data,
    loading,
    logout,
  };
};
