var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 4
};

if (localStorage.ddrwinner === "1") {
	document.getElementById("win").innerHTML = "Goose got your bread again!";
	document.getElementById("textdoc").innerHTML = "Play again to get bread back or quit!";
} else {
	document.getElementById("win").innerHTML = "Goose got your bread!";
	document.getElementById("textdoc").innerHTML = "Play game to get bread back or quit!";
}

sessionStorage.ddrloseagain = 1;

var apple = {
  x: 320,
  y: 320
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function loop() {
  requestAnimationFrame(loop);
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  snake.x += snake.dx;
  snake.y += snake.dy;
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }
  snake.cells.unshift({x: snake.x, y: snake.y});
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid-1, grid-1);
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        apple.x = getRandomInt(0, 25) * grid;
        apple.y = getRandomInt(0, 25) * grid;
		document.getElementById("win").innerHTML = "You lost, the Goose got your bread!";
		document.getElementById("textdoc").innerHTML = "You lost, try again or quit!";
		if (sessionStorage.ddrloseagain < 93) {
			document.getElementById("win").innerHTML = "You lost again, the Goose got your bread again!";
			document.getElementById("textdoc").innerHTML = "You lost again, try again or quit!";
		} else {
			document.getElementById("win").innerHTML = "You unlocked a secret!";
			document.getElementById("textdoc").innerHTML = "Now it's time for a secret seconds!";
			document.location.href = 'http://duckdungeon.tk/home/images/beta.html';
		}
		if (sessionStorage.ddrloseagain) {
			sessionStorage.ddrloseagain = Number(sessionStorage.ddrloseagain) + 1;
		} else {
			sessionStorage.ddrloseagain = 1;
		}
      }
    }
	if(snake.maxCells === 20) {
		if (localStorage.ddrwinner) {
			localStorage.ddrwinner = 2;
		} else {
			localStorage.ddrwinner = 1;
		}
		document.location.href = 'http://duckdungeon.tk/bread.html';
	}
  });
}
document.addEventListener('keydown', function(e) {
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
requestAnimationFrame(loop);