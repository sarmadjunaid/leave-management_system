import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export type Roomname = object

export interface Message {
  channel?: string
  message: string
  sender: {username: string}
  receiver: {username: string},
}

interface SendMessage {
  channel?: string
  message: string
  sender: number
  receiver: number,
}


export const chatApi = createApi({
  reducerPath: 'messageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem('user') || '');
      headers.set('Authorization', `Bearer ${user.access}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMessage: build.query<Message[], SendMessage>({
      query: ({channel}) => `chat/message/${channel}/`,
      async onCacheEntryAdded(
          arg,
          {updateCachedData, cacheDataLoaded, cacheEntryRemoved},
      ) {
        const ws = new WebSocket(`ws://localhost:8000/chat/${arg.channel}/`);

        try {
          await cacheDataLoaded;

          // receive message from websocket
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            updateCachedData((draft) => {
              draft.push(data);
            });
          };


          ws.addEventListener('message', listener);

          // send message to websokcet
          if (arg.message) {
            ws.send(JSON.stringify({
              'message': arg.message,
              'sender': arg.sender,
              'receiver': arg.receiver,
            }));
          }
        } catch {

        }

        await cacheEntryRemoved;

        ws.close();
      },
    }),
  }),
});

export const {
  useGetMessageQuery,
} = chatApi;

