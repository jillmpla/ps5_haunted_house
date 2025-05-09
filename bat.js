//bat class with flight animation and click interaction
class Bat {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(0.8, 1.2);
        this.speedX = random(1.5, 2.5);
        this.flyingAway = false;
    }

    move() {
        if (this.flyingAway) {
            this.y -= 4;
        } else {
            this.x += this.speedX;
            this.y += sin(frameCount * 0.1 + this.x * 0.01);

            //loop bat back to the left side once it flies off the right edge
            if (this.x > width + 30) {
                this.x = -30;
                this.y = random(50, 300);         //reset Y for variation
                this.speedX = random(1.5, 2.5);
                this.flyingAway = false;          //reset flying state
            }
        }
    }

    display() {
        push();
        translate(this.x, this.y);
        scale(this.size);
        fill(0);
        beginShape();
        vertex(0, 0);
        bezierVertex(-15, -10, -25, 10, -10, 5);
        bezierVertex(-5, 10, 5, 10, 10, 5);
        bezierVertex(25, 10, 15, -10, 0, 0);
        endShape(CLOSE);
        pop();
    }

    isHit(mx, my) {
        return dist(mx, my, this.x, this.y) < 20;
    }

    flyAway() {
        this.flyingAway = true;
    }

    isOffScreen() {
        return this.y < -30;
    }
}
