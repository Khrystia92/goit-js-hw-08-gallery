import galleryItems from "./gallery-items.js";
const references = {
 gallery: document.querySelector('.js-gallery'),
 lightbox: document.querySelector('.lightbox'),
 lightboxOverlay: document.querySelector('.lightbox__overlay'),
 lightboxImage: document.querySelector('.lightbox__image'),
 closeButton: document.querySelector('lightbox__button'),
};
let activeIn
const createGalleryMarkup = galleryItems.map(({ preview, original, description }, index) => setGalleryItems(preview, original, description, index)).join('');

function setGalleryItems(preview, original, description, index) {
  return `<li class = "gallery__item">
  <a class = "gallery__link" href = "${original}"> 
  <img class = "gallery__image"
  src = "${preview}"
  data-source = "${original}"
  data-index = "${index}"
  alt = "${description}"/>
  </a>
  </li>`
}
references.gallery.insertAdjacentHTML('beforeend', createGalleryMarkup)

function openIMG(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  references.lightboxImage.src = event.target.dataset.source;
  references.lightboxImage.alt = event.target.alt;
  openModal()
  activeIn = Number(event.target.dataset.index);
}
function closeModal() {
  references.lightbox.classList.remove('is-open')
  window.removeEventListener('keydown', onkeypress);
  references.lightboxImage.src = '';
  references.lightboxImage.alt = '';
}
references.gallery.addEventListener('click', openIMG);
references.closeButton.addEventListener('click', closeModal);
references.lightboxOverlay.addEventListener('click', lightboxOverlayClose)

function lightboxOverlayClose(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
