import { combineReducers } from 'redux';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
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
          toppings: [],
        },
      };

    case ADD_INGREDIENT:
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          constructorIngredients: {
            bun: action.ingredient,
            toppings: state.constructorIngredients.toppings,
          },
        };
      }
      return {
        ...state,
        constructorIngredients: {
          bun: state.constructorIngredients.bun,
          toppings: [
            ...state.constructorIngredients.toppings,
            action.ingredient,
          ],
        },
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: {
          bun: state.constructorIngredients.bun,
          toppings: [
            ...state.constructorIngredients.toppings.filter((elem) => {
              return elem._id !== action.ingredient._id;
            }),
          ],
        },
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  burger: ingredientsReduser,
});
