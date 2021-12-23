import { Location } from 'history';
import { Key } from 'react';
import { compose, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  TSetCurrentTab,
  TConstructorActions,
  TGetIngredientsActions,
} from '../services/actions';
import { TUserActions } from '../services/actions/user';
import store from '../services/store';

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  readonly key?: Key | null | undefined;
};

export type TFetchHeaders = {
  [header: string]: string;
};

export type TLocationState = {
  from?: { pathname: string };
  email?: string;
  background?: Location;
};

export type TStyle = {
  position?: 'absolute';
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  textDecoration?: 'none';
  color?: 'inherit';
  display?: 'flex';
  flexDirection?: 'column' | 'row';
  justifyContent?: 'center' | 'space-between';
  alignItems?: 'flex-start';
  minHeight?: number;
  minWidth?: number;
  width?: number;
  backgroundColor?: string;
};

export type TPath =
  | '/'
  | '/orders'
  | '/profile'
  | '/profile/orders'
  | string
  | { pathname: string };

export type TUser = {
  email: string;
  name: string;
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type TRootState = typeof store.getState;

export type AppDispatch = typeof store.dispatch;

export type TAppActions =
  | TUserActions
  | TGetIngredientsActions
  | TConstructorActions
  | TSetCurrentTab;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, TRootState, TAppActions>
>;

export type TToken = string;

export type TAuthResponse = {
  accessToken: TToken;
  refreshToken: TToken;
  user: TUser;
};

export type TIngredientsResponse = {
  data: TIngredient[];
};

export type TOrderResponse = {
  name: string;
  order: {
    number: number;
  };
};

export type TResponse = TIngredientsResponse & TAuthResponse & TOrderResponse;
