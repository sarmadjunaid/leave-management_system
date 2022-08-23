import {Form, Formik} from 'formik';
import {FunctionComponent, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import TextInputField from 'components/Fields/TextField';
import {useLoginMutation} from 'services/authentication';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockedOutlineIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {hasJWT, isManager} from 'features/utils';


interface Values {
  email: string;
  password: string;
}


const LoginForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [login, {data, isSuccess, isError}] = useLoginMutation();

  if (isSuccess && data) {
    localStorage.setItem('user', JSON.stringify(data));
    data.isManager ? navigate('/manager/') : navigate('/employee/');
  }

  useEffect(() => {
    if (hasJWT()) {
      if (isManager()) {
        navigate('/manager/');
      } else {
        navigate('/employee/');
      }
    }
  });
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
          Sign In
        </Typography>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={async (values: Values, {setSubmitting}) => {
            await login(values);
            setSubmitting(false);
          }}
        >
          <Form className="w-50" >
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

            {isError ?
                <p style={{color: 'red'}}>Something went wrong while authenticating, please try again!</p> :
                null}

            <Button
              fullWidth
              variant="contained"
              type='submit'
              sx={{mt: 3, mb: 2}}
            >
              Login
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default LoginForm;
