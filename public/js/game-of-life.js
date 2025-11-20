// ===== Config =====
const cellSize = 3; // size of each cell in px
const tickSpeed = 100;

// ===== Setup =====
const btnStart = document.getElementById("lt-bottom-boxes-3");
const btnStop  = document.getElementById("lt-bottom-boxes-2");
const btnReset = document.getElementById("lt-bottom-boxes-1");

btnStart.addEventListener("click", startGame);
btnStop.addEventListener("click", stopGame);
btnReset.addEventListener("click", resetGame);

const canvas = document.getElementById("gol-canvas");
const ctx = canvas.getContext("2d");

// Match canvas resolution to its displayed size to keep cells crisp
const displayWidth = canvas.clientWidth;
const displayHeight = canvas.clientHeight;
canvas.width = Math.floor(displayWidth / cellSize) * cellSize;
canvas.height = Math.floor(displayHeight / cellSize) * cellSize;

const rows = canvas.height / cellSize;
const cols = canvas.width / cellSize;

let grid = createGrid(rows, cols);
randomize(grid);

let intervalId = null;

// ===== Functions =====
function startGame() {
  if (intervalId) return; 
  intervalId = setInterval(() => {
    grid = step(grid);
    draw(grid);
  }, tickSpeed);
}

function stopGame() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetGame() {
  stopGame();
  grid = createGrid(rows, cols);
  randomize(grid);
  draw(grid);
}

function createGrid(rows, cols) {
  const g = [];
  for (let r = 0; r < rows; r++) {
    g[r] = [];
    for (let c = 0; c < cols; c++) {
      g[r][c] = 0;
    }
  }
  return g;
}

function randomize(g) {
  for (let r = 0; r < g.length; r++) {
    for (let c = 0; c < g[0].length; c++) {
      g[r][c] = Math.random() < 0.2 ? 1 : 0;
    }
  }
}

function step(g) {
  const next = createGrid(rows, cols);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const n = countNeighbors(g, r, c);
      const alive = g[r][c] === 1;
      if (alive && (n === 2 || n === 3)) next[r][c] = 1;
      else if (!alive && n === 3) next[r][c] = 1;
      else next[r][c] = 0;
    }
  }
  return next;
}

function countNeighbors(g, r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const rr = r + dr;
      const cc = c + dc;
      if (rr >= 0 && rr < rows && cc >= 0 && cc < cols) count += g[rr][cc];
    }
  }
  return count;
}

function draw(g) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === 1) {
        ctx.fillStyle = "#feb400";
        ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
}

// Initial draw & start
draw(grid);
startGame();
