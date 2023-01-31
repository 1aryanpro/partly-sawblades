function button(name, y) {
    let x = width / 8;

    let btnW = width * 3 / 4;
    let btnH = height / 5;

    textFont('Impact');
    textSize(width / 16);
    fill(0);
    rect(x, y, btnW, btnH);
    fill('lightblue');
    text(name, x + btnW / 2, y + btnH / 2);
}

function title(txt) {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(width / 8);
    text(txt, width / 2, height / 5);
}

function gameOverScreen(points) {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(25);
    text('Your Score was', width / 2, height / 2 - 100);
    text('Press any Key to Restart', width / 2, height / 2 + 100);
    textSize(150);
    text(points, width / 2, height / 2);
}

function startScreen() {

    title('Partly-Sawblades');

    button('Start Game', height * 2 / 5);

    button('How to Play', height * 7 / 10);
}

function controlsScreen() {

    title('How to Play');

    let lineH = width/16;
    let lineY = (n) => height / 5 + lineH + lineH * n;
    textSize(lineH - 5);
    textFont('Arial');
    text('WASD or Arrow Keys to Move', width / 2, lineY(1));
    text('Space also works as Jump', width / 2, lineY(2));
    text('Hold Jump to Jump Higher', width / 2, lineY(3));
    text('Jump Over Saws to get Points', width / 2, lineY(4));

    button('Back', height * 7 /10);
}
