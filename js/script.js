// This is where the player's letter guess goes
const guess = document.querySelector(".guessed-letters");

// This is the guess button
const guessButton = document.querySelector(".guess");

// This is for the text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

// This is the paragraph where the word in progress will appear
const word = document.querySelector(".word-in-progress");

// This is to create an empty array to contain all the letters that the player guesses
const guessedLetters = [];

// This is the paragraph where the remaining guesses will display
const remaining = document.querySelector(".remaining");

// This is the span inside the paragraph where the remaining guesses will display
const span = document.querySelector("span");

// This is the paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// This is the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// This is for the starting word
const firstWord = "magnolia";

// This is to change the letters of the first word into "●"
const dotSymbol = function (parameter) {
  const dotLetters = [];
  for (const letters of parameter) {
    // console.log(letters);
    dotLetters.push("●");
    // console.log(dotLetters);
    word.innerText = dotLetters.join("");
  }
};

dotSymbol(firstWord);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  // This is to log out the text input into the console
  const letter = letterInput.value;
  // console.log(letter);

  // This is to clear the input box
  letterInput.value = "";

  // This is to clear the message above the word disguised as "●"
  message.innerText = "";

  // This checks what the text input is and tells the user what they should be doing
  const guess = checkInput(letter);

  // This stores all the guesses into an array
  makeGuess(letter);
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

const makeGuess = function (parameter) {
  const acceptedLetter = /[a-zA-Z]/;
  // Capitalizes the characters since JS is case sensitive
  const upperCase = parameter.toUpperCase();

  // This finds if a letter has been guessed more than once
  if (guessedLetters.includes(upperCase)) {
    message.innerText = "You already guessed that letter, silly. Try again.";
  } else if (parameter.length > 1) {
    message.innerText = "Only one letter at a time please!";
  } else if (!parameter.match(acceptedLetter)) {
    message.innerText = "Enter a letter from A-Z please!";
  } else {
    // Pushes the guessed letters into the guessesLetter array
    guessedLetters.push(upperCase);
    // This shows that the guesses are being stored in the guessedLetters array
    console.log(guessedLetters);
  }
};
