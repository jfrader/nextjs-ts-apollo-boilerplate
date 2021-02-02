type IPaginationData = Array<{
  node: Record<string, unknown>;
}>;

export const extractNodes = (data: IPaginationData): Array<Record<string, unknown>> =>
  data ? data.map((e) => e.node) : [];
