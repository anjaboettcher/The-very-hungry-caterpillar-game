class Caterpillar {
  constructor() {
    this.col = 2; //give it a number to try
    this.row = 20; //give it a number to try
    this.orientation = "up";
    this.previousCoordinates = [
      { col: 2, row: 21 },
      { col: 2, row: 22 },
      { col: 2, row: 23 },
      { col: 2, row: 24 }
    ];
    this.frameBeforeMoving = 100;
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
  // Return an angle based on the direction
  // Default is "up" with the angle 0
  getRotateAngle() {
    switch (this.orientation) {
      case "up":
        return 0;
      case "right":
        return Math.PI / 2;
      case "down":
        return Math.PI;
      case "left":
        return (3 * Math.PI) / 2;
    }
  }
  draw() {
    ctx.save();

    this.drawHead(ctx);

    // TODO: save the colors in an array

    // Draw the first body part
    for (let i = 0; i < this.previousCoordinates.length; i++) {
      ctx.save();
      let bodyPart = this.previousCoordinates[i];
      ctx.translate(
        (bodyPart.col + 0.5) * tileSize,
        (bodyPart.row + 0.5) * tileSize
      );
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 12, Math.PI, 0, 2 * Math.PI); // TODO: change the shape
      ctx.fillStyle = "#1B6647"; // TODO: use the array of colors
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    ctx.restore();
  }
  drawHead(ctx) {
    ctx.save();

    ctx.translate((this.col + 0.5) * tileSize, (this.row + 0.5) * tileSize);
    ctx.rotate(this.getRotateAngle());

    // Red head
    ctx.beginPath();
    ctx.ellipse(0, 0, 10, 12, Math.PI, 0, 2 * Math.PI);
    ctx.fillStyle = "#D01C28";
    ctx.fill();
    ctx.closePath();

    // Left eye
    ctx.beginPath();
    ctx.arc(-4, -3, 2, 0, Math.PI * 4);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Right eye
    ctx.beginPath();
    ctx.arc(4, -3, 2, 0, Math.PI * 4);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
  // oldDraw(ctx) {
  //   ctx.save();
  //   ctx.beginPath();
  //   ctx.ellipse(this.col, this.row, 10, 12, Math.PI, 0, 2 * Math.PI);
  //   ctx.fillStyle = "#D01C28";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.arc(this.col - 4, this.row - 2, 2, 0, Math.PI * 4);
  //   ctx.fillStyle = "black";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.arc(this.col + 4, this.row - 2, 2, 0, Math.PI * 4);
  //   ctx.fillStyle = "black";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.ellipse(this.col, this.row + 24, 10, 12, Math.PI, 0, 2 * Math.PI);
  //   ctx.fillStyle = "#1B6647";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.ellipse(this.col, this.row + 48, 10, 12, Math.PI, 0, 2 * Math.PI);
  //   ctx.fillStyle = "#208641";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.ellipse(this.col, this.row + 72, 10, 12, Math.PI, 0, 2 * Math.PI);
  //   ctx.fillStyle = "#147F70";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.beginPath();
  //   ctx.ellipse(this.col, this.row + 96, 10, 12, Math.PI, 0, 2 * Math.PI);
  //   ctx.fillStyle = "#1D4319";
  //   ctx.fill();
  //   ctx.closePath();

  //   ctx.restore();
  // }

  // moveUp() {
  //   if (this.row <= 0 + tileSize / 2) {
  //     this.row = tileSize / 2;
  //   } else {
  //     this.row = this.row - tileSize;
  //     this.orientation = "up";
  //     console.log("move up");
  //   }
  // }

  // moveDown() {
  //   if (this.row >= 600 - tileSize) {
  //     this.row = 600 - 96;
  //   } else {
  //     this.row = this.row + tileSize;
  //     this.orientation = "down";
  //     console.log("down");
  //   }
  // }

  moveRight() {
    switch (this.orientation) {
      case "up":
        this.orientation = "right";
        break;
      case "right":
        this.orientation = "down";
        break;
      case "down":
        this.orientation = "left";
        break;
      case "left":
        this.orientation = "up";
        break;
    }
    // if (this.col >= 600 - tileSize) {
    //   this.col = 600 - tileSize / 2;
    // } else {
    //   this.col = this.col + tileSize;
    //   this.orientation = "right";
    //   console.log("rigth");
    // }
  }
  moveLeft() {
    this.moveRight();
    this.moveRight();
    this.moveRight();
  }

  update() {
    this.frameBeforeMoving--;
    if (this.frameBeforeMoving === 0) {
      this.frameBeforeMoving = 10;

      this.previousCoordinates.unshift({
        row: this.row,
        col: this.col
      });
      this.previousCoordinates.pop();

      // this.previousCoordinates.push({ col: this.col, row: this.row });
      switch (this.orientation) {
        case "left":
          this.col--;
          break;
        case "right":
          this.col++;
          break;
        case "up":
          this.row--;
          break;
        case "down":
          this.row++;
          break;
      }
    }
  }

  /*
              }
        moveOrientation(){
            this.orientation = orientation
        }    
        update(){
            this.previousCoordinates.push({col: this.col, row: this.row})
            switch (this.orientation) {
                case "left":
                  this.col--
                  break;
                case "right":
                  this.col++
                  break;
                case "up":
                  this.row--
                  break;
                case "down":
                  this.row++
                  break;
              } 
        }
        draw(ctx) {

            // for (let i = 0; i < this.previousCoordinates.length; i++){
            //     const col = this.previousCoordinates[i].col;
            //     const row = this.previousCoordinates[i].row;
            //     ctx.save();
            //     ctx.beginPath();
            //     ctx.ellipse(col * tileSize, row*tileSize, 10, 12, Math.PI, 0, 2 * Math.PI);
            //     ctx.fillStyle = "1B6647";
            //     ctx.fill();
            //     ctx.closePath();
            // }

            ctx.save();
            ctx.beginPath();
            ctx.ellipse(this.col * tileSize, this.row*tileSize, 10, 12, Math.PI, 0, 2 * Math.PI);
            ctx.fillStyle = "#D01C28";
            ctx.fill();
            ctx.closePath();
        }
*/
}
