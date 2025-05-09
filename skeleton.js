class Skeleton {
    constructor(x, y) {
        this.startX = x;
        this.x = x;
        this.y = y;
        this.visible = false;
        this.animationFrame = 0;
        this.riseProgress = 0;
    }

    reset() {
        this.x = this.startX + random(-30, 30); //random offset for surprise
        this.animationFrame = 0;
        this.riseProgress = 0;
        this.visible = true;
    }

    move() {
        if (!this.visible) return;

        //rises from the ground for the first 30 frames
        if (this.riseProgress < 1) {
            this.riseProgress += 0.03;
        }

        //animate creepy jitter dance
        this.animationFrame++;

        //after 90 frames (~1.5s), disappear
        if (this.animationFrame > 90) {
            this.visible = false;
        }
    }

    display() {
        if (!this.visible) return;

        push();
        translate(this.x, this.y - 50 * this.riseProgress); //rise from ground

        stroke(30);
        strokeWeight(2);
        fill(200);

        //body twitch animation
        let jitter = sin(this.animationFrame * 0.3) * 5;

        //head
        ellipse(0 + jitter, -30, 22, 24);
        fill(0);
        ellipse(-5 + jitter, -32, 4); //left eye
        ellipse(5 + jitter, -32, 4);  //right eye

        //torso
        fill(180);
        rect(-6 + jitter, -10, 12, 25, 4);

        //arms (swaying)
        line(0 + jitter, -5, -12 + jitter, 5);
        line(0 + jitter, -5, 12 + jitter, 5);

        //legs (bent)
        line(0 + jitter, 15, -5 + jitter, 30);
        line(0 + jitter, 15, 5 + jitter, 30);

        pop();
    }
}

//global handler in hauntedhouse.js
function handleSkeleton() {
    if (frameCount % (60 * 7) === 1) {
        skeleton.reset();
    }
    if (skeleton.visible) {
        skeleton.move();
        skeleton.display();
    }
}

