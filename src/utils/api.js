import { BASE_URL } from "./constants";

class Api {
  constructor({ baseUrl, headers }){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _onError(res) {
    return res.json().then((data) => {
      if (res.ok) {
        return Promise.resolve(data.data);
      }
      return Promise.reject(data);
    });
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers,
    }).then(this._onError);
  }

};

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})