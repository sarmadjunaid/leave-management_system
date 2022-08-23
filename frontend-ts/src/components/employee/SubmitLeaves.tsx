import {Form, Formik} from 'formik';
import {FunctionComponent} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import DateField from 'components/Fields/DateField';
import {useSaveLeavesMutation} from 'services/employee';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Typography} from '@mui/material';

const SubmitLeaves: FunctionComponent = () => {
  const navigate = useNavigate();

  const [saveLeave] = useSaveLeavesMutation();

  return (
    <Container component='main' maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Submit Leave
        </Typography>
        <Formik
          initialValues={{date_from: '', date_to: ''}}
          validationSchema={Yup.object({
            date_from: Yup.string().required('Required'),
            date_to: Yup.string().required('Required'),
          })}
          onSubmit={async (values, {setSubmitting}) => {
            const user = JSON.parse(localStorage.getItem('user') || '');
            await saveLeave({values, user});
            navigate('/employee/');
            setSubmitting(false);
          }}
        >
          <Form className="w-50" style={{marginTop: '30px'}}>
            <DateField
              label="Date From"
              name="date_from"
              type="date"
              placeholder="Enter From Date"
            />

            <DateField
              label="Date To"
              name="date_to"
              type="date"
              placeholder="Enter To Date"
            />

            <Button
              fullWidth
              variant='contained'
              type='submit'
              sx={{mt: 3, mb: 2}}
            >
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default SubmitLeaves;
