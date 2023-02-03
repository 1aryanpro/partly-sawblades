class Player extends Entity {
    constructor() {
        super(width / 2, height);
        this.canJump = true;
        this.canDouble = true;
        this.jumpHeld = false;
        this.hitGroundEvent = () => undefined;
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);

        fill(colors.dark);
        circle(0, 0, this.s);

        // fill((this.canJump || this.canDouble) ? colors.green : colors.red);
        // circle(0, 0, this.s - normalized(10));

        pop();
    }

    move() {
        let l = isControlDown(controls.left);
        let r = isControlDown(controls.right);
        let j = isControlDown(controls.jump);

        let speed = normalized(4) * (!this.canJump && !this.canDouble ? 1.5 : 1);
        if (l != r) {
            this.vel.x += speed * (r ? 1 : -1);
        }

        if (j) this.jump();
        this.jumpHeld = j;


        let gravity = normalized(j ? (this.canDouble ? 0.4 : 0.7) : 1);
        this.vel.y += gravity;

        super.move();
        this.vel.x = 0;
    }

    jump() {
        if (!this.canJump && !this.canDouble) return;
        if (!this.jumpHeld) {
            this.vel.y = this.canJump ? -normalized(10) : -normalized(9);
            this.canDouble = this.canJump ? this.canDouble : false;
            this.canJump = false;
        }
    }

    hitGround() {
        this.canJump = true;
        this.canDouble = true;
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

