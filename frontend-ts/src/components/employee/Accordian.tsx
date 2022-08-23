import React, {FunctionComponent} from 'react';
import {LeaveData} from 'model';
import _ from 'lodash';

import Accordian from '@mui/material/Accordion';
import AccordianSummary from '@mui/material/AccordionSummary';
import AcordianDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

interface Props {
  leaves: LeaveData[];
}

const AccordianComponent: FunctionComponent<Props> = (props) => {
  return (
    <Accordian
      sx={{
        mt: 2,
      }}
    >
      <AccordianSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant='h6'>
              Leaves Submitted {props.leaves.length}
        </Typography>
      </AccordianSummary>
      {_.map(props.leaves, (leave, index) => {
        return (
          <><AcordianDetails
            sx={leave.leaveAccepted ? {
              borderColor: 'success.light',
              borderLeftStyle: 'solid',
              borderLeftWidth: 8,
              bgcolor: 'palette.primary.main: #d6ffa6',
            }: null}>
            <List>
              <ListItem>
                <Typography>
                    From: {leave.date_from}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                    To: {leave.date_to}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                    Number of days: {leave.number_of_days}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>
                    Accepted: {leave.leaveAccepted ? 'Yes' : 'No'}
                </Typography>
              </ListItem>
            </List>
          </AcordianDetails><Divider variant='middle' /></>
        );
      })
      }
    </Accordian>
  );
};

export default AccordianComponent;
