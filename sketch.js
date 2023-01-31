// TODO: Adjust Speeds to be Frame Rate Accurate
// TODO: Adjust Speeds to be Canvas Size Accurate

let state = 'start';
let game;
let gameOverMS;

function setup() {
    createCanvas(400, 500, P2D);
}

function draw() {
    background('lightblue');
    switch (state) {
        case 'start':
            startScreen();
            break;
        case 'controls':
            controlsScreen();
            break;
        case 'game':
            game.step();
            if (game.gameOver) {
                if (gameOverMS == undefined) gameOverMS = millis() + 1000;
                if (millis() > gameOverMS) endGame();
                console.log()
            }
            break;
        case 'gameOver':
            gameOverScreen(game.points);
            break;
    }
}

function mousePressed() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height)
        return;

    switch (state) {
        case 'start':
            if (mouseY < 350) startGame();
            else showControlsScreen();
            break;
        case 'controls':
            showTitleScreen();
            break;
        case 'gameOver':
            startGame();
            break;
    }
}

function keyPressed() {
    if (state == 'gameOver') startGame();
}

function startGame() {
    game = new Game();
    state = 'game';
}

function showControlsScreen() {
    state = 'controls';
}

function showTitleScreen() {
    state = 'start';
}

function endGame() {
    state = 'gameOver';
}
