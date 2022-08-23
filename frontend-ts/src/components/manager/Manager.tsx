import CardComponent from 'components/manager/Card';
import {Spinner} from 'react-bootstrap';
import {useGetManagerQuery} from 'services/manager';
import {FunctionComponent} from 'react';
import EmployeeList from 'components/manager/EmployeeList';
import Grid from '@mui/material/Grid';
import LeavesList from './LeavesList';
import ServerError from 'components/Errors/ServerError';

const Manager: FunctionComponent = () => {
  const {data, isLoading, isSuccess, isError} = useGetManagerQuery();

  if (isLoading) return <Spinner animation="grow" />;
  return (
    (
      isError ?
      <ServerError /> :
      <Grid container columnGap={4} style={{margin: '50px auto'}}>
        <Grid item xs={1} />
        <Grid item xs={8}>
          {isSuccess ? (
            <>
              <CardComponent key={data?.id} manager={data}/>
              <LeavesList />
            </>
          ) : null}
        </Grid>
        <Grid item xs={2}>
          <EmployeeList />
        </Grid>
      </Grid>
    )
  );
};

export default Manager;
