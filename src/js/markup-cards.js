import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import refs from './refs.js';

let countPageLength = 0;
export let isAnyMore = true;

const isEmptyResponce = () => {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
};

const totalHits = num => {
  return Notiflix.Notify.info(`Hooray! We found ${num} images.`);
};

const addClassHidden = () => {
  refs.galleryEnd.classList.add('visually-hidden');
};

const removeClassHidden = () => {
  refs.galleryEnd.classList.remove('visually-hidden');
};

const marcupCards = cards => {
  const card = cards.data.hits;
  if (card.length === 0) {
    addClassHidden();
    isEmptyResponce();
  }

  if (countPageLength === 0) totalHits(cards.data.totalHits);

  countPageLength += card.length;

  if (cards.data.totalHits < countPageLength) {
    countPageLength = 0;
    removeClassHidden();
    isAnyMore = false;
  }

  return card
    .map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `
	 <div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${downloads}</span>
            </p>
          </div>
        </a>
      </div>
  `;
    })
    .join('');
};

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.photo-card')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const innerHtml = data => {
  refs.gallery.insertAdjacentHTML('beforeend', marcupCards(data));
  if (data.data.hits.length < countPageLength) smoothScroll();

  const instance = new SimpleLightbox('.gallery a', {
    showCounter: false,
  });
  instance.refresh();
};

export default innerHtml;
