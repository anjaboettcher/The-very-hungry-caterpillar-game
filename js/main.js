var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.tabindex = 0;

//constants
var width = canvas.width;
var height = canvas.height;
var numberOfTiles = 25;
var tileSize = width / numberOfTiles;
let frame = 150;
let score = 0;
let bg = new Background();

//calling fruit and caterpillar
//var fruits = []
let fruit = new Fruit();
let caterpillar = new Caterpillar();

// Check for collision between fruit and caterpillar

function checkCollision() {
  if (caterpillar.col === fruit.col && caterpillar.row === fruit.row) {
    console.log("hit");
    fruit = new Fruit()
  }
}

//draw Score

function drawScore(ctx) {
  ctx.save();
  ctx.font = "40px Nanum Gothic Coding";
  ctx.fillStyle = "green";
  ctx.fillText("Fruit: " + "🍏".repeat(caterpillar.score), 16, 60);
  ctx.restore();
}

function drawEverything() {
  ctx.clearRect(0, 0, 600, 600);
  bg.draw(ctx);
  fruit.draw(ctx);
  caterpillar.draw(ctx);
  drawScore(ctx);
}

function updateEverything(keyCode) {
  frame++;
  caterpillar.update();
  checkCollision();
}

function animation() {
  drawEverything();
  updateEverything();
  window.requestAnimationFrame(animation);
}
animation();

document.onkeydown = function(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      caterpillar.moveLeft();
      break;
    // case 38:
    //   caterpillar.moveUp();
    //   break;
    case 39:
      caterpillar.moveRight();
      break;
    // case 40:
    //   caterpillar.moveDown();
    //   break;
  }
};
