import { ApolloError } from '@apollo/client';

export type IPaginatedData<P> = Array<{
  node: P;
}>;

export interface IQueryPageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface IPaginatedResponse<P> {
  edges: P[];
  pageInfo: IQueryPageInfo;
}

export interface IQueryResponseEdge<P> {
  node: P;
  cursor: string;
}

export interface IPaginatedQueryResponse<P> {
  [x: string]: {
    pageInfo: IQueryPageInfo;
    edges: IQueryResponseEdge<P>[];
  };
}

export interface IRequestHookResponse {
  error: ApolloError;
  data?: unknown;
  loading: boolean;
}

export type QueryFetchMoreFunction = (input: { paging: IQueryPaginationInput }) => void;

export interface IPaginatedQueryHookResponse<P> {
  refetch: QueryFetchMoreFunction;
  data?: P[];
  error: ApolloError;
  loading: boolean;
  pageInfo: IQueryPageInfo;
}

export interface IQueryPaginationInput {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
}

export type PaginatedQueryHookResponse<P = Record<string, unknown>> = IPaginatedQueryHookResponse<P>;

export type RequestHookResponse<P = unknown> = IRequestHookResponse & (P | undefined);
