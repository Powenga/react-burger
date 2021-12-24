import { TIngredient, TRootState } from '../../utils/types';

export const ingredientSelectors = {
  findById: (id: string) => (store: TRootState) => {
    return store.ingredients.ingredients.find(
      (elem: TIngredient) => elem._id === id
    );
  },
  getOrderIngredients: (idList: string[]) => (store: TRootState) => {
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
  },
};
