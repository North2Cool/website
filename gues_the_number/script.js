// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guessSubmit');
const message = document.querySelector('.message');
const guessField = document.querySelector('#guessField');

let guessCount = 0;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    guessCount++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the correct number in ${guessCount} guesses!`;
        message.style.color = 'green';
        gameOver();
    } else if (guessCount === 10) {
        message.textContent = `Game over! The correct number was ${randomNumber}.`;
        message.style.color = 'red';
        gameOver();
    } else {
        message.textContent = `Wrong guess! Try again. (${10 - guessCount} attempts left)`;
        message.style.color = 'red';
    }

    guessField.value = '';
    guessField.focus();
}

guesses.addEventListener('click', checkGuess);

function gameOver() {
    guessField.disabled = true;
    guesses.disabled = true;
    
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 0;
    const resetParas = document.querySelectorAll('.message p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    
    resetButton.parentNode.removeChild(resetButton);
    
    guessField.disabled = false;
    guesses.disabled = false;
    guessField.value = '';
    guessField.focus();
    
    message.style.color = 'black';
    
    randomNumber = Math.floor(Math.random() * 100) + 1;
}

