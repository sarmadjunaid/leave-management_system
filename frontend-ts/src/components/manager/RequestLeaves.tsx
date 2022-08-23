import CardComponent from 'components/employee/Card';
import {Employee} from 'model';

interface Props {
  employee: Employee;
}

const RequestedLeaves = (props: Props) => {
  return (
    <div className="container" style={{margin: '50px auto'}}>
      <CardComponent key={props.employee.id} employee={props.employee} />
    </div>
  );
};

export default RequestedLeaves;
