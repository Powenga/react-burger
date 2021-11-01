import { combineReducers } from 'redux';

import {
  GET_CONSTRUCTOR_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsRequestFailed: false,

  constructorIngredients: {
    bun: {},
    toppings: [],
  },

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
        constructorIngredients: {
          bun: action.ingredients.find((elem) => elem.type === 'bun'),
          toppings: action.ingredients.filter((elem) => elem.type !== 'bun'),
        },
      };

      case GET_CONSTRUCTOR_INGREDIENTS:
        return {
          ...state,
          constructorIngredients: {
            bun: action.ingredients.find((elem) => elem.type === 'bun'),
            toppings: action.ingredients.filter((elem) => elem.type !== 'bun'),
          },
        };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  burger: ingredientsReduser,
});
