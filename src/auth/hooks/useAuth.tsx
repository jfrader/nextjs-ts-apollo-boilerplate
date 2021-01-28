import React from 'react';
import { IAuthContext } from '../types/context';
import { AuthContext } from '../providers/AuthProvider';

export function useAuth(): IAuthContext {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useIsLogged(): boolean {
  const context = useAuth();
  return context.isLogged;
}
