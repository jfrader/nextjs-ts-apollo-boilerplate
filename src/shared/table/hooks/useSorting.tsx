import { useCallback, useMemo, useState } from 'react';
import { ESortDirection } from '../../apollo/types/apollo-hooks.interface';
import { IDataTableSortingProps, EDataTableSortDirection } from '../components/DataTable';

type IUseSorting = [{ field: string; direction: ESortDirection }[], IDataTableSortingProps];

const SortDirectionMap: Record<ESortDirection, EDataTableSortDirection> = {
  [ESortDirection.ASC]: EDataTableSortDirection.ASC,
  [ESortDirection.DESC]: EDataTableSortDirection.DESC,
};

export const useSorting = (): IUseSorting => {
  const [field, setField] = useState<string | null>(null);
  const [direction, setDirection] = useState<ESortDirection | null>(null);

  const onChangeSort = useCallback(
    (key: string) => {
      if (direction === ESortDirection.ASC) {
        setDirection(ESortDirection.DESC);
      } else if (direction === ESortDirection.DESC) {
        setDirection(null);
        setField(null);
        return;
      } else {
        setDirection(ESortDirection.ASC);
      }
      setField(key);
    },
    [direction]
  );

  const sortingProps = useMemo(
    () => ({
      sortBy: field || '',
      sortDirection: direction ? SortDirectionMap[direction] : null,
      onChangeSort,
    }),
    [field, direction, onChangeSort]
  );

  const sortingState = useMemo(() => (field && direction ? [{ field, direction }] : []), [field, direction]);

  return [sortingState, sortingProps];
};
