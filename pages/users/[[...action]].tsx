import React from 'react';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../../src/i18next';
import withAuth from '../../src/auth/hocs/withAuth';
import { PageContainer } from '../../src/layout/components/PageContainer';
import { PageContent } from '../../src/layout/components/PageContent';
import { UsersTable } from '../../src/users/components/UsersTable';

const UsersPage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  return (
    <PageContainer>
      <Head>
        <title>{t('USERS_PAGE_TITLE')}</title>
      </Head>
      <PageContent>
        <UsersTable />
      </PageContent>
    </PageContainer>
  );
};

UsersPage.getInitialProps = async () => ({
  namespacesRequired: ['users'],
});

export default withAuth(withTranslation('users')(UsersPage));
