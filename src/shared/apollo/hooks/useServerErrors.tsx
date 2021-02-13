import { ApolloError } from '@apollo/client';
import { useMemo } from 'react';
import { useTranslation } from '../../../i18next';
import { parseError } from '../utils/error';

export function useServerErrors(error: ApolloError): string[] {
  const { t } = useTranslation('common');
  return useMemo(() => parseError(error, t).errors, [error, t]);
}
