class Entity {
    constructor(x = 0, y = 0, vx = 0, vy = 0, s = width / 11) {
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
        this.hitGroundEvent = () => undefined;
    }

    move() {
        let l = isControlDown(controls.left);
        let r = isControlDown(controls.right);
        let j = isControlDown(controls.jump);

        let speed = 4;
        if (l != r) this.pos.x += speed * (r ? 1 : -1);

        this.jumpHeld = j ? this.jumpHeld + 1 : 0;
        this.jump();

        this.pos.add(this.vel);

        let gravity = 1;
        this.vel.y += gravity - (j ? 0.6 : 0);
    }

    jump() {
        if (!this.canJump) return;
        if (this.jumpHeld == 1) this.vel.y -= 10;
        this.canJump = false;
    }

    hitGround() {
        this.canJump = true;
        this.vel.y = 0;

        this.hitGroundEvent();
    }

    bounce() {
        this.pos.x = max(this.r, min(width - this.r, this.pos.x));
        let bottom = height - this.r;
        this.pos.y = min(this.pos.y, bottom);
        if (this.pos.y == bottom) this.hitGround();
    }
}

