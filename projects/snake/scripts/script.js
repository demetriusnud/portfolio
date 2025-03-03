// Get the canvas
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

// Set grid size
var grid = 16;
var count = 0;

// Adjust snake and apple for responsive canvas
var snake = {
    x: canvas.width / 2, // Center horizontally
    y: canvas.height / 2, // Center vertically
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

var apple = {
    x: canvas.width - grid * 2, // Adjusted initial position
    y: canvas.height - grid * 2
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
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    // Handle edge wrapping
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // Draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Draw snake
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            // Adjust for responsive grid
            let maxGrid = Math.floor(canvas.width / grid);
            apple.x = getRandomInt(0, maxGrid) * grid;
            apple.y = getRandomInt(0, maxGrid) * grid;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = canvas.width / 2;
                snake.y = canvas.height / 2;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;
                let maxGrid = Math.floor(canvas.width / grid);
                apple.x = getRandomInt(0, maxGrid) * grid;
                apple.y = getRandomInt(0, maxGrid) * grid;
            }
        }
    });
}

// Key controls remain the same
document.addEventListener('keydown', function (e) {
    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

requestAnimationFrame(loop);