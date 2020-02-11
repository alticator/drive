var background = new rect(0, 0, 100, 100, "green");
var road = new rect(40, 0, 20, 100, "gray");
var car = new imageObj(50, 50, convertToPercent("width", 47) / 4, convertToPercent("height", 67) / 4, "car.png");
document.onkeydown = keyPress;
document.addEventListener("keyup", keyUp);
road.Xv = 0.1;

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

function gameOver() {
    clearObjects();
    new textObj("Game Over", 20, 20, "36px Arial", "#00D0FF", "center");
    updateAll();
}

function game() {
    updateAll();
    car.moveByVelocity();
    road.moveByVelocity();
    if (road.x > 80) {
        road.Xv = -0.1;
    }
    if (road.x < 0) {
        road.xV = 0.1;
    }
    if (insideObject(car, road) == false) {
        clearInterval(gameLoop);
        gameOver();
    }
}

var gameLoop = setInterval(game, 20);