// TODO: Adjust Speeds to be Frame Rate Accurate
// TODO: Adjust Speeds to be Canvas Size Accurate

let state = 'start';
let game;
let gameOverMS;

function setup() {
    let cHeight = windowHeight * 2 / 3;
    let cWidth = cHeight / 500 * 400;
    createCanvas(cWidth, cHeight, P2D);
    noStroke();

    if (getItem('highscore') == undefined) {
        storeItem('highscore', 0);
    }
    updateHS(0);
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
                if (gameOverMS == undefined) gameOverMS = millis() + 1200;
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
            if (mouseY < height * 7 / 10) startGame();
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
    if ([16, 17, 18, 27, 91, 93].indexOf(keyCode) != -1) return;

    if (state == 'gameOver') startGame();
    if (state == 'start') startGame();
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
    updateHS(game.points);
}

function updateHS(score) {
    let highScore = max(getItem('highscore'), score);
    storeItem('highscore', highScore);
    document.getElementById('hs').innerText = highScore;
}
