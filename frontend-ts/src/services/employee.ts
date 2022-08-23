import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Employee} from 'model';

interface Data {
  id: number,
  leaveAccepted: boolean,
};

interface LeaveData {
  date_from: string,
  date_to: string,
  employee: number
}

const endPoints = {
  getEmployee: '/employee/',
  saveLeaves: '/employee/leave_request/',
  managersEmployees: '/manager/requested_leaves/',
};

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      headers.set('Authorization', `Bearer ${user.access}`);
      return headers;
    },
  }),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    getEmployee: builder.query<Employee, void>({
      query: () => ({
        url: endPoints.getEmployee,
      }),
      providesTags: ['Employee'],
    }),
    saveLeaves: builder.mutation({
      query: (body) => {
        const leaveData: LeaveData = {
          date_from: body.values.date_from,
          date_to: body.values.date_to,
          employee: body.user.id,
        };
        return {
          url: endPoints.saveLeaves,
          method: 'POST',
          body: leaveData,
          credentials: 'include',
        };
      },
      invalidatesTags: ['Employee'],
    }),
    getManagersEmployee: builder.query<Employee[], void>({
      query: () => ({
        url: endPoints.managersEmployees,
      }),
      providesTags: ['Employee'],
    }),
    editLeaveRequest: builder.mutation<void, Data>({
      query: (data) => ({
        url: `${endPoints.managersEmployees}${data.id}/`,
        method: 'PATCH',
        body: {
          'leaveAccepted': data.leaveAccepted,
        },
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Employee'],
    }),
    destroyLeaveRequest: builder.mutation({
      query: (id) => ({
        url: `${endPoints.managersEmployees}${id}/`,
        method: 'delete',
        credentials: 'include',
      }),
      invalidatesTags: ['Employee'],
    }),
  }),
});


export const {
  useGetEmployeeQuery,
  useSaveLeavesMutation,
  useDestroyLeaveRequestMutation,
  useEditLeaveRequestMutation,
  useGetManagersEmployeeQuery,
} = employeeApi;
