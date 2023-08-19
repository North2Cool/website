const holes = document.querySelectorAll('.hole');
let lastHole;
let timeUp = false;
let score = 0;

holes.forEach(hole => {
    hole.addEventListener('click', bonk);
});

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return randomHole(holes);
    }

    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);

    hole.classList.add('up');

    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 10000); // Game lasts for 10 seconds
}

function bonk(e) {
    if (!e.isTrusted) return; // Prevent cheating by programmatically clicking
    score++;
    this.classList.remove('up');
}

