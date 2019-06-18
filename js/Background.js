class Background {
  constructor() {
    this.x = 0;
    this.vx = -2;
    this.img = new Image();
    this.img.src = "images/grass.jpg";
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.x, 0, width, height);
    ctx.drawImage(this.img, this.x + width, 0, width, height);

    ctx.fillStyle = "lightgrey";
    for (var x = 0; x <= height; x += tileSize) {
      ctx.strokeStyle = "#c1c5cc";
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw the horizontal lines
    for (var y = 0; y <= width; y += tileSize) {
      ctx.strokeStyle = "#c1c5cc";
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
  update() {
    this.x += this.vx;
    if (this.x < -width) this.x = 0;
  }
}
