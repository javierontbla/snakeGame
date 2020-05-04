let canvas, ctx, score, bestScore, count;
const grid = 16;
score = 0
bestScore = 0

let snake = {
    x:160,
    y:160,

    //snake direction
    dx: 16,
    dy: 0,

    body: [],

    // body length
    maxBody: 3
}

const apple = {
    x: 320,
    y: 320
}

window.onload = game = () => {

    canvas = document.getElementById('snakeWorld')
    canvas.focus()
    ctx = canvas.getContext('2d')

    document.addEventListener('keydown', function(e) {
        // left
        if (e.which === 37 && snake.dx !== 16 && snake.dx !== -16) {
            snake.dx = 0
            snake.dx -= grid
            snake.dy = 0
        // up
        } else if (e.which === 38 && snake.dy !== 16 && snake.dy !== -16) {
            snake.dy -= grid
            snake.dx = 0
        // right
        } else if (e.which === 39 && snake.dx !== -16 && snake.dx !== 16) {
            snake.dx = 0
            snake.dx += grid
            snake.dy = 0
        // down
        } else if (e.which === 40 && snake.dy !== -16 && snake.dy !== 16) {
            snake.dy += grid
            snake.dx = 0
        }
    })

    window.requestAnimationFrame(snakeLoop)

}

const appleRandomPosition = (max, min) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const resetGame = () => {
    snake.x = 160
    snake.y = 160
    snake.dx = 16
    snake.dy = 0
    snake.maxBody = 3
    snake.body = []
    score = 0
    apple.x = appleRandomPosition(0, 25) * grid
    apple.y = appleRandomPosition(0, 25) * grid
}

const snakeLoop = () => {
    // callback
    requestAnimationFrame(snakeLoop)
    // reduce speed
    if(++count < 4) {
        return
    }

    count = 0

    // this cleans remaining parts of the snake
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // check if the position of the snake is greater than
    // canvas height
    if (snake.x < 0 || snake.x >= canvas.width) {
        resetGame()
    } 
    
    if (snake.y < 0 || snake.y >= canvas.height) {
        resetGame()
    }

    // tail get updated by popping last element
    if (snake.body.length > snake.maxBody) {
        snake.body.pop()
    }

    // snake position gets updated
    snake.x += snake.dx
    snake.y += snake.dy
    
    // this inserts an object with "x" and "y" values
    // to the array of "body"
    snake.body.unshift({ x:snake.x, y:snake.y })

    //draws snake 
    ctx.fillStyle = 'green'
    snake.body.forEach(bodyPart => {
        // this returns an object
        // with "x" and "y" values
        ctx.fillRect(bodyPart.x, bodyPart.y, grid - 1, grid - 1)    
        
        // same loop for growing
        if (bodyPart.x === apple.x && bodyPart.y === apple.y) {
            snake.maxBody += 1  
            score += 1

            if (bestScore < score) {
                bestScore = score
            } 

            // change apple position
            apple.x = appleRandomPosition(0, 25) * grid
            apple.y = appleRandomPosition(0, 25) * grid
        }
    })

    // draws the apple
    ctx.fillStyle = 'red'
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1) 

    for (i = 1; i < snake.body.length; i++) {
        if (snake.body[i].x === snake.x && snake.body[i].y === snake.y) {
            resetGame()
        }
    }

    document.querySelector('.score').textContent = score
    document.querySelector('.bestScore').textContent = bestScore

}
