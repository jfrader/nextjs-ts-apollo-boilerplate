import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Head from 'next/head';
import { TFunction, withTranslation } from 'next-i18next';

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

export default withTranslation('home')(HomePage);
