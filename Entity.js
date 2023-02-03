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

