import {FunctionComponent} from 'react';
import CardComponent from 'components/employee/Card';
import {Spinner} from 'react-bootstrap';
import {useGetEmployeeQuery} from 'services/employee';
import ServerError from 'components/Errors/ServerError';

const Profile: FunctionComponent = () => {
  const {data, isSuccess, isLoading, isError} = useGetEmployeeQuery();

  if (isLoading) return <Spinner animation="grow" />;

  return (
      isError ?
      <ServerError /> :
      <div className="container" style={{margin: '50px auto'}}>
        <h2>Profile</h2>
        {isSuccess ? (
          <CardComponent key={data?.id} employee={data} />
        ) : null}
      </div>
  );
};

export default Profile;
