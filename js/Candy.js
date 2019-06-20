class Candy {
  constructor() {
    this.radius = 6;
    this.isVisible = true;
    this.col = Math.floor(Math.random() * numberOfTiles);
    this.row = Math.floor(Math.random() * numberOfTiles);

    const candyArray = [
      "cake",
      "ice_cream",
      "lollipop",
    ];

    let randomIndex = Math.floor(3 * Math.random());
    this.randomCandyName = candyArray[randomIndex]
    console.log(this.randomCandyName);
    this.img = new Image();
    this.img.src = `images/${this.randomCandyName}.png`;
  }

  draw(ctx) {
   if (this.isVisible) {
    ctx.save();

    let extraSize = 10
    ctx.drawImage(
      this.img,
      this.col * tileSize - extraSize,
      this.row * tileSize - extraSize,
      tileSize + 2 * extraSize,
      tileSize + 2 * extraSize
    );
    ctx.restore();
    }
  }
}
