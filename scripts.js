var debuggingMode = 0;
var gameMenuLoop = setInterval(gameMenu, 20);
var gameMenuLoop;
var gameMenuText;
var gameMenuBackground;
var gameMenuContainer;
var gameMenuButton;
var gameMenuButtonText;
var mouseX;
var mouseY;
document.onmousemove = mouseMove;
document.onmouseup = mouseUp;
document.onmousedown = mouseDown;
mouseDown = false;

if (debuggingMode == 1) {
    console.log("Debuggging Mode ON");
}
else {
    console.log("Debuggging Mode OFF");
}

function mouseUp(event) {
    mouseDown = false;
}

function mouseDown(event) {
    mouseDown = true;
}

function mouseMove(event) {
    mouseX = convertToPercent("width", event.clientX);
    mouseY = convertToPercent("height", event.clientY);
}

function startGameMenu() {
    debugMessage("startGameMenu()");
    gameMenuLoop = setInterval(gameMenu, 20);
}

function gameMenu() {
    debugMessage("gameMenu()");
    clearObjects();
    gameMenuBackground = new rect(0, 0, 100, 100, magentaGradient);
    gameMenuContainer = new rect(10, 10, 80, 80, "rgba(255, 255, 255, 0.5)");
    gameMenuText = new textObj("Alticator Drive 3", 12, 12 + convertToPercent("height", 36), "36px Arial", "white", "left");
    gameMenuButton = new rect(10, 50, 80, 10, "#00d0ff");
    gameMenuButtonText = new textObj("Start Game", 12, 50 + convertToPercent("height", 24) * 1.5, "24px Arial", "white", "left");
    if (inside(mouseX, mouseY, gameMenuButton) && mouseDown) {
        clearInterval(gameMenuLoop);
        gameInit();
    }
    updateAll();
}

var background;
var road;
var car;
var obstacle;
var obstacleX;
var score;
var scoreBoardBackground;
var scoreBoard;
var gameLoop;

function gameInit() {
    car = 0;
    obstacle = 0;
    debugMessage("gameInit()");
    clearObjects();
    background = new imageObj(0, 0, 100, 100, "background.png");
    road = new imageObj(40, 0, 20, 100, "road.png");
    car = new imageObj(50, 50, convertToPercent("width", 47), convertToPercent("height", 67), "car.png");
    document.onkeydown = keyPress;
    document.addEventListener("keyup", keyUp);
    road.Xv = 0.1;
    obstacle = new imageObj(-10, -10, 5, 5, "obstacle.png");
    obstacleX = 0;
    score = 0;
    scoreBoardBackground = new rect(0, 0, 10, 10, "rgba(255, 255, 255, 0.5)");
    scoreBoard = new textObj("Score: " + Math.floor(score), 5, 5, "24px Arial", "white", "center");
    obstacle.Yv = 0.2;
    updateAll();
    gameLoop = setInterval(game, 20);
}

function keyPress(event) {
    if (event.key == "ArrowLeft") {
        car.Xv = -0.5;
    }
    else if (event.key == "ArrowRight") {
        car.Xv = 0.5;
        
    }
}

function keyUp(event) {
    if (event.key == "ArrowLeft" || event.key == "ArrowRight") {
        car.Xv = 0;
    }
}

function debugMessage(message) {
    if (debuggingMode == 1) {
        console.log(message);
    }
}

function gameOver(message) {
    debugMessage("gameOver()");
    clearObjects();
    var menuBackground = new rect(0, 0, 100, 100, magentaGradient);
    var container = new rect(10, 10, 80, 80, "rgba(255, 255, 255, 0.5)");
    new textObj("Game Over", 20, 20, "36px Arial", "#00D0FF", "left");
    new textObj("Score: " + Math.floor(score), 20, 40, "italic 24px Arial", "white", "left");
    new textObj("Reason of Game Over: " + message, 20, 50, "italic 24px Arial", "white", "left");
    updateAll();
    setTimeout(startGameMenu, 1000);
}

function game() {
    debugMessage("game()");
    updateAll();
    car.moveByVelocity();
    road.moveByVelocity();
    obstacle.moveByVelocity();
    if (road.x > 80) {
        road.Xv = -0.1;
    }
    if (road.x < 0) {
        road.Xv = 0.1;
    }
    if (insideObject(car, road) == false) {
        clearInterval(gameLoop);
        gameOver("You went off the road");
    }
    if (obstacle.y > 100) {
        obstacleX = random(0, 15);
        obstacle.y = -10;
    }
    else {
        obstacle.x = road.x + obstacleX;
    }
    if (objectCollision(car, obstacle)) {
        clearInterval(gameLoop);
        gameOver("You hit an obstacle");
    }
    score += 0.1;
    scoreBoard.string = "Score: " + Math.floor(score);
}