export function getDomItem(selector) {
  const item = document.querySelector(selector);

  return item;
}

export function getDomItemsArray(selector) {
  const item = Array.from(document.querySelectorAll(selector));

  return item;
}

export function createModal(container) {
  const html = `
  <div class="modal">
    <div class="modal__header">
      <h1 class="modal__title">rules</h1>
      <div class="modal__close" data-name="close"></div>
    </div>
    <div class="modal__image"></div>
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

export function showPlayerSelection(
  target,
  firstScreen,
  gameScreen,
  gameFields
) {
  const playerSelection = +target.target.dataset.id;
  const playerField = gameFields.find((field) => field.dataset.name === 'user');
  firstScreen.classList.add('hide');
  gameScreen.classList.remove('hide');

  selectOption(playerSelection, playerField);
}

export function showComputerSelection(gameFields) {
  const computerSelection = Math.ceil(Math.random() * 3);
  const computerField = gameFields.find(
    (field) => field.dataset.name === 'computer'
  );

  selectOption(computerSelection, computerField);
}

function selectOption(id, playerField) {
  const value = id;

  switch (value) {
    case 1:
      playerField.classList.add('game__item-image-paper');
      playerField.setAttribute('data-result', 'paper');
      break;
    case 2:
      playerField.classList.add('game__item-image-scissors');
      playerField.setAttribute('data-result', 'scissors');
      break;
    case 3:
      playerField.classList.add('game__item-image-rock');
      playerField.setAttribute('data-result', 'rock');
  }
}

export function showResult(gameFields, result, resultMobile) {
  const user = gameFields.find((field) => field.dataset.name === 'user');
  const computer = gameFields.find(
    (field) => field.dataset.name === 'computer'
  );
  const userResult = user.dataset.result;
  const computerResult = computer.dataset.result;

  result.classList.remove('hide');
  resultMobile.classList.remove('hide');

  if (userResult === computerResult) {
    result.firstElementChild.textContent = 'draw';
    resultMobile.firstElementChild.textContent = 'draw';
  }

  if (userResult === 'paper' && computerResult === 'rock') {
    result.firstElementChild.textContent = 'you win';
    resultMobile.firstElementChild.textContent = 'you win';
    showWinner(user);
  }

  if (userResult === 'paper' && computerResult === 'scissors') {
    result.firstElementChild.textContent = 'you lose';
    resultMobile.firstElementChild.textContent = 'you lose';
    showWinner(computer);
  }

  if (userResult === 'scissors' && computerResult === 'paper') {
    result.firstElementChild.textContent = 'you win';
    resultMobile.firstElementChild.textContent = 'you win';
    showWinner(user);
  }

  if (userResult === 'scissors' && computerResult === 'rock') {
    result.firstElementChild.textContent = 'you lose';
    resultMobile.firstElementChild.textContent = 'you lose';
    showWinner(computer);
  }

  if (userResult === 'rock' && computerResult === 'scissors') {
    result.firstElementChild.textContent = 'you win';
    resultMobile.firstElementChild.textContent = 'you win';
    showWinner(user);
  }

  if (userResult === 'rock' && computerResult === 'paper') {
    result.firstElementChild.textContent = 'you lose';
    resultMobile.firstElementChild.textContent = 'you lose';
    showWinner(computer);
  }
}

function showWinner(player) {
  const shadow = player.nextElementSibling.nextElementSibling;
  shadow.style.transform = 'scale(1)';
}

export function startNewGame(
  shadows,
  gameFields,
  firstScreen,
  gameScreen,
  result,
  resultMobile
) {
  shadows.forEach((shadow) => (shadow.style.transform = 'scale(0)'));
  gameFields.forEach((field) => field.removeAttribute('data-result'));

  setTimeout(() => {
    gameScreen.classList.add('hide');
    firstScreen.classList.remove('hide');
    gameFields.forEach((field) => (field.className = 'game__item-image'));
    result.classList.add('hide');
    resultMobile.classList.add('hide');
  }, 300);
}
