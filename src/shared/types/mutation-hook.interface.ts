import { ApolloError } from '@apollo/client';

export interface IRequestHookResponse {
  error: ApolloError;
  data?: unknown;
  loading: boolean;
}

export type RequestHookResponse<P = unknown> = IRequestHookResponse & P;
