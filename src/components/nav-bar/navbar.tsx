import { useContext } from 'react';
import { AppBar, Box, Toolbar, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Context } from '../../app';

export const Navbar = () => {
  const { auth } = useContext(Context)!;
  const [user] = useAuthState(auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'flex-end' }} variant="dense">
          {user ? (
            <NavLink to="/chat">
              <Button
                onClick={() => auth.signOut()}
                color="inherit"
                variant="outlined"
              >
                Escape
              </Button>
            </NavLink>
          ) : (
            <NavLink to="/login">
              <Button color="inherit" variant="outlined">
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
