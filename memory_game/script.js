const gameContainer = document.getElementById('game-container');
const resetButton = document.getElementById('reset-button');

const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCards() {
    shuffleArray(cardValues);

    for (let i = 0; i < cardValues.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardValues[i];
        card.textContent = cardValues[i];
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
        this.classList.add('hidden');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.dataset.value === card2.dataset.value) {
                matchedCards.push(card1, card2);
                flippedCards = [];
                if (matchedCards.length === cardValues.length) {
                    setTimeout(() => alert('Congratulations! You won!'), 100);
                }
            } else {
                setTimeout(() => {
                    card1.classList.remove('hidden');
                    card2.classList.remove('hidden');
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

function resetGame() {
    gameContainer.innerHTML = '';
    flippedCards = [];
    matchedCards = [];
    createCards();
}

resetButton.addEventListener('click', resetGame);

createCards();
