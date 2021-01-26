import React from 'react';
import { Container } from '@material-ui/core';
import Head from 'next/head';
import { TFunction, withTranslation } from 'next-i18next';
import { useAuth } from '../src/auth/hooks/useAuth';

const ErrorPage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
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
