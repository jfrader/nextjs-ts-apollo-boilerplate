import React, { useCallback } from 'react';
import { DataTable as _DataTable, IDataTableProps } from '../components/DataTable';

export function useDataTable<E, SF = string>(props: IDataTableProps<E, SF>): React.FC<Partial<IDataTableProps<E, SF>>> {
  const DataTable = useCallback((_props: IDataTableProps<E, SF>) => <_DataTable {...props} {..._props} />, [props]);
  return DataTable;
}
