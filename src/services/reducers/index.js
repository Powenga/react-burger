import { combineReducers } from 'redux';
import { ingredientTypes } from '../../utils/constants';
import { getRandomBurger } from '../../utils/utils';
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsRequestFailed: false,

  constructorIngredients: [],
  currentIngredient: {},
  order: {},
};

export const ingredientsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: true,
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsRequestFailed: false,
        ingredients: action.ingredients,
        constructorIngredients: getRandomBurger(action.ingredients, ingredientTypes),
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  burger: ingredientsReduser,
});
