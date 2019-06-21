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
    this.frameBeforeMoving = 60;
    this.state = "caterpillar"; // Possible values: "caterpillar", "cocoon", "butterfly"
  }

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

    if (this.state === "caterpillar") {
      this.drawHead(ctx);
    } else if (this.state === "cocoon") {
      this.drawCocoon(ctx);
    } else if (this.state === "butterfly") {
      this.drawButterfly(ctx);
    }
    this.drawBody(ctx);

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
  drawBody(ctx) {
    // TODO: save the colors in an array
    //colorArray=["#1B6647","#208641","#147F70","#1D4319"]
    // Draw the first body part
    for (let i = 0; i < this.previousCoordinates.length; i++) {
      ctx.save();
      let bodyPart = this.previousCoordinates[i];
      ctx.translate(
        (bodyPart.col + 0.5) * tileSize,
        (bodyPart.row + 0.5) * tileSize
      );
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, 2 * Math.PI); // TODO: change the shape
      ctx.fillStyle = "#1B6647"; // TODO: use the array of colors
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }
  drawCocoon(ctx) {
    ctx.save();
    ctx.translate((this.col + 0.5) * tileSize, (this.row + 0.5) * tileSize);
    var img = new Image();
    img.src = "images/cocoon.png";
    ctx.drawImage(img, 0, 0, 120, 65);
    ctx.restore();  
  }

  drawButterfly(ctx) {
    ctx.save();
    ctx.translate((this.col - 2)*tileSize, (this.row -2 ) *tileSize);
    var img = new Image();
    img.src = "images/butterfly.png";
    ctx.drawImage(img, this.col, this.row, 120, 65);
    ctx.restore();  
  }

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
  }

  //moveLeft is turning right three times

  moveLeft() {
    this.moveRight();
    this.moveRight();
    this.moveRight();
  }

  update() {
    this.frameBeforeMoving--;
    if (this.frameBeforeMoving === 0) {
      if (this.previousCoordinates.length === 0) {
        this.state = "butterfly";
      }
      this.frameBeforeMoving = Math.max(3,  8 - level);
      this.previousCoordinates.pop();

      if (this.state === "caterpillar") {
        this.previousCoordinates.unshift({
          row: this.row,
          col: this.col
        });
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
        if (this.col < 0 || this.col >= 25) {
          mySound4.play();
          screen = "game-lost";
        }
        if (this.row < 0 || this.row >= 25) {
          mySound4.play();
          screen = "game-lost";
        }
      } else if (this.state === "butterfly") {
        this.frameBeforeMoving = 1;
        this.row -= 0.1;
        this.col += 0.08;
      }
    }
  }
  startTransformation() {
    if (this.state === "caterpillar") {
      this.state = "cocoon";
    }
  }
  checkWon() {
    return this.state === "butterfly" && this.col > numberOfTiles && this.row < 0
  }
}
