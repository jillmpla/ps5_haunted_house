//main setup and draw loop
let bats = [];
let trees = [];
let pumpkinHovered = false;

let skeleton;
let showSkeleton = false;
let smokePuffs = [];

function setup() {
    createCanvas(600, 500);
    createCanvas(900, 650);
    textFont('Segoe UI');
    noStroke();

    //initialize bats
    for (let i = 0; i < 6; i++) {
        bats.push(new Bat(random(width), random(100, 200)));
    }

    //add spooky trees to the scene
    trees.push(new SpookyTree(60, 300));
    trees.push(new SpookyTree(540, 300));

    //create the skeleton object
    skeleton = new Skeleton(270, 430);
}

function draw() {
    drawBackground();     //white background
    drawMoon();           //glowing yellow moon
    drawHouse();          //haunted house with chimney smoke
    drawPumpkin(480, 420, 50); // creepy pumpkin

    //draw interactive spooky trees
    trees.forEach(tree => tree.display());

    //animate bats flying across the scene
    animateBats();

    //handle skeleton appearance and animation
    handleSkeleton();

    //show pumpkin message on hover
    if (pumpkinHovered) {
        fill(50, 0, 0);
        textSize(25);
        text("🎃 Happy Halloween!", 500, height - 150);
    }
}

function drawBackground() {
    background(240); //gray
}

function drawMoon() {
    push();
    translate(460, 100); //moon position

    //animate glow with sine wave
    let glowSize = 130 + sin(frameCount * 0.02) * 25;

    //outer animated glow
    noStroke();
    fill(255, 255, 180, 50);
    ellipse(0, 0, glowSize);
    fill(255, 255, 180, 80);
    ellipse(0, 0, glowSize - 20);

    //moon base
    fill(240);
    ellipse(0, 0, 90);

    //craters
    fill(200);
    ellipse(-15, -10, 10);
    ellipse(10, 5, 6);
    ellipse(5, -15, 8);
    ellipse(-20, 15, 7);
    ellipse(15, 15, 5);

    //subtle shadow
    fill(0, 0, 0, 30);
    arc(0, 0, 90, 90, PI / 8, PI * 1.2);

    pop();
}

function drawHouse() {
    //base shadow
    fill(220);
    rect(153, 223, 300, 230, 5);

    //main structure
    fill('#2c3e50');
    rect(150, 220, 300, 230, 5);

    //roof
    fill('#1a252f');
    triangle(150, 220, 300, 110, 450, 220);

    //chimney
    fill('#34495e');
    rect(170, 155, 20, 50);

    //continuous smoke from chimney
    drawSmoke(180, 155);

    //windows
    fill('#f1c40f');
    rect(185, 250, 50, 50);
    rect(365, 250, 50, 50);

    //door
    fill('#8e5a3b');
    rect(270, 330, 60, 100);

    //doorknob
    fill('#d35400');
    ellipse(277, 380, 7, 7);
}

function drawSmoke(x, y) {
    //create new smoke puff every 10 frames
    if (frameCount % 10 === 0) {
        smokePuffs.push({ x: x, y: y, r: 8, alpha: 180 });
    }

    //update and display all smoke puffs
    for (let i = smokePuffs.length - 1; i >= 0; i--) {
        let puff = smokePuffs[i];
        fill(200, puff.alpha);
        noStroke();
        ellipse(puff.x, puff.y, puff.r);

        //animate puff drifting upward and fading
        puff.y -= 0.5;
        puff.x += random(-0.3, 0.3);
        puff.r += 0.1;
        puff.alpha -= 1.2;

        //remove faded-out puffs
        if (puff.alpha <= 0) {
            smokePuffs.splice(i, 1);
        }
    }
}

function drawPumpkin(x, y, size) {
    //check if user is hovering over pumpkin
    pumpkinHovered = dist(mouseX, mouseY, x, y) < size / 2;

    //pumpkin body
    fill('orange');
    ellipse(x, y, size, size * 0.9);

    //glow effect on hover
    if (pumpkinHovered) {
        fill(255, 100, 0, 100);
        ellipse(x, y, size + 10, size);
    }

    //pumpkin stem
    fill('green');
    rect(x - 3, y - size / 2.2, 6, 15);

    //eyes
    fill('black');
    triangle(x - 10, y - 8, x - 5, y - 18, x, y - 8);
    triangle(x + 10, y - 8, x + 5, y - 18, x, y - 8);

    //mouth
    beginShape();
    vertex(x - 12, y + 10);
    vertex(x - 8, y + 16);
    vertex(x - 4, y + 10);
    vertex(x, y + 16);
    vertex(x + 4, y + 10);
    vertex(x + 8, y + 16);
    vertex(x + 12, y + 10);
    endShape(CLOSE);
}

function animateBats() {
    for (let i = bats.length - 1; i >= 0; i--) {
        bats[i].move();
        bats[i].display();
        if (bats[i].isOffScreen()) {
            bats.splice(i, 1);
        }
    }
}

function mousePressed() {
    //let bats react to being clicked
    bats.forEach(bat => {
        if (bat.isHit(mouseX, mouseY)) {
            bat.flyAway();
        }
    });

    //let trees react when clicked
    trees.forEach(tree => {
        if (tree.isHit(mouseX, mouseY)) {
            tree.toggleFace();
        }
    });
}



