class Game {
  constructor() {
    this.gameOver = false;
    this.gameStarted = false;
  }
  draw(ctx) {
    if (gameOver) {
      this.drawGameEndScreen();
    } else if (!gameStarted && !gameOver) {
      this.drawGameStartScreen();
    }
  }
}

// updateEverything();
// drawGameStartScreen();
// drawGameEndScreen();
