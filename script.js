const canvas = document.getElementById('game-container');
const ctx = canvas.getContext('2d');
const tileSize = 20;
const tiles = canvas.width / tileSize;

let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = { x: 15, y: 10 };

function randomFood() {
  food = {
    x: Math.floor(Math.random() * tiles),
    y: Math.floor(Math.random() * tiles)
  };

  while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    food = {
      x: Math.floor(Math.random() * tiles),
      y: Math.floor(Math.random() * tiles)
    };
  }
}

function drawGrid() {
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += tileSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  ctx.fillStyle = '#00ff00';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });

  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}

function update() {
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (
    head.x < 0 ||
    head.x >= tiles ||
    head.y < 0 ||
    head.y >= tiles ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    alert('Game Over!');
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    randomFood();
  } else {
    snake.pop();
  }

  draw();
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'ArrowUp' && direction.y !== 1) nextDirection = { x: 0, y: -1 };
  else if (key === 'ArrowDown' && direction.y !== -1) nextDirection = { x: 0, y: 1 };
  else if (key === 'ArrowLeft' && direction.x !== 1) nextDirection = { x: -1, y: 0 };
  else if (key === 'ArrowRight' && direction.x !== -1) nextDirection = { x: 1, y: 0 };
});

randomFood();
draw();
setInterval(update, 120);