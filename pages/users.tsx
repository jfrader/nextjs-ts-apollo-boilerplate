import React from 'react';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../src/i18next';
import withAuth from '../src/auth/hocs/withAuth';
import { PageContainer } from '../src/layout/components/PageContainer';
import { PageContent } from '../src/layout/components/PageContent';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  return (
    <PageContainer>
      <Head>
        <title>Users Dashboard</title>
      </Head>
      <PageContent>Users...</PageContent>
    </PageContainer>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['users'],
});

export default withAuth(withTranslation('users')(HomePage));
