var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

canvas.tabindex = 0;


//constants
var width = canvas.width
var height = canvas.height
var numberOfTiles = 25
var tileSize = width / numberOfTiles
let frame = 150

var background = new Image();
background.src = "images/grass.jpg";

//calling fruit and caterpillar
var fruits = []
var fruit = new Fruit(numberOfTiles, tileSize, `images/${this.randomFruitName}.png`);
var caterpillar = new Caterpillar();


//drawing the actual grid
  function drawGrid() {
    // Draw the vertical lines
    for (var x = 0; x <= height; x+=tileSize) {
        ctx.strokeStyle = "#c1c5cc";
      ctx.beginPath()
      ctx.moveTo(x,0)
      ctx.lineTo(x,height)
      ctx.stroke()
    }
  
    // Draw the horizontal lines
    for (var y = 0; y <= width; y+=tileSize) {
        ctx.strokeStyle = "#c1c5cc";
      ctx.beginPath()
      ctx.moveTo(0,y)
      ctx.lineTo(width,y)
      ctx.stroke()
    }
  }

  /*function drawFruit() {
  for (let i = 0; i < fruits.length; i++) {
    fruits[i].draw(ctx);
  }
*/

/*function updateEverything() {
  frame++;
}
*/

function updateEverything(keyCode) {
  switch (keyCode) {
    case 37: caterpillar.moveLeft();  break;
    case 38: caterpillar.moveUp();    break;
    case 39: caterpillar.moveRight(); break;
    case 40: caterpillar.moveDown();  break;
  }
}

  function drawEverything(){
    ctx.clearRect(0,0,width,height)
    
    drawGrid()

    caterpillar.draw(ctx)
   
    background.onload = function(){
      ctx.drawImage(background,0,0);   
      }
  }

  function animation() {

    drawEverything(ctx);
    window.requestAnimationFrame(animation);
  }
  animation();


document.onkeydown = function(e) {
  e.preventDefault() // Stop the default behavior (moving the screen to the left/up/right/down)

updateEverything(e.keyCode)

drawEverything()
}
