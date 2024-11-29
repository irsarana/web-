import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-flappy-game',
  templateUrl: './flappy-game.component.html',
  styleUrls: ['./flappy-game.component.css']
})
export class FlappyGameComponent implements OnInit {
  birdYPosition = 200;  // Initial bird vertical position
  gravity = 2;          // Gravity effect
  jumpStrength = -30;   // Bird jump strength when space is pressed
  isGameRunning = false; // Game state
  score = 0;            // Player's score
  pipes: { x: number, y: number }[] = [];  // Array for pipe obstacles
  gameInterval: any;

  ngOnInit() {
    this.resetGame();
  }

  // Listen for the space key to make the bird "flap"
  @HostListener('window:keydown', ['$event'])
  handleSpace(event: KeyboardEvent) {
    if (event.code === 'Space' && this.isGameRunning) {
      this.flap();
    } else if (event.code === 'Space' && !this.isGameRunning) {
      this.startGame();
    }
  }

  // Start the game
  startGame() {
    this.isGameRunning = true;
    this.birdYPosition = 200;
    this.score = 0;
    this.pipes = [];
    this.gameInterval = setInterval(() => this.gameLoop(), 20);
    this.addPipe();
  }

  // Reset the game
  resetGame() {
    clearInterval(this.gameInterval);
    this.isGameRunning = false;
    this.birdYPosition = 200;
    this.pipes = [];
  }

  // Make the bird "flap" (jump up)
  flap() {
    this.birdYPosition += this.jumpStrength;
  }

  // Main game loop
  gameLoop() {
    // Apply gravity
    this.birdYPosition += this.gravity;

    // Move pipes and check for collision
    for (let pipe of this.pipes) {
      pipe.x -= 3; // Move pipe to the left
      if (this.checkCollision(pipe)) {
        this.resetGame();
        return;
      }
    }

    // Remove pipes that have gone off-screen and add new ones
    if (this.pipes.length > 0 && this.pipes[0].x < -50) {
      this.pipes.shift();
      this.addPipe();
      this.score++;
    }

    // End game if bird goes out of bounds
    if (this.birdYPosition > 400 || this.birdYPosition < 0) {
      this.resetGame();
    }
  }

  // Add a new pipe pair at a random height
  addPipe() {
    const gap = 100; // Gap between top and bottom pipes
    const pipeY = Math.floor(Math.random() * 200) + 50;
    this.pipes.push({ x: 400, y: pipeY });
  }

  // Check for collision between the bird and a pipe
  checkCollision(pipe: { x: number, y: number }): boolean {
    const birdX = 100;
    const birdWidth = 20;
    const pipeWidth = 50;
    const pipeGap = 100;

    return (
      birdX + birdWidth > pipe.x &&
      birdX < pipe.x + pipeWidth &&
      (this.birdYPosition < pipe.y || this.birdYPosition > pipe.y + pipeGap)
    );
  }
}