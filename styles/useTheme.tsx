import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { useCallback, useEffect, useState } from 'react';

export enum EThemes {
  DEFAULT = 'default',
  DEFAULT_DARK = 'default-dark',
}

export const useTheme = (theme: EThemes): Theme => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(createMuiTheme());

  const setTheme = useCallback((r: { default: Theme }) => setCurrentTheme(createMuiTheme(r.default)), []);

  useEffect(() => {
    import(__dirname + `/themes/${theme}`).then(setTheme).catch((e) => {
      throw e;
    });
  }, [setTheme, theme]);

  return currentTheme;
};
