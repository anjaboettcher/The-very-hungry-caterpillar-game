class Fruit {
  constructor() {
    this.radius = 6;
    this.col = Math.floor(Math.random() * numberOfTiles);
    this.row = Math.floor(Math.random() * numberOfTiles);
    const fruitArray = [
      "apple",
      "cake",
      "ice_cream",
      "lollipop",
      "orange",
      "pear_2",
      "pear",
      "plum_2",
      "plum_3",
      "plum",
      "sausage",
      "strawberry",
      "strawberry_2",
      "strawberry_3",
      "strawberry_4",
      "watermelon"
    ];
    let randomIndex = Math.floor(16 * Math.random());
    this.randomFruitName = fruitArray[randomIndex];
    console.log(this.randomFruitName);

    this.img = new Image();
    this.img.src = `images/${this.randomFruitName}.png`;
  }

  draw(ctx) {
    ctx.save();

    let extraSize = 10
    ctx.drawImage(
      this.img,
      this.col * tileSize - extraSize,
      this.row * tileSize - extraSize,
      tileSize + 2*extraSize,
      tileSize + 2*extraSize
    );
    ctx.restore();
  }
}
