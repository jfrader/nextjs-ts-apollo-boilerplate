import React from 'react';
import { Box, Button, ButtonProps } from '@material-ui/core';

type ISubmitButton = ButtonProps & { children: React.ReactNode };

export const SubmitButton = ({ children, ...rest }: ISubmitButton): JSX.Element => (
  <Box display="inline" px={1}>
    <Button {...rest} variant="contained" color="primary" type="submit">
      {children}
    </Button>
  </Box>
);
