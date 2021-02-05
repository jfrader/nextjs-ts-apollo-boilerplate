import React from 'react';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../src/i18next';
import withAuth from '../src/auth/hocs/withAuth';
import { PageContainer } from '../src/layout/components/PageContainer';
import { PageContent } from '../src/layout/components/PageContent';
import { useGetUsers } from '../src/users/hooks/useGetUsers';
import { UsersTable } from '../src/users/components/UsersTable';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const { data, refetch, pageInfo } = useGetUsers();
  return (
    <PageContainer>
      <Head>
        <title>{t('USERS_PAGE_TITLE')}</title>
      </Head>
      <PageContent>
        <UsersTable refetch={refetch} data={data} pageInfo={pageInfo} />
      </PageContent>
    </PageContainer>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['users'],
});

export default withAuth(withTranslation('users')(HomePage));
