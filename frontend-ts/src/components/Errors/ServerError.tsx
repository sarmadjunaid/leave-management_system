import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';

const ServerError = () => {
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
        Opps! Something went wrong
      </Typography>
      <SickOutlinedIcon
        color='error'
        fontSize='large'
      />
    </Grid>
  );
};

export default ServerError;
