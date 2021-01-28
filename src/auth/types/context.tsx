import React from 'react';

export type IAuthContext = {
  isLogged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
};
