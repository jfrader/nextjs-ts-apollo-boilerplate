import '../styles/globals.css';

import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { Layout } from '../src/layout/components/Layout';
import theme from '../styles/theme';
import { client } from '../src/apollo.client';
import { appWithTranslation } from '../src/i18next';
import { SnackbarProvider } from 'notistack';
import App from 'next/app';
import cookie from 'cookie';
import { CookieMessage } from '../src/auth/types/cookie';
import { AuthProvider } from '../src/auth/providers/AuthProvider';

const MyApp = ({ Component, pageProps, isLogged }: AppProps): React.ReactElement => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider logged={isLogged}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  let isLogged = false;
  const request = appContext.ctx.req as CookieMessage;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    isLogged = !!request.cookies.Authentication;
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, isLogged };
};

export default appWithTranslation(MyApp);
