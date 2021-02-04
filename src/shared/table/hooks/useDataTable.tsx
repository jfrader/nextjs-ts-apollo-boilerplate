import React, { useCallback } from 'react';
import { DataTable as _DataTable, IDataTableProps } from '../components/DataTable';

export function useDataTable<E>(props: IDataTableProps<E>): React.FC<Partial<IDataTableProps<E>>> {
  const DataTable = useCallback((_props: IDataTableProps<E>) => <_DataTable {...props} {..._props} />, [props]);
  return DataTable;
}
