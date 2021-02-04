import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
import { IDataTableRow } from '../components/DataTable';

export type DataTableAccessor = string | ((row: IDataTableRow) => React.ReactNode);

export const useAccessor = (accessor: DataTableAccessor, row: IDataTableRow): React.ReactNode =>
  _isFunction(accessor) ? accessor(row) : _get(row, accessor, '');
