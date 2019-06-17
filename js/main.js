var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')


canvas.tabindex = 0;

//constants
var width = canvas.width
var height = canvas.height
var numberOfTiles = 25
var tileSize = width / numberOfTiles
let frame = 150
let score = 0; 


//calling fruit and caterpillar
//var fruits = []
var fruit = new Fruit();
var caterpillar = new Caterpillar();


//drawing the actual grid
  function drawGrid() {
    ctx.fillStyle = 'lightgrey';
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
  drawEverything()
}

  function drawEverything(){
    //var background = new Image();
    //background.src = "images/grass.jpg";
    
    ctx.clearRect(0,0,600,600)
    //background.onload = function(){
      //ctx.drawImage(background,0,0); 
      drawGrid()
      caterpillar.draw(ctx)
      fruit.draw(ctx)  
    //}
  }
      
  /*function animation() {
    drawEverything();
    window.requestAnimationFrame(animation);
  }
  animation();
*/

document.onkeydown = function(e) {
  e.preventDefault() // Stop the default behavior (moving the screen to the left/up/right/down)

updateEverything(e.keyCode)

}
drawEverything()