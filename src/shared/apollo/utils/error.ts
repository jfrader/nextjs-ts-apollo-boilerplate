import { ApolloError } from '@apollo/client';
import { TFunction } from 'next-i18next';

interface IParseError {
  isAuthError: boolean;
  errors: string[];
}

export const parseError = (error: ApolloError, t: TFunction, parseMessages = true): IParseError => {
  let isAuthError = false;

  const errorSet = new Set<string>();

  if (error) {
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach(({ message, extensions }) => {
        if (!isAuthError && extensions) {
          isAuthError = extensions.code === 'UNAUTHENTICATED';
        }
        if (parseMessages) {
          errorSet.add(message);
        }
      });
    }

    if (!parseMessages) {
      return { isAuthError, errors: [] };
    }

    if (typeof error === 'string') {
      errorSet.add(error);
    }

    if (error.networkError) {
      errorSet.add(t('ERROR_NETWORK'));
    }

    if (errorSet.size === 0 && error.message) {
      errorSet.add(error.message);
    }
  }

  return { isAuthError, errors: Array.from(errorSet.values()) };
};
