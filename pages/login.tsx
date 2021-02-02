import React, { useMemo } from 'react';
import { Button } from '@material-ui/core';
import Head from 'next/head';
import { TFunction } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLogin } from '../src/auth/hooks/useLogin';
import { withTranslation } from '../src/i18next';
import { PageContainer } from '../src/layout/components/PageContainer';
import { PageContent } from '../src/layout/components/PageContent';
import withoutAuth from '../src/auth/hocs/withoutAuth';
import { TextInput } from '../src/shared/components/form/TextInput';

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
    <PageContainer>
      <Head>
        <title>Login</title>
      </Head>
      <PageContent>
        <form onSubmit={handleSubmit(login)}>
          <Controller
            name="email"
            control={control}
            render={(props) => <TextInput {...props} error={errors?.email} type="email" />}
          />
          <Controller
            name="password"
            control={control}
            render={(props) => <TextInput {...props} error={errors?.password} type="password" />}
          />
          <Button variant="outlined" disabled={loading} type="submit">
            {t('LITERAL_LOGIN')}
          </Button>
        </form>
      </PageContent>
    </PageContainer>
  );
};

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
});

export default withoutAuth(withTranslation('login')(LoginPage));
