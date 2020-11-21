// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Iteration 1
function drawGrid() {
  // TODO: write the code of the function
  context.lineWidth = 1;
  for (let column = 0; column < 500; column++) {
    context.beginPath();
    context.moveTo(column * 50, 0);
    context.lineTo(column * 50, 500);
    context.stroke();
    context.closePath();
  }

  for (let row = 0; row < 500; row++) {
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
  }
  moveUp() {
    return (this.row -= 1);
  }
  moveRight() {
    return (this.col += 1);
  }
  moveDown() {
    return (this.row += 1);
  }
  moveLeft() {
    return (this.col -= 1);
  }
};

let player = new Character(0,0);

//Iteration 3: Drawing the player

function drawPlayer() {
  const playerImage = new Image();
  playerImage.src = 'images/character-down.png';
  //const ratio = playerImage.width / playerImage.height;
  playerImage.addEventListener('load', () => {
    context.drawImage(playerImage, player.col * 50, player.row * 50);
    console.log(player.col, player.row)
  });
};

//Iteration 4: The treasure class

class Treasure {
  constructor(){
    this.setRandomPosition()
  }
  setRandomPosition(){
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }

}

let treasure = new Treasure(0,0);

// Iteration 4.1. Drawing the treasure

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = 'images/treasure.png';
  const width = 50
  treasureImage.addEventListener('load', () => {
    const ratio = treasureImage.width/treasureImage.height;
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

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
  }

  if (treasure.col === player.col && treasure.row === player.row ) {
    treasure.setRandomPosition();
  }
  drawEverything()
});

function drawEverything() {
  context.clearRect(0, 0, width, height);
  drawGrid();
  drawPlayer()
  drawTreasure()
}

drawEverything()
//setTimeout(drawEverything, 500);