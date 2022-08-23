import {useField} from 'formik';
import {FunctionComponent} from 'react';
import TextField from '@mui/material/TextField';

interface Props {
  id?: string;
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

const TextInputField: FunctionComponent<Props> = ({label, ...props}) => {
  const [field, meta] = useField(props);
  let errorFlag = false;
  let errorMessage;

  if (meta.touched && meta.error) {
    errorFlag=true;
    errorMessage=meta.error;
  }

  return (
    <TextField
      fullWidth
      id={props.id || props.name}
      label={label}
      variant="standard"
      size='small'
      margin='dense'
      error={errorFlag}
      helperText={errorMessage}
      {...field}
      {...props}
    />
  );
};

export default TextInputField;
