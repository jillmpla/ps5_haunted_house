# 🎃 p5.js Haunted House

An interactive and spooky Halloween-themed scene built with [p5.js](https://p5js.org/). Featuring looping bats, dancing skeletons, glowing pumpkins, and confetti-blasting spooky trees.

This project features:

- 🦇 **Flying bats** that loop across the sky and fly away when clicked  
- 🎃 **A glowing pumpkin** with a spooky face and hover-activated greeting  
- 🌲 **Spooky trees** that burst with Halloween-colored confetti when clicked  
- 💀 **A dancing skeleton ghost** that rises from the ground every 7 seconds  
- 🌕 A pulsating **moon** with crater details and glowing aura  
- 🏚️ A detailed **haunted house** with smoking chimney and glowing windows
- 🎨 A clean, light gray background to showcase the spooky scene

## 🧙 Live Demo

You can run this project locally by downloading the files and opening `index.html` in your browser.

---

## 🗂️ Project Structure

/haunted-house

├── index.html          # Main HTML file (loads p5.js and scripts)

├── hauntedhouse.js     # Main sketch, animation loop, and scene rendering

├── bat.js              # Bat class with looping flight and click-to-fly-away behavior

├── spookyTree.js       # Tree class with twisted branches and Halloween confetti on click

├── skeleton.js         # Skeleton corpse that rises, dances, and disappears every 7 seconds

---

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Watch the haunted house come to life!

---

## 🧪 Technologies Used

- [p5.js](https://p5js.org/) – JavaScript creative coding library
- HTML5 / CSS3 (embedded in `index.html`)

---

## 🛠️ How This Project Uses p5.js

This Haunted House project is built entirely with [p5.js](https://p5js.org/), a JavaScript library for creative coding. 

Here's how p5.js powers the experience:

- **Canvas & Drawing**: `createCanvas()` defines the drawing area, and p5's shape functions like `rect()`, `ellipse()`, `triangle()`, and `bezierVertex()` are used to draw the haunted house, pumpkin, moon, skeleton, bats, and trees.

- **Animation Loop**: The `draw()` function updates the scene 60 times per second. Bats fly across the screen, the moon pulses, trees sparkle, and a skeleton corpse rises and dances every 7 seconds.

- **Interactivity**:
  - `mousePressed()` detects clicks on bats (to scare them away) and trees (to trigger orange-and-black confetti).
  - `dist()` is used for hover effects like the glowing pumpkin and pumpkin greeting.

- **Object-Oriented Design**: Each animated element (bat, tree, skeleton, spark) is defined as a class with its own movement, display, and interaction logic.

- **Styling & Effects**: Uses `fill()`, alpha blending, transformations (`translate()`, `scale()`, `push()`, `pop()`), and trigonometric animation (`sin(frameCount)`) to create spooky glow effects, fluttering, and pulsing visuals.

> 📢 p5.js makes it easy to build creative, interactive web animations with just HTML and JavaScript.

---

## 👻 License

MIT License — free to use, remix, or expand.

---

Happy Haunting! 🎃🕸️🦇
