import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useDataTable } from '../../shared/table/hooks/useDataTable';
import { IUserEntity } from '../types/user.interface';
import { UserSortFields } from '../types/user.interface';
import { IDataTableAccessorProps, IDataTableRow } from '../../shared/table/components/DataTable';
import { Container, Fab, IconButton, IconButtonProps, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useGetUsers } from '../hooks/useGetUsers';
import { usePagination } from '../../shared/table/hooks/usePagination';
import { useSorting } from '../../shared/table/hooks/useSorting';
import { useCreateUser } from '../hooks/useCreateUser';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { Modal } from '../../shared/modal/Modal';
import { UserForm } from './UserForm';
import { useTranslation } from '../../i18next';

type OnClickEditFunction = (r: IDataTableRow<IUserEntity>) => void;

const RenderActions = ({
  row,
  onClickDelete,
  ...rest
}: IDataTableAccessorProps<IUserEntity> & { onClickDelete?: OnClickEditFunction } & IconButtonProps) => (
  <>
    <IconButton color="secondary" size="small" onClick={() => onClickDelete(row)} {...rest}>
      <DeleteIcon />
    </IconButton>
  </>
);

export const UsersTable = (): JSX.Element => {
  const router = useRouter();
  const { t } = useTranslation('users');
  const { action } = router.query;

  const [deleteOpen, setDeleteOpen] = useState<string | null>(null);

  const isCreate = !!(action?.[0] === 'create') || false;

  const { refetch, pageInfo, data, loading } = useGetUsers();

  const [paging, pagingProps] = usePagination({ pageInfo });
  const [sorting, sortingProps] = useSorting<UserSortFields>();

  const refetchUsers = useCallback(() => {
    refetch({ paging, sorting });
    router.push('/users');
  }, [paging, refetch, router, sorting]);

  const { createUser, loading: createLoading, serverErrors: createErrors } = useCreateUser(refetchUsers);
  const { deleteUser, loading: deleteLoading } = useDeleteUser(refetchUsers);

  const onClickDelete = useCallback((row) => setDeleteOpen(row.id), []);

  const onAcceptDelete = useCallback(() => {
    deleteUser(deleteOpen);
    setDeleteOpen(null);
  }, [deleteOpen, deleteUser]);

  useEffect(() => {
    refetch({ paging, sorting });
  }, [paging, sorting, refetch]);

  const columns = useMemo(
    () => [
      {
        accessor: 'id',
        title: 'ID',
        key: 'id',
      },
      {
        accessor: 'email',
        title: 'Email',
        key: 'email',
      },
      {
        accessor: 'role',
        title: t('USER_ROLE'),
      },
      {
        title: t('common:LITERAL_ACTIONS'),
        accessor: RenderActions,
        accessorProps: { onClickDelete, disabled: deleteLoading },
      },
    ],
    [onClickDelete, deleteLoading, t]
  );

  const DataTable = useDataTable<IUserEntity, UserSortFields>({
    columns,
    rows: data,
    loading,
    pagination: pagingProps,
    sorting: sortingProps,
  });

  return (
    <Container maxWidth={false}>
      <Modal open={deleteOpen} onCancel={() => setDeleteOpen(null)} onAccept={onAcceptDelete}>
        <Typography>{t('USERS_DELETE_CONFIRMATION_MESSAGE')}</Typography>
      </Modal>
      <Modal open={isCreate} title={t('NEW_USER')}>
        <UserForm
          initialValues={{}}
          onSubmit={createUser}
          serverErrors={createErrors}
          loading={createLoading}
          onCancel={() => router.push('/users')}
        />
      </Modal>
      <DataTable title={t('USERS_TABLE_TITLE')}>
        <Fab color="primary" size="small" onClick={() => router.push('/users/create')}>
          <AddIcon />
        </Fab>
      </DataTable>
    </Container>
  );
};
