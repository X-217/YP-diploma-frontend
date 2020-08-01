import mainApiParams from "../constants/main-api-params";

export default class MainApi {
  constructor() {
/*    this.url = mainApiParams.url;
    this.headers = mainApiParams.headers;*/
    this.errorHandler = (res) => {
    }
  }

  signup(name, email, password) {
    const user= {name, email, password};
    return fetch(`${mainApiParams.url}/signup`, {
      method: 'POST',
      headers: mainApiParams.headers,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .catch((err) => {      });
  };

  signin(email, password) {
    return fetch(`${mainApiParams.url}/signin/`, {
      method: 'POST',
      headers: mainApiParams.headers,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({email, password}),
    })
      .then((res) =>  res.json())
      .catch((err) => {
        throw new Error('Отсутствует соединение с сервером');
      });
  }


  getUserData() {
    return fetch(`${mainApiParams.url}/users/me`, {
      method: 'GET',
      headers: mainApiParams.headers,
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return false
      })
      .catch((err) => {
        throw new Error('Отсутствует соединение с сервером');
      });
  }

  logout() {
    return fetch(`${mainApiParams.url}/users/logout`, {
      method: 'GET',
      headers: mainApiParams.headers,
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => {
        if (res.ok) return true;
      })
      .catch((err) => {
        throw new Error('Отсутствует соединение с сервером');
      });
  }


  /*
    getArticles() {

    };

    createArticle() {

    };

    removeArticle() {

    };*/

}
