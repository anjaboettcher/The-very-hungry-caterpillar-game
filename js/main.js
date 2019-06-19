var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
canvas.tabindex = 0;

//constants
var width = canvas.width;
var height = canvas.height;
var numberOfTiles = 25;
var tileSize = width / numberOfTiles;
let frame = 0;
let fruitCount = 0;
let bg = new Background();
let screen = "home"; // Possible values: "home", "play", "level-won", "game-lost"
let level = 1;

//calling fruit and caterpillar
//var fruits = []
let fruit = new Fruit();

let caterpillar = new Caterpillar();

let leaf = new Leaf();

let candy = new Candy();
let candy2 = new Candy();


// Check for collision between fruit and caterpillar

/*Level 2



  } else if (caterpillar.col === candy.col && caterpillar.row === candy.row) {
    if (fruitCount > 0){
      fruitCount -= 1;
      candy = new Candy();
    }
*/

/*Level 3
function drawScore(ctx) {
  ctx.fillText(`Level 3`, 500 , 40);
}
let candy = new Candy();
let caterpillar2 = new Caterpillar();
    caterpillar2.draw(ctx);

*/

function checkCollision() {
  if (caterpillar.col === fruit.col && caterpillar.row === fruit.row) {
    fruit = new Fruit();
    ctx.fillStyle = "red";
    fruitCount += 1;
  }
}

function checkCollisionWithLeaf() {
  if (
    leaf.isVisible &&
    leaf.col <= caterpillar.col &&
    caterpillar.col < leaf.col + leaf.nbOfCols &&
    leaf.row <= caterpillar.row &&
    caterpillar.row < leaf.row + leaf.nbOfRows
  ) {
    console.log("hit");
    caterpillar.startTransformation();
  }
}

//draw Score
function drawScore(ctx) {
  ctx.save();
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText(`Level: ${level} | Fruit: ${`○`.repeat(fruitCount)}`, 20, 40);
}

function drawEverything() {
  ctx.clearRect(0, 0, 600, 600);
  if (screen === "home") {
    drawHome(ctx);
  }

  if (screen === "level-won") {
    drawGameWon();
  }

  if (screen === "game-lost") {
    drawGameOver();
  }

  if (screen === "play") {
    bg.draw(ctx);
    fruit.draw(ctx);

    if (level > 1){
      candy.draw(ctx);
    }
     


    leaf.draw(ctx);
    caterpillar.draw(ctx);
    drawScore(ctx);
  }
}

function startGame() {
  screen = "play";
  fruit = new Fruit();
  caterpillar = new Caterpillar();
  fruitCount = 0;
  leaf = new Leaf()
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
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "center";
  ctx.fillStyle = "#cf372d";
  ctx.fillText("WELCOME!", 300, 100);
  ctx.fillText("Press Enter to Start", 300, 180);
  var img = new Image();
  img.src = "images/enter.png";
  ctx.drawImage(img, 230, 200, 97, 109);
  ctx.fillText("Use arrow keys to nagivate", 300, 350);
  var img = new Image();
  img.src = "images/arrows.png";
  ctx.drawImage(img, 179, 380, 242, 117);
}


function drawGameWon() {
  screen = "level-won";
  ctx.save();
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  ctx.fillStyle = "#d3f7cf";
  ctx.fillRect(0, 0, 600, 600);
  ctx.stroke();
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "center";
  ctx.fillStyle = "#cf372d";
  ctx.fillText("NOM NOM! You made it to the next level!", 300, 300);
}

function drawGameOver() {
  ctx.save();
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
  ctx.fillStyle = "#ef918b";
  ctx.fillRect(0, 0, 600, 600);
  ctx.stroke();
  ctx.font = "30px 'Comfortaa', cursive";
  ctx.textAlign = "center";
  ctx.fillStyle = "#cf372d";
  ctx.fillText("GAME OVER!", 300, 150);
  var img = new Image();
  img.src = "images/caterpillar-sad.png";
  ctx.drawImage(img, 155, 160, 275, 184);
  ctx.fillText("PRESS ENTER", 300, 380);
  ctx.fillText("FOR HOME SCREEN", 300, 420);
}

function updateEverything(keyCode) {
  if (screen === "play") {
    frame++;

    caterpillar.update();
    checkCollision();
    checkCollisionWithLeaf();

    if (fruitCount >= 1) {
      leaf.isVisible = true;
    }

    if (caterpillar.checkWon()) {
      screen = "level-won";
    }
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
      if (screen === "home" || screen === "game-lost") {
        level = 1;
        startGame();
      } else if (screen === "level-won") {
        level++;
        startGame();
      }

      break;
    case 37:
      caterpillar.moveLeft();
      break;
    case 39:
      caterpillar.moveRight();
      break;
  }
};
