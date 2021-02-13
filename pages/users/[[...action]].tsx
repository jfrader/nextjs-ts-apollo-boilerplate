import React, { useEffect } from 'react';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import AddIcon from '@material-ui/icons/Add';
import { withTranslation } from '../../src/i18next';
import withAuth from '../../src/auth/hocs/withAuth';
import { PageContainer } from '../../src/layout/components/PageContainer';
import { PageContent } from '../../src/layout/components/PageContent';
import { useGetUsers } from '../../src/users/hooks/useGetUsers';
import { UsersTable } from '../../src/users/components/UsersTable';
import { useRouter } from 'next/router';
import { Dialog, DialogContent, Fab } from '@material-ui/core';
import { UserForm } from '../../src/users/components/UserForm';
import { useCreateUser } from '../../src/users/hooks/useCreateUser';
import { usePagination } from '../../src/shared/table/hooks/usePagination';
import { useSorting } from '../../src/shared/table/hooks/useSorting';
import { UserSortFields } from '../../src/users/types/user.interface';

const UsersPage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const router = useRouter();
  const { action } = router.query;

  const { refetch, pageInfo, ...getUsers } = useGetUsers();

  const [paging, pagination] = usePagination({ pageInfo });
  const [sorting, sort] = useSorting<UserSortFields>();

  const { createUser, loading, serverErrors } = useCreateUser();

  useEffect(() => {
    refetch({ paging, sorting });
  }, [paging, sorting, refetch]);

  return (
    <PageContainer>
      <Head>
        <title>{t('USERS_PAGE_TITLE')}</title>
      </Head>
      <PageContent>
        <Dialog open={action?.[0] === 'create'}>
          <DialogContent>
            <UserForm
              initialValues={{}}
              onSubmit={createUser}
              serverErrors={serverErrors}
              loading={loading}
              onCancel={() => router.push('/users')}
            />
          </DialogContent>
        </Dialog>
        <UsersTable sorting={sort} pagination={pagination} {...getUsers}>
          <Fab color="primary" size="small" onClick={() => router.push('/users/create')}>
            <AddIcon />
          </Fab>
        </UsersTable>
      </PageContent>
    </PageContainer>
  );
};

UsersPage.getInitialProps = async () => ({
  namespacesRequired: ['users'],
});

export default withAuth(withTranslation('users')(UsersPage));
