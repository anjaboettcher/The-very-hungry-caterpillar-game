class Caterpillar {
    constructor(x,y){
        this.x = x; //give it a number to try
        this.y = y; //give it a number to try
        this.orientation = 'top'
    }

  /* 
    //new approach
    caterpillarBody(x,y){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI*4);
        ctx.fillStyle = "#D01C28";
        ctx.fill();
        ctx.closePath();
    }

    drawCaterpillar(){
        var length = 4;
        caterpillar = [];
        for (var i = length; i>=0; i--){
            caterpillar.push({x:i, y:0})
        }
    }

    let caterpillarX = caterpillar[0].x
    let caterpillarY = caterpillar[0].y

    if (direction == 'right') {
        caterpillarX+tileSize;
    } else if (direction == 'left') {
        caterpillarX-tileSize;
    } else if (direction == 'up') {
        caterpillarY-tileSize;
    } else if (direction == 'down') {
        caterpillarY+tileSize;
    }

}


*/
    //old approach

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI*4);
        ctx.fillStyle = "#D01C28";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x-4, this.y-2, 2, 0, Math.PI*4);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x+4, this.y-2, 2, 0, Math.PI*4);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x, this.y+24, 10, 0, Math.PI*4);
        ctx.fillStyle = "#1B6647";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x, this.y+48, 10, 0, Math.PI*4);
        ctx.fillStyle = "#208641";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x, this.y+72, 10, 0, Math.PI*4);
        ctx.fillStyle = "#147F70";
        ctx.fill();
        ctx.closePath();
    
        ctx.beginPath();
        ctx.arc(this.x, this.y+96, 10, 0, Math.PI*4);
        ctx.fillStyle = "#1D4319";
        ctx.fill();
        ctx.closePath();

        ctx.restore();
      } 
      
            
        moveUp(){
            if (this.y === 0 + tileSize/2){
                this.y = tileSize/2
            } else {
                this.y = this.y - tileSize
                this.orientation = 'up'
                console.log("move up")
            }
            }
              
        moveDown(){
                  if(this.y >= 600 -tileSize){
                      this.y = 600 - 96 
                  } else {
                    this.y = this.y + tileSize
                    this.orientation = 'down'
                    console.log("down")
                  }
              }

        moveLeft(){
                if (this.x === 0 + tileSize/2) {
                    this.x = tileSize/2
                } else {
                    this.x = this.x-tileSize
                    this.orientation = 'left'
                    console.log("left")
                }
              }

        moveRight(){
                if (this.x >= 600-tileSize) {
                    this.x = 600 - (tileSize/2)
                } else {
                    this.x = this.x+tileSize
                    this.orientation = 'right'
                    console.log("rigth")
                }

              }
}


