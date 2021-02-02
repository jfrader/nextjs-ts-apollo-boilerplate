import { Box, Container } from '@material-ui/core';
import React from 'react';

interface IPageContentProps {
  children?: React.ReactNode;
}

export const PageContent = ({ children = null }: IPageContentProps): React.ReactElement => {
  return (
    <Container maxWidth={false}>
      <Box pb={1}>{children}</Box>
    </Container>
  );
};
