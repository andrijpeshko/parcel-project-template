// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from "./gallery-items";
// Change code below this line
const galleryDiv = document.querySelector(".gallery");
const store = { Lightbox: null };
const markup = galleryItems.reduce(
  (acc, { preview, original, description }) =>
    acc +
    `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
  ""
);
galleryDiv.insertAdjacentHTML("beforeend", markup);

galleryDiv.addEventListener("click", onGalleryClick);

function onGalleryClick(evt) {
  evt.preventDefault();

  const gallaryItem = evt.target.closest(".gallery__item");
  if (!gallaryItem) return;

  const img = gallaryItem.querySelector(".gallery__image");
  const src = img.dataset.source;
  showModal(src);
}

function showModal(src) {
  const basicLightbox = window.basicLightbox;
  const instance = basicLightbox.create(getBigImgTemplate(src));
  instance.show();
  store.lightbox = instance;

  function getBigImgTemplate(src) {
    return `
  <img src="${src}" width="800" height="600">
  `;
  }

  window.addEventListener("keydown", onKeyDown);
}
function onKeyDown(evt) {
  if (evt.key !== "Escape") return;
  if (store.lightbox && store.lightbox.close) {
    instance.close();
  }
}
console.log(galleryItems);
