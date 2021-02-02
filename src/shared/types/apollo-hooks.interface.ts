import { ApolloError } from '@apollo/client';

export interface IRequestHookResponse {
  error: ApolloError;
  data?: unknown;
  loading: boolean;
}

export interface IPaginatedQueryHookResponse {
  data?: Record<string, unknown>[];
  error: ApolloError;
  loading: boolean;
}

export type PaginatedQueryHookResponse = IPaginatedQueryHookResponse;

export type RequestHookResponse<P = unknown> = IRequestHookResponse & (P | undefined);
