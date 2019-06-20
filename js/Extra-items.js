class ExtraItems {
  constructor() {
    this.radius = 6;
    this.col = Math.floor(Math.random() * numberOfTiles);
    this.row = Math.floor(Math.random() * numberOfTiles);

    const extraArray = [
      "chartreuse",
    ];

    let randomIndex = Math.floor(1 * Math.random());
    this.randomExtraName = extraArray[randomIndex]
    console.log(this.randomExtraName);
    this.img = new Image();
    this.img.src = `images/${this.randomExtraName}.png`;
  }

  draw(ctx) {
    ctx.save();

    ctx.drawImage(
      this.img,
      this.col * tileSize ,
      this.row * tileSize ,
      tileSize + 2 * extraSize,
      tileSize + 2 * extraSize
    );
    ctx.restore();
  }
}