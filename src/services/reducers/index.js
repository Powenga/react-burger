import { combineReducers } from 'redux';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_CONSTURCTOR_INGREDIENTS,
} from '../actions';

const ingedientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsRequestFailed: false,
};

const constructorState = {
  bun: {},
  toppings: [],
};

const orderState = {
  order: {},
};

const currentIngredientState = {
  currentIngredient: {},
};

export const ingredients = (state = ingedientsState, action) => {
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

    default:
      return state;
  }
};

export const burgerConstructor = (state = constructorState, action) => {
  console.log(action.ingredients);
  switch (action.type) {
    case GET_CONSTURCTOR_INGREDIENTS:
      return {
        ...state,
        bun: action.ingredients.find((elem) => elem.type === 'bun'),
        toppings: [],
      };

    case ADD_INGREDIENT:
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bun: action.ingredient,
          toppings: state.toppings,
        };
      }

      return {
        ...state,
          bun: state.bun,
          toppings: [
            ...state.toppings,
            action.ingredient,
          ],
      };

    // case REMOVE_INGREDIENT:
    //   return {
    //     ...state,
    //     constructorIngredients: {
    //       bun: state.constructorIngredients.bun,
    //       toppings: [
    //         ...state.constructorIngredients.toppings.filter((elem) => {
    //           return elem._id !== action.ingredient._id;
    //         }),
    //       ],
    //     },
    //   };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
});
