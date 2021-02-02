import { TextField } from '@material-ui/core';
import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface ITextInputProps {
  type: string;
  onChange(): void;
  value?: string | null;
  name: string;
  error: FieldErrors;
}

export const TextInput = ({ onChange, value, error, type = 'text' }: ITextInputProps): React.ReactElement => (
  <TextField
    variant="outlined"
    type={type}
    aria-invalid={error ? 'true' : 'false'}
    error={!!error}
    helperText={error?.message}
    onChange={onChange}
    value={value}
  />
);
