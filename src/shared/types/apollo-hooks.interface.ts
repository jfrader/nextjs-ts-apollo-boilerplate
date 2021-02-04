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

export interface IPaginatedQueryHookResponse<P> {
  data?: P[];
  error: ApolloError;
  loading: boolean;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export type PaginatedQueryHookResponse<P = Record<string, unknown>> = IPaginatedQueryHookResponse<P>;

export type RequestHookResponse<P = unknown> = IRequestHookResponse & (P | undefined);
