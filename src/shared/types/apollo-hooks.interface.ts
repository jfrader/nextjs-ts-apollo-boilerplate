import { ApolloError } from '@apollo/client';

export interface IRequestHookResponse {
  error: ApolloError;
  data?: unknown;
  loading: boolean;
}

export interface IQueryResponseEdge {
  node: Record<string, unknown>;
  cursor: string;
}

export interface IPaginatedQueryHookResponse {
  data?: Record<string, unknown>[];
  error: ApolloError;
  loading: boolean;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export type PaginatedQueryHookResponse = IPaginatedQueryHookResponse;

export type RequestHookResponse<P = unknown> = IRequestHookResponse & (P | undefined);
