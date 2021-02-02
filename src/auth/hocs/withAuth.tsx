import { NextPage } from 'next';
import { useIsLogged } from '../hooks/useAuth';
import verifyToken from '../utils/verifyToken';
import withRedirection from './withRedirection';

/**
 * Require the user to be authenticated in order to render the component.
 * If the user isn't authenticated, forward to the given URL.
 */
export default function withAuth<CP, IP>(WrappedComponent: NextPage<CP, IP>, location = '/login'): NextPage<CP, IP> {
  return withRedirection({
    WrappedComponent,
    location,
    clientCondition: function withAuthClientCondition() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return !useIsLogged();
    },
    serverCondition: async function withAuthServerCondition(ctx) {
      const token = ctx.req?.cookies.Authentication;
      if (!token) {
        return false;
      }
      return await verifyToken(token);
    },
  });
}
