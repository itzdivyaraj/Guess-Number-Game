//generating a random number
let random = parseInt(Math.random() * 100 + 1);
console.log(random);

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const startOver = document.querySelector(".resultParas");

//creating an element
const p = document.createElement("p");

let prevGuess = [];

let numGuess = 1;
//how many guesses the user has taken

let playGame = true;
//such variables are reqd whenever making a game

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter number greater than 0");
  } else if (guess > 100) {
    alert("Please enter number smaller than 101");
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      cleanupGuess(guess);
      displayMessage(`Game Over. Random number was ${random}`);
      endGame();
    } else {
      cleanupGuess(guess);
      checkGuess(guess);
    }
  }
} //checks for NaN, less than 1 or greater than 100

function checkGuess(guess) {
  if (guess === random) {
    displayMessage(`You guessed it right!`);
    endGame();
  } else if (guess < random) {
    displayMessage(`You guessed low!`);
  } else {
    displayMessage(`You guessed high!`);
  }
} //for numbers in 1 to 100

function cleanupGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess} `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
} //for manipulating DOM while playing game

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
} //for resetting everything after game over

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  //We don't want the user to be able to add any other value
  //'disabled' works generally in key-value pair that's why we put '' at end
  p.classList.add("button");
  p.innerHTML = '<h2 id="newGame">Start New Game</h2>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");

  newGameButton.addEventListener("click", function () {
    //reset all fields and the playGame true
    random = parseInt(Math.random() * 100 + 1);

    prevGuess = [];

    numGuess = 1;

    remaining.innerHTML = `${11 - numGuess}`;

    userInput.removeAttribute("disabled");

    startOver.removeChild(p);

    guessSlot.innerHTML = "";

    playGame = "true";
  });
}
