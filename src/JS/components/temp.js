/*
import {IMAGE_PLACEHOLDER_LINK} from "../constants/links/cards";

export default class NewsCard {

  constructor(mainApi) {
    this.mainApi = mainApi;

  }


  create(item, cardContainer, type) {
    this.date = item.date.slice(0, 10);
    this.title = item.title;
    this.text = item.text;
    this.source = item.source;
    this.image = item.image;
    this.url = item.url;
    this.keyword = item.keyword;
    this.id = item.id;
    this.cardContainer = cardContainer;
    this.isLogged = (localStorage.getItem('logged') === 'true');
    this.type = type;

    if (this.type === 'personal') { /!* выгрузка в personal *!/
      /!*      const cardTemplate = `
              <div class="card added${this.id}">
                <div class="card__figure" style="background-image: url(${this.image})">
                <div class="card__keyword">${this.keyword}</div>
                  <div class="card__offer-text">Убрать из сохраненных</div>
                  <button class="card__action card__action_delete"></button>
                </div>
                <div class="card__container">
                  <div class="card__date">${this.date}</div>
                  <h3 class="card__title">${this.title}</h3>
                  <div class="card__text">
                      ${this.text}
                  </div>
                  <div class="card__source">${this.source}</div>
                </div>
              </div>`;
            this.cardContainer.insertAdjacentHTML('beforeend', cardTemplate);
            this.container = this.cardContainer.lastChild;
            this.setEventListeners();*!/
    } else {
      const cardTemplate = `
        <div class="card added${this.id}">
          <div class="card__figure" style="background-image: url(${this.image})">
            <div class="card__offer-text">Войдите, чтобы сохранять статьи</div>
            <button class="card__action card__action_save"></button>
          </div>
          <div class="card__container">
            <div class="card__date">${this.date}</div>
            <h3 class="card__title">${this.title}</h3>
            <div class="card__text">
                ${this.text}
            </div>
            <div class="card__source">${this.source}</div>
          </div>
        </div>`;
      this.cardContainer.insertAdjacentHTML('beforeend', cardTemplate);
      this.container = this.cardContainer.lastChild;
      this.container.querySelector(".card__action").addEventListener('click', this.toggleSaved);
      this.container.querySelector(".card__container").addEventListener('click', this.openArticle);
      console.log(this);
    }
  };

  /!*
    setEventListeners() {
      this.container.querySelector(".card__action").addEventListener('click', this.toggleSaved);
      this.container.querySelector(".card__container").addEventListener('click', this.openArticle);

    };
  *!/

  toggleSaved(event) {
    console.log(this); /!* последняя карточка *!/

    const selectCardClasslist = "." + event.target.parentElement.parentElement.classList[1];
    const selectedCard =  document.querySelector(selectCardClasslist);

    console.log(selectedCard);
    if (localStorage.getItem('logged') === 'true') { /!* пользователь авторизован, имеет возможность сохранять карточки *!/
      const icon = selectedCard.querySelector(".card__action");
      console.log(`icon.classList ${icon.classList}`);
      if (icon.classList.contains("card__action_save")) { /!* не сохраненная  карточка *!/

        console.log(this);

        this.mainApi.createArticle(this.keyword || "*", this.title || "*", this.text || "*", this.date,
          this.source  || "*", this.url || "https://ya.ru/", this.image || IMAGE_PLACEHOLDER_LINK)
          .then((res) => {
            /!*            console.log(res);*!/
            icon.classList.remove("card__action_save");
            icon.classList.add("card__action_saved");
            console.log(`this in promise ${this}`);
            this.id = res;
          })
          .catch((err) => {
            alert(err)
          });
      } else { /!* personal *!/
        this.mainApi.removeArticle(this.id)
          .then(() => {
            event.target.classList.remove("card__action_saved");
            event.target.classList.add("card__action_save");
            if (this.type === 'personal') {
              const toRem = "." + event.target.parentElement.parentElement.classList[1];
              document.querySelector(toRem).remove();
            }
          })
          .catch((err) => {
            alert(err)
          });
      }
    }
    if (!this.isLogged) {
      const offer = event.target.parentNode.firstElementChild;
      if (offer.classList.contains("card__offer-text_show")) {
        offer.classList.remove("card__offer-text_show");
      } else {
        offer.classList.add("card__offer-text_show");
      }
    }
  };

  openArticle(event) {
    window.open(this.url);

  };

}


if (this.type === 'personal') {

} else {



        <div class="card added${this.id}">
           <div class="card__figure" style="background-image: url(${this.image})">
              <div class="card__keyword">${this.keyword}</div>
               <div class="card__offer-text">Убрать из сохраненных</div>
               <button class="card__action card__action_delete"></button>
           </div>
           <div class="card__container">
              <div class="card__date">${this.date}</div>
              <h3 class="card__title">${this.title}</h3>
              <div class="card__text">${this.text}</div>
              <div class="card__source">${this.source}</div>
           </div>
        </div> `
*/

{
  "keyword"
:
  "sea", "title"
:
  "Mayor of Devon town dubbed 'Chelsea-on-Sea' hits out at 'disrespectful' tourists", "text"
:
  "Thousands of tourists and second home owners flocked back to Salcombe in Devon from the moment the green light was given by the ", "date"
:
  "2020-08-04", "source"
:
  "Daily Mail", "url"
:
  "https://www.dailymail.co.uk/news/article-8591499/Mayor-Devon-town-dubbed-Chelsea-Sea-hits-disrespectful-tourists.html", "image"
:
  "https://i.dailymail.co.uk/1s/2020/08/04/11/31544998-0-image-a-144_1596536445248.jpg"
}


this.mainApi.createArticle({
  "keyword" : keyword,
  "title" : title,
  "text" : text,
  "date" : date,
  "source" : source,
  "link" : link,
  "image" :image
})
