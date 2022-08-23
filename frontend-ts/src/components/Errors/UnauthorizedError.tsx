import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Link from '@mui/material/Link';


const UnauthorizedError = () => {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      mt={10}
    >
      <Typography variant='h4'>
        Opps! Seems like you are not Authorized
      </Typography>
      <BlockOutlinedIcon
        color='error'
        fontSize='large'
      />
      <Typography
        mt={5}
        variant='h6'
      >
        Please <Link href='/'>Login In</Link> or <Link href='/register'>Create an account</Link>
      </Typography>
    </Grid>
  );
};

export default UnauthorizedError;
