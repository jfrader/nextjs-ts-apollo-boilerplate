import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_PEN_API_HOST,
  credentials: 'include',
  headers: {
    'x-custom-lang': process.env.NEXT_PUBLIC_DEFAULT_LANG,
  },
});

export const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  link: httpLink,
});
