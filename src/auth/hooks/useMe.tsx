import { gql, useQuery } from '@apollo/client';
import { useNotification } from '../../shared/notifications/hooks/useNotification';

export const ME_QUERY = gql`
  query Me {
    me {
      email
      role
    }
  }
`;

interface IUseMe {
  role?: string;
  email?: string;
}

export const useMe = (): IUseMe => {
  const { apolloError } = useNotification();
  const { data } = useQuery(ME_QUERY, { onError: apolloError });

  return data && data.me ? { ...data.me } : {};
};
