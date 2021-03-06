import React from 'react';
import { Typography } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../src/i18next';
import withAuth from '../src/auth/hocs/withAuth';
import { useMe } from '../src/auth/hooks/useMe';
import { PageContainer } from '../src/layout/components/PageContainer';
import { PageContent } from '../src/layout/components/PageContent';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const { email } = useMe();
  return (
    <PageContainer>
      <Head>
        <title>Home</title>
      </Head>
      <PageContent>
        <Typography display="inline" variant="subtitle1">
          {t('WELCOME_LITERAL')}{' '}
        </Typography>
        <Typography display="inline" variant="subtitle2">
          {email}
        </Typography>
      </PageContent>
    </PageContainer>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['home'],
});

export default withAuth(withTranslation('home')(HomePage));
