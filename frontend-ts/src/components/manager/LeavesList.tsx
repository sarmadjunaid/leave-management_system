import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import {useAppSelector} from 'hooks';

import _ from 'lodash';
import {
  useDestroyLeaveRequestMutation,
  useEditLeaveRequestMutation,
} from 'services/employee';
import {LeaveData} from 'model';
import {Grid, Typography} from '@mui/material';

const LeavesList = () => {
  const {leaves, leaveKey, flag, employeeName} = useAppSelector((state) => state.employee);

  const [destroyLeave] = useDestroyLeaveRequestMutation();
  const [editLeave] = useEditLeaveRequestMutation();

  return (
        flag ?
          <TableContainer>
            <Typography variant='h6'>
              {
                employeeName ? employeeName : 'No Employee Selected'
              }
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Accepted</TableCell>
                  <TableCell align="right">Date From</TableCell>
                  <TableCell align="right">Date To</TableCell>
                  <TableCell align="right">Number of days</TableCell>
                  <TableCell align="right">Accept/Reject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  _.map(leaves[leaveKey], (leave: LeaveData) => {
                    return (
                      <TableRow
                        key={leave.id}
                        hover
                        sx={leave.leaveAccepted ? {
                          borderColor: 'success.light',
                          borderLeftStyle: 'solid',
                          borderLeftWidth: 8,
                          bgcolor: 'palette.primary.main: #d6ffa6',
                        }: null}
                      >
                        <TableCell component="th" scope="row">
                          {leave.leaveAccepted ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="right">{leave.date_from}</TableCell>
                        <TableCell align="right">{leave.date_to}</TableCell>
                        <TableCell align="right">{leave.number_of_days}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => editLeave({id: leave.id, leaveAccepted: true})}>
                            <DoneIcon color='success' />
                          </IconButton>
                          <IconButton onClick={() => destroyLeave(leave.id)}>
                            <DeleteIcon color='error'/>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  },
                  )
                }
              </TableBody>
            </Table>
          </TableContainer> :
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '10vh'}}
          >
            <Typography variant='h6'>
              No Employee Selected
            </Typography>
          </Grid>
  );
};

export default LeavesList;
