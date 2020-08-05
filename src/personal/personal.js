import './personal.css';

import MainApi from "../JS/api/MainApi";
import Header from "../JS/components/Header";
import NewsCard from "../JS/components/NewsCard";
import NewsCardList from "../JS/components/NewsCardList";

const cardContainer= document.querySelector(".results__output");

const mainApi = new MainApi();
const header = new Header();
const newsCard = new NewsCard(mainApi);
const type='personal';

const newsCardList = new NewsCardList(cardContainer, newsCard, type);

const menuItems = document.querySelectorAll('.header__menu-item');
const menuIcon = document.querySelector('.header__menu-button');
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

if (checkUserLogged()) {
  render();
} else {
  location.href = "../../"
};

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
  header.render(localStorage.getItem('user'));
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

      for (let i = 0; i < total; i++) {
         newsCardList.addCardPersonal({
          keyword: articles[i].keyword,
          date: articles[i].date,
          title: articles[i].title,
          text: articles[i].text,
          source: articles[i].source,
          image: articles[i].image,
          url: articles[i].link,
          id: articles[i]._id,
        });
      }
    })
    .catch((err) => { alert(err)});
}

function checkUserLogged(){
  return ((localStorage.getItem('logged')) === 'true')
}
