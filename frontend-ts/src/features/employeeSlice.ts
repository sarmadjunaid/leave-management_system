import {createSlice} from '@reduxjs/toolkit';
import {Employee, LeaveData} from 'model';
import _ from 'lodash';

interface InitialState {
  leaves: {
    [x: string]: {};
  },
  leaveKey: string
  flag: boolean
  employeeName: string[]
  leaveUpdate: boolean
  employees: Employee[]
}

const initialState: InitialState = {
  leaves: {},
  leaveKey: '',
  flag: false,
  employeeName: [],
  leaveUpdate: false,
  employees: [],
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addLeaves: (state, action) => {
      const leaveValues = _.mapValues(action.payload, (employee: Employee): LeaveData[] => {
        return employee.employee_leaves;
      });
      state.leaves = leaveValues;
    },
    addLeaveKey: (state, {payload}) => {
      state.leaveKey = payload.index;
      state.employeeName = payload.employeeName;
      state.flag = true;
    },
    setLeaveUpdate: (state) => {
      state.leaveUpdate = !state.leaveUpdate;
    },
    addEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
});

export const {
  addLeaves,
  addLeaveKey,
  setLeaveUpdate,
  addEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
