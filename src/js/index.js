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
import { showPlayerSelection } from './helpers';
import { showComputerSelection } from './helpers';
import { showResult } from './helpers';
import { startNewGame } from './helpers';
import { showScore } from './helpers';

// Перенос изображений
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

const game = getDomItem('.container');
const overlay = getDomItem('.overlay');
const firstScreen = getDomItem('.step-1');
const gameScreen = getDomItem('.game');
const gameFields = getDomItemsArray('.game__item-image');
const result = getDomItem('.game__result');
const resultMobile = getDomItem('.game__result-mobile');
const shadows = getDomItemsArray('.game__win-shadow');
const score = getDomItem('.score__value');

if (!localStorage.getItem('score')) {
  localStorage.setItem('score', 0);
}

game.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'a') {
    event.preventDefault();
  }

  if (event.target.dataset.name === 'option') {
    showPlayerSelection(event, firstScreen, gameScreen, gameFields);

    setTimeout(() => {
      showComputerSelection(gameFields);
      showResult(gameFields, result, resultMobile, score);
    }, 500);
  }

  if (event.target.dataset.name === 'new game') {
    startNewGame(
      shadows,
      gameFields,
      firstScreen,
      gameScreen,
      result,
      resultMobile
    );
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

showScore(score);
