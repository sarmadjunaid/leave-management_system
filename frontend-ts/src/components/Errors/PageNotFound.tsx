import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

const PageNotFound = () => {
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
        404 Page Not Found
      </Typography>
      <ReportOutlinedIcon
        color='error'
        fontSize='large'
      />
    </Grid>
  );
};

export default PageNotFound;
