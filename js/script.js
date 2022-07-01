const buttonGuess = document.querySelector(".guess");
//Input for guess letters
const letterInput = document.querySelector(".letter");
//empty <p> where word-in-progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//<p> where remaining guesses will appear
const remainingP = document.querySelector(".remaining");
//span of remaining paragraph
const span = document.querySelector(".remaining span");
//empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
//button "play again" initially hide
const buttonAgain = document.querySelector(".play-again");

//set initial word to guess
const word = "magnolia";
//store the letters the player ALREADY GUESSED
const guessedLetters = [];

const updateWordInProgress = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

updateWordInProgress(word);

//add event listener when the GUESS buttton is clicked
buttonGuess.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  //store value of guessed letter from input
  const guessLetter = letterInput.value;
  //store value of VALIDATED input (only 1 letter)
  const goodGuess = validateInput(guessLetter);
  if (goodGuess !== undefined) { //or written: if (goodGuess)
    makeGuess(goodGuess);
  }
  letterInput.value = "";
});

const validateInput = function (inputValue) {
  const acceptedLetter = /[a-zA-Z]/;
  if (inputValue.legth === 0) {
    message.innerText = "Please enter a letter.";
  } else if (inputValue.length > 1) {
    message.innerText = "Please enter a single letter.";
  } else if (!inputValue.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return inputValue;
  }
};

//capture the input and add it to the guessedLetters array
const makeGuess = function (goodGuess) {
  goodGuess = goodGuess.toUpperCase();

  if (!guessedLetters.includes(goodGuess)) {
    guessedLetters.push(goodGuess);
  } else {
    message.innerText = "You already guessed that letter. Try another one!";
  }
  console.log(guessedLetters);
};
