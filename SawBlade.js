class SawBlade extends Entity {
    constructor(speed = normalized(5)) {
        let angle;
        do {
            angle = random(0, 180);
        } while (abs(angle - 90) < 20 || abs(angle - 90) > 70);

        super();
        let r = this.r;
        this.pos.x = random(r, width - r);
        this.pos.y = -r;

        this.vel = p5.Vector.fromAngle(radians(angle)).mult(speed);

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

        fill(this.primed ? colors.lightgreen : colors.red)
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

