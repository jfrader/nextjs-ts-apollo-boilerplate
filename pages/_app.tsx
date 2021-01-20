import '../styles/globals.css';

import React from 'react';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Layout } from '../components/Layout/Layout';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
