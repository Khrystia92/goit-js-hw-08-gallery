import galleryItems from "./gallery-items.js";
const references = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.lightbox'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
  lightboxImage: document.querySelector('.lightbox__image'),
  closeButton: document.querySelector('.lightbox__button'),
};
let activeIn;
const createGalleryMarkup = galleryItems.map(({ preview, original, description }, index) => setGalleryItem(preview, original, description, index)).join('');

function setGalleryItem(preview, original, description, index) {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index = "${index}"
      alt="${description}"
    />
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

function openModal() {
    window.addEventListener('keydown', BtnPress);
    references.lightbox.classList.add('is-open');
}

function closeModal() {
  references.lightbox.classList.remove('is-open')
    window.removeEventListener('keydown', BtnPress);
    references.lightboxImage.src = '';
    references.lightboxImage.alt = '';
    
}
references.gallery.addEventListener('click', openIMG);
references.closeButton.addEventListener('click', closeModal);
references.lightboxOverlay.addEventListener('click', lightbosoverlayClose)

function lightbosoverlayClose(event) {
  if (event.currentTarget === event.target) {
    closeModal();
  }
}
function BtnPress(event) {
    switch (event.code) {
        case 'Esc': closeModal();
            break;
        case 'Right':
          activeIn + 1 === galleryItems.length ? (activeIn = 0) : (activeIn += 1);
            references.lightboxImage.src = galleryItems[activeIn].original;
            break;
        case 'Left':
          activeIn === 0 ? (activeIn = galleryItems.length - 1) : (activeIn -= 1);
            references.lightboxImage.src = galleryItems[activeIn].original;
            break;
    }
    }