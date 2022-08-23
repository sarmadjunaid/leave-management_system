import {Manager} from 'model';

import Card from '@mui/material/Card';
import CardContetent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import deepPurple from '@mui/material/colors/deepPurple';

interface Props {
  manager: Manager;
}

const CardComponent = (props: Props) => {
  return (
    <Card>
      <CardContetent>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt={props.manager.user?.username}
            src='/'
            sx={{
              bgcolor: deepPurple[500],
              width: 56,
              height: 56,
            }}
          />
          <Typography variant="h5" component="div">
            {props.manager.user?.username}
          </Typography>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
            {props.manager.user?.email}
          </Typography>
          <Chip variant="outlined" color="info" label={props.manager.department?.name} />
        </Container>
      </CardContetent>
    </Card>
  );
};

export default CardComponent;
