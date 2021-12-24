import type { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_PERSON,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../../utils/constants';

import type { TAppActions, TRootState, AppDispatch } from '../../utils/types';
import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TAppActions) => {
      console.log('action');
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START_ALL) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === WS_CONNECTION_START_PERSON) {
        const token = getCookie('accessToken');
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: WS_GET_MESSAGE, payload: parsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const { payload } = action;
          const message = payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
