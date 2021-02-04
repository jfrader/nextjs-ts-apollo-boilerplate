import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_PEN_API_HOST,
  credentials: 'include',
  headers: {
    'x-custom-lang': process.env.NEXT_PUBLIC_DEFAULT_LANG,
  },
});

const REPLACE_FETCH_POLICY = {
  keyArgs: false,
  merge(_existing, incoming) {
    return incoming;
  },
};

export const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: REPLACE_FETCH_POLICY as unknown,
        },
      },
    },
  }),
  link: httpLink,
});
