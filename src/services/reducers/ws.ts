import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../utils/constants';
import { TMessage } from '../../utils/types';
import { TWSActions } from '../actions/ws';

type TWSState = {
  wsConnected: boolean;
  message: TMessage;

  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  message: {} as TMessage,
};

export const ws = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        message: action.payload,
      };
    default:
      return state;
  }
};
