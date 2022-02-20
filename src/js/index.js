import Response from './Response.js';
import innerHtml from './markup-cards.js';
import { isAnyMore } from './markup-cards.js';
import refs from './refs.js';
import Notiflix from 'notiflix';

const response = new Response();
let anyMore = isAnyMore;

const markupResponse = async () => {
  const fetchResponse = await response.getResponse();
  innerHtml(fetchResponse);
};

const reset = () => {
  response.page = 1;
  refs.gallery.innerHTML = '';
  refs.galleryEnd.classList.add('visually-hidden');
  response.searchName = '';
  anyMore = true;
};

const handleSubmitForm = e => {
  e.preventDefault();
  reset();
  const _searchName = e.target.searchQuery.value;
  if (_searchName === '') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }

  response.searchName = _searchName;

  markupResponse();
  refs.searchForm.reset();
};

const handelScroll = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (!anyMore) {
    refs.preloader.style.display = 'none';
    return;
  }
  if (scrollTop + clientHeight === scrollHeight) {
    refs.preloader.classList.remove('visually-hidden');
    markupResponse();
    setTimeout(() => {
      refs.preloader.classList.add('visually-hidden');
    }, 1000);
  }
};

refs.searchForm.addEventListener('submit', handleSubmitForm);
window.addEventListener('scroll', handelScroll);
