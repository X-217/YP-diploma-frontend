export default class MainApi {
  constructor(mainApiParams) {
    this.baseUrl = mainApiParams.baseUrl;
    this.headers = mainApiParams.headers;
    this.errorHandler = (res) => {
      switch (res.status) { /* улучшить!!!!!!!!!*/
        case 409:
          throw new Error('Такой пользователь уже есть');
        case 401:
          throw new Error('Неправильная почта или пароль');
        case 400:
          throw new Error('Некорректные данные');
        default:
          break;
      }
    }
  }

  signup() {
    console.log('try signup');
    const user= {"name" : "Первый пользователь","email" : "qwwrty@ya.ru","password" : "12345678"};

/*    console.log(req);*/
    const head= JSON.stringify({
      'Content-Type': 'application/json',
    })

    return fetch(`http://localhost:3000/signup/`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
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
    const user= {"email" : "qwwrty@ya.ru","password" : "12345678"};
    return fetch(`http://localhost:3000/signin/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
/*      headers: this.headers,*/
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        this.errorHandler(res);
      })
      .catch((err) => Promise.reject(err));
  }


  /*  getUserData(){

    };

    getArticles() {

    };

    createArticle() {

    };

    removeArticle() {

    };*/

}
