import api from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const GET_CONSTURCTOR_INGREDIENTS = 'GET_CONSTURCTOR_INGREDIENTS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const ADD_INGREDIENT_INFO = 'ADD_INGREDIENT_INFO';
export const REMOVE_INGREDIENT_INFO = 'REMOVE_INGREDIENT_INFO';

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
        dispatch({
          type: GET_CONSTURCTOR_INGREDIENTS,
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
