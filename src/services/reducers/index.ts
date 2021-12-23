import { combineReducers } from 'redux';
import { user } from './user';

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILED,
  CHECKOUT_SUCCESS,
  SET_CURRENT_TAB,
} from '../../utils/constants';

import {
  TGetIngredientsActions,
  TConstructorActions,
  TCheckoutActions,
  ISetCurrentTab,
} from '../actions';
import { TIngredient } from '../../utils/types';

type TIngredientState = {
  ingredients: TIngredient[];
  ingredientsRequest: Boolean;
  ingredientsRequestFailed: Boolean;
};

type TConstructorState = {
  bun: TIngredient | {};
  toppings: Array<TIngredient & { key?: number }>;
};

const ingedientsState: TIngredientState = {
  ingredients: [],
  ingredientsRequest: true,
  ingredientsRequestFailed: false,
};

const constructorState: TConstructorState = {
  bun: {},
  toppings: [],
};

const orderState = {
  orderNumber: '',
  orders: [],
  checkoutRequest: false,
  checkoutRequestFailed: false,
  isCheckoutSuccess: false,
};

export const ingredients = (
  state = ingedientsState,
  action: TGetIngredientsActions
): TIngredientState => {
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
      };

    default:
      return state;
  }
};

export const burgerConstructor = (
  state = constructorState,
  action: TConstructorActions
): TConstructorState => {
  switch (action.type) {
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
          {
            ...action.ingredient,
            key: Date.now(),
          },
        ],
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        bun: state.bun,
        toppings: [
          ...state.toppings.filter((elem) => {
            return elem.key !== action.ingredient.key;
          }),
        ],
      };

    case MOVE_INGREDIENT:
      const toppings = state.toppings;
      toppings.splice(
        action.dragIndex,
        0,
        toppings.splice(action.hoverIndex, 1)[0]
      );
      return {
        ...state,
        bun: state.bun,
        toppings: [...toppings],
      };

    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        bun: {},
        toppings: [],
      };

    default:
      return state;
  }
};

export const order = (state = orderState, action: TCheckoutActions) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        ...state,
        checkoutRequest: true,
        isCheckoutSuccess: false,
      };

    case CHECKOUT_FAILED:
      return {
        ...state,
        checkoutRequest: false,
        checkoutRequestFailed: true,
        isCheckoutSuccess: false,
      };

    case CHECKOUT_SUCCESS:
      const orderNumber = action.orderNumber;
      return {
        ...state,
        orderNumber,
        orders: [
          ...state.orders,
          {
            orderNumber,
            ingredients: action.orderIngredients,
            name: action.orderName,
          },
        ],
        checkoutRequest: false,
        checkoutRequestFailed: false,
        isCheckoutSuccess: true,
      };

    default:
      return state;
  }
};

export const currentTab = (state = 'buns', action: ISetCurrentTab) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return action.currentTab;

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  order,
  currentTab,
  user,
});
