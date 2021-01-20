import '../styles/globals.css';

import React, { useEffect } from 'react';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Layout } from '../src/shared/components/Layout/Layout';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps): React.ReactElement => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
