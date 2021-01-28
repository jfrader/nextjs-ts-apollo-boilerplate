import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../src/i18next';
import withAuth from '../src/auth/hocs/withAuth';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
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

export default withAuth(withTranslation('home')(HomePage));
