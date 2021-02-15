import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { IDataTableAccessorProps, IDataTableRow } from '../components/DataTable';

export type DataTableAccessor = string | (({ row }: { row: IDataTableRow }) => React.ReactNode);

export const useAccessor = (
  accessor: DataTableAccessor,
  row: IDataTableRow,
  props: IDataTableAccessorProps<unknown> = {}
): React.ReactNode => (_isFunction(accessor) ? accessor({ row, ...props }) : _get(row, accessor, ''));
