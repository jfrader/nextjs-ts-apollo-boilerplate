import React, { useEffect, useMemo } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../src/auth/hooks/useLogin';
import { useRouter } from 'next/router';
import { useAuth } from '../src/auth/hooks/useAuth';
import { withTranslation } from '../src/i18next';

const LoginPage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const router = useRouter();
  const { isLogged } = useAuth();
  const { login, loading } = useLogin(() => router.push('/'));

  useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  }, [isLogged, router]);

  const LoginSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required(t('REQUIRED_EMAIL')),
        password: yup.string().required(t('REQUIRED_PASSWORD')),
      }),
    [t]
  );

  const { handleSubmit, errors, control } = useForm({ resolver: yupResolver(LoginSchema) });

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <Container>
        <form onSubmit={handleSubmit(login)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                variant="outlined"
                type="email"
                aria-invalid={errors.email ? 'true' : 'false'}
                helperText={errors.email && errors.email.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                variant="outlined"
                type="password"
                aria-invalid={errors.password ? 'true' : 'false'}
                helperText={errors.password && errors.password.message}
                onChange={onChange}
                value={value}
              />
            )}
          />

          <Button variant="outlined" disabled={loading} type="submit">
            Login
          </Button>
        </form>
      </Container>
    </Container>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withTranslation('login')(LoginPage);
