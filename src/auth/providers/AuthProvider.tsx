import React, { ReactNode, ReactElement } from 'react';
import { IAuthContext } from '../types/context';

export const AuthContext = React.createContext<IAuthContext>({
  isLogged: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLogged: () => {},
});

/**
 * The initial value of `isLogged` comes from the `isLogged`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setLogged()` method in the context.
 */
export const AuthProvider = ({ children, logged }: { children: ReactNode; logged: boolean }): ReactElement => {
  const [isLogged, setLogged] = React.useState<boolean>(logged);
  return (
    <AuthContext.Provider
      value={{
        isLogged,
        setLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
