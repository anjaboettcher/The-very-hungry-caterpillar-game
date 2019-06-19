class Leaf {
  constructor(col,row) {
    this.col = col; 
    this.row = row; 
  }

  draw() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(430, 5, 180 ,135);
    var img = new Image();
    img.src = 'images/leaf.png';
    ctx.drawImage(img, 422, 0, 178, 145);
    this.frameBeforeMoving = 100;
  }
}