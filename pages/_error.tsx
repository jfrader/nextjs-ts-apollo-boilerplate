import React from 'react';
import { Container } from '@material-ui/core';
import Head from 'next/head';
import { useAuth } from '../src/auth/hooks/useAuth';
import { withTranslation } from '../src/i18next';

const ErrorPage = (): React.ReactElement => {
  useAuth();
  return (
    <Container>
      <Head>
        <title>ERROR</title>
      </Head>
      <Container>ERROR</Container>
    </Container>
  );
};

ErrorPage.getInitialProps = async () => ({
  namespacesRequired: ['error'],
});

export default withTranslation('error')(ErrorPage);
