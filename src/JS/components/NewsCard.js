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


    if (this.type === 'personal') {
      const cardTemplate = `
        <div class="card a${this.id}">
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
      this.setEventListeners();
    } else {
      const cardTemplate = `
        <div class="card">
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
      this.setEventListeners();
    }
  };

  setEventListeners() {
    this.container.querySelector(".card__action").addEventListener('click', this.toggleSaved.bind(this));
    this.container.querySelector(".card__container").addEventListener('click', this.openArticle.bind(this));
  };

  toggleSaved(event) {

    if (this.isLogged) { /* пользователь авторизован, имеет возможность сохранять карточки */
      if (event.target.classList.contains("card__action_save")) { /* не сохраненная  карточка*/
        this.mainApi.createArticle(this.keyword, this.title, this.text, this.date,
          this.source, this.url, this.image || IMAGE_PLACEHOLDER_LINK)
          .then((res) => {
            this.id = res;
            event.target.classList.remove("card__action_save");
            event.target.classList.add("card__action_saved");
          })
          .catch((err) => {
            alert(err)
          });
      } else {
        console.log(this.id);
        this.mainApi.removeArticle(this.id)
          .then(() => {
            console.log(this.id);
            console.log(event.target.parentElement.parentElement.classList[1])
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

