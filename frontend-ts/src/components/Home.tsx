import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {ButtonGroup} from '@mui/material';

import {useAuth0} from '@auth0/auth0-react';


const Home = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <Grid container>
      <Grid xs={2}>
      </Grid>
      <Grid xs={8} mt={20} sx={{textAlign: 'center'}}>
        <Typography variant="h3">
                  Hello!
        </Typography>
        <Typography variant="h4">
                  And welcome to Leave Management System
        </Typography>
        <ButtonGroup
          size='large'
          variant="text"
          aria-label="text button group"
          sx={{marginTop: '40px', borderRadius: '5px'}}>
          <Button onClick={() => loginWithRedirect()}>Login</Button>
          <Button>Register</Button>
        </ButtonGroup>
      </Grid>
      <Grid xs={2}>
      </Grid>
    </Grid>
  );
};

export default Home;
