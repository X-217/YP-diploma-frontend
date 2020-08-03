import {IMAGE_PLACEHOLDER_LINK} from "../constants/links/cards";

export default class NewsCard {

  constructor(mainApi) {
    this.mainApi = mainApi;
    this.actionIcon=document.querySelector(".card__action")
    this.offerLogin=document.querySelector(".card__offer-text")
  }

  create(item, cardContainer) {
    this.date = item.date;
    this.title = item.title;
    this.text = item.text;
    this.source = item.source;
    this.image = item.image;
    this.url = item.url;
    this.keyword = item.keyword;
    this.id=item.id;
    this.cardContainer = cardContainer;

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
  };

  setEventListeners() {
    this.container.querySelector(".card__action").addEventListener('click', this.toggleSaved.bind(this));
    this.container.querySelector(".card__container").addEventListener('click', this.showViewer.bind(this));
  };

  toggleSaved(event) {
    const isLogged = (localStorage.getItem('logged') === 'true');
    const owner = localStorage.getItem('user');
    if (isLogged) { /* пользователь авторизован, имеет возможность сохранять карточки */
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
        this.mainApi.removeArticle(this.id)
          .then(() => {
            event.target.classList.remove("card__action_saved");
            event.target.classList.add("card__action_save");
          })
          .catch((err) => {
            alert(err)
          });
      }
    }
    if (!isLogged) {


    }
/*    card__action_hover*/

      };

  removeFromSaved(event) {
    event.stopImmediatePropagation();

    this.mainApi.removeArticle(this.id)
      .then(() => {
        event.target.classList.remove("card__action_saved");
        event.target.classList.add("card__action_save");
      })
      .catch()

    /*    event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);*/
  };

  showViewer(event) {
    const url = event.target.style.backgroundImage;
    console.log(this.id);
    window.open(this.url);

  };
}

/*
{
  "title":  "Why George Washington Was ‘Better Than His Era’ and a Great Businessman",
  "text":  "As mobs push to tear down statues of George Washington across the country, author John Berlau points out that the first president and revolutionary general... Read More\nThe post Why George Washington Was ‘Better Than His Era’ and a Great Businessman appeared …",
  "date" :   "2020-08-03T19:03:35Z",
  "source" :   "Daily Signal",
  "link" :   "https://www.dailysignal.com/2020/08/03/why-george-washington-was-better-than-his-era-and-a-great-businessman/",
  "image" :   "https://www.dailysignal.com/wp-content/uploads/2MtV-copy.jpg",
  "owner" :   "5f2597f5e912d0026bec58d0"
}
*/
