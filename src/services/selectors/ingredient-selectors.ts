import { TIngredient, TRootState } from "../../utils/types";

export const ingredientSelectors = {
  findById: (id: string) => (store: TRootState) =>
    store.ingredients.ingredients.find((elem: TIngredient) => elem._id === id),
};
