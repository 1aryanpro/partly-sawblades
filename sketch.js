// TODO: Adjust Speeds to be Frame Rate Accurate

let state = 'start';
let game;
let gameOverMS;

let clouds = [];

function setup() {
    let cHeight = windowHeight * 2 / 3;
    let cWidth = cHeight / 500 * 400;
    createCanvas(cWidth, cHeight, P2D);
    noStroke();

    if (getItem('highscore') == undefined) {
        storeItem('highscore', 0);
    }
    updateHS(0);

    for (let i = 0; i < 100; i++) {
        clouds.push([random(1), i / 100]);
    }
}

function draw() {
    drawBackground();

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
    gameOverMS = undefined;
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

function drawBackground() {
    background(colors.light);

    fill(colors.red);
    rect(0, 0, width, height * 0.08);
    clouds.forEach((p, i) => {
        let [x, y] = p;
        ellipse(x * width, y * height * 0.2, height / 6 * (1 - y), height / 6 * (1 - y));

        if (p[1] > 1) {
            p[1]--;
        }

        p[1] += 0.005;

    });


    push();

    let angle = radians((millis() / 5) % 360)
    let sina = pow(abs(sin(angle)), 1 / 3) * 10;
    let cosa = pow(abs(cos(angle)), 1 / 3) * 10;

    translate(0, height);

    fill(colors.green);
    triangle(width / 8, cosa, width / 2, cosa, width * 2.5 / 8, -height / 6 + cosa);
    triangle(width * 7 / 8, cosa, width / 2, cosa, width * 5.5 / 8, -height / 6 + cosa);

    fill(colors.lightgreen);
    triangle(width / 4, sina, width * 3 / 4, sina, width / 2, -height / 7 + sina);
    triangle(width * 3 / 8, 0, 0, 0, 0, -height / 7);
    triangle(width * 5 / 8, 0, width, 0, width, -height / 7);

    pop();

    fill(0)
    rect(0, height - 30, width, 5);
    fill(colors.lightpurple);
    rect(0, height - 25, width, 25);
}

