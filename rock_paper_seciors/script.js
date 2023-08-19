const choices = document.querySelectorAll('.choice');
const result = document.querySelector('.result');
const computerChoiceText = document.querySelector('.computer-choice');
const winnerText = document.querySelector('.winner');

choices.forEach(choice => {
    choice.addEventListener('click', playGame);
});

function computerPlay() {
    const computerChoices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return computerChoices[randomIndex];
}

function playGame(e) {
    const playerChoice = e.target.dataset.choice;
    const computerChoice = computerPlay();

    computerChoiceText.textContent = `Computer chose: ${computerChoice}`;

    const resultText = getWinner(playerChoice, computerChoice);

    winnerText.textContent = resultText;
}

function getWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    } else if ((player === 'rock' && computer === 'scissors') ||
               (player === 'paper' && computer === 'rock') ||
               (player === 'scissors' && computer === 'paper')) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}
