import mainApiParams from "../constants/main-api-params";

export default class MainApi {
  constructor() {
    this.url = mainApiParams.url;
    this.headers = mainApiParams.headers;
    this.errorHandler = (res) => {
    }
  }

  signup(name, email, password) {
    const user= {name, email, password};
    return fetch(`http://localhost:3000/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
      'Access-Control-Allow-Creditials': 'true',
      },
      body: JSON.stringify(user)
    })
      .then((res) => {

        if (res.ok) {

          return res.json();
        }
        this.errorHandler(res);
      })
      .catch((err) => Promise.reject(err));

  };

  signin(email, password) {
    return fetch(`${mainApiParams.url}/signin`, {
      method: 'POST',
      headers: mainApiParams.headers,
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({email, password}),
    })

      .then((res) =>  res.json())
      .catch((err) => {
        /* разобраться что делать */
/*        alert("Ошибка связи с сервером");*/
        console.log(err);


      });
  }


  getUserData() {
/*    console.log(this.headers);*/
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
      withCredentials: true,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        this.errorHandler(res);
      })
      .catch((err) => console.log(err)/*Promise.reject()*/);
  }




  /*
    getArticles() {

    };

    createArticle() {

    };

    removeArticle() {

    };*/

}
