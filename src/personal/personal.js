import './personal.css';

const menuItems= document.querySelectorAll('.header__menu-item');
const menuIcon=document.querySelector('.header__menu-button');

import Header from "../JS/components/Header";
import MainApi from "../JS/api/MainApi";
import NewsCardList from "../JS/components/NewsCardList";

const header = new Header();
const mainApi = new MainApi();
const newsCardList = new NewsCardList;

document.querySelector('.header__menu-button-personal').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu_personal"));
  menuIcon.classList.toggle("header__menu-button_close-personal");
}

mainApi.getUserData()
  .then((res) => {
    header.render(res.name);
/*    setEventListeners();*/
  })
  .catch((err) => {
    alert(err.message);
  });

mainApi.getArticles();

function logout() {
  mainApi.logout()
    .then((res) => {
      if (res) location.href = "../../";
    })
    .catch((err) => {
      alert(err.message)
    })
}

function render(newsCardList) {
  const savedArticles = mainApi.getArticles();
  const count = savedArticles.length;

  for (let i = 0; i < count; i++) {

      this.newsCardList.addCard({
        date: this.articles[i].publishedAt,
        title: this.articles[i].title,
        text: this.articles[i].description,
        source: this.articles[i].source.name,
        image: this.articles[i].urlToImage,
        url: this.articles[i].url,
      });    }



}
