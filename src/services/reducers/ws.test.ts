import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../../utils/constants';
import { TMessage } from '../../utils/types';
import { TWSActions } from '../actions/ws';
import { ws } from './ws';

const testPayload = new Event('test');
const testMessage = {
  success: true,
  orders: [
    {
      _id: '61e9ad4d6d7cd8001b2d17f6',
      ingredients: ['60d3b41abdacab0026a733c7'],
      status: 'pending',
      name: 'Флюоресцентный бургер',
      createdAt: '2022-01-20T18:43:25.826Z',
      updatedAt: '2022-01-20T18:43:25.996Z',
      number: 8571,
    },
    {
      _id: '61e9ab706d7cd8001b2d17f1',
      ingredients: ['60d3b41abdacab0026a733c7'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2022-01-20T18:35:28.894Z',
      updatedAt: '2022-01-20T18:35:29.213Z',
      number: 8570,
    },
    {
      _id: '61e9ab216d7cd8001b2d17ee',
      ingredients: ['60d3b41abdacab0026a733c7'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2022-01-20T18:34:09.966Z',
      updatedAt: '2022-01-20T18:34:10.455Z',
      number: 8569,
    },
  ],
  total: 3,
  totalToday: 2,
};

describe('ws reduser', () => {
  it('should return the initisl state', () => {
    expect(ws(undefined, {} as TWSActions)).toEqual({
      wsConnected: false,
      message: {},
    });
  });
  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(
      ws(undefined, { type: WS_CONNECTION_SUCCESS, payload: testPayload })
    ).toEqual({
      wsConnected: true,
      message: {},
    });
  });
  it('should handle WS_CONNECTION_ERROR', () => {
    expect(
      ws(undefined, { type: WS_CONNECTION_ERROR, payload: testPayload })
    ).toEqual({
      wsConnected: false,
      message: {},
      error: testPayload,
    });
  });
  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(
      ws(
        {
          wsConnected: true,
          message: {} as TMessage,
        },
        { type: WS_CONNECTION_CLOSED }
      )
    ).toEqual({
      wsConnected: false,
      message: {},
    });
  });
  it('should handle WS_GET_MESSAGE', () => {
    expect(
      ws(
        { wsConnected: true, message: {} as TMessage },
        { type: WS_GET_MESSAGE, payload: testMessage as TMessage }
      )
    ).toEqual({
      wsConnected: true,
      message: testMessage,
    });
  });
});
