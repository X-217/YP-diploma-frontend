import './personal.css';

import MainApi from "../JS/api/MainApi";
import Header from "../JS/components/Header";
import Popup from "../JS/components/Popup";
import FormValidator from "../JS/utils/FormValidator";
import Form from "../JS/components/Form";
import Search from "../JS/components/Search";
import NewsCard from "../JS/components/NewsCard";
import NewsCardList from "../JS/components/NewsCardList";
import NewsApi from "../JS/api/NewsApi";

const cardContainer= document.querySelector(".results__output");

const mainApi = new MainApi();
const newsApi = new NewsApi();
const header = new Header();
const popup = new Popup();
const formValidator = new FormValidator();
const form = new Form(mainApi, popup, header, formValidator);
const newsCard = new NewsCard(mainApi);
const type='personal';

const newsCardList = new NewsCardList(cardContainer, newsCard, type);
const search = new Search(newsApi, newsCardList);

const menuItems = document.querySelectorAll('.header__menu-item');
const menuIcon = document.querySelector('.header__menu-button');
const authButton = document.querySelector('.header__auth-button');
const menuButton = document.querySelector('.header__menu-button');
const searchButton = document.querySelector('.search__submit');
const searchInput = document.querySelector('.search__input');
const statisticsSaved = document.querySelector('.statistics__saved');
const statisticsKeywords = document.querySelector('.statistics__keywords');
const statisticsWords = document.querySelector('.statistics__words');
const resultsOutput = document.querySelector(".results__output");


document.querySelector('.header__menu-button-personal').addEventListener('click', menuToggle);
document.querySelector('.header__auth-button').addEventListener('click', logout);


function menuToggle() {
  menuItems.forEach((item) => item.classList.toggle("header__mobile-menu_personal"));
  menuIcon.classList.toggle("header__menu-button_close-personal");
}
header.render(localStorage.getItem('user'));

render();

function logout() {
  mainApi.logout()
    .then((res) => {
      if (res) location.href = "../../";
    })
    .catch((err) => {
      alert(err.message)
    })
}

function render() {
  mainApi.getArticles()
    .then((res) => {
      const articles = res;    /* массив статей */
      const total = articles.length; /* получено статей */
      const allKeywords=[];
      articles.forEach((item) => {allKeywords.push(item.keyword)});
      const keywords=Array.from(new Set(allKeywords));
      const keywordsCount = keywords.length;
      statisticsSaved.textContent = `${localStorage.getItem('user')}, у вас ${total} сохранённых статей`;
      if (!keywordsCount) statisticsKeywords.textContent='';

      switch (keywordsCount) {
        case 0:
          statisticsWords.textContent='';
          break;
        case 1:
          statisticsWords.textContent=`${keywords[0]}`
          break;
        case 2:
          statisticsWords.textContent=`${keywords[0]}, ${keywords[0]}`
          break;
        default:
          statisticsWords.textContent = `${keywords[0]}, ${keywords[1]} и ${keywords.length - 2} другим`;
      }
      resultsOutput.classList.add("results__output_is-visible");
/*      console.log(articles[0]);*/
      for (let i = 0; i < total; i++) {
         newsCardList.addCard({
          keyword: articles[i].keyword,
          date: articles[i].date,
          title: articles[i].title,
          text: articles[i].text,
          source: articles[i].source,
          image: articles[i].image,
          url: articles[i].url,
          id: articles[i]._id,
        });
      }




    })
    .catch((err) => { alert(err)});


/*
  for (let i = 0; i < count; i++) {

      this.newsCardList.addCard({
        date: this.articles[i].publishedAt,
        title: this.articles[i].title,
        text: this.articles[i].description,
        source: this.articles[i].source.name,
        image: this.articles[i].urlToImage,
        url: this.articles[i].url,
      });    }

*/


}
