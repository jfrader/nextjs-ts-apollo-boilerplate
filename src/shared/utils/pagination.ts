type IPaginationData<P> = Array<{
  node: P;
}>;

export function extractNodes<P = Record<string, unknown>>(data: IPaginationData<P>): Array<P> {
  return data ? data.map((e) => e.node) : [];
}
