import {
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_START_PERSON,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../../utils/constants';

export interface wsConnectionStartAll {
  readonly type: typeof WS_CONNECTION_START_ALL;
}
export interface wsConnectionStartPerson {
  readonly type: typeof WS_CONNECTION_START_PERSON;
  readonly payload: string;
}
export interface wsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
   readonly payload: Event;
}
export interface wsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}
export interface wsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface wsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: string;
}
export interface wsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: string[];
}

export type TWSActions =
  | wsConnectionStartAll
  | wsConnectionStartPerson
  | wsConnectionSuccess
  | wsConnectionError
  | wsConnectionClosed
  | wsGetMessage
  | wsSendMessage;
