import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
    roomName: string
    tracks: HTMLVideoElement | HTMLAudioElement | null
}

const initialState: InitialState = {
  roomName: '',
  tracks: null,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addRoomName: (state, action) => {
      state.roomName = action.payload;
    },
  },
});

export const {
  addRoomName,
} = videoSlice.actions;

export default videoSlice.reducer;
