function gameOverScreen(points) {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(25);
    text('Your Score was', width / 2, 150);
    text('Press any Key to Restart', width/2, 350);
    textSize(150);
    text(points, width / 2, 250);
    // rect(50, 350, width - 100, 100);

    // fill('lightblue');
    // textSize(25);
    // text('Restart', width / 2, 400);
}

function startScreen() {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(50);
    let title = 'Partly-Sawblades';
    text(title, width / 2, 100);

    textSize(25);
    rect(50, 200, width - 100, 100);
    fill('lightblue');
    text('Start Game', width / 2, 250);

    fill(0);
    rect(50, 350, width - 100, 100);
    textFont('Impact');
    fill('lightblue');
    text('Controls', width / 2, 400);
}

function controlsScreen() {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(50);
    let title = 'Controls';
    text(title, width / 2, 100);

    textSize(25);
    textFont('Arial');
    text('A or Left-Arrow to Move Left', width / 2, 180);
    text('D or Right-Arrow to Move Right', width / 2, 210);
    text('W, Up-Arrow, or Space to Jump', width / 2, 240);
    text('Hold Jump to Jump Higher', width / 2, 280);

    rect(50, 350, width - 100, 100);
    textFont('Impact');
    fill('lightblue');
    text('Back', width / 2, 400);
}
