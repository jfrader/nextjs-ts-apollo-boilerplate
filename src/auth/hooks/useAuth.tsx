import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const ME_QUERY = gql`
  query Me {
    me {
      email
      role
    }
  }
`;

interface IUseAuth {
  isLogged: boolean;
  role?: string;
  email?: string;
}

export const useAuth = (): IUseAuth => {
  const { data } = useQuery(ME_QUERY);

  const email = useMemo(() => data && data.me.email, [data]);

  return {
    isLogged: !!email,
    role: data && data.me.role,
    email,
  };
};
