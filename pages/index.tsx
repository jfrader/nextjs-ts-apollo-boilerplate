import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { useAuth } from '../src/auth/hooks/useAuth';
import { withTranslation } from '../src/i18next';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  useAuth();
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Typography>{t('TEST_LOCALE')}</Typography>
      </Container>
    </Container>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['home'],
});

export default withTranslation('home')(HomePage);
