import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
    message: string
}

const initialState: InitialState = {
  message: '',
};

export const messagesSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {addMessage} = messagesSlice.actions;

export default messagesSlice.reducer;
