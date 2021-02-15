import { QueryResult, useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useMemo } from 'react';
import { IQueryPageInfo } from '../types/hooks.interface';
import { extractPaginatedResponse } from '../utils/pagination';

export function usePaginatedQuery<T>(
  queryName: string,
  query: DocumentNode,
  options: Record<string, unknown>
): QueryResult<T[]> & { pageInfo: IQueryPageInfo } {
  const { data, ...rest } = useQuery(query, options);
  const { pageInfo, edges } = useMemo(() => extractPaginatedResponse<T>(data, queryName), [data, queryName]);
  return { data: edges, pageInfo, ...rest };
}
