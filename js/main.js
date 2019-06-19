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
let screen = "home"; // Possible values: "home", "play", "game-won", "game-lost"


//calling fruit and caterpillar
//var fruits = []
let fruit = new Fruit();
let candy = new Candy();
let caterpillar = new Caterpillar();
let caterpillar2 = new Caterpillar();
let leaf = new Leaf();

// Check for collision between fruit and caterpillar

function checkCollision() {
  if (caterpillar.col === fruit.col && caterpillar.row === fruit.row) {
    fruit = new Fruit();
    ctx.fillStyle = "red";
    fruitCount += 1; 
  } else if (caterpillar.col === candy.col && caterpillar.row === candy.row) {
    if (fruitCount > 0){
      fruitCount -= 1;
      candy = new Candy();
    }
  }
}


function checkCollisionWithLeaf() {
  if (caterpillar.col === leaf.col && caterpillar.row === leaf.row) {
console.log("hit")
  }
}

//draw Score
function drawScore(ctx) {
  ctx.save();
  ctx.font = "20px 'Comfortaa', cursive";
  ctx.textAlign = "left"; 
  ctx.fillStyle = "white";
  ctx.fillText(`Fruit: ${`🔴`.repeat(fruitCount)}`, 20 , 40);
};



function drawEverything() {
  ctx.clearRect(0, 0, 600, 600);
  if (screen === "home") {
    drawHome(ctx);
    };

  if(screen === "game-lost"){
    drawGameOver();
  };
  
  if (screen === "play") {
    bg.draw(ctx);
    fruit.draw(ctx);
    candy.draw(ctx);
    if (fruitCount >= 1){
      leaf.draw()
    }
    caterpillar.draw(ctx);
    caterpillar2.draw(ctx);
    drawScore(ctx);
  };
}

function levelScreen (){
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
  ctx.fillText("LEVEL 1", 300, 100);
}

function resetGame (){
  fruit = new Fruit();
  caterpillar = new Caterpillar();
  fruitCount = 0;
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
  img.src = 'images/enter.png';
  ctx.drawImage(img, 230, 200, 97, 109);
  ctx.fillText("Use arrow keys to nagivate", 300, 350);
  var img = new Image();
  img.src = 'images/arrows.png';
  ctx.drawImage(img, 179, 380, 242, 117);
}

function drawGameOver(){
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
  ctx.fillText("GAME OVER!", 300, 200);
  var img = new Image();
  img.src = 'images/caterpillar-sad.png';
  ctx.drawImage(img, 230, 220, 139, 94);
  ctx.fillText("PRESS ENTER", 300, 350);
  ctx.fillText("FOR HOME SCREEN", 300, 380);
}

function updateEverything(keyCode) {
  if (screen === "play") {
    frame++;
  
    caterpillar.update();
    checkCollision();
    checkCollisionWithLeaf();
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
    case 13:
      resetGame()
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
