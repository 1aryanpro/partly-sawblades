class Scrap extends Entity {
    constructor(saw) {
        super(saw.pos.x, saw.pos.y);
        this.s = this.r * 1.5;
        this.r = this.s / 2;

        // this.vel = p5.Vector.fromAngle(random(PI, TWO_PI)).mult(normalized(6));
        this.vel = p5.Vector.rotate(saw.vel, radians(random(-30, 30)));
        let mag = this.vel.mag();
        this.vel.y -= this.vel.mag() * 1.2;

        this.vel.setMag(normalized(6));
        this.vel.y *= 1.5;

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

