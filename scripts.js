var background = new rect(0, 0, 100, 100, "green");
var road = new rect(40, 0, 20, 100, "gray");
var car = new imageObj(50, 50, convertToPercent("width", 47) / 4, convertToPercent("height", 67) / 4, "car.png");
document.onkeydown = keyPress;
document.addEventListener("keyup", keyUp);
road.Xv = 0.1;
var obstacle = new rect(-10, -10, 5, 5, "red");
var obstacleX = 0;
var score = 0;
var scoreBoardBackground = new rect(0, 0, 10, 10, "rgba(255, 255, 255, 0.5)");
var scoreBoard = new textObj("Score: " + Math.floor(score), 5, 5, "24px Arial", "white", "center");
obstacle.Yv = 0.2;

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

function gameOver(message) {
    clearObjects();
    new textObj("Game Over", 20, 20, "36px Arial", "#00D0FF", "left");
    new textObj("Score: " + Math.floor(score) + " - " + "Reason of Game Over: " + message, 20, 40, "italic 24px Arial", "black", "left");
    updateAll();
}

function game() {
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

var gameLoop = setInterval(game, 20);