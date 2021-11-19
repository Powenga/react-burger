import api from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const ADD_INGREDIENT_INFO = 'ADD_INGREDIENT_INFO';
export const REMOVE_INGREDIENT_INFO = 'REMOVE_INGREDIENT_INFO';

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILED = 'CHECKOUT_FAILED';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

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

export function checkout(orderIngredients) {
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
        dispatch({type: CLEAR_CONSTRUCTOR});
      })
      .catch(() => {
        dispatch({
          type: CHECKOUT_FAILED,
        });
      });
  };
}
