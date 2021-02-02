import React from 'react';
import { TopBar } from './TopBar';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps): React.ReactElement => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};
