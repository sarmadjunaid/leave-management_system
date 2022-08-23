import {FunctionComponent} from 'react';
import {useField} from 'formik';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import _ from 'lodash';

interface Props {
  id?: string;
  label: string;
  name: string;
  placeholder: string;
  options: string[];
}

const ChoiceField: FunctionComponent<Props> = ({label, options, ...props}) => {
  const [field, meta] = useField(props);

  let errorFlag = false;
  let errorMessage;

  if (meta.touched && meta.error) {
    errorFlag=true;
    errorMessage=meta.error;
  }

  return (
    <FormControl
      fullWidth
      variant='standard'
      size='small'
      margin='dense'
    >
      <InputLabel id={props.id || props.name + '-label'} error={errorFlag}>{label}</InputLabel>
      <Select
        fullWidth
        labelId={props.id || props.name + '-label'}
        id={props.id || props.name}
        label={label}
        error={errorFlag}
        {...field}
        {...props}
      >
        {_.map(options, (option, index) => {
          return (
            <MenuItem value={option} key={index}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText error>{errorMessage}</FormHelperText>
    </FormControl>
  );
};

export default ChoiceField;
