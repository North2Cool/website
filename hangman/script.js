const words = ["javascript", "hangman", "programming", "computer", "web", "developer"];
let word = words[Math.floor(Math.random() * words.length)];
const wordDisplay = document.getElementById("word");
const lettersDisplay = document.getElementById("letters");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guess-button");
const hangmanParts = document.querySelectorAll(".hangman div");

let guessedLetters = [];
let incorrectGuesses = 0;
let maxIncorrectGuesses = 6;

function displayWord() {
    let display = "";
    for (const letter of word) {
        if (guessedLetters.includes(letter)) {
            display += letter;
        } else {
            display += "_";
        }
        display += " ";
    }
    wordDisplay.textContent = display;
}

function displayLetters() {
    lettersDisplay.textContent = "Guessed Letters: " + guessedLetters.join(", ");
}

function checkWin() {
    if (word === wordDisplay.textContent.replace(/ /g, "")) {
        setTimeout(() => alert("Congratulations! You've won!"), 100);
        guessInput.disabled = true;
        guessButton.disabled = true;
    } else if (incorrectGuesses >= maxIncorrectGuesses) {
        setTimeout(() => alert("Game Over. The word was: " + word), 100);
        guessInput.disabled = true;
        guessButton.disabled = true;
    }
}

function guessLetter() {
    const letter = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guessedLetters.includes(letter)) {
        alert("You already guessed that letter.");
        return;
    }

    if (!word.includes(letter)) {
        incorrectGuesses++;
        hangmanParts[incorrectGuesses - 1].style.visibility = "visible";
    }

    guessedLetters.push(letter);
    displayWord();
    displayLetters();
    checkWin();
}

guessButton.addEventListener("click", guessLetter);

displayWord();
displayLetters();
