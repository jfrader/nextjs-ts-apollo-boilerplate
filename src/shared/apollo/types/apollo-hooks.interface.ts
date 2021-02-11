import { ApolloError } from '@apollo/client';

export enum ESortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ESortNulls {
  NULLS_FIRST = 'NULLS_FIRST',
  NULLS_LAST = 'NULLS_LAST',
}

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

export type QueryRefetchFunction<SF = string> = (input: {
  paging?: IQueryPaginationInput;
  sorting?: IQuerySortInput<SF>;
}) => void;

export interface IPaginatedQueryHookResponse<P, SF> {
  refetch: QueryRefetchFunction<SF>;
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

export type IQuerySortInput<F = string> = {
  field: F;
  direction: ESortDirection;
  nulls?: ESortNulls;
}[];

export type PaginatedQueryHookResponse<P = Record<string, unknown>, SF = string> = IPaginatedQueryHookResponse<P, SF>;

export type RequestHookResponse<P = unknown> = IRequestHookResponse & (P | undefined);
