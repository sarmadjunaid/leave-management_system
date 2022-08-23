import {createSlice} from '@reduxjs/toolkit';


interface Authstate {
  userAuthenticated: boolean;
  name: string;
  password: string;
  errorMessage: string;
  isManager: boolean;
}

const initialState: Authstate | undefined = {
  userAuthenticated: false,
  name: '',
  password: '',
  errorMessage: '',
  isManager: false,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: (state: Authstate) => {
      state.userAuthenticated = !state.userAuthenticated;
      localStorage.removeItem('user');
    },
    authenticate: (state: Authstate) => {
      if (localStorage.getItem('user')) {
        state.isManager = JSON.parse(
            localStorage.getItem('user') || '',
        ).isManager;
      }
      state.userAuthenticated = true;
    },
  },
});

export const {logout, authenticate} = authenticationSlice.actions;

export default authenticationSlice.reducer;
