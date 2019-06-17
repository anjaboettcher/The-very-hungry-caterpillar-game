class Fruit {
    constructor(){
      this.Col = Math.floor(Math.random() * 25)
      this.Row = Math.floor(Math.random() * 25)

      const fruitArray = ["apple", "cake", "ice_cream", "lollipop", "orange","pear_2","pear","plum_2","plum_3","plum","sausage","strawberry","strawberry2","strawberry3","strawberry4","watermelon"]
      let randomIndex = Math.floor(16*Math.random())
      let randomFruitName = fruitArray[randomIndex]
        
      this.img = new Image();
      this.img.src = `images/${randomFruitName}.png`;   
    }
  }
