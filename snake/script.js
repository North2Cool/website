const gameBoard = document.querySelector('.game-board');
const gridSize = 20; // Each grid cell is 20x20 pixels
const snakeSpeed = 150; // Snake speed in milliseconds
let snakeDirection = 'right';
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let score = 0;
let gameInterval;

function createGameBoard() {
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
}

function createSnake() {
    snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.classList.add('snake');
        snakeSegment.style.gridRowStart = segment.y;
        snakeSegment.style.gridColumnStart = segment.x;
        gameBoard.appendChild(snakeSegment);
    });
}

function createFood() {
    const foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gameBoard.appendChild(foodElement);
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (snakeDirection) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * gridSize) + 1, y: Math.floor(Math.random() * gridSize) + 1 };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
    location.reload();
}

function startGame() {
    createGameBoard();
    createSnake();
    createFood();
    gameInterval = setInterval(() => {
        gameBoard.innerHTML = '';
        moveSnake();
        createSnake();
        createFood();
        checkCollision();
    }, snakeSpeed);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (snakeDirection !== 'down') snakeDirection = 'up';
            break;
        case 'ArrowDown':
            if (snakeDirection !== 'up') snakeDirection = 'down';
            break;
        case 'ArrowLeft':
            if (snakeDirection !== 'right') snakeDirection = 'left';
            break;
        case 'ArrowRight':
            if (snakeDirection !== 'left') snakeDirection = 'right';
            break;
    }
});

startGame();
