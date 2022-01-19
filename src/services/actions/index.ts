import api from '../../utils/api';
import auth from '../../utils/auth';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CHECKOUT_REQUEST,
  CHECKOUT_SUCCESS,
  CHECKOUT_FAILED,
  SET_CURRENT_TAB,
} from '../../utils/constants';
import { AppDispatch, AppThunk, TIngredient } from '../../utils/types';
import { saveCookies } from '../../utils/utils';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
}
export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly ingredient: TIngredient;
}
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}
export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}
export type TSetCurrentTab = {
  readonly type: typeof SET_CURRENT_TAB;
  currentTab: string;
}
export interface ICheckoutRequest {
  readonly type: typeof CHECKOUT_REQUEST;
}
export interface ICheckoutSuccess {
  readonly type: typeof CHECKOUT_SUCCESS;
  readonly orderNumber: string;
  readonly orderName: string;
  readonly orderIngredients: TIngredient[];
}
export interface ICheckoutFailed {
  readonly type: typeof CHECKOUT_FAILED;
}

export type TGetIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed

export type TConstructorActions =
  | IAddIngredient
  | IRemoveIngredient
  | IMoveIngredient
  | IClearConstructor;

export type TCheckoutActions =
  | ICheckoutRequest
  | ICheckoutSuccess
  | ICheckoutFailed;

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    api
      .getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}

export const checkout: AppThunk = (orderIngredients, callback) => {
  return function (dispatch: AppDispatch | AppThunk) {
    dispatch({
      type: CHECKOUT_REQUEST,
    });
    api
      .checkout(orderIngredients)
      .then((res) => {
        dispatch({
          type: CHECKOUT_SUCCESS,
          orderNumber: String(res.order.number),
          orderName: res.name,
          orderIngredients,
        });
        callback();
        dispatch({ type: CLEAR_CONSTRUCTOR });
      })
      .catch((error) => {
        if (error.message === 'jwt malformed') {
          return auth
            .refreshToken()
            .then(({ accessToken, refreshToken }) => {
              saveCookies(accessToken, refreshToken);
              dispatch(checkout(orderIngredients, callback));
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }
        return Promise.reject(error);
      })
      .catch(() => {
        dispatch({
          type: CHECKOUT_FAILED,
        });
      });
  };
}
