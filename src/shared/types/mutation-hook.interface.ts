import { ApolloError } from '@apollo/client';

export interface MutationHookResponse {
  error: ApolloError;
  data: unknown;
  loading: boolean;
}
