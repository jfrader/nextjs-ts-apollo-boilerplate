import { useCallback, useMemo, useState } from 'react';
import { ESortDirection } from '../../apollo/types/hooks.interface';
import { IDataTableSortingProps, EDataTableSortDirection } from '../components/DataTable';

type IUseSorting<SF> = [{ field: SF; direction: ESortDirection }[], IDataTableSortingProps<SF>];

const SortDirectionMap: Record<ESortDirection, EDataTableSortDirection> = {
  [ESortDirection.ASC]: EDataTableSortDirection.ASC,
  [ESortDirection.DESC]: EDataTableSortDirection.DESC,
};

export function useSorting<SF = string>(): IUseSorting<SF> {
  const [field, setField] = useState<SF | null>(null);
  const [direction, setDirection] = useState<ESortDirection | null>(null);

  const onChangeSort = useCallback(
    (key: unknown) => {
      if (field === key && direction === ESortDirection.DESC) {
        setField(null);
        setDirection(null);
        return;
      }
      if (direction === ESortDirection.ASC) {
        setDirection(ESortDirection.DESC);
        setField(key as SF);
        return;
      }
      setDirection(ESortDirection.ASC);
      setField(key as SF);
    },
    [direction, field]
  );

  const sortingProps = useMemo(
    () => ({
      sortBy: field,
      sortDirection: direction ? SortDirectionMap[direction] : null,
      onChangeSort,
    }),
    [field, direction, onChangeSort]
  );

  const sortingState = useMemo(() => (field && direction ? [{ field, direction }] : []), [field, direction]);

  return [sortingState, sortingProps];
}
