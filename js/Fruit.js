class Fruit {
    constructor(){
      this.col = Math.floor(Math.random() * 25)
      this.row = Math.floor(Math.random() * 25)
      const fruitArray = ["apple", "cake", "ice_cream", "lollipop", "orange","pear_2","pear","plum_2","plum_3","plum","sausage","strawberry","strawberry_2","strawberry_3","strawberry_4","watermelon"]
      let randomIndex = Math.floor(16*Math.random())
      this.randomFruitName = fruitArray[randomIndex]
      console.log(this.randomFruitName)
    }

    draw(ctx){
      let img = new Image();
      const col = this.col
      const row = this.row
      img.onload = function () {

        ctx.drawImage(img, col*24,row*24, 25, 25);
      };
      img.src = `/images/${this.randomFruitName}.png`;   
    }
      
}
  
