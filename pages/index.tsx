import React from 'react';
import { Container, Typography } from '@material-ui/core';
import Head from 'next/head';

export default function Home(): React.ReactElement {
  return (
    <Container>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Typography>it works!</Typography>
      </Container>
    </Container>
  );
}
