class Leaf {
  constructor() {
    this.col = 19;
    this.row = 20;
    this.nbOfCols = 5;
    this.nbOfRows = 4;
    this.isVisible = false
  }

  draw(ctx) {
    if (this.isVisible) {
      ctx.save()
      var img = new Image();
      img.src = "images/leaf.png";
      ctx.drawImage(
        img,
        tileSize * (this.col-1),
        tileSize * (this.row-1),
        tileSize * (this.nbOfCols+2),
        tileSize * (this.nbOfRows+2)
      );
      this.frameBeforeMoving = 100;
      ctx.restore()
    }
  }
}
