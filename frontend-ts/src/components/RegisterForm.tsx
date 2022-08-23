import {Form, Formik} from 'formik';
import {FunctionComponent} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useRegisterMutation} from 'services/authentication';
import TextInputField from 'components/Fields/TextField';
import ChoiceField from 'components/Fields/ChoiceField';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockedOutlineIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface Values {
  email: string;
  password: string;
  password2: string;
  profile_type: string;
  department: string;
}

const RegisterForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [register, {isError}] = useRegisterMutation();

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockedOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            password2: '',
            profile_type: '',
            department: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string().required('Required'),
            password2: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords do not match'),
            profile_type: Yup.string().required('Required'),
            department: Yup.string().required('Required'),
          })}
          onSubmit={async (values: Values, {setSubmitting}) => {
            register(values);
            navigate('/');
            setSubmitting(false);
          }}
        >
          <Form className="w-50">
            <TextInputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email address"
              required
            />

            <TextInputField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />

            <TextInputField
              label="Re-Enter Password"
              name="password2"
              type="password"
              placeholder="Enter your password again"
              required
            />

            <ChoiceField
              label="Profile Type"
              name="profile_type"
              placeholder="Select profile type"
              options={['Employee', 'Manager']}
            />

            <ChoiceField
              label="Department"
              name="department"
              placeholder="Select department"
              options={['Marketing', 'Accounts', 'Technical', 'Sales']}
            />

            {isError ? <p style={{color: 'red'}}>Something went wrong, please try again!</p> : null}

            <Button
              fullWidth
              variant="contained"
              type='submit'
              sx={{mt: 3, mb: 2}}
            >
              Register
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default RegisterForm;
