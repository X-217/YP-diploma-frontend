import {MAIN_API_HEADERS, MAIN_API_URL} from "../constants/params/main-api-params";
import {NO_CONNECTION} from "../constants/text/main-api-messages";

export default class MainApi {
  constructor() {

  }

  signup(name, email, password) {
    const user= {name, email, password};
    return fetch(`${MAIN_API_URL}/signup`, {
      method: 'POST',
      headers: MAIN_API_HEADERS,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .catch((err) => {      });
  };

  signin(email, password) {
    return fetch(`${MAIN_API_URL}/signin/`, {
      method: 'POST',
      headers: MAIN_API_HEADERS,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({email, password}),
    })
      .then((res) =>  res.json())
      .catch((err) => {
        throw new Error(NO_CONNECTION);
      });
  }

  getUserData() {
    return fetch(`${MAIN_API_URL}/users/me`, {
      method: 'GET',
      headers: MAIN_API_HEADERS,
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => {
        if (res.ok) return res.json();
        return false
      })
      .catch((err) => {
        console.log(err);
        throw new Error(NO_CONNECTION);
      });
  }

  logout() {
    return fetch(`${MAIN_API_URL}/users/logout`, {
      method: 'GET',
      headers: MAIN_API_HEADERS,
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => {
        if (res.ok) return true;
      })
      .catch((err) => {
        throw new Error(NO_CONNECTION);
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
