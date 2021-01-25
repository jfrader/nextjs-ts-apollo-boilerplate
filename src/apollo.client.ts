import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql', credentials: 'include' });

export const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache(),
  link: httpLink,
});
