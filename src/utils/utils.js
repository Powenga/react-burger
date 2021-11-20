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

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function setAccessToken(name, value) {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    throw new Error('Не удалось сохранить токен доступа');
  }
}