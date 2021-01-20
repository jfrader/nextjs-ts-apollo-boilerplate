import React from 'react';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};
