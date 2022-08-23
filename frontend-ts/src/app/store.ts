import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import authenticationSlice, {logout} from 'features/authenticationSlice';
import employeeSlice from 'features/employeeSlice';
import messagesSlice from 'features/messagesSlice';
import videoSlice from 'features/videoSlice';
import {authApi} from 'services/authentication';
import {employeeApi} from 'services/employee';
import {managerApi} from 'services/manager';
import {chatApi} from 'services/message';
import {videoApi} from 'services/video';

const combineReducer = combineReducers({
  authentication: authenticationSlice,
  employee: employeeSlice,
  message: messagesSlice,
  video: videoSlice,
  [authApi.reducerPath]: authApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [managerApi.reducerPath]: managerApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [videoApi.reducerPath]: videoApi.reducer,
});

const rootReducer = (state: any, action: AnyAction) => {
  if (logout.match(action)) {
    state = undefined;
  }

  return combineReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
        chatApi.middleware,
        authApi.middleware,
        employeeApi.middleware,
        managerApi.middleware,
        videoApi.middleware,
    );
  },
});

export default rootReducer;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);
