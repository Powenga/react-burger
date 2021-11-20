import { BASE_URL } from './constants';
import { getCookie } from './utils';

class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _onError(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return Promise.resolve(data);
      }
      return Promise.reject(data);
    });
  }

  login(data) {
    return fetch(`${this._baseUrl}/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onError);
  }

  register(data) {
    return fetch(`${this._baseUrl}/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onError);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({token: getCookie('refreshToken')}),
    }).then(this._onError);
  }

  refreshToken(data) {
    return fetch(`${this._baseUrl}/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._onError);
  }

  getUser() {
    return fetch(`${this._baseUrl}/user`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    }).then(this._onError);
  }

  updateUser(data) {
    return fetch(`${this._baseUrl}/user`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
      body: JSON.stringify(data),
    }).then(this._onError);
  }
}

export default new Auth({
  baseUrl: `${BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});
