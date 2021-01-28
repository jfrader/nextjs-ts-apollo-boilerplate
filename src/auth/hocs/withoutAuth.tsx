import { NextPage } from 'next';
import { useIsLogged } from '../hooks/useAuth';
import withRedirection from './withRedirection';

/**
 * Require the user to be unauthenticated in order to render the component.
 * If the user is authenticated, forward to the given URL.
 */
export default function withoutAuth<P>(WrappedComponent: NextPage<P>, location = '/'): NextPage<P> {
  return withRedirection({
    WrappedComponent,
    location,
    clientCondition: function withoutAuthClientCondition() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useIsLogged();
    },
    serverCondition: function withoutAuthServerCondition(ctx) {
      return !!ctx.req?.cookies.Authentication;
    },
  });
}
