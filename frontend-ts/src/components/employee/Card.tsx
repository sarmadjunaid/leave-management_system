import {FunctionComponent} from 'react';
import AccordianComponent from 'components/employee/Accordian';
import {Employee} from 'model';

import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';

import {deepPurple} from '@mui/material/colors';

interface Props {
  employee: Employee;
}

const CardComponent: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Card sx={{width: '50rem', margin: 'auto'}}>
        <CardContent>
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt={props.employee.user?.username}
              src='/'
              sx={{
                bgcolor: deepPurple[500],
                width: 56,
                height: 56,
              }}
            />
            <Typography variant="h5" component="div">
              {props.employee.user?.username}
            </Typography>
            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
              {props.employee.user?.email}
            </Typography>
            <Chip variant="outlined" color="info" label={props.employee.department?.name} />
          </Container>
          <AccordianComponent leaves={props.employee.employee_leaves} />
        </CardContent>
      </Card>
    </>
  );
};

export default CardComponent;
