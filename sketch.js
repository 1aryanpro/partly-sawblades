const controls = {
    left: [37, 65],
    right: [39, 68],
    jump: [38, 87, 32],
}

function isControlDown(arr) {
    return arr.map(n => keyIsDown(n)).reduce((a, b) => a || b);
}

let player;
let saws = [];
let nextSaws = 1500;
let points = 0;

// TODO: Adjust Speeds to be Frame Rate Accurate
// TODO: Adjust Speeds to be Canvas Size Accurate

function setup() {
    createCanvas(400, 500, P2D);
    player = new Player();
}

function draw() {
    background('lightblue');
    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(150);
    textFont('Impact');
    text(points, width/2, height/2);

    player.step();

    if (millis() > nextSaws) {
        saws.push(new SawBlade());
        if (random([true, false])) {
            saws.push(new SawBlade());
        }
        nextSaws += 1500;
    }

    for (let i = saws.length - 1; i >= 0; i--) {
        let saw = saws[i];
        if (saw.vel.y < 0 && saw.pos.y < -saw.s) {
            saws.splice(i, 1);
            continue;
        }

        if (player.pos.y < saw.pos.y && abs(player.pos.x - saw.pos.x) < saw.s)
            saw.primed = true;

        if (p5.Vector.sub(player.pos, saw.pos).mag() < player.r + saw.r)
            noLoop();

        saw.step();
    }
}

function playerHitGround() {
    for (let i = saws.length - 1; i >= 0; i--) {
        let saw = saws[i];
        if (!saw.primed) continue;

        saws.splice(i, 1);
        points++;
    }
}


class Entity {
    constructor(x = 0, y = 0, vx = 0, vy = 0, s = width/11) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.s = s;
        this.r = s / 2;
    }

    draw() {
        fill(0)
        circle(this.pos.x, this.pos.y, this.s);
    }

    move() {
        this.pos.add(this.vel)
    }

    bounce() { }

    step() {
        this.move();
        this.bounce();
        this.draw();
    }
}

class SawBlade extends Entity {
    constructor(speed = 6) {
        let angle;
        do {
            angle = random(0, 180);
        } while (abs(angle - 90) < 20 || abs(angle - 90) > 70);

        super();
        let r = this.r;
        this.pos.x = random(r, width - r);
        this.pos.y = -r;

        this.vel = p5.Vector.fromAngle(radians(angle)).mult(speed);
        this.vel.y = abs(this.vel.y);

        this.primed = false;
    }

    draw() {
        fill(0)
        circle(this.pos.x, this.pos.y, this.s + 4);
        fill(this.primed ? 'green' : 'red')
        circle(this.pos.x, this.pos.y, this.s);
    }

    bounce() {
        let r = this.r;
        if (this.pos.x - r < 0 || this.pos.x + r > width) {
            this.pos.x = max(r, min(width - r, this.pos.x));
            this.vel.x *= -1;
        }
        if (this.pos.y + r > height) {
            this.pos.y = height - r;
            this.vel.y *= -1;
        }
    }
}

class Player extends Entity {
    constructor() {
        super(width / 2, height);
        this.canJump = true;
        this.jumpHeld = 0;
    }

    move() {
        let l = isControlDown(controls.left);
        let r = isControlDown(controls.right);
        let j = isControlDown(controls.jump);

        let speed = 4;
        if (l != r) this.pos.x += speed * (r ? 1 : -1);

        if (j) { this.jump(); this.jumpHeld++; }
        else { this.jumpHeld = 0; this.canJump = false; }

        this.pos.add(this.vel);

        let gravity = 1;
        this.vel.y += gravity - (j ? 0.6 : 0);
    }

    jump() {
        if (!this.canJump) return;
        if (this.jumpHeld == 0) this.vel.y -= 10;
    }

    hitGround() {
        this.canJump = true;
        this.vel.y = 0;

        playerHitGround();
    }

    bounce() {
        this.pos.x = max(this.r, min(width - this.r, this.pos.x));
        let bottom = height - this.r;
        this.pos.y = min(this.pos.y, bottom);
        if (this.pos.y == bottom) this.hitGround();
    }
}

