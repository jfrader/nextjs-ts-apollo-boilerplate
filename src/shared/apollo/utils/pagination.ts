import { IPaginatedData, IPaginatedQueryResponse, IPaginatedResponse } from '../types/hooks.interface';

export function extractNodes<P = Record<string, unknown>>(data: IPaginatedData<P>): Array<P> {
  return data ? data.map((e) => e.node) : [];
}

export function extractPaginatedResponse<P = Record<string, unknown>>(
  data: IPaginatedQueryResponse<P>,
  key: string
): IPaginatedResponse<P> {
  return data && data[key]
    ? { pageInfo: data[key].pageInfo, edges: extractNodes<P>(data[key].edges) }
    : { pageInfo: {}, edges: [] };
}
