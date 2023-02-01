class Entity {
    constructor(x = 0, y = 0, s = normalized(35)) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.s = s;
        this.r = s / 2;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y)
        fill(colors.dark);
        circle(0, 0, this.s);
        pop();
    }

    move() {
        this.pos.add(p5.Vector.mult(this.vel, 60 / frameRate()));
    }

    bounce() { }

    step() {
        this.move();
        this.bounce();
    }
}

class SawBlade extends Entity {
    constructor(speed = normalized(6)) {
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

        this.rotation = 0;
        this.rotDir = random([-1, 1]);
    }

    draw() {
        push();

        translate(this.pos.x, this.pos.y)

        let degStep = radians(30) * -this.rotDir;
        let cosStep = cos(degStep);
        let sinStep = sin(degStep);

        let sawTip = this.r + normalized(7);

        fill(0);
        rotate(this.rotation);
        for (let i = 0; i < 12; i++) {
            rotate(degStep);
            triangle(this.r, 0, this.r * cosStep, this.r * sinStep, sawTip * cosStep, sawTip * sinStep);
        }

        circle(0, 0, this.s);

        fill(this.primed ? colors.green : colors.red)
        circle(0, 0, this.s - normalized(5));

        pop();
    }

    bounce() {
        this.rotation += radians(5) * this.rotDir;

        let r = this.r + normalized(5);
        if (this.pos.x - r < 0) {
            this.pos.x = r;
            this.vel.x *= -1;

            this.rotDir = this.vel.y > 0 ? 1 : -1;
        }

        if (this.pos.x + r > width) {
            this.pos.x = width - r;
            this.vel.x *= -1;

            this.rotDir = this.vel.y > 0 ? -1 : 1;
        }

        if (this.pos.y + r > height - 30) {
            this.pos.y = height - 30 - r;
            this.vel.y *= -1;

            this.rotDir = this.vel.x > 0 ? 1 : -1;
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

        let speed = normalized(4);
        if (l != r) this.pos.x += speed * (r ? 1 : -1);

        this.jumpHeld = j ? this.jumpHeld + 1 : 0;
        this.jump();


        let gravity = normalized(1);
        this.vel.y += gravity - (j ? normalized(0.6) : 0);

        super.move();
    }

    jump() {
        if (!this.canJump) return;
        if (this.jumpHeld == 1) this.vel.y -= normalized(10);
        this.canJump = false;
    }

    hitGround() {
        this.canJump = true;
        this.vel.y = 0;

        this.hitGroundEvent();
    }

    bounce() {
        this.pos.x = constrain(this.pos.x, this.r, width - this.r);
        let bottom = height - 30 - this.r;
        this.pos.y = min(this.pos.y, bottom);
        if (this.pos.y == bottom) this.hitGround();
    }
}

class Scrap extends Entity {
    constructor(x, y) {
        super(x, y);
        this.s = this.r * 1.5;
        this.r = this.s / 2;

        this.vel = p5.Vector.fromAngle(random(PI, TWO_PI)).mult(normalized(6));
        this.offset = floor(random(360));
    }

    draw() {
        push();
        let floatHeight = (sin(radians(millis() / 4 % 360 + this.offset)) - 1);
        translate(this.pos.x, this.pos.y + floatHeight * normalized(5));
        rotate(radians(45));
        fill(colors.purple);
        rectMode(CENTER)
        square(0, 0, this.s * sqrt(2) / 2)
        fill(colors.lightpurple);
        square(0, 0, (this.s - normalized(10)) * sqrt(2) / 2);
        pop();
    }

    move() {
        this.vel.y += normalized(0.6);
        super.move();
    }

    bounce() {
        let r = this.r;
        if (this.pos.x - r < 0 || this.pos.x + r > width) {
            this.pos.x = constrain(this.pos.x, r, width - r);
            this.vel.x *= -1;
        }
        if (this.pos.y + r >= height - 30) {
            this.pos.y = height - 30 - r;
            this.vel.y = 0;
            this.vel.x *= 0.6;
        }
    }
}

