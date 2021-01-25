import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useTranslation } from '../../i18next';
import { parseError } from '../utils/error';

type NotificationVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

interface INotificationOptions {
  variant?: NotificationVariant;
  onClickAction?: () => void;
  autoHideDuration?: number;
}

interface IUseNotification {
  notify: (m: string, o: INotificationOptions) => void;
  success: (m: string) => void;
  error: (m: string) => void;
  apolloError: (e: ApolloError) => void;
  apolloSuccess: (m: string) => () => void;
}

const DEFAULT_OPTIONS: INotificationOptions = {
  autoHideDuration: 4800,
  variant: 'info',
};

export const useNotification = (): IUseNotification => {
  const snackbar = useSnackbar();
  const router = useRouter();
  const { t } = useTranslation('common');

  return useMemo(() => {
    const notify = (message: string, options: INotificationOptions = {}) => {
      snackbar.enqueueSnackbar(message, { ...DEFAULT_OPTIONS, ...options });
    };

    const error = (message: string) => notify(message, { variant: 'error' });
    const success = (message: string) => notify(message, { variant: 'success' });
    const apolloError = (e: ApolloError) => {
      const { errors, isAuthError } = parseError(e, t);
      if (isAuthError) {
        return;
      }
      errors.forEach((m: string) => error(m));
    };
    const apolloSuccess = (m: string) => () => success(m);

    return {
      notify,
      success,
      error,
      apolloError,
      apolloSuccess,
    };
  }, [snackbar, t]);
};
