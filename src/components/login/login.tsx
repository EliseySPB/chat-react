import { useContext } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';

import { Context } from '../../app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const Login = () => {
  const { auth } = useContext(Context)!;

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.error('Ошибка входа: ', error);
    }
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid
          sx={{ width: '400px', height: '150px', bgcolor: 'lightgray' }}
          container
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Box>
            <Button variant={'outlined'} onClick={login}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
