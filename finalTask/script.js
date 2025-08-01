let timeGame = document.querySelector("#game-time");
let time = document.querySelector("#time");
let result = document.querySelector("#result");
let buttonStart = document.querySelector("#start");
let gameField = document.querySelector("#game");
let timeHeader = document.querySelector("#time-header");
let resultHeader = document.querySelector("#result-header");

let timer;
let score;
let square = {
    x: 0,
    y: 0,
    size: 100,
    color: 'green'
};

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 300;
canvas.height = 300;
canvas.id = 'сanvas';
canvas.style.background = 'white';
canvas.style.border = '1px solid #ccc';
canvas.classList.add('hide'); 
gameField.appendChild(canvas);

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    square.color = color;
}

function randomSize() {
    const minSize = 30;
    const maxSize = 150;

    square.size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
}

function randomPosition() {
    const maxX = canvas.width - square.size;
    const maxY = canvas.height - square.size;

    square.x = Math.floor(Math.random() * (maxX + 1));
    square.y = Math.floor(Math.random() * (maxY + 1));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x, square.y, square.size, square.size);
}

function updateTimer(){
    let rounded = (time.innerHTML - 0.1).toFixed(1);
    time.innerHTML = rounded;

    if (time.innerHTML == 0){
        clearInterval(timer);
        result.innerHTML = score;
        timeHeader.classList.add('hide');
        resultHeader.classList.remove('hide');
        canvas.classList.toggle('hide');
        buttonStart.disabled = false;
        buttonStart.classList.toggle('hide');
    }
}

function start() {
    score = 0;

    buttonStart.disabled = true;
    buttonStart.classList.add('hide');
    canvas.classList.remove('hide');
    timeHeader.classList.remove('hide');
    resultHeader.classList.add('hide');    

    time.innerHTML = timeGame.value + ".0";
    timer = setInterval(updateTimer, 100);
    
    draw();
}

buttonStart.addEventListener("click", start);
canvas.addEventListener("click", function(event) {
    const rectCanvas = canvas.getBoundingClientRect();
    const clickX = event.clientX - rectCanvas.left;
    const clickY = event.clientY - rectCanvas.top;

    if (
        clickX >= square.x &&
        clickX <= square.x + square.size &&
        clickY >= square.y &&
        clickY <= square.y + square.size
    ) {
        score++;

        randomColor();
        randomSize();
        randomPosition();

        draw();
    }
});