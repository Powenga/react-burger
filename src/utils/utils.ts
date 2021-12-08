type TCokieProps = {
  [name: string] : string | Date | number | boolean,
};

export function setCookie(name: string, value: string, props: TCokieProps): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d: Date = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp) {
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

export function setAccessToken(name: string, value: string): void {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    throw new Error('Не удалось сохранить токен доступа');
  }
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}