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
const messageP = document.querySelector(".message");
//button "play again" initially hide
const buttonAgain = document.querySelector(".play-again");

//set initial word to guess
const word = "magnolia";

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
  //store value of guessed letter from input
  const guessLetter = letterInput.value;
  console.log(guessLetter);
  letterInput.value = "";
});
