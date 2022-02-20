import apiResponse from '../api/api.js';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '25616103-aed40349c0d62d7a529b2f151';
const PER_PAGE = 40;
const requestParam = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class Response {
  constructor() {
    this._searchName = '';
    this._page = 1;
    this._url = '';
  }

  async getResponse() {
    this._url = `${BASE_URL}?key=${KEY}&q=${this._searchName}&${requestParam}&page=${this._page}&per_page=${PER_PAGE}`;
    const response = await apiResponse(this._url);
    this._page += 1;
    return response;
  }

  get searchName() {
    return this._searchName;
  }

  set searchName(newSearchName) {
    this._searchName = newSearchName;
  }

  get page() {
    return this._page;
  }

  set page(newPage) {
    this._page = newPage;
  }
}
