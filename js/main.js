var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.tabindex = 0;

//constants
var width = canvas.width;
var height = canvas.height;
var numberOfTiles = 25;
var tileSize = width / numberOfTiles;
let frame = 150;
let fruitCount = [];
let bg = new Background();
let screen = "home"; // Possible values: "home", "play", "game-won", "game-lost"

//calling fruit and caterpillar
//var fruits = []
let fruit = new Fruit();
let caterpillar = new Caterpillar();

// Check for collision between fruit and caterpillar

function checkCollision() {
  if (caterpillar.col === fruit.col && caterpillar.row === fruit.row) {
    fruit = new Fruit();
    ctx.fillStyle = "red";
    fruitCount += "🔸"
    let fruitCountarr = []
  }
}

//draw Score

function drawScore(ctx) {
  ctx.save();
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "left"; 
  ctx.fillStyle = "white";
  ctx.fillText(`Fruit: ${fruitCount}`, 20 , 40);
  /*if (checkCollision() === true) {
    fruitCount += 1
  }
  ctx.restore();
  //"🍏".repeat(caterpillar.score)
  */
}

function drawEverything() {
  ctx.clearRect(0, 0, 600, 600);
  
  if (screen === "home") {
    drawHome(ctx);
    };

  
  if (screen === "play") {
    bg.draw(ctx);
    fruit.draw(ctx);
    caterpillar.draw(ctx);
    drawScore(ctx);
  }

  /*if(screen = "game-lost")
  {
    gameOver(ctx);
  }
*/
}

function drawHome(ctx) {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  ctx.fillStyle = "#d3f7cf";
  ctx.fillRect(0, 0, 600, 600);
  ctx.stroke();
  ctx.font = "30px 'Comfortaa', cursive";
  ctx.textAlign = "center"; 
  ctx.fillStyle = "#cf372d";
  ctx.fillText("Welcome!", 300, 100);
  ctx.fillText("Press Enter to Start", 300, 180);
  var img = new Image();
  img.src = 'images/enter.png';
  ctx.drawImage(img, 230, 200, 97, 109);
  ctx.fillText("Use arrow keys to nagivate", 300, 350);
  var img = new Image();
  img.src = 'images/arrows.png';
  ctx.drawImage(img, 179, 380, 242, 117);
}

/*function gameOver(){
  ctx.save();
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}
*/

function updateEverything(keyCode) {
  if (screen === "play") {
    frame++;
    caterpillar.update();
    checkCollision();
  }
}

function animation() {
  drawEverything();
  updateEverything();
  window.requestAnimationFrame(animation);
}
animation();

document.onkeydown = function(e) {
  e.preventDefault();
  console.log(e.keyCode);
  switch (e.keyCode) {
    // Enter
    case 13:
      screen = "play";
      break;
    case 37:
      caterpillar.moveLeft();
      break;
    case 39:
      caterpillar.moveRight();
      break;
  }
};
