import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { withTranslation } from '../src/i18next';
import withAuth from '../src/auth/hocs/withAuth';
import { useMe } from '../src/auth/hooks/useMe';

const HomePage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const { email } = useMe();
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Box p={4}>
          <Typography display="inline" variant="subtitle1">
            {t('WELCOME_LITERAL')}{' '}
          </Typography>
          <Typography display="inline" variant="subtitle2">
            {email}
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};

HomePage.getInitialProps = async () => ({
  namespacesRequired: ['home'],
});

export default withAuth(withTranslation('home')(HomePage));
