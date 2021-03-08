import galleryItems from "./gallery-items";
const references = {
 gallery: document.querySelector('.js-gallery'),
 lightbox: document.querySelector('.lightbox'),
 overlay: document.querySelector('.lightbox__overlay'),
 image: document.querySelector('.lightbox__image'),
 button: document.querySelector('lightbox__button'),
};

const createGalleryMarkup = galleryItems.map(({preview, original, description}, index) => setGalleryItems(preview, original, description, index)).join('');

function setGalleryItems(preview, original, description) {
  return `<li class = "gallery__item">
  <a class = "gallery__link" href = "${original}"> 
  <img clas = "gallery__image"
  src = "${preview}"
  data-source = "${original}"
  data-index = "${index}"
  alt = "${description}"/>
  </a>
  </li>`
}
