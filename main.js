// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Iteration 1
function drawGrid() {
  // TODO: write the code of the function
  context.lineWidth = 1;
  for (let column = 0; column <= 10; column++) {
    context.beginPath();
    context.moveTo(column * 50, 0);
    context.lineTo(column * 50, 500);
    context.stroke();
    context.closePath();
  }

  for (let row = 0; row <= 10; row++) {
    context.beginPath();
    context.moveTo(0, row * 50);
    context.lineTo(500, row * 50);
    context.stroke();
    context.closePath();
  }
}

//Iteration 2

class Character {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    //Bonus 6: add direction corresponding to the direction it went
    this.direction = 'down';
    this.score = 0;
  }
  moveUp() {
    this.direction = 'up';
    //Bonus 6: staying inside of the grid
    if (this.row > 0) {
      this.row -= 1;
    }
  }
  moveRight() {
    this.direction = 'right';
    if (this.col < 9) {
      this.col += 1;
    }
  }
  moveDown() {
    this.direction = 'down';
    if (this.row < 9) {
      this.row += 1;
    }
  }
  moveLeft() {
    this.direction = 'left';
    if (this.col > 0) {
      this.col -= 1;
    }
  }

  drawScore() {}
}

let playerOne = new Character(0, 0);
let playerTwo = new Character(0, 0);

//Iteration 3: Drawing the player

function drawPlayer() {
  const playerOneImage = new Image();
  const playerTwoImage = new Image();

  switch (playerOne.direction) {
    case 'up':
      playerOneImage.src = 'images/character-up.png';
      break;
    case 'down':
      playerOneImage.src = 'images/character-down.png';
      break;
    case 'left':
      playerOneImage.src = 'images/character-left.png';
      break;
    case 'right':
      playerOneImage.src = 'images/character-right.png';
      break;
  }
  switch (playerTwo.direction) {
    case 'up':
      playerTwoImage.src = 'images/character-up-2.png';
      break;
    case 'down':
      playerTwoImage.src = 'images/character-down-2.png';
      break;
    case 'left':
      playerTwoImage.src = 'images/character-left-2.png';
      break;
    case 'right':
      playerTwoImage.src = 'images/character-right-2.png';
      break;
  }
  //playerImage.src = 'images/character-down.png';
  //const ratio = playerImage.width / playerImage.height;
  playerOneImage.addEventListener('load', () => {
    context.drawImage(playerOneImage, playerOne.col * 50, playerOne.row * 50);
    console.log(playerOne.col, playerOne.row);
  });
  playerTwoImage.addEventListener('load', () => {
    context.drawImage(playerTwoImage, playerTwo.col * 50, playerTwo.row * 50);
    console.log(playerTwo.col, playerTwo.row);
  });
}

//Iteration 4: The treasure class

class Treasure {
  constructor() {
    this.setRandomPosition();
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}

let treasure = new Treasure(0, 0);

// Iteration 4.1. Drawing the treasure

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = 'images/treasure.png';
  const width = 50;
  treasureImage.addEventListener('load', () => {
    const ratio = treasureImage.width / treasureImage.height;
    context.drawImage(
      treasureImage,
      treasure.col * 50,
      treasure.row * 50,
      width,
      width * ratio
    );
    console.log(treasure.col, treasure.row);
  });
}

//Iteration 5

document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 37:
      playerOne.moveLeft();
      break;
    case 38:
      playerOne.moveUp();
      break;
    case 39:
      playerOne.moveRight();
      break;
    case 40:
      playerOne.moveDown();
      break;
    case 65:
      playerTwo.moveLeft();
      break;
    case 87:
      playerTwo.moveUp();
      break;
    case 68:
      playerTwo.moveRight();
      break;
    case 83:
      playerTwo.moveDown();
      break;
  }
  if (treasure.col === playerOne.col && treasure.row === playerOne.row) {
    treasure.setRandomPosition();
    playerOne.score += 1;
  } else if (treasure.col === playerTwo.col && treasure.row === playerTwo.row) {
    treasure.setRandomPosition();
    playerTwo.score += 1;
  }
  drawEverything();
});

//Bonus 6: Draw score

function drawScore() {
  const playerOneImageScore = new Image();
  const playerTwoImageScore = new Image();
  playerOneImageScore.src = 'images/character-down.png';
  playerTwoImageScore.src = 'images/character-down-2.png';

  playerOneImageScore.addEventListener('load', () => {
    context.drawImage(playerOneImageScore, 500, 450 ) 
  });
  playerTwoImageScore.addEventListener('load', () => {
    context.drawImage(playerTwoImageScore, 650, 450);
  });
  context.font = '50px sans-serif';
  context.fillText(playerOne.score, 550, 495);
  context.fillText(playerTwo.score, 700, 495);
}

function drawEverything() {
  context.clearRect(0, 0, width, height);
  drawGrid();
  drawPlayer();
  drawTreasure();
  drawScore();
}

drawEverything();
//setTimeout(drawEverything, 500);
