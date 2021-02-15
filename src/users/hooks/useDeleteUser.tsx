import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { useNotification } from '../../shared/notifications/hooks/useNotification';
import { MutationHookResponse } from '../../shared/apollo/types/hooks.interface';
import { useServerErrors } from '../../shared/apollo/hooks/useServerErrors';

type IDeleteUser = MutationHookResponse<{
  deleteUser: (id: string) => void;
}>;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      success
      message
    }
  }
`;

export const useDeleteUser = (onSuccess?: (...p: unknown[]) => void): IDeleteUser => {
  const { apolloError, success } = useNotification();
  const [deleteUser, { error, data, loading }] = useMutation(DELETE_USER_MUTATION, {
    onError: apolloError,
    onCompleted: (data) => {
      onSuccess(data.deleteUser);
      success(data.deleteUser.message);
    },
  });

  return {
    serverErrors: useServerErrors(error),
    data: data && data.deleteUser,
    loading,
    deleteUser: useCallback((id: string) => deleteUser({ variables: { id: `${id}` } }), [deleteUser]),
  };
};
