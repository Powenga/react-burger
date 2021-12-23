import api from '../../utils/api';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../../utils/constants';
import { TIngredient } from '../../utils/types';

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

export type TGetIngredientsActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed;

export function getIngredients() {
  return function (dispatch) {
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

export function checkout(orderIngredients, callback) {
  return function (dispatch) {
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
      .catch(() => {
        dispatch({
          type: CHECKOUT_FAILED,
        });
      });
  };
}
