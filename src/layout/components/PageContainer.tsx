import { Box, Container } from '@material-ui/core';
import React from 'react';

interface IPageContainerProps {
  children?: React.ReactNode;
}

export const PageContainer = ({ children = null }: IPageContainerProps): React.ReactElement => {
  return (
    <Container maxWidth="xl">
      <Box pt={4} px={2} pb={2}>
        {children}
      </Box>
    </Container>
  );
};
