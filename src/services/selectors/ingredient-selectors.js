export const ingredientSelectors = {
  findById: (id) => (store) =>
    store.ingredients.ingredients.find((elem) => elem._id === id),
};
