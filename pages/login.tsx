import React, { useMemo } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../src/auth/hooks/useLogin';
import { withTranslation } from '../src/i18next';
import withoutAuth from '../src/auth/hocs/withoutAuth';

const LoginPage = ({ t }: { readonly t: TFunction }): React.ReactElement => {
  const { login, loading } = useLogin();

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
            {t('LITERAL_LOGIN')}
          </Button>
        </form>
      </Container>
    </Container>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withoutAuth(withTranslation('login')(LoginPage));
