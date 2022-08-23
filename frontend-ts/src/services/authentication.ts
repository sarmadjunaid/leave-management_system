import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface Body {
    email: string;
    password: string;
}

interface Values extends Body {
    password2: string;
    profile_type: string;
    department: string;
}

interface AuthUser {
    access: string,
    refresh: string,
    id: number,
    isManager: boolean,
}


const endPoints = {
  login: '/api/token/',
  register: '/user/register/',
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: '/'}),
  tagTypes: ['token'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthUser, Body>({
      query: (body) => {
        return {
          url: endPoints.login,
          method: 'post',
          body,
          credentials: 'include',
        };
      },
      invalidatesTags: ['token'],
    }),
    register: builder.mutation<void, Values>({
      query: (body) => {
        return {
          url: endPoints.register,
          method: 'post',
          body,
          credentials: 'include',
        };
      },
    }),
    logout: builder.mutation<void, AuthUser>({
      query: (body) => {
        return {
          url: '/user/logout/',
          method: 'post',
          body,
          headers: {
            'Authorization': `Bearer ${body.access}`,
          },
          credentials: 'include',
        };
      },
    }),
  }),
});


export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
