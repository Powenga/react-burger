import { TIngredient, TOrder, TRootState } from '../../utils/types';

export const ingredientSelectors = {
  findById: (id: string) => (store: TRootState) => {
    return store.ingredients.ingredients.find(
      (elem: TIngredient) => elem._id === id
    );
  },
  getOrderIngredients: (idList: string[]) => (store: TRootState) => {
    if (idList) {
      return idList.reduce((acc, curr) => {
        const ingredient = store.ingredients.ingredients.find(
          (elem: TIngredient) => elem._id === curr
        );
        if (ingredient && ingredient.type !== 'bun') {
          acc.push(ingredient);
        } else if (
          ingredient &&
          ingredient.type === 'bun' &&
          !acc.includes(ingredient)
        ) {
          acc.push(ingredient);
        }

        return acc;
      }, [] as TIngredient[]);
    }
    return [];
  },
};

export const orderSelectors = {
  findById: (id: string) => (store: TRootState) => {
    const order = store.ws.message.orders.find(
      (elem: TOrder) => elem._id === id
    );
    if (!order) {
      return {} as TOrder;
    }
    return order;
  },
};
