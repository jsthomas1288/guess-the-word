const guess = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const word = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let firstWord = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const request = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const data = await request.text();
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  firstWord = wordArray[randomIndex].trim();
  console.log(firstWord);
  dotSymbol(firstWord);
};

getWord();

// This is to change the letters of the first word into "●"
const dotSymbol = function (firstWord) {
  const dotLetters = [];
  for (const letters of firstWord) {
    // console.log(letters);
    dotLetters.push("●");
    word.innerText = dotLetters.join("");
  }
};

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // This is to clear the message above the word disguised as "●"
  message.innerText = "";

  // This is to log out the text input into the console
  const letter = letterInput.value;
  // console.log(letter);

  // This checks what the text input is and tells the user what they should be doing
  const goodGuess = checkInput(letter);

  if (goodGuess) {
    // This stores all the guesses into an array
    makeGuess(letter);
  }

  // This is to clear the input box
  letterInput.value = "";
});

const checkInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // If nothing is entered in the text input box
  if (input.length === 0) {
    message.innerText = "Enter a letter from A-Z please!";

    // If they enter more than 1 letter at a time
  } else if (input.length > 1) {
    message.innerText = "Only one letter at a time please!";

    // If they enter anything besides a letter from A-Z
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Enter a letter from A-Z please!";

    // They finally got it right! Woohoo!
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  letter = letter.toUpperCase();
  if (guessedLetters.includes(letter)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else {
    guessedLetters.push(letter);
    console.log(guessedLetters);
    guessCount(letter);
    guessedList();
    letterReveal(guessedLetters);
  }
};

const guessedList = function () {
  guess.innerHTML = "";
  for (const letter of guessedLetters) {
    const letterList = document.createElement("li");
    letterList.innerText = letter;
    guess.append(letterList);
  }
};

const letterReveal = function (guessedLetters) {
  const wordUpper = firstWord.toUpperCase();
  const wordArray = wordUpper.split("");
  const dotRemove = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      dotRemove.push(letter.toUpperCase());
    } else {
      dotRemove.push("●");
    }
  }
  word.innerText = dotRemove.join("");
  checkWin();
};

const guessCount = function (letter) {
  const upperWord = firstWord.toUpperCase();
  if (!upperWord.includes(letter)) {
    message.innerText = `Sorry, but this word does not include the letter ${letter}. Try again!`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! This word does include the letter ${letter}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game Over. The word was <span class="highlight">${firstWord}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    span.innerText = `${remainingGuesses} guess`;
  } else {
    span.innerText = `${remainingGuesses} guesses`;
  }
};

const checkWin = function () {
  if (firstWord.toUpperCase() === word.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remaining.classList.add("hide");
  guess.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  remainingGuesses = 8;
  guessedLetters = [];
  span.innerText = `${remainingGuesses} guesses`;
  guess.innerHTML = "";
  message.innerText = "";

  getWord();

  guessButton.classList.remove("hide");
  remaining.classList.remove("hide");
  guess.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
