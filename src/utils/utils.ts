import {
  ACCESS_COOKIE_EXPIRES,
  REFRESH_COOKIE_EXPIRES,
} from './constants';
import { TToken } from './types';


type TCokieProps = {
  [name: string]: string | Date | number | boolean;
};

export function setCookie(
  name: string,
  value: string,
  props: TCokieProps
): void {
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
    new RegExp(
      '(?:^|; )' +
      /* eslint-disable */
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}

export function saveCookies(accessToken: TToken, refreshToken: TToken) {
  try {
    setCookie('accessToken', accessToken.split('Bearer ')[1], {
      expires: ACCESS_COOKIE_EXPIRES,
    });
    setCookie('refreshToken', refreshToken, {
      expires: REFRESH_COOKIE_EXPIRES,
    });
  } catch (error) {
    throw new Error();
  }
}

export function formatOrderDate(orderCreateDate: string) {
  const now = new Date();
  const nowDate = now.getDate();
  const nowMonth = now.getMonth() + 1;
  const nowYear = now.getFullYear();
  const order = new Date(orderCreateDate);
  const orderDate = order.getDate();
  const orderMonth = order.getMonth() + 1;
  const orderYear = order.getFullYear();
  let diff;
  if (nowYear === orderYear && nowMonth === orderMonth) {
    diff = orderDate - nowDate;
  } else {
    diff = (+order - +now) / (60 * 60 * 24 * 1000);
  }
  let days;

  if (diff === 0) {
    days = 'Cегодня';
  } else if (diff === -1) {
    days = 'Вчера';
  } else if (diff < 0 && diff > -5) {
    days = `${Math.abs(diff)} дня назад`;
  } else if (diff < 0 && diff <= -5 && diff >= -10) {
    days = `${Math.abs(diff)} днeй назад`;
  } else {
    days = `${orderDate < 10 ? '0' + orderDate : orderDate}.${
      orderMonth < 10 ? '0' + orderMonth : orderMonth
    }.${orderYear}`;
  }
  const timeZoneOffset = order.getTimezoneOffset() / 60;
  const timeZoneCode = `i-GMT${timeZoneOffset < 0 ? '+' : '-'}${Math.abs(
    timeZoneOffset
  )}`;
  const time = `${order.getHours()}:${order.getMinutes()}`;
  return `${days}, ${time} ${timeZoneCode}`;
}
