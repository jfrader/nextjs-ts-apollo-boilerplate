import { Box, TextField } from '@material-ui/core';
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
  <Box py={2} px={1}>
    <TextField
      variant="outlined"
      type={type}
      fullWidth
      aria-invalid={error ? 'true' : 'false'}
      error={!!error}
      helperText={error?.message}
      onChange={onChange}
      value={value}
    />
  </Box>
);
