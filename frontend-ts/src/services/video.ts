import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface Data {
  token: string
}

export const videoApi = createApi({
  reducerPath: 'videoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      headers.set('Authorization', `Bearer ${user.access}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    joinRoom: build.query<Data, string>({
      query: (roomName) => `video/join/${roomName}/`,
    }),
  }),
});

export const {
  useJoinRoomQuery,
} = videoApi;

