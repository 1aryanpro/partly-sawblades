const controls = {
    left: [37, 65],
    right: [39, 68],
    jump: [38, 87, 32],
};

function isControlDown(arr) {
    return arr.map(n => keyIsDown(n)).reduce((a, b) => a || b);
}

function button(name, y) {
    let x = width / 8;

    let btnW = width * 3 / 4;
    let btnH = height / 5;

    textFont('Impact');
    textSize(width / 16);
    fill(colors.dark);
    rect(x, y, btnW, btnH);
    fill(colors.light);
    text(name, x + btnW / 2, y + btnH / 2);
}

function title(txt) {
    textFont('Impact');
    textAlign(CENTER, CENTER);
    fill(colors.dark);
    textSize(width / 8);
    text(txt, width / 2, height / 4);
}

const normalized = n => n * width / 400;

function updateHS(score) {
    let highScore = max(getItem('highscore'), score);
    storeItem('highscore', highScore);
    return highScore;
}

const colors = {
    dark: '#45444f',
    grey: '#b5b0aa',
    light: '#e0ded5',
    lightblue: '#68c2d3',
    red: '#f43356',
    green: '#36b54f',
    lightgreen: '#72d385',
    purple: '#7D38FF',
    lightpurple: '#B19CD8',
}
