import { Box, TextField, TextFieldProps } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { FieldErrors } from 'react-hook-form';

interface ITextInputProps {
  type: string;
  onChange(): void;
  value?: string | null;
  name: string;
  error: FieldErrors;
}

type TextInputProps = ITextInputProps & Omit<TextFieldProps, 'error'>;

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(function TextInput(
  { onChange, value, error, type = 'text', ...rest }: TextInputProps,
  ref
) {
  return (
    <Box py={2} px={1}>
      <TextField
        ref={ref}
        variant="outlined"
        type={type}
        fullWidth
        aria-invalid={error ? 'true' : 'false'}
        error={!!error}
        helperText={error?.message}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </Box>
  );
});
