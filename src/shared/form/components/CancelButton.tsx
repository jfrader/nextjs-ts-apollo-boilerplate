import React from 'react';
import { Box, Button, ButtonProps } from '@material-ui/core';

type ICancelButton = ButtonProps & { children: React.ReactNode };

export const CancelButton = ({ children, ...rest }: ICancelButton): JSX.Element => (
  <Box display="inline" px={1}>
    <Button {...rest} variant="contained" color="secondary">
      {children}
    </Button>
  </Box>
);
