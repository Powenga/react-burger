import { Location } from 'history';
import { Key } from 'react';

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

export interface TLocationState {
  from?: { pathname: string };
  email?: string;
  background?: Location;
}

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
  |  string
  | { pathname: string };
