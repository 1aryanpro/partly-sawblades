function gameOverScreen(points) {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(colors.dark);
    textSize(normalized(25));
    text('Your Score was', width / 2, height / 2 - 100);
    text('Press any Key to Restart', width / 2, height / 2 + 100);
    textSize(normalized(150));
    text(points, width / 2, height / 2);
}

function startScreen() {
    title('Partly-Sawblades');
    button('Start Game', height * 2 / 5);
    button('How to Play', height * 7 / 10);
}

function controlsScreen() {

    title('How to Play');

    let lineH = width / 16;
    let lineY = (n) => height / 4 + lineH + lineH * n;

    fill(colors.dark);
    textSize(lineH - 5);
    textFont('Arial');
    text('WASD or Arrow Keys to Move', width / 2, lineY(1));
    text('Hold Jump to Jump Higher', width / 2, lineY(2));
    text('Double Jump to be Faster in the Air', width / 2, lineY(3));
    text('Jump Over Saws to get Points', width / 2, lineY(4.5));

    button('Back', height * 7 / 10);
}
