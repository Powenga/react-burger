import { BASE_URL } from './constants';
import { TIngredient, TFetchHeaders } from './types';
import { getCookie } from './utils';

export class Api {
  protected baseUrl: string;
  protected headers: HeadersInit | undefined;

  constructor({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers: TFetchHeaders;
  }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  protected onError(res: Response) {
    return res.json().then((data: Response) => {
      if (res.ok) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    });
  }

  getIngredients() {
    return fetch(`${this.baseUrl}/ingredients`, {
      headers: this.headers,
    }).then(this.onError);
  }

  checkout(data: { ingredients: TIngredient[] }) {
    return fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify(data),
    }).then(this.onError);
  }

  getResetCode(data: { email: string }) {
    return fetch(`${this.baseUrl}/password-reset`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(data),
    }).then(this.onError);
  }

  resetPassword(data: { password: string; token: string }) {
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify(data),
    }).then(this.onError);
  }
}

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
