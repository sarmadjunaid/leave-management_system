import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Manager} from 'model';

const endPoints = {
  getManager: '/manager/',
};

export const managerApi = createApi({
  reducerPath: 'managerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders(headers) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      headers.set('Authorization', `Bearer ${user.access}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getManager: builder.query<Manager, void>({
      query: () => ({
        url: endPoints.getManager,
      }),
    }),


  }),
});

export const {
  useGetManagerQuery,
} = managerApi;
