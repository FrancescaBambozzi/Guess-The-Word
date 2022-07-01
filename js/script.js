//unorderedList to show the letters the player guessed
const guessedLettersList = document.querySelector(".guessed-letters");
//button to guess
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

//GLOBAL VARIABLES
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

//fetch data for random words
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
  };
  
  // Fire off the game
  getWord();

//initially replace the letters of the word with symbol
const placeHolder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeHolder(word);

//add event listener when the GUESS buttton is clicked
buttonGuess.addEventListener("click", function (e) {
  e.preventDefault();
  // Empty message paragraph
  message.innerText = "";
  //store value of guessed letter from input
  const guessLetter = letterInput.value;
  //store value of VALIDATED input (only 1 letter)
  const goodGuess = validateInput(guessLetter);
  if (goodGuess !== undefined) {
    //or written: if (goodGuess)
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

  if (guessedLetters.includes(goodGuess)) {
    message.innerText = "You already guessed that letter. Try another one!";
  } else {
    guessedLetters.push(goodGuess);
    countRemainingGuesses(goodGuess);
    showGuesses();
    updateWordInProgress(guessedLetters);
  }
};

//SHOW the guessed letters
const showGuesses = function () {
  //clear the list
  guessedLettersList.innerHTML = "";
  guessedLetters.forEach(function (item) {
    let li = document.createElement("li");
    li.innerText = item;
    guessedLettersList.append(li);
  });
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin;
};

//count and display remaining guesses
const countRemainingGuesses = function (goodGuess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(goodGuess)) {
    message.innerText = `Sorry, the word has no ${goodGuess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${goodGuess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
  } else if (remainingGuesses === 1) {
    span.innerText = `${remainingGuesses} guess`;
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

//check if the player guessed all letters
const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
