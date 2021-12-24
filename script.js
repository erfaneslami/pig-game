"use strict";

// ELEMENTS VARIABLES
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
// const diceEl = document.querySelector(".dice");
const btnRollDice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// INITIAL STATE
let totalScore, currentScore, activePlayer, runing;

// FUNCTIONS
const init = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  totalScore = [0, 0];
  currentScore = 0;
  runing = true;
  activePlayer = 0;

  hideDice();

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const hideDice = function () {
  const faceDice = document.querySelectorAll("[class^='face']");
  for (let i = 0; i < faceDice.length; i++) {
    faceDice[i].classList.add("hidden");
  }
};

// FUNCTION ON ROLL DICE BTN
btnRollDice.addEventListener("click", function () {
  if (runing) {
    // CALC DICE AND SHOW TO DICE TO SCREEN
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    hideDice();
    document.querySelector(`.face-${diceRoll}`).classList.remove("hidden");
    // diceEl.classList.remove("hidden");
    // diceEl.src = `dice-${diceRoll}.png`;

    // CHECK IF IT NOT ONE :
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // CHECK IF IT  ONE :
    } else {
      switchPlayer();
    }
  }
});

// ADD FUNCTION ON HOLD BTN
btnHold.addEventListener("click", function () {
  if (runing) {
    // CALC TOTAL SCORE AND SHOW IT
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    // CHECK IF THE PLAYER WINS
    if (totalScore[activePlayer] >= 100) {
      runing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    }
    // IF SCORE WAS BELOW 100
    else {
      switchPlayer();
    }
  }
});

// FUNCTION ON NEW GAME BTN
btnNew.addEventListener("click", init);
