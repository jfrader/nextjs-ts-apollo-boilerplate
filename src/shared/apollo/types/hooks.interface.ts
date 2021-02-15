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

export type PaginatedQueryRefetchFunction<SF = string> = (input: {
  paging?: IQueryPaginationInput;
  sorting?: IQuerySortInput<SF>;
}) => void;

export type QueryRefetchFunction<S = Record<string, unknown>> = (input: S) => void;

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

export interface IQueryHookResponse<E, S> {
  refetch?: QueryRefetchFunction<S>;
  serverErrors: string[];
  data?: E;
  loading: boolean;
}
export type QueryHookResponse<E = unknown, S = unknown, P = unknown> = IQueryHookResponse<E, S> & (P | undefined);

export interface IPaginatedQueryHookResponse<E, SF> {
  refetch: PaginatedQueryRefetchFunction<SF>;
  data?: E[];
  serverErrors: string[];
  loading: boolean;
  pageInfo: IQueryPageInfo;
}
export type PaginatedQueryHookResponse<P = Record<string, unknown>, SF = string> = IPaginatedQueryHookResponse<P, SF>;

export interface IMutationHookResponse<E> {
  serverErrors: string[];
  data?: E;
  loading: boolean;
}
export type MutationHookResponse<P = unknown, E = unknown> = IMutationHookResponse<E> & (P | undefined);
