function getRandomIngridients(ingredients, type) {
  const result = ingredients.reduce((acc, curr) => {
    if(curr.type === type){
      acc.push(curr);
    }
    return acc;
  }, [])
  return result[Math.floor(Math.random() * result.length)];
}

export function getRandomBurger(ingredients, types) {
  return types.map(type => {
    return getRandomIngridients(ingredients, type);
  })
}