import React, { useMemo } from 'react';
import * as yup from 'yup';
import { IUserEntity } from '../types/user.interface';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from '../../i18next';
import { Controller, useForm } from 'react-hook-form';
import { Container } from '@material-ui/core';
import { TextInput } from '../../shared/form/components/TextInput';
import { CancelButton } from '../../shared/form/components/CancelButton';
import { SubmitButton } from '../../shared/form/components/SubmitButton';
import { FormFooter } from '../../shared/form/components/FormFooter';

interface IUserFormFields extends Pick<IUserEntity, 'email' | 'role'> {
  id?: string;
  password: string;
}

interface IUserFormProps {
  initialValues: Partial<IUserFormFields>;
  serverErrors: string[];
  loading: boolean;
  onSubmit(values: IUserFormFields): void;
  onCancel(): void;
}

export function UserForm({ initialValues, loading, onSubmit, onCancel }: IUserFormProps): JSX.Element {
  const { t } = useTranslation('users');

  const UserSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required(t('REQUIRED_EMAIL')),
        password: yup.string().required(t('REQUIRED_PASSWORD')),
        role: yup.string(),
      }),
    [t]
  );

  const { handleSubmit, errors, control } = useForm<IUserFormFields>({
    resolver: yupResolver(UserSchema),
    defaultValues: initialValues,
  });

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={(props) => <TextInput {...props} error={errors?.email} type="email" label="Email" />}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={(props) => <TextInput {...props} error={errors?.password} type="password" label="Password" />}
        />
        <FormFooter>
          <CancelButton disabled={loading} onClick={onCancel}>
            {t('common:LITERAL_CANCEL')}
          </CancelButton>
          <SubmitButton disabled={loading}>{t('SAVE_USER')}</SubmitButton>
        </FormFooter>
      </form>
    </Container>
  );
}
