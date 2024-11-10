import { Container, Grid } from '@mui/material';

export const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Grid container alignItems={'center'} justifyContent={'center'}>
          <div className="lds-heart">
            <div></div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
