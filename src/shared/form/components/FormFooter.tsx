import { Box, DialogActions } from '@material-ui/core';
import React from 'react';

export interface IFormFooterProps {
  children: React.ReactNode;
}

export const FormFooter = ({ children }: IFormFooterProps): JSX.Element => (
  <DialogActions>
    <Box my={2}>{children}</Box>
  </DialogActions>
);
