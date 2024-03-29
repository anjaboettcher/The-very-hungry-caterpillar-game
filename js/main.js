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
let screen = "home"; // Possible values: "home", "play", "level-won", "game-lost","game-final"
let level = 1;

//calling objects onthe canvas
let mySound1 = new Audio("images/chewing.mp3")
let mySound2 = new Audio("images/hic4.mp3");
let mySound3 = new Audio("images/happykids.mp3");
let mySound4 = new Audio("images/HONK.wav");

let fruit = new Fruit();
let fruit2 = new Fruit();
let caterpillar = new Caterpillar();
let leaf = new Leaf();
let candy = new Candy();
let candy2 = new Candy();

// Check for collision between fruit/leaf and caterpillar 
function checkCollision() {
  if (caterpillar.col === fruit.col && caterpillar.row === fruit.row && fruit.isVisible) {
    mySound1.play();
    fruit = new Fruit();
    fruitCount += 1;
  }

  if (level > 1) {
    if (caterpillar.col === fruit2.col && caterpillar.row === fruit2.row && fruit2.isVisible) {
      mySound1.play();
      fruit2 = new Fruit();
      fruitCount += 1;
    }

    if (caterpillar.col === candy.col && caterpillar.row === candy.row && candy.isVisible) {
      if (fruitCount > 0) {
        mySound2.play();
        fruitCount -= 1;
        candy = new Candy();
      } else {
        mySound2.play();
        screen = "game-lost"
      }
    }
  }

  if (level > 2) {
    if (caterpillar.col === candy2.col && caterpillar.row === candy2.row && candy2.isVisible) {
      candy2 = new Candy();
      if (fruitCount > 0) {
        mySound2.play();
        fruitCount -= 1;
      } else {
        mySound2.play();
        screen = "game-lost"
      }
    }
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
    mySound3.play();
    caterpillar.startTransformation();
  }
}


//draw Score
function drawScore(ctx) {
  ctx.save();
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.fillText(`Level: ${level} | Fruit: ${`●`.repeat(fruitCount)}`, 20, 40);
}
//draw everything
function drawEverything() {
  ctx.clearRect(0, 0, 600, 600);

  if (screen === "game-final") {
      drawGameFinal()
  }

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

    if (level >= 2) {
      candy.draw(ctx);
    }
    if (level >= 3) {
      candy2.draw(ctx);
      fruit2.draw(ctx)
    }

    leaf.draw(ctx);
    caterpillar.draw(ctx);
    drawScore(ctx);
  }
}

function startGame() {
  screen = "play";
  fruit = new Fruit();
  fruit2 = new Fruit();
  candy = new Candy()
  candy2 = new Candy()
  caterpillar = new Caterpillar();
  fruitCount = 0;
  leaf = new Leaf()
}

function drawHome(ctx) {
  ctx.save();
  var img = new Image();
  ctx.fillStyle = "#d3f7cf";
  ctx.fillRect(0, 0, 600, 600);
  img.src = "images/instructions.png";
  ctx.drawImage(img, 0, 0, 600, 600);
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.fillStyle = "#cf372d";
  ctx.font = "25px 'Comfortaa', cursive";
  ctx.fillText("NAVIGATION", 85, 100);
  ctx.fillText("BASIC RULES", 85, 310);
  ctx.font = "16px 'Comfortaa', cursive";
  ctx.fillStyle = "#3d3838";
  ctx.fillText("Use ARROW KEYS", 85, 135);
  ctx.fillText("for NAVIGATION", 85, 160);
  ctx.fillText("Press ENTER to", 340, 135);
  ctx.fillText("START | RESTART", 340, 160);
  ctx.fillText("COLLECT 5 FRUITS", 85, 345);
  ctx.fillText("(NOT CANDY)", 85, 370);
  ctx.fillText("HEAD TO THE LEAF!", 340, 345);
}

function drawGameWon() {
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
  ctx.fillText("NOM NOM FRUIT!", 300, 240);
  ctx.fillText("But I am still hungry! Next level coming up!", 300, 280);
  ctx.fillText("Press ENTER to Proceed", 300, 320);
}

function drawGameOver() {
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.fillRect(0, 0, width, height);
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
  ctx.fillText("TO PLAY AGAIN", 300, 420);
  ctx.restore();
}

function drawGameFinal() {
ctx.save();
ctx.fillStyle = "#f9ddb8";
ctx.fillRect(0, 0, 600, 600);
ctx.stroke();
ctx.fillStyle = "#cf372d";
ctx.font = "20px 'Comfortaa', cursive";
ctx.textAlign = "center";
ctx.fillText("YOU MADE IT!", 300, 150);
var img = new Image();
img.src = "images/butterfly.png";
ctx.drawImage(img, 155, 200, 284, 113);
ctx.fillText("THANKS FOR YOUR HELP!", 300, 380);
ctx.fillText("DO NOT FORGET TO EAT YOUR FRUIT!", 300, 420);
ctx.restore();
}


function updateEverything(keyCode) {
  if (screen === "play") {
    frame++;

    caterpillar.update();
    checkCollision();
    checkCollisionWithLeaf();

    if (fruitCount >= 5) {
      leaf.isVisible = true;
      fruit.isVisible = false;
      fruit2.isVisible = false;
      candy.isVisible = false;
      candy2.isVisible = false;
    } else {
      leaf.isVisible = false;
      fruit.isVisible = true;
      fruit2.isVisible = true;
      candy.isVisible = true;
      candy2.isVisible = true;
    }

    if (caterpillar.checkWon()) {
      screen = "level-won";
    }

    if(level >= 5 && fruitCount === 5 && leaf.isVisible &&
      leaf.col <= caterpillar.col &&
      caterpillar.col < leaf.col + leaf.nbOfCols &&
      leaf.row <= caterpillar.row &&
      caterpillar.row < leaf.row + leaf.nbOfRows){
      screen = "game-final";
  }
  }
}

function animation() {
  drawEverything();
  updateEverything();
  window.requestAnimationFrame(animation);
}
animation();

document.onkeydown = function (e) {
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