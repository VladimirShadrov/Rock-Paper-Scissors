import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/step-1.scss';
import '../styles/game-field.scss';
import '../styles/modal.scss';
import '../styles/rules.scss';
import { getDomItem } from './helpers';
import { getDomItemsArray } from './helpers';
import { createModal } from './helpers';
import { openModal } from './helpers';
import { closeModal } from './helpers';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const game = getDomItem('.container');
const overlay = getDomItem('.overlay');

game.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'a') {
    event.preventDefault();
  }
});

game.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('rules')) {
    createModal(overlay);
    openModal('.modal', overlay);
  }

  if (
    event.target.dataset.name === 'close' ||
    event.target.classList.contains('overlay')
  ) {
    closeModal('.modal', overlay);
  }
});
