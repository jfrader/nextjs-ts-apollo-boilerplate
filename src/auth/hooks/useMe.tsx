import { gql, useQuery } from '@apollo/client';
import { useNotification } from '../../shared/hooks/useNotification';

export const ME_QUERY = gql`
  query Me {
    me {
      email
      role
    }
  }
`;

interface IUseMe {
  data: {
    role?: string;
    email?: string;
  };
}

export const useMe = (): IUseMe => {
  const { apolloError } = useNotification();
  const { data } = useQuery(ME_QUERY, { onError: apolloError });

  return {
    data: data && data.me,
  };
};
