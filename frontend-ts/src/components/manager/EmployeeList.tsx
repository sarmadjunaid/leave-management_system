import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import deepOrange from '@mui/material/colors/deepOrange';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import {useGetManagersEmployeeQuery} from 'services/employee';
import {addLeaves, addLeaveKey, addEmployees} from 'features/employeeSlice';
import {useAppDispatch} from 'hooks';
import _ from 'lodash';
import {useEffect} from 'react';


const EmployeeList = () => {
  const {data, isSuccess} = useGetManagersEmployeeQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addLeaves(data));
    dispatch(addEmployees(data));
  });

  return (
    <Card>
      <CardHeader
        title="Employees"
      />
      <Divider light variant='middle' />
      <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        {
            isSuccess ?
            _.map(data, (employee, index) => {
              const labelId = `list-secondary-label-${employee.id}`;
              return (
                <ListItem key={employee.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      const payload = {
                        index: index,
                        employeeName: employee.user?.username,
                      };
                      dispatch(addLeaveKey(payload));
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src='/' alt={employee.user?.username} sx={{bgcolor: deepOrange[500]}} />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={employee.user?.username} secondary={employee.user?.email} />
                    {employee.employee_leaves.length}
                  </ListItemButton>
                </ListItem>
              );
            }) :
            null
        }
      </List>
    </Card>);
};

export default EmployeeList;
