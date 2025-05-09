//spooky tree with toggleable glowing face
class SpookyTree {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sparks = [];
    }

    display() {
        push();
        stroke(0);
        strokeWeight(4);
        fill('#2c2c2c');

        //main twisted trunk
        beginShape();
        vertex(this.x, this.y + 150);
        bezierVertex(this.x - 15, this.y + 80, this.x + 20, this.y + 40, this.x, this.y);
        bezierVertex(this.x - 40, this.y - 10, this.x + 40, this.y - 80, this.x + 10, this.y - 120);
        endShape();

        //branches
        this.drawBranch(this.x, this.y - 30, -60, -60);
        this.drawBranch(this.x, this.y - 60, 60, -70);
        this.drawBranch(this.x, this.y - 100, -40, -90);
        pop();

        //update and draw sparks
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            let s = this.sparks[i];
            s.update();
            s.display();
            if (s.isDone()) {
                this.sparks.splice(i, 1);
            }
        }
    }

    drawBranch(x, y, dx, dy) {
        push();
        stroke(0);
        line(x, y, x + dx, y + dy);
        pop();
    }

    isHit(mx, my) {
        return dist(mx, my, this.x, this.y - 60) < 50;
    }

    toggleFace() {
        //trigger spark burst on click
        for (let i = 0; i < 15; i++) {
            this.sparks.push(new Spark(this.x, this.y - 60));
        }
    }
}

class Spark {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.alpha = 255;
        this.size = random(4, 7);

        // 🎃 Choose random Halloween color: black or orange
        let choice = random() < 0.5 ? 'black' : 'orange';
        this.color = color(choice);
        this.color.setAlpha(this.alpha);
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 5;
        this.color.setAlpha(this.alpha);
    }

    display() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.size);
    }

    isDone() {
        return this.alpha <= 0;
    }
}

