export function getDomItem(selector) {
  const item = document.querySelector(selector);

  return item;
}

export function getDomItemsArray(selector) {
  const item = document.querySelectorAll(selector);

  return item;
}

export function createModal(container) {
  const html = `
  <div class="modal">
    <div class="modal__header">
      <h1 class="modal__title">rules</h1>
      <div class="modal__close" data-name="close"></div>
    </div>
    <img src="./images/modal.svg" alt="modal" class="modal__image" />
    <div class="modal__close-bottom" data-name="close"></div>
    </div>
  </div>
  `;

  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
}

export function openModal(selector, overlay) {
  const modal = getDomItem(selector);
  overlay.style.zIndex = '1';
  overlay.style.opacity = '1';

  setTimeout(() => {
    modal.classList.add('modal-open');
  }, 100);
}

export function closeModal(selector, overlay) {
  const modal = getDomItem(selector);

  modal.classList.remove('modal-open');
  overlay.style.zIndex = '-1';
  overlay.style.opacity = '0';

  setTimeout(() => {
    overlay.innerHTML = '';
  }, 500);
}
