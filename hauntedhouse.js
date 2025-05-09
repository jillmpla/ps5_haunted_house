// === Main Sketch Setup and Draw Loop ===

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

    // Initialize bats
    for (let i = 0; i < 6; i++) {
        bats.push(new Bat(random(width), random(100, 200)));
    }

    // Add spooky trees to the scene
    trees.push(new SpookyTree(60, 300));
    trees.push(new SpookyTree(540, 300));

    // Create the skeleton object
    skeleton = new Skeleton(270, 430);
}

function draw() {
    drawBackground();     // white background
    drawMoon();           // glowing yellow moon
    drawHouse();          // haunted house with chimney smoke
    drawPumpkin(480, 420, 50); // creepy pumpkin

    // Draw interactive spooky trees
    trees.forEach(tree => tree.display());

    // Animate bats flying across the scene
    animateBats();

    // Handle skeleton appearance and animation
    handleSkeleton();

    // Show pumpkin message on hover
    if (pumpkinHovered) {
        fill(50, 0, 0);
        textSize(25);
        text("🎃 Happy Halloween!", 500, height - 150);
    }
}

// === Background & Environment ===

function drawBackground() {
    background(240); //gray
}

function drawMoon() {
    push();
    translate(460, 100); // Moon position

    // Animate glow with sine wave
    let glowSize = 130 + sin(frameCount * 0.02) * 25;

    // Outer animated glow
    noStroke();
    fill(255, 255, 180, 50);
    ellipse(0, 0, glowSize);
    fill(255, 255, 180, 80);
    ellipse(0, 0, glowSize - 20);

    // Moon base
    fill(240);
    ellipse(0, 0, 90);

    // Craters
    fill(200);
    ellipse(-15, -10, 10);
    ellipse(10, 5, 6);
    ellipse(5, -15, 8);
    ellipse(-20, 15, 7);
    ellipse(15, 15, 5);

    // Subtle shadow
    fill(0, 0, 0, 30);
    arc(0, 0, 90, 90, PI / 8, PI * 1.2);

    pop();
}


// === Haunted House with Smoke ===

function drawHouse() {
    // Base shadow
    fill(220);
    rect(153, 223, 300, 230, 5);

    // Main structure
    fill('#2c3e50');
    rect(150, 220, 300, 230, 5);

    // Roof
    fill('#1a252f');
    triangle(150, 220, 300, 110, 450, 220);

    // Chimney (lowered to align with roof)
    fill('#34495e');
    rect(170, 155, 20, 50);

    // Continuous smoke from chimney
    drawSmoke(180, 155);

    // Windows
    fill('#f1c40f');
    rect(185, 250, 50, 50);
    rect(365, 250, 50, 50);

    // Door
    fill('#8e5a3b');
    rect(270, 330, 60, 100);

    // Doorknob (aligned to left side of door)
    fill('#d35400');
    ellipse(277, 380, 7, 7);
}

function drawSmoke(x, y) {
    // Create new smoke puff every 10 frames
    if (frameCount % 10 === 0) {
        smokePuffs.push({ x: x, y: y, r: 8, alpha: 180 });
    }

    // Update and display all smoke puffs
    for (let i = smokePuffs.length - 1; i >= 0; i--) {
        let puff = smokePuffs[i];
        fill(200, puff.alpha);
        noStroke();
        ellipse(puff.x, puff.y, puff.r);

        // Animate puff drifting upward and fading
        puff.y -= 0.5;
        puff.x += random(-0.3, 0.3);
        puff.r += 0.1;
        puff.alpha -= 1.2;

        // Remove faded-out puffs
        if (puff.alpha <= 0) {
            smokePuffs.splice(i, 1);
        }
    }
}

// === Pumpkin Drawing and Hover Highlight ===

function drawPumpkin(x, y, size) {
    // Check if user is hovering over pumpkin
    pumpkinHovered = dist(mouseX, mouseY, x, y) < size / 2;

    // Pumpkin body
    fill('orange');
    ellipse(x, y, size, size * 0.9);

    // Glow effect on hover
    if (pumpkinHovered) {
        fill(255, 100, 0, 100);
        ellipse(x, y, size + 10, size);
    }

    // Pumpkin stem
    fill('green');
    rect(x - 3, y - size / 2.2, 6, 15);

    // Eyes
    fill('black');
    triangle(x - 10, y - 8, x - 5, y - 18, x, y - 8);
    triangle(x + 10, y - 8, x + 5, y - 18, x, y - 8);

    // Mouth (jagged)
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

// === Animate All Bats ===

function animateBats() {
    for (let i = bats.length - 1; i >= 0; i--) {
        bats[i].move();
        bats[i].display();
        if (bats[i].isOffScreen()) {
            bats.splice(i, 1);
        }
    }
}

// === Handle Click Events ===

function mousePressed() {
    // Let bats react to being clicked
    bats.forEach(bat => {
        if (bat.isHit(mouseX, mouseY)) {
            bat.flyAway();
        }
    });

    // Let trees react when clicked
    trees.forEach(tree => {
        if (tree.isHit(mouseX, mouseY)) {
            tree.toggleFace(); // or trigger sparks if you're using sparks version
        }
    });
}



