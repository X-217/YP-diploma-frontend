export default class NewsCard {

  constructor(mainApi) {
    this.mainApi = mainApi;
    this.date = "";
    this.title = "";
    this.text = "";
    this.source = "";
    this.image = "";
    this.url = "";
    this.keyword = "";
    this.id = "";
    this.cardContainer = "";
    this.cardTemplate = "";
  }

  create(item, cardContainer) {
    this.date = item.date;
    this.title = item.title;
    this.text = item.text;
    this.source = item.source;
    this.image = item.image;
    this.url = item.url;
    this.keyword = item.keyword;
    this.id = item.id;
    this.cardContainer = cardContainer;
    this.cardTemplate = `
        <div class="card added${this.id}">
          <div class="card__figure" style="background-image: url(${this.image})">
            <div class="card__offer-text">Войдите, чтобы сохранять статьи</div>
            <button class="card__action card__action_save"></button>
          </div>
          <div class="card__container">
            <div class="card__date">${this.date}</div>
            <h3 class="card__title">${this.title}</h3>
            <div class="card__text">${this.text}</div>
            <div class="card__source">${this.source}</div>
          </div>
        </div>`;
    this.cardContainer.insertAdjacentHTML('beforeend', this.cardTemplate);
    const containerClass = "." + this.cardContainer.lastChild.classList[1];
    const container = document.querySelector(containerClass);
    const icon = container.querySelector(".card__action");

    container.addEventListener('click', this._openArticle.bind(container, this.url));
    icon.addEventListener('click', this._toggleSaved.bind(this, icon, this.keyword, this.title, this.text, this.date, this.source, this.url, this.image));
  }

  _openArticle(url) {
    event.preventDefault();
    event.stopImmediatePropagation();
    console.log(this)
    window.open(url);
  }

  _toggleSaved(icon, keyword, title, text, date, source, link, image) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (icon.classList.contains("card__action_save")) {
      this.mainApi.createArticle(keyword, title, text, date, source, link, image)
        .then((res) => {
          this.id = res
          icon.classList.remove("card__action_save");
          icon.classList.add("card__action_saved");
        })
        .catch((err) => {
          alert(err)
        });
    } else {
      this.mainApi.removeArticle(this.id)
        .then(() => {
          icon.classList.remove("card__action_saved");
          icon.classList.add("card__action_save")
        })
        .catch((err) => {
          alert(err)
        });
    }
  }
}
