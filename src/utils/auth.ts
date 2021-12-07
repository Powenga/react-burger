import { BASE_URL } from './constants';
import { getCookie } from './utils';
import {  TFetchHeaders } from './types';
import { Api } from './api';

class Auth extends Api {
  constructor({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers: TFetchHeaders;
  }) {
    super({ baseUrl, headers });
  }

  login(data: {
    email: string,
    password: string,
  }) {
    return fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.onError);
  }

  register(data: {
    name: string,
    email: string,
    password: string,
  }) {
    return fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this.onError);
  }

  logout() {
    return fetch(`${this.baseUrl}/logout`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({token: getCookie('refreshToken')}),
    }).then(this.onError);
  }

  refreshToken() {
    return fetch(`${this.baseUrl}/token`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({token: getCookie('refreshToken')}),
    }).then(this.onError);
  }

  getUser() {
    return fetch(`${this.baseUrl}/user`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    }).then(this.onError);
  }

  updateUser(data: {
    name: string,
    email: string,
    password: string,
  }) {
    return fetch(`${this.baseUrl}/user`, {
      method: 'PATCH',
      headers: {
        ...this.headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify(data),
    }).then(this.onError);
  }
}

export default new Auth({
  baseUrl: `${BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});
