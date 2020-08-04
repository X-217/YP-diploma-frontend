import {
  NEWS_API_URL,
  NEWS_API_KEY,
  NEWS_API_FROM,
  NEWS_API_PAGES
} from "../constants/params/news-api-params";

import formatDate from "../utils/format-date";

export default class NewsApi {
  constructor() {
  }

  getNews(request) {
    let requestFrom = new Date();
    requestFrom.setDate(requestFrom.getDate() - NEWS_API_FROM);

    const fromDate = formatDate(requestFrom);
    const toDate = formatDate(new Date());
    const url = `${NEWS_API_URL}?q=${request}&from=${fromDate}&to=${toDate}` +
      `&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=${NEWS_API_PAGES}`;

    return fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return res
      })
      .catch((err) => {
        alert(err)
      });
  };
}
