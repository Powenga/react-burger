import { combineReducers } from 'redux';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsRequestFailed: false,

  constructorIngredients: [],
  currentIngredient: {},
  order: {},
}

export const rootReducer = combineReducers({});