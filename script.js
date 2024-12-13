const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);
const $main = $('.container');

[...Array(50).keys()].forEach((_, i) => {
  let aside = document.createElement('aside');
  aside.classList.add('card');
  aside.innerHTML = `<img draggable="false" src="assets/star-${
    i + 1
  }.webp" alt="star ${i + 1}">`;
  $main.appendChild(aside);
});

const updateCardsEnd = _ => {
  let cards = $$('.card');
  $main.appendChild(cards[0]);
};
const updateCardsStart = _ => {
  let cards = $$('.card');
  let lastCard = cards.length - 1;
  $main.prepend(cards[lastCard]);
};

window.addEventListener('wheel', e => {
  if (e.deltaY > 0) {
    updateCardsStart();
  } else {
    updateCardsEnd();
  }
});

document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowUp') {
    updateCardsStart();
  } else if (key === 'ArrowDown') {
    updateCardsEnd();
  }
});

const handleStart = e => {
  let deltaYInitial = e.touches[0].clientY;

  const handleMove = e => {
    let deltaYCurrent = e.touches[0].clientY;
    let deltaYDiff = deltaYCurrent - deltaYInitial;
    let goUp = deltaYDiff > 100;
    let goDown = deltaYDiff < -100;
    if (goUp) {
      updateCardsStart();
    } else if (goDown) {
      updateCardsEnd();
    }

    document.addEventListener('touchend', handleEnd);
  };

  document.addEventListener('touchmove', handleMove);

  const handleEnd = e => {
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('touchend', handleEnd);
  };
};

document.addEventListener('touchstart', handleStart);
