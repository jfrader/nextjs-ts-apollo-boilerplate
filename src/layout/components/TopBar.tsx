import React, { useCallback, useMemo, useState } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '../../layout/components/Link';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useLogout } from '../../auth/hooks/useLogout';
import { useTranslation } from '../../i18next';
import { useAuth } from '../../auth/hooks/useAuth';
import { Box, Button, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const TopBar: React.FC = () => {
  const classes = useStyles();

  const { t } = useTranslation(['nav', 'common']);
  const { isLogged } = useAuth();
  const { logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const menuId = 'account-menu';
  const renderMenu = useMemo(
    () => (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={logout}>{t('login:LITERAL_LOGOUT')}</MenuItem>
      </Menu>
    ),
    [anchorEl, isMenuOpen, handleMenuClose, logout, t]
  );

  return (
    <div className={classes.grow}>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box onClick={() => setDrawerOpen(false)} p={4}>
          <List>
            <ListItem button component={Link} href="/">
              <ListItemText>{t('nav:NAV_HOME')}</ListItemText>
            </ListItem>
            <ListItem button component={Link} href="/users">
              <ListItemText>{t('nav:NAV_USERS')}</ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography component={Link} href="/" className={classes.title} variant="h6" noWrap>
            PenProp Admin
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div>
            {isLogged ? (
              <IconButton
                edge="end"
                aria-label="my account"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Button aria-label="login" color="inherit" component={Link} href="/login">
                {t('login:LITERAL_LOGIN')}
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
