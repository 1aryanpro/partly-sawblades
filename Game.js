const controls = {
    left: [37, 65],
    right: [39, 68],
    jump: [38, 87, 32],
};

function isControlDown(arr) {
    return arr.map(n => keyIsDown(n)).reduce((a, b) => a || b);
}

class Game {
    constructor() {
        this.saws = [];
        this.nextSaws = millis() + 1500;

        this.points = 0;

        this.player = new Player();
        this.player.hitGroundEvent = this.playerHitGround.bind(this);
        this.gameOver = false;
    }

    displayOnly() {
        fill(0);
        textSize(150);
        text(this.points, width / 2, height / 2);

        this.player.draw();
        this.saws.forEach(s => s.draw());
    }

    step() {
        if (this.gameOver) {
            this.displayOnly();
            return;
        }

        fill(0);
        textSize(150);
        text(this.points, width / 2, height / 2);

        this.player.step();

        if (millis() > this.nextSaws) {
            this.saws.push(new SawBlade());
            if (random([true, false])) {
                this.saws.push(new SawBlade());
            }
            this.nextSaws += 1750;
        }

        for (let i = this.saws.length - 1; i >= 0; i--) {
            let saw = this.saws[i];
            if (saw.vel.y < 0 && saw.pos.y < -saw.s) {
                this.saws.splice(i, 1);
                continue;
            }
            saw.step();

            if (this.player.pos.y < saw.pos.y && abs(this.player.pos.x - saw.pos.x) < saw.s)
                saw.primed = true;

            if (p5.Vector.sub(this.player.pos, saw.pos).mag() < this.player.r + saw.r) {
                this.gameOver = true;
                break;
            }
        }
    }

    playerHitGround() {
        let sawsBroken = 0;
        for (let i = this.saws.length - 1; i >= 0; i--) {
            let saw = this.saws[i];
            if (!saw.primed) continue;

            this.saws.splice(i, 1);
            sawsBroken++;
        }
        this.points += sawsBroken;
    }
}


