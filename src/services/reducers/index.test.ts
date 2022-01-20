import { burgerConstructor, currentTab, ingredients, order } from './index';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILED,
  CHECKOUT_SUCCESS,
  SET_CURRENT_TAB,
} from '../../utils/constants';
import {
  TCheckoutActions,
  TConstructorActions,
  TGetIngredientsActions,
  TSetCurrentTab,
} from '../actions';

const testIngredients = [
  {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0,
  },
  {
    _id: '60d3b41abdacab0026a733cb',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
];

describe('ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(ingredients(undefined, {} as TGetIngredientsActions)).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsRequestFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredients(undefined, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ingredients: [],
      ingredientsRequest: true,
      ingredientsRequestFailed: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredients(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsRequestFailed: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      ingredients(
        {
          ingredients: [],
          ingredientsRequest: true,
          ingredientsRequestFailed: false,
        },
        { type: GET_INGREDIENTS_SUCCESS, ingredients: testIngredients }
      )
    ).toEqual({
      ingredients: testIngredients,
      ingredientsRequest: false,
      ingredientsRequestFailed: false,
    });
  });
});

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructor(undefined, {} as TConstructorActions)).toEqual({
      bun: {},
      toppings: [],
    });
  });
  it('should add bun in buns', () => {
    expect(
      burgerConstructor(undefined, {
        type: ADD_INGREDIENT,
        ingredient: testIngredients[0],
      })
    ).toEqual({
      bun: testIngredients[0],
      toppings: [],
    });
  });
  it('should add ingredient in toppings', () => {
    const DateKey = 121313213213;
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => DateKey);
    expect(
      burgerConstructor(undefined, {
        type: ADD_INGREDIENT,
        ingredient: testIngredients[1],
      })
    ).toEqual({
      bun: {},
      toppings: [{ ...testIngredients[1], key: DateKey }],
    });
  });
  it('should remove ingredient', () => {
    expect(
      burgerConstructor(
        {
          bun: testIngredients[0],
          toppings: [
            { ...testIngredients[1], key: 1 },
            { ...testIngredients[2], key: 2 },
          ],
        },
        {
          type: REMOVE_INGREDIENT,
          ingredient: { ...testIngredients[2], key: 2 },
        }
      )
    ).toEqual({
      bun: testIngredients[0],
      toppings: [{ ...testIngredients[1], key: 1 }],
    });
  });
  it('should move ingredient', () => {
    expect(
      burgerConstructor(
        {
          bun: testIngredients[0],
          toppings: [
            { ...testIngredients[1], key: 1 },
            { ...testIngredients[2], key: 2 },
          ],
        },
        {
          type: MOVE_INGREDIENT,
          dragIndex: 1,
          hoverIndex: 0,
        }
      )
    ).toEqual({
      bun: testIngredients[0],
      toppings: [
        { ...testIngredients[2], key: 2 },
        { ...testIngredients[1], key: 1 },
      ],
    });
  });
  it('should clear constructor', () => {
    expect(
      burgerConstructor(
        {
          bun: testIngredients[0],
          toppings: [
            { ...testIngredients[1], key: 1 },
            { ...testIngredients[2], key: 2 },
          ],
        },
        {
          type: CLEAR_CONSTRUCTOR,
        }
      )
    ).toEqual({
      bun: {},
      toppings: [],
    });
  });
});

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(order(undefined, {} as TCheckoutActions)).toEqual({
      orderNumber: '',
      orders: [],
      checkoutRequest: false,
      checkoutRequestFailed: false,
      isCheckoutSuccess: false,
    });
  });
  it('should handle CHECKOUT_REQUEST', () => {
    expect(
      order(undefined, {
        type: CHECKOUT_REQUEST,
      })
    ).toEqual({
      orderNumber: '',
      orders: [],
      checkoutRequest: true,
      checkoutRequestFailed: false,
      isCheckoutSuccess: false,
    });
  });
  it('should handle CHECKOUT_FAILED', () => {
    expect(
      order(undefined, {
        type: CHECKOUT_FAILED,
      })
    ).toEqual({
      orderNumber: '',
      orders: [],
      checkoutRequest: false,
      checkoutRequestFailed: true,
      isCheckoutSuccess: false,
    });
  });
  it('should handle CHECKOUT_SUCCESS', () => {
    expect(
      order(undefined, {
        type: CHECKOUT_SUCCESS,
        orderNumber: '2354',
        orderName: 'Название заказа',
        orderIngredients: testIngredients,
      })
    ).toEqual({
      orderNumber: '2354',
      orders: [
        {
          orderNumber: '2354',
          ingredients: testIngredients,
          name: 'Название заказа',
        },
      ],
      checkoutRequest: false,
      checkoutRequestFailed: false,
      isCheckoutSuccess: true,
    });
  });
});

describe('currentTab reducer', () => {
  it('should return initial state', () => {
    expect(currentTab(undefined, {} as TSetCurrentTab)).toEqual('buns');
  });
  it('should change tab', () => {
    expect(
      currentTab(undefined, { type: SET_CURRENT_TAB, currentTab: 'toppings' })
    ).toEqual('toppings');
  });
});
